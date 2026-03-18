"use client";
import { useState } from "react";

interface Claim {
  id: string;
  name: string;
  email: string;
  description: string;
  location: string;
  category: string;
  date: string;
}

const MOCK_CLAIMS: Claim[] = [
  {id:"c1",name:"Marcus Williams",email:"m.williams@email.com",description:"Grey North Face backpack with a MacBook Air inside. Lost it on the Barrie line on Friday morning.",location:"Barrie South GO",category:"Bag",date:"Mar 15, 2026"},
  {id:"c2",name:"Emily Rodriguez",email:"emily.r@email.com",description:"Burgundy wool scarf — hand knitted with small green diamonds pattern.",location:"Kitchener GO",category:"Clothing",date:"Mar 14, 2026"},
  {id:"c3",name:"David Kim",email:"d.kim@email.com",description:"Presto card and Ontario health card in a clear plastic sleeve.",location:"Union Station",category:"Document",date:"Mar 13, 2026"},
];

const FOUND_ITEMS = [
  {id:"fi1",description:"Grey North Face backpack (large)",location:"Barrie South GO",category:"Bag",date:"Mar 15, 2026"},
  {id:"fi2",description:"Dark red wool scarf with pattern",location:"Kitchener GO",category:"Clothing",date:"Mar 14, 2026"},
  {id:"fi3",description:"Presto card + health card sleeve",location:"Union Station",category:"Document",date:"Mar 13, 2026"},
  {id:"fi4",description:"Blue JanSport backpack",location:"Oakville GO",category:"Bag",date:"Mar 12, 2026"},
  {id:"fi5",description:"Black Sony headphones",location:"Union Station",category:"Electronics",date:"Mar 11, 2026"},
];

export default function ManualQueue() {
  const [claims] = useState<Claim[]>(MOCK_CLAIMS);
  const [linked, setLinked] = useState<Record<string,string>>({});
  const [activeClaim, setActiveClaim] = useState<string|null>(null);
  const [search, setSearch] = useState("");
  const [toast, setToast] = useState("");

  function handleLink(claimId: string, foundId: string) {
    setLinked(l=>({...l,[claimId]:foundId}));
    setActiveClaim(null);
    setToast("Claim linked — match sent for AI review!");
    setTimeout(()=>setToast(""),3000);
  }

  const filteredItems = FOUND_ITEMS.filter(it=>{
    const q = search.toLowerCase();
    return !q || it.description.toLowerCase().includes(q) || it.location.toLowerCase().includes(q) || it.category.toLowerCase().includes(q);
  });

  return (
    <div style={{ padding:"28px 28px",maxWidth:1000 }}>
      {toast&&(
        <div style={{ position:"fixed",top:20,right:20,zIndex:9999,background:"#1c2b39",color:"#fff",padding:"12px 18px",borderRadius:10,fontSize:13,fontWeight:500,fontFamily:"'Inter',sans-serif",display:"flex",alignItems:"center",gap:9,boxShadow:"0 8px 24px rgba(0,0,0,.18)",animation:"fadeUp .25s ease" }}>
          <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="#00b371" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/></svg>
          {toast}
        </div>
      )}

      <div style={{ marginBottom:24 }}>
        <h2 style={{ fontFamily:"'Chakra Petch',sans-serif",fontSize:17,fontWeight:700,color:"#1c2b39",margin:"0 0 4px" }}>Manual Queue</h2>
        <p style={{ fontSize:12,color:"#8695a4",margin:0 }}>Claims with no automatic AI match — manually browse found items and link.</p>
      </div>

      {claims.map(claim=>(
        <div key={claim.id} className="card" style={{ padding:"20px 22px",marginBottom:14 }}>
          <div style={{ display:"flex",alignItems:"flex-start",justifyContent:"space-between",gap:16,flexWrap:"wrap" }}>
            <div style={{ flex:1 }}>
              <div style={{ display:"flex",alignItems:"center",gap:10,marginBottom:10 }}>
                <div style={{ width:36,height:36,borderRadius:"50%",background:"#e8ecf0",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0 }}>
                  <span style={{ fontFamily:"'Chakra Petch',sans-serif",fontWeight:700,fontSize:13,color:"#1c2b39" }}>{claim.name[0]}</span>
                </div>
                <div>
                  <p style={{ fontFamily:"'Chakra Petch',sans-serif",fontSize:13,fontWeight:600,color:"#1c2b39",margin:"0 0 2px" }}>{claim.name}</p>
                  <p style={{ fontSize:11,color:"#8695a4",margin:0 }}>{claim.email}</p>
                </div>
                <span style={{ marginLeft:"auto",fontSize:9,fontWeight:700,background:linked[claim.id]?"#e8f4ef":"#fef3c7",color:linked[claim.id]?"#006341":"#d97706",padding:"3px 10px",borderRadius:999,textTransform:"uppercase" as const,letterSpacing:".04em" }}>
                  {linked[claim.id]?"Linked":"No Match"}
                </span>
              </div>
              <p style={{ fontFamily:"'Inter',sans-serif",fontSize:12,color:"#546478",lineHeight:1.55,margin:"0 0 6px" }}>{claim.description}</p>
              <p style={{ fontSize:10.5,color:"#8695a4" }}>📍 {claim.location} · 🗓 {claim.date} · 📦 {claim.category}</p>
            </div>
          </div>

          {linked[claim.id]?(
            <div style={{ marginTop:12,background:"#e8f4ef",borderRadius:8,padding:"10px 14px",display:"flex",alignItems:"center",gap:9 }}>
              <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="#006341" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/></svg>
              <p style={{ fontFamily:"'Inter',sans-serif",fontSize:12,color:"#006341",fontWeight:600,margin:0 }}>Linked to found item — sent for AI review</p>
            </div>
          ):(
            <div style={{ marginTop:14 }}>
              {activeClaim===claim.id?(
                <div style={{ background:"#f5f6f7",borderRadius:10,padding:"16px" }}>
                  <p style={{ fontFamily:"'Chakra Petch',sans-serif",fontSize:11,fontWeight:700,color:"#8695a4",letterSpacing:".06em",textTransform:"uppercase" as const,margin:"0 0 12px" }}>Select Found Item</p>
                  <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search found items…" className="field-input" style={{ marginBottom:10 }}/>
                  {filteredItems.map(it=>(
                    <div key={it.id} onClick={()=>handleLink(claim.id,it.id)}
                      style={{ display:"flex",alignItems:"center",justifyContent:"space-between",padding:"10px 12px",borderRadius:8,background:"#fff",border:"1.5px solid #dde2e7",marginBottom:6,cursor:"pointer",transition:"border-color .15s" }}
                      onMouseOver={e=>{e.currentTarget.style.borderColor="#006341";e.currentTarget.style.background="#f0f9f4";}}
                      onMouseOut={e=>{e.currentTarget.style.borderColor="#dde2e7";e.currentTarget.style.background="#fff";}}>
                      <div>
                        <p style={{ fontFamily:"'Chakra Petch',sans-serif",fontSize:12,fontWeight:600,color:"#1c2b39",margin:"0 0 2px" }}>{it.description}</p>
                        <p style={{ fontSize:10.5,color:"#8695a4",margin:0 }}>📍 {it.location} · {it.date}</p>
                      </div>
                      <span style={{ fontSize:9.5,background:"#e8f4ef",color:"#006341",padding:"2px 8px",borderRadius:999,fontWeight:600,flexShrink:0 }}>{it.category}</span>
                    </div>
                  ))}
                  <button onClick={()=>setActiveClaim(null)} style={{ background:"transparent",border:"none",color:"#8695a4",fontFamily:"'Inter',sans-serif",fontSize:12,cursor:"pointer",marginTop:6 }}>Cancel</button>
                </div>
              ):(
                <button onClick={()=>setActiveClaim(claim.id)} style={{ padding:"9px 18px",borderRadius:9,border:"1.5px solid #006341",background:"transparent",color:"#006341",fontFamily:"'Inter',sans-serif",fontWeight:600,fontSize:13,cursor:"pointer" }}>
                  Manually Link Found Item
                </button>
              )}
            </div>
          )}
        </div>
      ))}

      {claims.length===0&&(
        <div style={{ textAlign:"center",padding:"72px 24px",background:"#fff",borderRadius:16,border:"1px solid #e8ecf0" }}>
          <p style={{ fontFamily:"'Chakra Petch',sans-serif",fontSize:17,fontWeight:700,color:"#1c2b39",marginBottom:6 }}>Manual queue is clear</p>
          <p style={{ fontFamily:"'Inter',sans-serif",fontSize:13,color:"#8695a4" }}>All lost item reports have been matched or are under AI review.</p>
        </div>
      )}
    </div>
  );
}
