"use client";
import { useState, useRef } from "react";
import { useRouter } from "next/navigation";

const GO_STATIONS = ["Union Station","Bloor GO","Danforth GO","Scarborough GO","Oakville GO","Burlington GO","Hamilton GO","Barrie South GO","Kitchener GO","Guelph Central GO","Georgetown GO","Brampton GO","Mississauga GO","Port Credit GO","Clarkson GO","Ajax GO","Whitby GO","Oshawa GO","Richmond Hill GO","Aurora GO","Newmarket GO","Bradford GO","Kipling GO","Appleby GO","Bronte GO","Aldershot GO","Exhibition GO","Mimico GO","Long Branch GO","Other"];

const CATS = ["Electronics","Clothing","Accessory","Document","Bag","Other"];

type UploadState = "idle"|"analysing"|"reviewed"|"saving"|"done";

function Field({ label, required, children }: { label:string; required?:boolean; children:React.ReactNode }) {
  return (
    <div>
      <label style={{ display:"block",fontFamily:"'Chakra Petch',sans-serif",fontSize:11,fontWeight:600,color:"#1c2b39",letterSpacing:".04em",marginBottom:4,textTransform:"uppercase" as const }}>
        {label}{required&&<span style={{ color:"#dc2626",marginLeft:2 }}>*</span>}
      </label>
      {children}
    </div>
  );
}

export default function UploadItem() {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const [drag, setDrag] = useState(false);
  const [file, setFile] = useState<File|null>(null);
  const [state, setState] = useState<UploadState>("idle");
  const [station, setStation] = useState("");
  const [dateFound, setDateFound] = useState("");
  const [notes, setNotes] = useState("");
  const [attrs, setAttrs] = useState({ category:"",color:"",brand:"",condition:"",summary:"" });

  const previewUrl = file ? URL.createObjectURL(file) : null;

  function acceptFile(f: File) {
    if(!f.type.startsWith("image/")) return;
    setFile(f);
    // Simulate AI analysis
    setState("analysing");
    setTimeout(()=>{
      setAttrs({ category:"Electronics", color:"Black", brand:"Sony", condition:"Good", summary:"Black Sony over-ear headphones with noise cancellation. Appears to be WH-1000XM4 or similar model." });
      setState("reviewed");
    },1800);
  }

  function handleSave() {
    setState("saving");
    setTimeout(()=>{ setState("done"); router.push("/admin/found-items"); },1000);
  }

  return (
    <div style={{ padding:"28px 28px",maxWidth:900 }}>
      <div style={{ marginBottom:24 }}>
        <h2 style={{ fontFamily:"'Chakra Petch',sans-serif",fontSize:17,fontWeight:700,color:"#1c2b39",margin:"0 0 4px" }}>Intake Found Item</h2>
        <p style={{ fontSize:12,color:"#8695a4",margin:0 }}>Upload a photo — AI will extract attributes automatically.</p>
      </div>

      <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:24,alignItems:"start" }}>
        {/* Left: photo + details */}
        <div style={{ display:"flex",flexDirection:"column",gap:20 }}>
          <div className="card" style={{ padding:"20px 22px" }}>
            <p style={{ fontFamily:"'Chakra Petch',sans-serif",fontSize:11,fontWeight:700,letterSpacing:".08em",textTransform:"uppercase" as const,color:"#8695a4",marginBottom:14 }}>Photo Upload</p>
            <div
              onClick={()=>!file&&inputRef.current?.click()}
              onDragOver={e=>{e.preventDefault();setDrag(true);}}
              onDragLeave={()=>setDrag(false)}
              onDrop={e=>{e.preventDefault();setDrag(false);const f=e.dataTransfer.files?.[0];if(f)acceptFile(f);}}
              style={{ position:"relative",borderRadius:12,border:`2px dashed ${drag?"#006341":file?"#006341":"#dde2e7"}`,background:drag?"#e8f4ef":file?"#f0f9f4":"#f5f6f7",
                minHeight:file?220:160,display:"flex",alignItems:"center",justifyContent:"center",cursor:file?"default":"pointer",overflow:"hidden",transition:"all .18s" }}>
              <input ref={inputRef} type="file" accept="image/*" style={{ display:"none" }} onChange={e=>{const f=e.target.files?.[0];if(f)acceptFile(f);}}/>
              {!file?(
                <div style={{ textAlign:"center",padding:"28px 20px" }}>
                  <div style={{ width:48,height:48,borderRadius:12,background:"#e8f4ef",display:"flex",alignItems:"center",justifyContent:"center",margin:"0 auto 12px" }}>
                    <svg width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="#006341" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M17 8l-5-5-5 5M12 3v12"/></svg>
                  </div>
                  <p style={{ fontFamily:"'Chakra Petch',sans-serif",fontSize:13,fontWeight:600,color:"#1c2b39",margin:"0 0 4px" }}>
                    {drag?"Drop to upload":"Drag & drop or click to upload"}
                  </p>
                  <p style={{ fontFamily:"'Inter',sans-serif",fontSize:11,color:"#8695a4",margin:0 }}>JPG, PNG, HEIC — one clear photo</p>
                </div>
              ):(
                <>
                  {previewUrl&&<img src={previewUrl} alt="preview" style={{ width:"100%",height:220,objectFit:"cover",display:"block" }}/>}
                  <button onClick={e=>{e.stopPropagation();setFile(null);setState("idle");}} style={{ position:"absolute",top:10,right:10,width:28,height:28,borderRadius:"50%",background:"rgba(0,0,0,.55)",border:"none",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center" }}>
                    <svg width="13" height="13" fill="none" viewBox="0 0 24 24" stroke="#fff" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"/></svg>
                  </button>
                </>
              )}
            </div>
          </div>

          <div className="card" style={{ padding:"20px 22px",display:"flex",flexDirection:"column",gap:16 }}>
            <p style={{ fontFamily:"'Chakra Petch',sans-serif",fontSize:11,fontWeight:700,letterSpacing:".08em",textTransform:"uppercase" as const,color:"#8695a4",margin:0 }}>Location & Date</p>
            <Field label="Station" required>
              <select value={station} onChange={e=>setStation(e.target.value)} className="field-input">
                <option value="">Select station…</option>
                {GO_STATIONS.map(s=><option key={s} value={s}>{s}</option>)}
              </select>
            </Field>
            <Field label="Date Found" required>
              <input type="date" value={dateFound} onChange={e=>setDateFound(e.target.value)} className="field-input"/>
            </Field>
            <Field label="Staff Notes">
              <textarea value={notes} onChange={e=>setNotes(e.target.value)} rows={3} placeholder="Any additional details…" className="field-input" style={{ resize:"vertical" as const }}/>
            </Field>
          </div>
        </div>

        {/* Right: AI analysis */}
        <div className="card" style={{ padding:"20px 22px" }}>
          <p style={{ fontFamily:"'Chakra Petch',sans-serif",fontSize:11,fontWeight:700,letterSpacing:".08em",textTransform:"uppercase" as const,color:"#8695a4",marginBottom:14 }}>AI Analysis</p>

          {state==="idle"&&(
            <div style={{ textAlign:"center",padding:"48px 20px",color:"#8695a4" }}>
              <div style={{ width:52,height:52,borderRadius:12,background:"#f5f6f7",display:"flex",alignItems:"center",justifyContent:"center",margin:"0 auto 14px" }}>
                <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="#c8ced5" strokeWidth={1.8}><rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/></svg>
              </div>
              <p style={{ fontFamily:"'Chakra Petch',sans-serif",fontSize:13,fontWeight:600,color:"#c8ced5",margin:"0 0 6px" }}>Waiting for photo</p>
              <p style={{ fontFamily:"'Inter',sans-serif",fontSize:12 }}>Upload a photo to start AI analysis</p>
            </div>
          )}

          {state==="analysing"&&(
            <div style={{ textAlign:"center",padding:"48px 20px" }}>
              <div style={{ width:52,height:52,borderRadius:"50%",background:"linear-gradient(135deg,#006341,#00d492)",display:"flex",alignItems:"center",justifyContent:"center",margin:"0 auto 14px",animation:"spin 1s linear infinite" }}>
                <svg width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="#fff" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/></svg>
              </div>
              <p style={{ fontFamily:"'Chakra Petch',sans-serif",fontSize:13,fontWeight:700,color:"#006341",margin:"0 0 6px" }}>Analysing Photo…</p>
              <p style={{ fontFamily:"'Inter',sans-serif",fontSize:12,color:"#8695a4" }}>OpenAI Vision is extracting item attributes</p>
            </div>
          )}

          {state==="reviewed"&&(
            <div style={{ display:"flex",flexDirection:"column",gap:16 }}>
              <div style={{ background:"#e8f4ef",borderRadius:9,padding:"10px 14px",display:"flex",alignItems:"center",gap:9 }}>
                <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="#006341" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/></svg>
                <p style={{ fontFamily:"'Inter',sans-serif",fontSize:12,fontWeight:600,color:"#006341",margin:0 }}>AI analysis complete — review & edit below</p>
              </div>
              {[{k:"category",label:"Category",opts:CATS},{k:"color",label:"Color",opts:[]},{k:"brand",label:"Brand",opts:[]},{k:"condition",label:"Condition",opts:["Excellent","Good","Fair","Poor"]}].map(f=>(
                <div key={f.k}>
                  <label className="field-label">{f.label}</label>
                  {f.opts.length>0?(
                    <select value={(attrs as any)[f.k]} onChange={e=>setAttrs(a=>({...a,[f.k]:e.target.value}))} className="field-input">
                      {f.opts.map(o=><option key={o} value={o}>{o}</option>)}
                    </select>
                  ):(
                    <input value={(attrs as any)[f.k]} onChange={e=>setAttrs(a=>({...a,[f.k]:e.target.value}))} className="field-input"/>
                  )}
                </div>
              ))}
              <div>
                <label className="field-label">AI Summary</label>
                <textarea value={attrs.summary} onChange={e=>setAttrs(a=>({...a,summary:e.target.value}))} rows={3} className="field-input" style={{ resize:"vertical" as const }}/>
              </div>
              <button onClick={handleSave} style={{ background:"#006341",color:"#fff",border:"none",borderRadius:10,padding:"12px",fontFamily:"'Inter',sans-serif",fontWeight:700,fontSize:14,cursor:"pointer",width:"100%" }}>
                Save to Database & Index
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
