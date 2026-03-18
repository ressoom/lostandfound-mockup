"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const GREEN = "#006341";
const NAVY  = "#1c2b39";
const WHITE = "#ffffff";

function GoMark({ size = 38 }: { size?: number }) {
  return (
    <div style={{ width:size, height:size, borderRadius:Math.round(size*.22), background:GREEN,
      display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
      <span style={{ fontFamily:"'Chakra Petch',sans-serif", fontWeight:800, fontSize:size*.32,
        color:WHITE, letterSpacing:"-.03em", lineHeight:1 }}>L&F</span>
    </div>
  );
}

function Header() {
  const path = usePathname();
  const isReport = path === "/report-lost";
  return (
    <header style={{ background:WHITE, borderBottom:`2px solid ${GREEN}`, position:"sticky", top:0, zIndex:50 }}>
      <div style={{ background:NAVY, padding:"5px 0", fontSize:11, color:"rgba(255,255,255,.6)",
        fontFamily:"'Inter',sans-serif", textAlign:"center", letterSpacing:".02em" }}>
        Lost and Found Canada · National Transit Recovery Service
      </div>
      <div style={{ maxWidth:1200, margin:"0 auto", padding:"0 1.5rem", height:64,
        display:"flex", alignItems:"center", justifyContent:"space-between" }}>
        <Link href="/" style={{ display:"flex", alignItems:"center", gap:12, textDecoration:"none" }}>
          <GoMark />
          <div style={{ lineHeight:1.2 }}>
            <div style={{ fontFamily:"'Chakra Petch',sans-serif", fontWeight:700, fontSize:16, color:NAVY, letterSpacing:"-.01em" }}>
              Lost &amp; Found Canada
            </div>
            <div style={{ fontFamily:"'Inter',sans-serif", fontSize:10, color:"#8695a4", fontWeight:500,
              letterSpacing:".07em", textTransform:"uppercase" }}>
              National Service
            </div>
          </div>
        </Link>
        <nav style={{ display:"flex", alignItems:"center", gap:4 }}>
          <Link href="/report-lost" style={{
            fontFamily:"'Inter',sans-serif", fontWeight:600, fontSize:13,
            color: isReport ? WHITE : NAVY,
            padding:"8px 18px", borderRadius:8, textDecoration:"none",
            background: isReport ? GREEN : "transparent",
            border:`1.5px solid ${isReport ? GREEN : "transparent"}`,
            transition:"background .15s, color .15s",
          }}>
            Report Lost Item
          </Link>
          <Link href="/admin/login" style={{ fontFamily:"'Inter',sans-serif", fontWeight:500, fontSize:12,
            color:"#8695a4", padding:"8px 12px", borderRadius:8, textDecoration:"none" }}>
            Staff Login
          </Link>
        </nav>
      </div>
    </header>
  );
}

function Footer() {
  const YEAR = new Date().getFullYear();
  return (
    <footer style={{ background:NAVY, color:WHITE }}>
      <div style={{ maxWidth:1200, margin:"0 auto", padding:"52px 1.5rem 40px",
        display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(200px,1fr))", gap:"40px 60px" }}>
        <div>
          <div style={{ display:"flex", alignItems:"center", gap:12, marginBottom:16 }}>
            <GoMark size={40} />
            <div>
              <div style={{ fontFamily:"'Chakra Petch',sans-serif", fontWeight:700, fontSize:15, color:WHITE, lineHeight:1.2 }}>
                Lost &amp; Found Canada
              </div>
              <div style={{ fontFamily:"'Inter',sans-serif", fontSize:10, color:"rgba(255,255,255,.4)", letterSpacing:".07em", textTransform:"uppercase" }}>
                National Service
              </div>
            </div>
          </div>
          <p style={{ fontFamily:"'Inter',sans-serif", fontSize:12, color:"rgba(255,255,255,.45)", lineHeight:1.65, maxWidth:240, margin:0 }}>
            Helping Canadians recover lost belongings across transit networks nationwide.
          </p>
        </div>
        <div>
          <h4 style={{ fontFamily:"'Chakra Petch',sans-serif", fontSize:11, fontWeight:700, color:"rgba(255,255,255,.45)",
            letterSpacing:".1em", textTransform:"uppercase", margin:"0 0 14px" }}>For Riders</h4>
          <ul style={{ listStyle:"none", margin:0, padding:0, display:"flex", flexDirection:"column", gap:8 }}>
            {[{label:"Report a Lost Item",to:"/report-lost"},{label:"How It Works",to:"/#how-it-works"},{label:"Why items are secure",to:"/#security"}].map(l=>(
              <li key={l.to}><Link href={l.to} style={{ fontFamily:"'Inter',sans-serif", fontSize:13, color:"rgba(255,255,255,.6)", textDecoration:"none" }}>{l.label}</Link></li>
            ))}
          </ul>
        </div>
        <div>
          <h4 style={{ fontFamily:"'Chakra Petch',sans-serif", fontSize:11, fontWeight:700, color:"rgba(255,255,255,.45)",
            letterSpacing:".1em", textTransform:"uppercase", margin:"0 0 14px" }}>For Staff</h4>
          <ul style={{ listStyle:"none", margin:0, padding:0, display:"flex", flexDirection:"column", gap:8 }}>
            {[{label:"Admin Login",to:"/admin/login"},{label:"Log a Found Item",to:"/admin/upload"},{label:"Review Matches",to:"/admin/confirm"}].map(l=>(
              <li key={l.to}><Link href={l.to} style={{ fontFamily:"'Inter',sans-serif", fontSize:13, color:"rgba(255,255,255,.6)", textDecoration:"none" }}>{l.label}</Link></li>
            ))}
          </ul>
        </div>
        <div>
          <h4 style={{ fontFamily:"'Chakra Petch',sans-serif", fontSize:11, fontWeight:700, color:"rgba(255,255,255,.45)",
            letterSpacing:".1em", textTransform:"uppercase", margin:"0 0 14px" }}>Contact</h4>
          <ul style={{ listStyle:"none", margin:0, padding:0, display:"flex", flexDirection:"column", gap:8 }}>
            <li style={{ fontFamily:"'Inter',sans-serif", fontSize:12, color:"rgba(255,255,255,.5)" }}>
              Customer Service<br /><strong style={{ color:"rgba(255,255,255,.8)", letterSpacing:".02em" }}>1-888-GET-ON-GO</strong>
            </li>
            <li style={{ fontFamily:"'Inter',sans-serif", fontSize:12, color:"rgba(255,255,255,.5)" }}>
              Mon – Fri: 6 AM – 10 PM<br />Sat – Sun: 7 AM – 10 PM
            </li>
          </ul>
        </div>
      </div>
      <div style={{ borderTop:"1px solid rgba(255,255,255,.08)", padding:"16px 1.5rem" }}>
        <div style={{ maxWidth:1200, margin:"0 auto", display:"flex", flexWrap:"wrap",
          alignItems:"center", justifyContent:"space-between", gap:12 }}>
          <p style={{ fontFamily:"'Inter',sans-serif", fontSize:11, color:"rgba(255,255,255,.3)", margin:0 }}>
            © {YEAR} Lost and Found Canada. All rights reserved.
          </p>
          <nav style={{ display:"flex", gap:20 }}>
            {["Privacy Policy","Accessibility","Terms of Use"].map(l=>(
              <a key={l} href="#" style={{ fontFamily:"'Inter',sans-serif", fontSize:11, color:"rgba(255,255,255,.3)", textDecoration:"none" }}>{l}</a>
            ))}
          </nav>
        </div>
      </div>
    </footer>
  );
}

export default function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ minHeight:"100vh", display:"flex", flexDirection:"column", background:"var(--surface)" }}>
      <Header />
      <main style={{ flex:1 }}>{children}</main>
      <Footer />
    </div>
  );
}
