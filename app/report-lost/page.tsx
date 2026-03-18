"use client";
import { useState } from "react";
import AppShell from "@/components/ui/AppShell";

const GO_STATIONS = ["Aldershot GO","Appleby GO","Aurora GO","Barrie South GO","Bloor GO","Bramalea GO","Brampton GO","Burlington GO","Clarkson GO","Cooksville GO","Danforth GO","Eglinton GO","Exhibition GO","Georgetown GO","Guelph Central GO","Hamilton GO","King City GO","Kipling GO","Kitchener GO","Lisgar GO","Long Branch GO","Maple GO","Markham GO","Meadowvale GO","Milliken GO","Mimico GO","Mount Pleasant GO","Newmarket GO","Oakville GO","Oriole GO","Oshawa GO","Port Credit GO","Richmond Hill GO","Rouge Hill GO","Rutherford GO","Scarborough GO","Stouffville GO","Streetsville GO","Union Station","Unionville GO","Whitby GO","Other / Not listed"];
const CATS = [
  {value:"electronics",label:"Electronics",hint:"Phone, laptop, tablet, earbuds…"},
  {value:"clothing",   label:"Clothing",   hint:"Jacket, bag, hat, shoes…"},
  {value:"accessory",  label:"Accessory",  hint:"Wallet, keys, glasses, jewellery…"},
  {value:"document",   label:"Documents",  hint:"ID, passport, transit card…"},
  {value:"other",      label:"Other",      hint:"Anything that doesn't fit above"},
];

type Phase = "what"|"where"|"contact"|"chat"|"done";

const T = { green:"#006341", navy:"#0c1825", navyL:"#162231", teal:"#00d492", border:"rgba(255,255,255,.1)", muted:"rgba(255,255,255,.45)" };

function StepBar({ current }: { current: Phase }) {
  const steps = [{k:"what",l:"What"},{k:"where",l:"Where & When"},{k:"contact",l:"Contact"}];
  const display = ["chat","done"].includes(current) ? "contact" : current;
  const idx = steps.findIndex(s=>s.k===display);
  return (
    <div style={{ display:"flex",alignItems:"center",marginBottom:32 }}>
      {steps.map((s,i)=>(
        <div key={s.k} style={{ display:"flex",alignItems:"center",flex:i<steps.length-1?1:"none" }}>
          <div style={{ display:"flex",flexDirection:"column",alignItems:"center" }}>
            <div style={{ width:30,height:30,borderRadius:"50%",background:i<=idx?"#006341":"#eef0f2",display:"flex",alignItems:"center",justifyContent:"center",transition:"background .2s" }}>
              {i<idx
                ? <svg width="13" height="13" fill="none" viewBox="0 0 24 24" stroke="#fff" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/></svg>
                : <span style={{ fontFamily:"'Chakra Petch',sans-serif",fontWeight:700,fontSize:12,color:i<=idx?"#fff":"#8695a4" }}>{i+1}</span>
              }
            </div>
            <span style={{ fontFamily:"'Inter',sans-serif",fontWeight:600,fontSize:11,marginTop:5,whiteSpace:"nowrap",color:i<=idx?"#1c2b39":"#8695a4" }}>{s.l}</span>
          </div>
          {i<steps.length-1&&<div style={{ flex:1,height:2,margin:"0 8px",marginBottom:18,background:i<idx?"#006341":"#dde2e7",transition:"background .2s" }}/>}
        </div>
      ))}
    </div>
  );
}

/* AI Chat Mockup */
function AIChatMockup({ name, onDone }: { name:string; onDone:()=>void }) {
  const [phase, setPhase] = useState<"intro"|"chatting"|"verified">("intro");
  const [input, setInput] = useState("");
  const [msgs, setMsgs] = useState<{role:"assistant"|"user";text:string}[]>([]);
  const [step, setStep] = useState(0);

  const questions = [
    "Can you describe the colour and approximate size of the item?",
    "Do you remember the brand or any distinctive markings?",
    "Which train line or route were you on when you lost it?",
    "Roughly what time did you leave the station?",
    "Is there anything unique inside the item (name tag, stickers, etc.)?",
  ];

  function startChat() {
    setPhase("chatting");
    setMsgs([{role:"assistant",text:`Hi ${name||"there"}! I found a potential match for your item. I need to ask you a few quick questions to verify it's yours.`}]);
    setTimeout(()=>setMsgs(m=>[...m,{role:"assistant",text:questions[0]}]),800);
  }

  function sendMsg() {
    if(!input.trim()) return;
    const userMsg = input.trim();
    setInput("");
    setMsgs(m=>[...m,{role:"user",text:userMsg}]);
    const next = step+1;
    setStep(next);
    if(next>=questions.length){
      setTimeout(()=>setPhase("verified"),600);
    } else {
      setTimeout(()=>setMsgs(m=>[...m,{role:"assistant",text:questions[next]}]),700);
    }
  }

  if(phase==="intro") return (
    <div style={{ background:T.navy,borderRadius:16,overflow:"hidden",maxWidth:480,margin:"0 auto",boxShadow:"0 24px 60px rgba(0,0,0,.35)" }}>
      <div style={{ background:"#0a1520",padding:"14px 18px",borderBottom:`1px solid ${T.border}`,display:"flex",alignItems:"center",gap:10 }}>
        <div style={{ width:28,height:28,borderRadius:7,background:T.green,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0 }}>
          <span style={{ fontFamily:"'Chakra Petch',sans-serif",fontWeight:700,fontSize:9,color:"#fff" }}>GO</span>
        </div>
        <p style={{ fontFamily:"'Chakra Petch',sans-serif",fontSize:12,fontWeight:700,color:"#fff",margin:0 }}>Lost and Found Canada — Assistant</p>
        <div style={{ marginLeft:"auto",display:"flex",gap:5 }}>
          {[0,1,2].map(i=><div key={i} style={{ width:7,height:7,borderRadius:"50%",background:T.teal,animation:`bounce 1.2s ease-in-out ${i*.2}s infinite` }}/>)}
        </div>
      </div>
      <div style={{ padding:"28px 24px",display:"flex",flexDirection:"column",alignItems:"center",gap:16 }}>
        <div style={{ width:64,height:64,borderRadius:"50%",background:"linear-gradient(135deg,#006341,#00d492)",display:"flex",alignItems:"center",justifyContent:"center" }}>
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth={2.5}><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
        </div>
        <div style={{ textAlign:"center" }}>
          <p style={{ fontFamily:"'Chakra Petch',sans-serif",fontSize:16,fontWeight:700,color:"#fff",margin:"0 0 8px" }}>We found a potential match!</p>
          <p style={{ fontFamily:"'Inter',sans-serif",fontSize:13,color:T.muted,lineHeight:1.6,maxWidth:300 }}>Our AI has found an item that might be yours. Answer a few questions so our staff can verify the match.</p>
        </div>
        <div style={{ background:"rgba(0,212,146,.08)",border:"1px solid rgba(0,212,146,.2)",borderRadius:10,padding:"12px 20px",display:"flex",alignItems:"center",gap:10 }}>
          <span style={{ fontFamily:"'Chakra Petch',sans-serif",fontWeight:700,fontSize:18,color:T.teal }}>87%</span>
          <p style={{ fontFamily:"'Inter',sans-serif",fontSize:12,color:T.muted }}>Match confidence</p>
        </div>
        <button onClick={startChat} style={{ background:T.green,color:"#fff",border:"none",borderRadius:10,padding:"12px 28px",fontFamily:"'Inter',sans-serif",fontWeight:700,fontSize:14,cursor:"pointer",width:"100%" }}>
          Start Verification
        </button>
      </div>
    </div>
  );

  if(phase==="verified") return (
    <div style={{ background:T.navy,borderRadius:16,overflow:"hidden",maxWidth:480,margin:"0 auto",boxShadow:"0 24px 60px rgba(0,0,0,.35)" }}>
      <div style={{ background:"#0a1520",padding:"14px 18px",borderBottom:`1px solid ${T.border}`,display:"flex",alignItems:"center",gap:10 }}>
        <div style={{ width:28,height:28,borderRadius:7,background:T.green,display:"flex",alignItems:"center",justifyContent:"center" }}>
          <span style={{ fontFamily:"'Chakra Petch',sans-serif",fontWeight:700,fontSize:9,color:"#fff" }}>GO</span>
        </div>
        <p style={{ fontFamily:"'Chakra Petch',sans-serif",fontSize:12,fontWeight:700,color:"#fff",margin:0 }}>Lost and Found Canada — Assistant</p>
      </div>
      <div style={{ padding:"28px 24px",display:"flex",flexDirection:"column",alignItems:"center",gap:16 }}>
        <div style={{ width:76,height:76,borderRadius:"50%",background:"linear-gradient(135deg,#006341,#00d492)",display:"flex",alignItems:"center",justifyContent:"center",animation:"pulse 2.5s ease infinite" }}>
          <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth={2.8}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/></svg>
        </div>
        <p style={{ fontFamily:"'Chakra Petch',sans-serif",fontWeight:700,fontSize:17,color:"#fff",letterSpacing:".02em",textAlign:"center" }}>Verification Complete!</p>
        <p style={{ fontFamily:"'Inter',sans-serif",fontSize:13,color:T.muted,textAlign:"center",maxWidth:300,lineHeight:1.6 }}>Your answers have been recorded. Our staff will confirm your match within 48 hours.</p>
        <div style={{ background:"rgba(0,212,146,.08)",border:"1px solid rgba(0,212,146,.25)",borderRadius:10,padding:"10px 20px",display:"flex",alignItems:"center",gap:12 }}>
          <div style={{ width:40,height:40,background:"rgba(0,212,146,.12)",borderRadius:"50%",display:"flex",alignItems:"center",justifyContent:"center" }}>
            <span style={{ fontFamily:"'Chakra Petch',sans-serif",fontWeight:700,fontSize:13,color:T.teal }}>87%</span>
          </div>
          <p style={{ fontFamily:"'Inter',sans-serif",fontSize:12,color:T.muted }}>Match confidence achieved</p>
        </div>
        <div style={{ background:"rgba(255,255,255,.04)",border:`1px solid ${T.border}`,borderRadius:12,padding:"14px 20px",width:"100%" }}>
          <p style={{ fontFamily:"'Chakra Petch',sans-serif",fontSize:10,color:T.muted,letterSpacing:".08em",textTransform:"uppercase" as const,marginBottom:8 }}>Pending Ticket Reference</p>
          <code style={{ fontFamily:"'Chakra Petch',sans-serif",fontSize:12,fontWeight:700,color:T.teal,letterSpacing:".04em" }}>GOT-20250318-A7B2C3D4-CA</code>
          <p style={{ fontFamily:"'Inter',sans-serif",fontSize:11,color:"rgba(255,255,255,.3)",marginTop:8 }}>Save this — you will need it when collecting your item.</p>
        </div>
        {[
          "Staff reviews the AI-matched item within 2 business days",
          "You will receive a call or email confirming the match",
          "Bring valid government photo ID + this reference to collect",
        ].map((t,i)=>(
          <div key={i} style={{ display:"flex",gap:10,width:"100%",alignItems:"flex-start" }}>
            <div style={{ width:22,height:22,borderRadius:"50%",background:T.green,flexShrink:0,display:"flex",alignItems:"center",justifyContent:"center" }}>
              <span style={{ fontFamily:"'Chakra Petch',sans-serif",fontWeight:700,fontSize:10,color:"#fff" }}>{i+1}</span>
            </div>
            <p style={{ fontFamily:"'Inter',sans-serif",fontSize:12,color:T.muted,lineHeight:1.55,margin:0 }}>{t}</p>
          </div>
        ))}
        <button onClick={onDone} style={{ background:T.green,color:"#fff",border:"none",borderRadius:10,padding:"12px 28px",fontFamily:"'Inter',sans-serif",fontWeight:700,fontSize:14,cursor:"pointer",width:"100%",marginTop:8 }}>Done</button>
      </div>
    </div>
  );

  return (
    <div style={{ background:T.navy,borderRadius:16,overflow:"hidden",maxWidth:480,margin:"0 auto",boxShadow:"0 24px 60px rgba(0,0,0,.35)",display:"flex",flexDirection:"column",height:520 }}>
      <div style={{ background:"#0a1520",padding:"14px 18px",borderBottom:`1px solid ${T.border}`,display:"flex",alignItems:"center",gap:10,flexShrink:0 }}>
        <div style={{ width:28,height:28,borderRadius:7,background:T.green,display:"flex",alignItems:"center",justifyContent:"center" }}>
          <span style={{ fontFamily:"'Chakra Petch',sans-serif",fontWeight:700,fontSize:9,color:"#fff" }}>GO</span>
        </div>
        <p style={{ fontFamily:"'Chakra Petch',sans-serif",fontSize:12,fontWeight:700,color:"#fff",margin:0 }}>Lost and Found Canada — Assistant</p>
      </div>
      <div style={{ padding:"10px 16px 8px",borderBottom:`1px solid ${T.border}`,display:"flex",alignItems:"center",gap:8,flexShrink:0 }}>
        <span style={{ fontFamily:"'Inter',sans-serif",fontSize:10,color:T.muted,flex:1 }}>Verifying your item</span>
        <div style={{ display:"flex",gap:5 }}>
          {Array.from({length:questions.length}).map((_,i)=>(
            <div key={i} style={{ width:i<step?18:7,height:7,borderRadius:4,background:i<step?T.teal:"rgba(255,255,255,.15)",transition:"all .4s ease" }}/>
          ))}
        </div>
      </div>
      <div style={{ flex:1,overflowY:"auto",padding:"12px 16px",display:"flex",flexDirection:"column",gap:10 }}>
        {msgs.map((m,i)=>(
          <div key={i} style={{ display:"flex",gap:8,justifyContent:m.role==="user"?"flex-end":"flex-start",animation:"msgIn .3s ease" }}>
            {m.role==="assistant"&&<div style={{ width:26,height:26,borderRadius:6,background:T.green,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0 }}><span style={{ fontFamily:"'Chakra Petch',sans-serif",fontWeight:700,fontSize:9,color:"#fff" }}>GO</span></div>}
            <div style={{ maxWidth:"75%",padding:"9px 13px",borderRadius:m.role==="user"?"12px 12px 4px 12px":"12px 12px 12px 4px",background:m.role==="user"?T.green:"rgba(255,255,255,.08)",fontFamily:"'Inter',sans-serif",fontSize:13,color:"#fff",lineHeight:1.5 }}>{m.text}</div>
          </div>
        ))}
      </div>
      <div style={{ padding:"12px 16px",borderTop:`1px solid ${T.border}`,flexShrink:0,display:"flex",gap:8 }}>
        <input value={input} onChange={e=>setInput(e.target.value)} onKeyDown={e=>e.key==="Enter"&&sendMsg()} placeholder="Type your answer…"
          style={{ flex:1,background:"rgba(255,255,255,.07)",border:`1px solid ${T.border}`,borderRadius:8,padding:"10px 13px",fontFamily:"'Inter',sans-serif",fontSize:13,color:"#fff",outline:"none" }}/>
        <button onClick={sendMsg} style={{ background:T.green,border:"none",borderRadius:8,width:38,height:38,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0 }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round"><path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z"/></svg>
        </button>
      </div>
    </div>
  );
}

export default function ReportLost() {
  const [phase, setPhase] = useState<Phase>("what");
  const [category, setCategory] = useState("");
  const [desc, setDesc] = useState("");
  const [station, setStation] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  if(phase==="chat") return (
    <div style={{ minHeight:"100vh",background:"linear-gradient(135deg,#0c1825 0%,#0f3d2a 100%)",display:"flex",alignItems:"center",justifyContent:"center",padding:"2rem" }}>
      <AIChatMockup name={name} onDone={()=>setPhase("done")} />
    </div>
  );

  if(phase==="done") return (
    <AppShell>
      <div style={{ maxWidth:540,margin:"64px auto",padding:"0 1.5rem",textAlign:"center" }}>
        <div style={{ width:72,height:72,borderRadius:"50%",background:"#e8f4ef",display:"flex",alignItems:"center",justifyContent:"center",margin:"0 auto 24px" }}>
          <svg width="32" height="32" fill="none" viewBox="0 0 24 24" stroke="#006341" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/></svg>
        </div>
        <h1 style={{ fontFamily:"'Chakra Petch',sans-serif",fontSize:24,fontWeight:700,color:"#1c2b39",marginBottom:12 }}>Report Submitted</h1>
        <p style={{ fontFamily:"'Inter',sans-serif",fontSize:15,color:"#546478",lineHeight:1.7 }}>We will contact you at {email} if we find a match. Check your inbox within 48 hours.</p>
      </div>
    </AppShell>
  );

  return (
    <AppShell>
      <div style={{ background:"#fff",borderBottom:"1px solid #e8ecf0",padding:"28px 0 0" }}>
        <div style={{ maxWidth:680,margin:"0 auto",padding:"0 1.5rem" }}>
          <h1 style={{ fontFamily:"'Chakra Petch',sans-serif",fontSize:22,fontWeight:700,color:"#1c2b39",marginBottom:6 }}>Report a Lost Item</h1>
          <p style={{ fontFamily:"'Inter',sans-serif",fontSize:14,color:"#546478",marginBottom:28 }}>Fill out the form below. No account needed — free to use.</p>
          <StepBar current={phase} />
        </div>
      </div>

      <div style={{ maxWidth:680,margin:"0 auto",padding:"40px 1.5rem" }}>
        <div className="card" style={{ padding:"32px 36px" }}>

          {phase==="what"&&(
            <div style={{ display:"flex",flexDirection:"column",gap:20 }}>
              <div>
                <label className="field-label">Item Category *</label>
                <div style={{ display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(130px,1fr))",gap:8,marginTop:8 }}>
                  {CATS.map(c=>(
                    <button key={c.value} onClick={()=>setCategory(c.value)}
                      style={{ padding:"12px 10px",borderRadius:10,border:`1.5px solid ${category===c.value?"#006341":"#dde2e7"}`,background:category===c.value?"#e8f4ef":"#fff",cursor:"pointer",textAlign:"left",transition:"all .15s" }}>
                      <p style={{ fontFamily:"'Chakra Petch',sans-serif",fontSize:12,fontWeight:700,color:category===c.value?"#006341":"#1c2b39",margin:"0 0 3px" }}>{c.label}</p>
                      <p style={{ fontFamily:"'Inter',sans-serif",fontSize:10.5,color:"#8695a4",margin:0 }}>{c.hint}</p>
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="field-label">Describe the item *</label>
                <textarea value={desc} onChange={e=>setDesc(e.target.value)} rows={4} placeholder="e.g. Black Sony WH-1000XM4 headphones with a red sticker on the left ear cup…"
                  className="field-input" style={{ resize:"vertical" as const }}/>
              </div>
              <button onClick={()=>category&&desc?setPhase("where"):null}
                style={{ background:"#006341",color:"#fff",border:"none",borderRadius:10,padding:"12px 24px",fontFamily:"'Inter',sans-serif",fontWeight:700,fontSize:14,cursor:category&&desc?"pointer":"not-allowed",opacity:category&&desc?1:.5,alignSelf:"flex-end" }}>
                Next: Where & When →
              </button>
            </div>
          )}

          {phase==="where"&&(
            <div style={{ display:"flex",flexDirection:"column",gap:20 }}>
              <div>
                <label className="field-label">Station / Location *</label>
                <select value={station} onChange={e=>setStation(e.target.value)} className="field-input">
                  <option value="">Select a GO station…</option>
                  {GO_STATIONS.map(s=><option key={s} value={s}>{s}</option>)}
                </select>
              </div>
              <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:16 }}>
                <div>
                  <label className="field-label">Date lost *</label>
                  <input type="date" value={date} onChange={e=>setDate(e.target.value)} className="field-input"/>
                </div>
                <div>
                  <label className="field-label">Approximate time</label>
                  <input type="time" value={time} onChange={e=>setTime(e.target.value)} className="field-input"/>
                </div>
              </div>
              <div style={{ display:"flex",gap:12,justifyContent:"space-between" }}>
                <button onClick={()=>setPhase("what")} style={{ background:"transparent",color:"#546478",border:"1.5px solid #dde2e7",borderRadius:10,padding:"12px 24px",fontFamily:"'Inter',sans-serif",fontWeight:600,fontSize:14,cursor:"pointer" }}>← Back</button>
                <button onClick={()=>station&&date?setPhase("contact"):null}
                  style={{ background:"#006341",color:"#fff",border:"none",borderRadius:10,padding:"12px 24px",fontFamily:"'Inter',sans-serif",fontWeight:700,fontSize:14,cursor:station&&date?"pointer":"not-allowed",opacity:station&&date?1:.5 }}>
                  Next: Contact →
                </button>
              </div>
            </div>
          )}

          {phase==="contact"&&(
            <div style={{ display:"flex",flexDirection:"column",gap:20 }}>
              <div>
                <label className="field-label">Full Name *</label>
                <input value={name} onChange={e=>setName(e.target.value)} placeholder="Jane Smith" className="field-input"/>
              </div>
              <div>
                <label className="field-label">Email Address *</label>
                <input type="email" value={email} onChange={e=>setEmail(e.target.value)} placeholder="you@email.com" className="field-input"/>
              </div>
              <div>
                <label className="field-label">Phone Number</label>
                <input type="tel" value={phone} onChange={e=>setPhone(e.target.value)} placeholder="416-555-0123" className="field-input"/>
              </div>
              <div style={{ background:"#f5f6f7",borderRadius:10,padding:"14px 16px",fontSize:12,color:"#546478",fontFamily:"'Inter',sans-serif",lineHeight:1.6 }}>
                🔒 Your contact information is encrypted and only used to notify you of a match. We never share your data.
              </div>
              <div style={{ display:"flex",gap:12,justifyContent:"space-between" }}>
                <button onClick={()=>setPhase("where")} style={{ background:"transparent",color:"#546478",border:"1.5px solid #dde2e7",borderRadius:10,padding:"12px 24px",fontFamily:"'Inter',sans-serif",fontWeight:600,fontSize:14,cursor:"pointer" }}>← Back</button>
                <button onClick={()=>name&&email?setPhase("chat"):null}
                  style={{ background:"#006341",color:"#fff",border:"none",borderRadius:10,padding:"12px 24px",fontFamily:"'Inter',sans-serif",fontWeight:700,fontSize:14,cursor:name&&email?"pointer":"not-allowed",opacity:name&&email?1:.5 }}>
                  Submit Report →
                </button>
              </div>
            </div>
          )}

        </div>
      </div>
    </AppShell>
  );
}
