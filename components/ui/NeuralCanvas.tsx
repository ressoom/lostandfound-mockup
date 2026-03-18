"use client";
import { useEffect, useRef } from "react";
import * as THREE from "three";

export interface NeuralCanvasProps {
  bgColor?:   number;
  nodeColor?: number;
  hubColor?:  number;
  edgeColor?: number;
  edgeDist?:  number;
  nodeCount?: number;
  sparkles?:  number;
  height?:    string;
  style?:     React.CSSProperties;
}

export default function NeuralCanvas({
  bgColor   = 0x0c1825,
  nodeColor = 0x008a58,
  hubColor  = 0x00d492,
  edgeColor = 0x006341,
  edgeDist  = 5.5,
  nodeCount = 60,
  sparkles  = 28,
  height    = "100%",
  style,
}: NeuralCanvasProps) {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = mountRef.current;
    if (!el) return;
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(bgColor, 1);
    el.appendChild(renderer.domElement);
    const scene  = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, 1, 0.1, 200);
    camera.position.z = 13;
    scene.fog = new THREE.FogExp2(bgColor, 0.026);

    const setSize = () => {
      const w = el.clientWidth, h = el.clientHeight;
      renderer.setSize(w, h);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    };
    setSize();

    const SX = 20, SY = 11, SZ = 4;
    const HUB_N = Math.ceil(nodeCount * 0.12);
    type NodeData = { pos: THREE.Vector3; vel: THREE.Vector3; isHub: boolean };
    const nodes: NodeData[] = Array.from({ length: nodeCount }, (_, i) => ({
      pos: new THREE.Vector3(
        (Math.random() - .5) * SX,
        (Math.random() - .5) * SY,
        (Math.random() - .5) * SZ,
      ),
      vel: new THREE.Vector3((Math.random()-.5)*.005, (Math.random()-.5)*.003, 0),
      isHub: i < HUB_N,
    }));

    const nodeMat = new THREE.PointsMaterial({ vertexColors: true, size: 0.22, sizeAttenuation: true });
    const nodeGeo = new THREE.BufferGeometry();
    const nPos = new Float32Array(nodeCount * 3);
    const nCol = new Float32Array(nodeCount * 3);
    const hc = new THREE.Color(hubColor), nc = new THREE.Color(nodeColor);
    nodes.forEach((n, i) => {
      nPos[i*3]=n.pos.x; nPos[i*3+1]=n.pos.y; nPos[i*3+2]=n.pos.z;
      const c = n.isHub ? hc : nc;
      nCol[i*3]=c.r; nCol[i*3+1]=c.g; nCol[i*3+2]=c.b;
    });
    nodeGeo.setAttribute("position", new THREE.BufferAttribute(nPos, 3));
    nodeGeo.setAttribute("color",    new THREE.BufferAttribute(nCol, 3));
    const nodePoints = new THREE.Points(nodeGeo, nodeMat);
    scene.add(nodePoints);

    const MAX_EDGES = nodeCount * 6;
    const edgeGeo = new THREE.BufferGeometry();
    const eBuf = new Float32Array(MAX_EDGES * 6);
    edgeGeo.setAttribute("position", new THREE.BufferAttribute(eBuf, 3));
    const edgeMat = new THREE.LineSegments(edgeGeo, new THREE.LineBasicMaterial({ color: edgeColor, transparent: true, opacity: 0.35 }));
    scene.add(edgeMat);

    const MAX_SP = sparkles;
    type Sparkle = { edge: [number,number]; t: number; speed: number };
    const activeSparkles: Sparkle[] = [];
    const spPos = new Float32Array(MAX_SP * 3);
    const spGeo = new THREE.BufferGeometry();
    spGeo.setAttribute("position", new THREE.BufferAttribute(spPos, 3));
    const spMat = new THREE.PointsMaterial({ color: hubColor, size: 0.18, sizeAttenuation: true, transparent: true, opacity: 0.9 });
    const sparklePoints = new THREE.Points(spGeo, spMat);
    scene.add(sparklePoints);

    function buildEdges() {
      let ei = 0;
      for (let i = 0; i < nodes.length && ei < MAX_EDGES; i++) {
        for (let j = i+1; j < nodes.length && ei < MAX_EDGES; j++) {
          if (nodes[i].pos.distanceTo(nodes[j].pos) < edgeDist) {
            eBuf[ei*6+0]=nodes[i].pos.x; eBuf[ei*6+1]=nodes[i].pos.y; eBuf[ei*6+2]=nodes[i].pos.z;
            eBuf[ei*6+3]=nodes[j].pos.x; eBuf[ei*6+4]=nodes[j].pos.y; eBuf[ei*6+5]=nodes[j].pos.z;
            ei++;
          }
        }
      }
      edgeGeo.setDrawRange(0, ei * 2);
      (edgeGeo.attributes.position as THREE.BufferAttribute).needsUpdate = true;
    }

    function spawnSparkle() {
      if (activeSparkles.length >= MAX_SP) return;
      const a = Math.floor(Math.random()*nodeCount);
      let b = Math.floor(Math.random()*nodeCount);
      if (b === a) b = (a+1)%nodeCount;
      activeSparkles.push({ edge:[a,b], t:0, speed: 0.004+Math.random()*0.006 });
    }
    for (let i=0;i<MAX_SP*.4;i++) spawnSparkle();

    let animId: number;
    function animate() {
      animId = requestAnimationFrame(animate);
      nodes.forEach(n => {
        n.pos.add(n.vel);
        if (Math.abs(n.pos.x) > SX/2) n.vel.x *= -1;
        if (Math.abs(n.pos.y) > SY/2) n.vel.y *= -1;
        nPos[nodes.indexOf(n)*3]=n.pos.x;
        nPos[nodes.indexOf(n)*3+1]=n.pos.y;
        nPos[nodes.indexOf(n)*3+2]=n.pos.z;
      });
      (nodeGeo.attributes.position as THREE.BufferAttribute).needsUpdate = true;
      buildEdges();

      if (Math.random() < 0.04) spawnSparkle();
      let si = 0;
      for (let i = activeSparkles.length-1; i >= 0; i--) {
        const s = activeSparkles[i];
        s.t += s.speed;
        if (s.t >= 1) { activeSparkles.splice(i,1); continue; }
        const a = nodes[s.edge[0]].pos, b = nodes[s.edge[1]].pos;
        spPos[si*3]   = a.x+(b.x-a.x)*s.t;
        spPos[si*3+1] = a.y+(b.y-a.y)*s.t;
        spPos[si*3+2] = a.z+(b.z-a.z)*s.t;
        si++;
      }
      spGeo.setDrawRange(0, si);
      (spGeo.attributes.position as THREE.BufferAttribute).needsUpdate = true;
      renderer.render(scene, camera);
    }
    animate();

    const ro = new ResizeObserver(setSize);
    ro.observe(el);
    return () => {
      cancelAnimationFrame(animId);
      ro.disconnect();
      renderer.dispose();
      el.removeChild(renderer.domElement);
    };
  }, [bgColor, nodeColor, hubColor, edgeColor, edgeDist, nodeCount, sparkles]);

  return (
    <div
      ref={mountRef}
      style={{ position:"absolute", inset:0, width:"100%", height, ...style,
        background: `#${bgColor.toString(16).padStart(6,"0")}` }}
    />
  );
}
