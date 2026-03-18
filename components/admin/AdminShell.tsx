"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const T = {
  navy:"#1c2b39", navy2:"#162231", green:"#006341",
  white:"#ffffff", dim:"rgba(255,255,255,.45)", dimHover:"rgba(255,255,255,.75)",
  hover:"rgba(255,255,255,.07)", active:"rgba(0,99,65,.28)",
  border:"rgba(255,255,255,.08)", label:"rgba(255,255,255,.22)",
};

const ITEMS_NAV = [
  { to:"/admin",             label:"Dashboard",       end:true  },
  { to:"/admin/upload",      label:"Intake Item"              },
  { to:"/admin/found-items", label:"Found Items"              },
];
const CLAIMS_NAV = [
  { to:"/admin/confirm",      label:"AI Match Review" },
  { to:"/admin/manual-queue", label:"Manual Queue"    },
];

function GoMark() {
  return (
    <div style={{ width:36,height:36,background:T.green,borderRadius:8,
      display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0 }}>
      <span style={{ fontFamily:"'Chakra Petch',sans-serif",fontWeight:800,fontSize:11,color:"#fff",letterSpacing:"-.02em",lineHeight:1 }}>L&F</span>
    </div>
  );
}

function SectionLabel({ label }: { label: string }) {
  return (
    <p style={{ fontSize:9,fontWeight:700,letterSpacing:".12em",textTransform:"uppercase",color:T.label,
      padding:"20px 14px 6px",fontFamily:"'Chakra Petch',sans-serif" }}>{label}</p>
  );
}

function SideLink({ item }: { item: typeof ITEMS_NAV[0] }) {
  const path = usePathname();
  const isActive = item.end ? path === item.to : path.startsWith(item.to);
  return (
    <Link href={item.to} style={{
      display:"flex",alignItems:"center",gap:10,padding:"9px 14px",borderRadius:8,
      margin:"1px 8px",textDecoration:"none",fontFamily:"'Inter',sans-serif",fontSize:13,
      fontWeight:isActive?600:400,color:isActive?T.white:T.dim,
      background:isActive?T.active:"transparent",transition:"background .15s,color .15s",
      borderLeft:isActive?`2px solid ${T.green}`:"2px solid transparent",
    }}>
      {item.label}
    </Link>
  );
}

function Sidebar() {
  return (
    <aside style={{ width:220,flexShrink:0,display:"flex",flexDirection:"column",background:T.navy2,
      height:"100vh",position:"sticky",top:0,overflowY:"auto",borderRight:`1px solid ${T.border}` }}>
      <div style={{ display:"flex",alignItems:"center",gap:10,padding:"18px 16px 16px",
        borderBottom:`1px solid ${T.border}`,flexShrink:0 }}>
        <GoMark />
        <div>
          <p style={{ fontFamily:"'Chakra Petch',sans-serif",fontSize:12,fontWeight:700,color:T.white,lineHeight:1.2,letterSpacing:"-.01em" }}>Admin Portal</p>
          <p style={{ fontSize:10,color:T.label,letterSpacing:".04em",marginTop:1 }}>LOST &amp; FOUND</p>
        </div>
      </div>
      <nav style={{ flex:1,paddingBottom:8 }}>
        <SectionLabel label="Items" />
        {ITEMS_NAV.map(item => <SideLink key={item.to} item={item} />)}
        <SectionLabel label="Claims" />
        {CLAIMS_NAV.map(item => <SideLink key={item.to} item={item} />)}
      </nav>
      <div style={{ padding:"8px",borderTop:`1px solid ${T.border}`,flexShrink:0 }}>
        <Link href="/" style={{ display:"flex",alignItems:"center",gap:10,padding:"9px 14px",borderRadius:8,
          margin:"1px 0",fontSize:12,color:T.dim,textDecoration:"none",fontFamily:"'Inter',sans-serif" }}>
          ← Public Site
        </Link>
        <Link href="/admin/login" style={{ display:"flex",alignItems:"center",gap:10,width:"100%",padding:"9px 14px",
          borderRadius:8,margin:"1px 0",fontSize:12,color:"rgba(220,80,80,.75)",
          background:"transparent",fontFamily:"'Inter',sans-serif",textDecoration:"none" }}>
          Logout
        </Link>
      </div>
    </aside>
  );
}

function TopBar() {
  const path = usePathname();
  const PAGE_LABELS: Record<string,string> = {
    "/admin":"Dashboard","/admin/upload":"Intake Item",
    "/admin/found-items":"Found Items","/admin/confirm":"AI Match Review",
    "/admin/manual-queue":"Manual Queue",
  };
  const label = PAGE_LABELS[path] ?? "Admin";
  return (
    <header style={{ height:52,display:"flex",alignItems:"center",justifyContent:"space-between",
      padding:"0 28px",background:"#fff",borderBottom:"1px solid #e8ecf0",flexShrink:0,
      position:"sticky",top:0,zIndex:10 }}>
      <p style={{ fontFamily:"'Chakra Petch',sans-serif",fontSize:13,fontWeight:600,color:"#1c2b39",letterSpacing:"-.01em" }}>{label}</p>
      <div style={{ display:"flex",alignItems:"center",gap:8 }}>
        <div style={{ width:7,height:7,borderRadius:"50%",background:"#006341" }} />
        <p style={{ fontSize:11,color:"#8695a4",fontFamily:"'Inter',sans-serif" }}>L&F Canada · Admin</p>
      </div>
    </header>
  );
}

export default function AdminShell({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ minHeight:"100vh",display:"flex",background:"#f5f6f7",fontFamily:"'Inter',sans-serif" }}>
      <Sidebar />
      <div style={{ flex:1,display:"flex",flexDirection:"column",minWidth:0 }}>
        <TopBar />
        <main style={{ flex:1,overflowY:"auto" }}>{children}</main>
      </div>
    </div>
  );
}
