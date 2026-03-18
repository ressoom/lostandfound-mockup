"use client";
import { useState } from "react";

type MatchStatus = "pending_review"|"approved"|"rejected";
interface Match {
  id: string;
  riderName: string;
  riderEmail: string;
  riderDescription: string;
  riderLocation: string;
  foundDescription: string;
  foundLocation: string;
  foundAttributes: Record<string,string>;
  matchScore: number;
  status: MatchStatus;
}

const MOCK_MATCHES: Match[] = [
  {id:"m1",riderName:"Sarah Chen",riderEmail:"sarah.chen@email.com",riderDescription:"Black Sony over-ear headphones with noise cancellation. Lost on the Lakeshore West line last Tuesday around 6pm.",riderLocation:"Oakville GO",foundDescription:"Black Sony WH-1000XM4 Headphones",foundLocation:"Union Station",foundAttributes:{category:"Electronics",color:"Black",brand:"Sony",condition:"Good"},matchScore:.92,status:"pending_review"},
  {id:"m2",riderName:"James Okafor",riderEmail:"j.okafor@email.com",riderDescription:"Blue JanSport backpack with a small Canadian flag patch on the front pocket.",riderLocation:"Union Station",foundDescription:"Blue JanSport Backpack with red zipper",foundLocation:"Oakville GO",foundAttributes:{category:"Bag",color:"Blue",brand:"JanSport",condition:"Fair"},matchScore:.85,status:"pending_review"},
  {id:"m3",riderName:"Priya Sharma",riderEmail:"priya.s@email.com",riderDescription:"Rose gold Apple Watch with a cracked screen protector.",riderLocation:"Richmond Hill GO",foundDescription:"Rose gold Apple Watch Series 8",foundLocation:"Richmond Hill GO",foundAttributes:{category:"Electronics",color:"Rose Gold",brand:"Apple",condition:"Good"},matchScore:.88,status:"approved"},
];

function ScoreBadge({ score }: { score:number }) {
  const pct = Math.round(score*100);
  const color = pct>=90?"#006341":pct>=80?"#d97706":"#dc2626";
  const bg = pct>=90?"#e8f4ef":pct>=80?"#fef3c7":"#fef2f2";
  return (
    <div style={{ display:"flex",alignItems:"center",gap:8 }}>
      <div style={{ width:40,height:40,borderRadius:"50%",background:bg,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0 }}>
        <span style={{ fontFamily:"'Chakra Petch',sans-serif",fontWeight:700,fontSize:12,color }}>{pct}%</span>
      </div>
      <p style={{ fontFamily:"'Inter',sans-serif",fontSize:11,color:"#8695a4",margin:0 }}>Match confidence</p>
    </div>
  );
}

function MatchCard({ match, onAction }: { match:Match; onAction:(id:string,action:MatchStatus)=>void }) {
  const [expanded, setExpanded] = useState(false);
  const [notes, setNotes] = useState("");
  const statusColors: Record<MatchStatus,{bg:string;text:string}> = {
    pending_review:{bg:"#fef3c7",text:"#d97706"},
    approved:{bg:"#e8f4ef",text:"#006341"},
    rejected:{bg:"#fef2f2",text:"#dc2626"},
  };
  const sc = statusColors[match.status];

  return (
    <div className="card" style={{ padding:"20px 22px",marginBottom:14 }}>
      <div style={{ display:"flex",alignItems:"flex-start",justifyContent:"space-between",gap:16,flexWrap:"wrap" }}>
        <div style={{ flex:1,minWidth:200 }}>
          <div style={{ display:"flex",alignItems:"center",gap:10,marginBottom:10 }}>
            <div style={{ width:36,height:36,borderRadius:"50%",background:"#e8ecf0",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0 }}>
              <span style={{ fontFamily:"'Chakra Petch',sans-serif",fontWeight:700,fontSize:13,color:"#1c2b39" }}>{match.riderName[0]}</span>
            </div>
            <div>
              <p style={{ fontFamily:"'Chakra Petch',sans-serif",fontSize:13,fontWeight:600,color:"#1c2b39",margin:"0 0 2px" }}>{match.riderName}</p>
              <p style={{ fontSize:11,color:"#8695a4",margin:0 }}>{match.riderEmail}</p>
            </div>
            <span style={{ marginLeft:"auto",fontSize:10,fontWeight:700,background:sc.bg,color:sc.text,padding:"3px 10px",borderRadius:999,textTransform:"uppercase" as const,letterSpacing:".04em" }}>
              {match.status.replace("_"," ")}
            </span>
          </div>
          <ScoreBadge score={match.matchScore}/>
        </div>
      </div>

      <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:12,marginTop:16 }}>
        <div style={{ background:"#f5f6f7",borderRadius:9,padding:"12px 14px" }}>
          <p style={{ fontFamily:"'Chakra Petch',sans-serif",fontSize:10,fontWeight:700,color:"#8695a4",letterSpacing:".06em",textTransform:"uppercase" as const,margin:"0 0 6px" }}>Rider's Report</p>
          <p style={{ fontFamily:"'Inter',sans-serif",fontSize:12,color:"#1c2b39",lineHeight:1.55,margin:"0 0 8px" }}>{match.riderDescription}</p>
          <p style={{ fontSize:10.5,color:"#8695a4" }}>📍 {match.riderLocation}</p>
        </div>
        <div style={{ background:"#f0f9f4",borderRadius:9,padding:"12px 14px",border:"1px solid #d0ead8" }}>
          <p style={{ fontFamily:"'Chakra Petch',sans-serif",fontSize:10,fontWeight:700,color:"#006341",letterSpacing:".06em",textTransform:"uppercase" as const,margin:"0 0 6px" }}>Found Item</p>
          <p style={{ fontFamily:"'Inter',sans-serif",fontSize:12,color:"#1c2b39",lineHeight:1.55,margin:"0 0 6px" }}>{match.foundDescription}</p>
          <div style={{ display:"flex",flexWrap:"wrap",gap:4,marginBottom:6 }}>
            {Object.entries(match.foundAttributes).map(([k,v])=>(
              <span key={k} style={{ fontSize:9.5,background:"#e8f4ef",color:"#006341",padding:"2px 7px",borderRadius:999,fontWeight:600 }}>{v}</span>
            ))}
          </div>
          <p style={{ fontSize:10.5,color:"#8695a4" }}>📍 {match.foundLocation}</p>
        </div>
      </div>

      {match.status==="pending_review"&&(
        <div style={{ marginTop:14 }}>
          <textarea value={notes} onChange={e=>setNotes(e.target.value)} placeholder="Admin notes (optional)…"
            style={{ width:"100%",padding:"10px 12px",borderRadius:8,border:"1.5px solid #dde2e7",fontFamily:"'Inter',sans-serif",fontSize:12,color:"#1c2b39",outline:"none",resize:"vertical" as const,marginBottom:10 }} rows={2}/>
          <div style={{ display:"flex",gap:10 }}>
            <button onClick={()=>onAction(match.id,"approved")} style={{ flex:1,padding:"10px",borderRadius:9,border:"none",background:"#006341",color:"#fff",fontFamily:"'Inter',sans-serif",fontWeight:700,fontSize:13,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",gap:7 }}>
              <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="#fff" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/></svg>
              Approve & Email Rider
            </button>
            <button onClick={()=>onAction(match.id,"rejected")} style={{ flex:1,padding:"10px",borderRadius:9,border:"1.5px solid #dde2e7",background:"#fff",color:"#dc2626",fontFamily:"'Inter',sans-serif",fontWeight:600,fontSize:13,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",gap:7 }}>
              <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="#dc2626" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"/></svg>
              Reject
            </button>
          </div>
        </div>
      )}

      {match.status==="approved"&&(
        <div style={{ marginTop:12,background:"#e8f4ef",borderRadius:8,padding:"10px 14px",display:"flex",alignItems:"center",gap:9 }}>
          <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="#006341" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/></svg>
          <p style={{ fontFamily:"'Inter',sans-serif",fontSize:12,color:"#006341",fontWeight:600,margin:0 }}>Approved — Email sent to {match.riderEmail}</p>
        </div>
      )}
    </div>
  );
}

export default function ConfirmRequests() {
  const [matches, setMatches] = useState<Match[]>(MOCK_MATCHES);
  const [toast, setToast] = useState("");

  function handleAction(id: string, action: MatchStatus) {
    setMatches(m=>m.map(x=>x.id===id?{...x,status:action}:x));
    setToast(action==="approved"?"Match approved — email sent!":"Match rejected.");
    setTimeout(()=>setToast(""),3000);
  }

  const pending = matches.filter(m=>m.status==="pending_review").length;

  return (
    <div style={{ padding:"28px 28px",maxWidth:900 }}>
      {toast&&(
        <div style={{ position:"fixed",top:20,right:20,zIndex:9999,background:"#1c2b39",color:"#fff",padding:"12px 18px",borderRadius:10,fontSize:13,fontWeight:500,boxShadow:"0 8px 24px rgba(0,0,0,.18)",fontFamily:"'Inter',sans-serif",display:"flex",alignItems:"center",gap:9,animation:"fadeUp .25s ease",maxWidth:340 }}>
          <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="#00b371" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/></svg>
          {toast}
        </div>
      )}

      <div style={{ marginBottom:24 }}>
        <h2 style={{ fontFamily:"'Chakra Petch',sans-serif",fontSize:17,fontWeight:700,color:"#1c2b39",margin:"0 0 4px" }}>AI Match Review</h2>
        <p style={{ fontSize:12,color:"#8695a4",margin:0 }}>
          {pending>0?`${pending} match${pending>1?"es":""} awaiting your review`:"All matches reviewed — queue is clear"}
        </p>
      </div>

      {matches.map(m=><MatchCard key={m.id} match={m} onAction={handleAction}/>)}

      {matches.length===0&&(
        <div style={{ textAlign:"center",padding:"72px 24px",background:"#fff",borderRadius:16,border:"1px solid #e8ecf0" }}>
          <p style={{ fontFamily:"'Chakra Petch',sans-serif",fontSize:17,fontWeight:700,color:"#1c2b39",marginBottom:6 }}>Queue is clear</p>
          <p style={{ fontFamily:"'Inter',sans-serif",fontSize:13,color:"#8695a4" }}>All AI matches have been reviewed.</p>
        </div>
      )}
    </div>
  );
}
