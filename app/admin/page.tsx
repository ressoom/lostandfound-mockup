"use client";
import Link from "next/link";
import NeuralCanvas from "@/components/ui/NeuralCanvas";

function SectionLabel({ children, style }: { children: React.ReactNode; style?: React.CSSProperties }) {
  return <p style={{ fontFamily:"'Chakra Petch',sans-serif",fontSize:10,fontWeight:700,letterSpacing:".1em",textTransform:"uppercase" as const,color:"#8695a4",marginBottom:14,...style }}>{children}</p>;
}

function KpiCard({ label, value, sub, accent, icon, trend }: { label:string; value:string|number; sub?:string; accent:string; icon:React.ReactNode; trend?:{dir:"up"|"down"|"neutral";text:string} }) {
  return (
    <div style={{ background:"#fff",border:"1px solid #e8ecf0",borderRadius:12,padding:"20px 22px",display:"flex",flexDirection:"column",gap:14,boxShadow:"0 1px 4px rgba(0,0,0,.05)" }}>
      <div style={{ display:"flex",alignItems:"flex-start",justifyContent:"space-between" }}>
        <div style={{ width:38,height:38,borderRadius:9,background:accent+"14",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0 }}>{icon}</div>
        {trend&&<span style={{ fontSize:10,fontWeight:700,letterSpacing:".04em",color:trend.dir==="up"?"#006341":trend.dir==="down"?"#dc2626":"#8695a4",background:trend.dir==="up"?"#e8f4ef":trend.dir==="down"?"#fef2f2":"#f1f4f7",padding:"3px 8px",borderRadius:999 }}>{trend.text}</span>}
      </div>
      <div>
        <p style={{ fontFamily:"'Chakra Petch',sans-serif",fontSize:28,fontWeight:700,color:"#1c2b39",margin:"0 0 3px",letterSpacing:"-.03em",lineHeight:1 }}>{value}</p>
        <p style={{ fontSize:12,fontWeight:500,color:"#546478",margin:0 }}>{label}</p>
        {sub&&<p style={{ fontSize:11,color:"#8695a4",marginTop:3 }}>{sub}</p>}
      </div>
    </div>
  );
}

function ActionTile({ to, label, desc, accent, icon }: { to:string; label:string; desc:string; accent:string; icon:React.ReactNode }) {
  return (
    <Link href={to} style={{ textDecoration:"none" }}>
      <div style={{ background:"#fff",border:"1.5px solid #e8ecf0",borderRadius:12,padding:"18px 18px 16px",transition:"all .18s",cursor:"pointer",height:"100%",display:"flex",flexDirection:"column",gap:10 }}
        onMouseOver={e=>{const el=e.currentTarget;el.style.borderColor=accent;el.style.transform="translateY(-2px)";el.style.boxShadow=`0 8px 22px ${accent}1a`;}}
        onMouseOut={e=>{const el=e.currentTarget;el.style.borderColor="#e8ecf0";el.style.transform="none";el.style.boxShadow="none";}}>
        <div style={{ width:36,height:36,borderRadius:8,background:accent+"12",display:"flex",alignItems:"center",justifyContent:"center" }}>{icon}</div>
        <div style={{ flex:1 }}>
          <p style={{ fontFamily:"'Chakra Petch',sans-serif",fontSize:13,fontWeight:600,color:"#1c2b39",margin:"0 0 5px" }}>{label}</p>
          <p style={{ fontSize:12,color:"#546478",lineHeight:1.5,margin:0 }}>{desc}</p>
        </div>
        <span style={{ fontSize:11,fontWeight:600,color:accent,display:"flex",alignItems:"center",gap:4 }}>
          Open <svg width="12" height="12" fill="none" viewBox="0 0 24 24" stroke={accent} strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round"><path d="M9 18l6-6-6-6"/></svg>
        </span>
      </div>
    </Link>
  );
}

const PIPE = [
  {label:"Item Logged",   desc:"Admin uploads photo"},
  {label:"Vision AI",     desc:"OpenAI extracts attributes"},
  {label:"Vector Stored", desc:"Pinecone embedding saved"},
  {label:"Rider Reports", desc:"Lost item submitted"},
  {label:"Auto Match",    desc:"Similarity ≥80% → review"},
  {label:"Email Sent",    desc:"Rider notified w/ pickup info"},
];

const ACTIVITY = [
  {title:"Black Logitech Mouse",    sub:"Oakville GO · Today 14:30",     tag:"Uploaded", tc:"#006341",bg:"#e8f4ef"},
  {title:"Blue JanSport Backpack",  sub:"Union Station · Today 13:10",   tag:"Matched",  tc:"#d97706",bg:"#fef3c7"},
  {title:"iPhone 12 Blue",          sub:"Kipling · Yesterday 17:00",     tag:"Approved", tc:"#2563eb",bg:"#eff6ff"},
  {title:"Samsung Earbuds Case",    sub:"Bramalea GO · Yesterday 09:45", tag:"Pending",  tc:"#7c3aed",bg:"#f5f3ff"},
];

export default function AdminDashboard() {
  return (
    <div style={{ minHeight:"100%",background:"#f5f6f7" }}>
      {/* Hero */}
      <div style={{ position:"relative",height:200,overflow:"hidden",background:"#1c2b39" }}>
        <NeuralCanvas bgColor={0x1c2b39} nodeColor={0x005535} hubColor={0x00a870} edgeColor={0x003d26} edgeDist={5.5} nodeCount={50} />
        <div style={{ position:"absolute",inset:0,display:"flex",flexDirection:"column",justifyContent:"center",padding:"0 32px",background:"linear-gradient(90deg,rgba(28,43,57,.75) 0%,rgba(28,43,57,.1) 100%)" }}>
          <p style={{ fontFamily:"'Chakra Petch',sans-serif",fontSize:22,fontWeight:700,color:"#fff",letterSpacing:"-.02em",margin:"0 0 6px" }}>Lost & Found Portal</p>
          <p style={{ fontSize:13,color:"rgba(255,255,255,.6)",margin:0 }}>Lost and Found Canada — AI-assisted item recovery system</p>
          <div style={{ display:"flex",gap:10,marginTop:16 }}>
            <Link href="/admin/upload" style={{ display:"inline-flex",alignItems:"center",gap:7,padding:"8px 16px",borderRadius:8,background:"#006341",color:"#fff",textDecoration:"none",fontSize:12,fontWeight:600,fontFamily:"'Inter',sans-serif" }}>
              <svg width="13" height="13" fill="none" viewBox="0 0 24 24" stroke="#fff" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M17 8l-5-5-5 5M12 3v12"/></svg>
              Log Found Item
            </Link>
            <Link href="/admin/confirm" style={{ display:"inline-flex",alignItems:"center",gap:7,padding:"8px 16px",borderRadius:8,background:"rgba(255,255,255,.12)",color:"#fff",textDecoration:"none",fontSize:12,fontWeight:600,fontFamily:"'Inter',sans-serif",border:"1px solid rgba(255,255,255,.2)" }}>
              Review Matches
            </Link>
          </div>
        </div>
      </div>

      <div style={{ padding:"24px 28px",maxWidth:1100 }}>
        {/* KPIs */}
        <div style={{ display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(200px,1fr))",gap:14,marginBottom:28 }}>
          <KpiCard label="Items in Database" value={24} sub="Found & logged items" accent="#006341" trend={{dir:"neutral",text:"LIVE"}}
            icon={<svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="#006341" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z"/></svg>}/>
          <KpiCard label="Pending AI Reviews" value={3} sub="Matches awaiting approval" accent="#d97706" trend={{dir:"down",text:"3 pending"}}
            icon={<svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="#d97706" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/></svg>}/>
          <KpiCard label="Email Notifications" value="Active" sub="Sent on match approval" accent="#2563eb" trend={{dir:"neutral",text:"LIVE"}}
            icon={<svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="#2563eb" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>}/>
          <KpiCard label="AI Pipeline" value="Online" sub="Pinecone + OpenAI Vision" accent="#7c3aed" trend={{dir:"up",text:"ACTIVE"}}
            icon={<svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="#7c3aed" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/></svg>}/>
        </div>

        {/* Quick Actions */}
        <div style={{ marginBottom:28 }}>
          <SectionLabel>Quick Actions</SectionLabel>
          <div style={{ display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(180px,1fr))",gap:12 }}>
            <ActionTile to="/admin/upload" label="Log Found Item" desc="Upload a photo and let AI extract item attributes automatically." accent="#006341"
              icon={<svg width="17" height="17" fill="none" viewBox="0 0 24 24" stroke="#006341" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M17 8l-5-5-5 5M12 3v12"/></svg>}/>
            <ActionTile to="/admin/confirm" label="Review AI Matches" desc="Approve or reject AI-suggested matches. Approved matches email the rider." accent="#d97706"
              icon={<svg width="17" height="17" fill="none" viewBox="0 0 24 24" stroke="#d97706" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/></svg>}/>
            <ActionTile to="/admin/found-items" label="Browse All Items" desc="View every found item in the system with filters and full-text search." accent="#2563eb"
              icon={<svg width="17" height="17" fill="none" viewBox="0 0 24 24" stroke="#2563eb" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z"/></svg>}/>
          </div>
        </div>

        {/* Pipeline */}
        <div style={{ background:"#fff",border:"1px solid #e8ecf0",borderRadius:12,padding:"22px 24px",marginBottom:22 }}>
          <SectionLabel style={{ marginBottom:18 }}>AI Pipeline</SectionLabel>
          <div style={{ display:"grid",gridTemplateColumns:"repeat(6,1fr)",gap:0,position:"relative" }}>
            {PIPE.map((s,i)=>(
              <div key={i} style={{ display:"flex",alignItems:"flex-start",gap:0,position:"relative" }}>
                <div style={{ display:"flex",flexDirection:"column",alignItems:"center",flexShrink:0 }}>
                  <div style={{ width:36,height:36,borderRadius:"50%",background:"#006341",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,zIndex:1 }}>
                    <span style={{ fontFamily:"'Chakra Petch',sans-serif",fontSize:11,fontWeight:700,color:"#fff" }}>{i+1}</span>
                  </div>
                  {i<PIPE.length-1&&<div style={{ position:"absolute",top:18,left:17,width:"calc(100% - 14px)",height:1.5,background:"linear-gradient(90deg,#006341 0%,#00634120 100%)",zIndex:0 }}/>}
                </div>
                <div style={{ paddingLeft:10,paddingRight:8,paddingBottom:8 }}>
                  <p style={{ fontFamily:"'Chakra Petch',sans-serif",fontSize:11,fontWeight:700,color:"#1c2b39",margin:"0 0 3px",letterSpacing:".01em" }}>{i+1}. {s.label}</p>
                  <p style={{ fontSize:10.5,color:"#546478",lineHeight:1.45,margin:0 }}>{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div style={{ background:"#fff",border:"1px solid #e8ecf0",borderRadius:12,padding:"20px 22px" }}>
          <div style={{ display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:12 }}>
            <SectionLabel style={{ marginBottom:0 }}>Recent Activity</SectionLabel>
            <Link href="/admin/found-items" style={{ fontSize:12,color:"#006341",fontWeight:600,textDecoration:"none" }}>View all</Link>
          </div>
          {ACTIVITY.map(r=>(
            <div key={r.title} style={{ display:"flex",alignItems:"center",justifyContent:"space-between",padding:"11px 0",borderBottom:"1px solid #f1f4f7" }}>
              <div>
                <p style={{ fontSize:13,fontWeight:600,color:"#1c2b39",margin:"0 0 2px" }}>{r.title}</p>
                <p style={{ fontSize:11,color:"#8695a4",margin:0 }}>{r.sub}</p>
              </div>
              <span style={{ fontSize:10,fontWeight:700,letterSpacing:".04em",background:r.bg,color:r.tc,borderRadius:999,padding:"3px 10px",flexShrink:0 }}>{r.tag}</span>
            </div>
          ))}
          <p style={{ fontSize:11,color:"#8695a4",marginTop:14,fontStyle:"italic" }}>Live feed connects to MongoDB change streams.</p>
        </div>
      </div>
    </div>
  );
}
