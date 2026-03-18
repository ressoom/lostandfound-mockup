"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import NeuralCanvas from "@/components/ui/NeuralCanvas";

function Field({ label, type, value, onChange, placeholder, autoComplete }:
  { label:string; type:string; value:string; onChange:(v:string)=>void; placeholder?:string; autoComplete?:string }) {
  const [focused, setFocused] = useState(false);
  return (
    <div style={{ marginBottom:16 }}>
      <label style={{ display:"block",fontSize:11,fontWeight:600,color:"rgba(255,255,255,.45)",letterSpacing:".06em",textTransform:"uppercase" as const,marginBottom:7,fontFamily:"'Inter',sans-serif" }}>{label}</label>
      <input type={type} required value={value} autoComplete={autoComplete} placeholder={placeholder}
        onChange={e=>onChange(e.target.value)} onFocus={()=>setFocused(true)} onBlur={()=>setFocused(false)}
        style={{ width:"100%",boxSizing:"border-box" as const,padding:"11px 14px",borderRadius:9,background:"rgba(255,255,255,.06)",
          border:`1.5px solid ${focused?"#006341":"rgba(255,255,255,.12)"}`,outline:"none",fontSize:13.5,color:"#fff",fontFamily:"'Inter',sans-serif",
          transition:"border-color .15s",caretColor:"#00d492" }}/>
    </div>
  );
}

export default function AdminLogin() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setBusy(true);
    setTimeout(()=>{
      setBusy(false);
      router.push("/admin");
    },700);
  }

  return (
    <div style={{ position:"relative",minHeight:"100vh",display:"flex",alignItems:"center",justifyContent:"center",overflow:"hidden",background:"#0d1e2c" }}>
      <NeuralCanvas bgColor={0x0d1e2c} nodeColor={0x006b44} hubColor={0x00b371} edgeColor={0x004d2e} edgeDist={5.2} nodeCount={55} />
      <div style={{ position:"absolute",inset:0,pointerEvents:"none",background:"radial-gradient(ellipse 600px 500px at 50% 50%,rgba(0,99,65,.18),transparent 70%)" }} />
      <div style={{ position:"relative",zIndex:10,width:"100%",maxWidth:400,margin:"0 1.5rem",
        background:"rgba(13,30,44,.82)",backdropFilter:"blur(18px)",border:"1px solid rgba(255,255,255,.10)",
        borderRadius:20,padding:"36px 36px 32px",boxShadow:"0 32px 80px rgba(0,0,0,.45)" }}>
        <div style={{ display:"flex",alignItems:"center",gap:12,marginBottom:28 }}>
          <div style={{ width:42,height:42,borderRadius:10,background:"#006341",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0 }}>
            <span style={{ fontFamily:"'Chakra Petch',sans-serif",fontWeight:800,fontSize:17,color:"#fff",letterSpacing:"-.03em" }}>GO</span>
          </div>
          <div>
            <p style={{ fontFamily:"'Chakra Petch',sans-serif",fontSize:15,fontWeight:700,color:"#fff",margin:0,letterSpacing:"-.01em" }}>Staff Sign In</p>
            <p style={{ fontSize:11,color:"rgba(255,255,255,.35)",margin:0,fontFamily:"'Inter',sans-serif" }}>Lost & Found Admin Portal</p>
          </div>
        </div>
        <div style={{ height:1,background:"rgba(255,255,255,.07)",marginBottom:24 }} />

        {/* Mockup notice */}
        <div style={{ background:"rgba(0,212,146,.08)",border:"1px solid rgba(0,212,146,.2)",borderRadius:8,padding:"9px 12px",marginBottom:20,fontSize:11,color:"rgba(0,212,146,.9)",fontFamily:"'Inter',sans-serif",display:"flex",alignItems:"center",gap:8 }}>
          <svg width="13" height="13" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><circle cx="12" cy="12" r="10"/><path d="M12 8v4M12 16h.01"/></svg>
          Mockup — any credentials work, just hit Sign In
        </div>

        <form onSubmit={onSubmit}>
          <Field label="Username" type="text" value={email} onChange={setEmail} placeholder="123" autoComplete="username"/>
          <Field label="Password" type="password" value={pw} onChange={setPw} placeholder="••••••••" autoComplete="current-password"/>
          {error&&<div style={{ background:"rgba(220,38,38,.12)",border:"1px solid rgba(220,38,38,.25)",borderRadius:8,padding:"9px 12px",fontSize:12,color:"#fca5a5",marginBottom:16,fontFamily:"'Inter',sans-serif" }}>{error}</div>}
          <button type="submit" disabled={busy} style={{ width:"100%",padding:"12px",borderRadius:10,border:"none",background:busy?"#4d9e82":"#006341",color:"#fff",fontFamily:"'Inter',sans-serif",fontSize:14,fontWeight:700,cursor:busy?"not-allowed":"pointer",display:"flex",alignItems:"center",justifyContent:"center",gap:9,marginTop:4 }}>
            {busy?"Signing in…":"Sign In"}
          </button>
        </form>

        <div style={{ marginTop:22,paddingTop:18,borderTop:"1px solid rgba(255,255,255,.07)",display:"flex",justifyContent:"flex-end" }}>
          <a href="/" style={{ fontSize:12,color:"rgba(255,255,255,.28)",textDecoration:"none",fontFamily:"'Inter',sans-serif" }}>Public Site</a>
        </div>
      </div>
    </div>
  );
}
