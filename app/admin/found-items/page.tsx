"use client";
import { useState } from "react";
import Link from "next/link";

const CATS = ["All","Electronics","Clothing","Accessory","Document","Bag","Other"];

const MOCK_ITEMS = [
  {id:"1",description:"Black Sony WH-1000XM4 Headphones",locationName:"Union Station",attributes:{category:"Electronics",color:"Black",brand:"Sony",condition:"Good"},date:"Mar 16, 2026"},
  {id:"2",description:"Blue JanSport Backpack with red zipper",locationName:"Oakville GO",attributes:{category:"Bag",color:"Blue",brand:"JanSport",condition:"Fair"},date:"Mar 15, 2026"},
  {id:"3",description:"iPhone 12 Blue in clear case",locationName:"Kipling GO",attributes:{category:"Electronics",color:"Blue",brand:"Apple",condition:"Good"},date:"Mar 14, 2026"},
  {id:"4",description:"Black leather wallet — Fossil brand",locationName:"Bramalea GO",attributes:{category:"Accessory",color:"Black",brand:"Fossil",condition:"Good"},date:"Mar 14, 2026"},
  {id:"5",description:"Navy puffer jacket — Uniqlo XL",locationName:"Mississauga GO",attributes:{category:"Clothing",color:"Navy",brand:"Uniqlo",condition:"Good"},date:"Mar 13, 2026"},
  {id:"6",description:"Samsung Galaxy Buds 2 in white case",locationName:"Burlington GO",attributes:{category:"Electronics",color:"White",brand:"Samsung",condition:"Good"},date:"Mar 13, 2026"},
  {id:"7",description:"Ontario driver's license + health card",locationName:"Hamilton GO",attributes:{category:"Document",color:"Various",brand:"",condition:"Good"},date:"Mar 12, 2026"},
  {id:"8",description:"Black Logitech MX Master 3 mouse",locationName:"Oakville GO",attributes:{category:"Electronics",color:"Black",brand:"Logitech",condition:"Good"},date:"Mar 12, 2026"},
  {id:"9",description:"Green reusable water bottle — HydroFlask",locationName:"Aurora GO",attributes:{category:"Other",color:"Green",brand:"HydroFlask",condition:"Good"},date:"Mar 11, 2026"},
  {id:"10",description:"Rose gold Apple Watch Series 8",locationName:"Richmond Hill GO",attributes:{category:"Electronics",color:"Rose Gold",brand:"Apple",condition:"Good"},date:"Mar 11, 2026"},
  {id:"11",description:"Grey hoodie — Champion Large",locationName:"Barrie South GO",attributes:{category:"Clothing",color:"Grey",brand:"Champion",condition:"Good"},date:"Mar 10, 2026"},
  {id:"12",description:"Transit card — Presto card",locationName:"Union Station",attributes:{category:"Document",color:"Green",brand:"Presto",condition:"Good"},date:"Mar 10, 2026"},
];

function Chip({ label, variant="green" }: { label:string; variant?:"green"|"neutral" }) {
  return <span style={{ fontSize:9.5,fontWeight:600,letterSpacing:".02em",background:variant==="green"?"#e8f4ef":"#f1f4f7",color:variant==="green"?"#006341":"#546478",padding:"2px 7px",borderRadius:999,textTransform:"capitalize" as const }}>{label}</span>;
}

function ItemCard({ item }: { item: typeof MOCK_ITEMS[0] }) {
  const [hover, setHover] = useState(false);
  const colors: Record<string,string> = {Electronics:"#2563eb",Bag:"#d97706",Clothing:"#7c3aed",Accessory:"#006341",Document:"#dc2626",Other:"#546478"};
  const col = colors[item.attributes.category]||"#546478";
  return (
    <div onMouseOver={()=>setHover(true)} onMouseOut={()=>setHover(false)}
      style={{ background:"#fff",border:`1px solid ${hover?"#9ec9b8":"#e8ecf0"}`,borderRadius:12,overflow:"hidden",display:"flex",flexDirection:"column",
        transition:"border-color .18s,box-shadow .18s,transform .18s",boxShadow:hover?"0 6px 18px rgba(0,99,65,.10)":"0 1px 4px rgba(0,0,0,.05)",transform:hover?"translateY(-2px)":"none" }}>
      <div style={{ position:"relative",height:148,background:"#f5f6f7",overflow:"hidden",display:"flex",alignItems:"center",justifyContent:"center" }}>
        <div style={{ width:60,height:60,borderRadius:12,background:col+"18",display:"flex",alignItems:"center",justifyContent:"center" }}>
          <svg width="28" height="28" fill="none" viewBox="0 0 24 24" stroke={col} strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round"><path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z"/></svg>
        </div>
        <span style={{ position:"absolute",top:8,left:8,fontSize:9,fontWeight:700,letterSpacing:".06em",background:"#1c2b39cc",color:"#fff",padding:"3px 8px",borderRadius:999,textTransform:"capitalize" as const,backdropFilter:"blur(4px)" }}>{item.attributes.category}</span>
      </div>
      <div style={{ padding:"12px 14px",display:"flex",flexDirection:"column",gap:8,flex:1 }}>
        <h3 style={{ fontFamily:"'Chakra Petch',sans-serif",fontSize:12,fontWeight:600,color:"#1c2b39",margin:0,lineHeight:1.35 }}>{item.description}</h3>
        <div style={{ display:"flex",flexWrap:"wrap",gap:3 }}>
          {item.attributes.color&&<Chip label={item.attributes.color}/>}
          {item.attributes.brand&&<Chip label={item.attributes.brand}/>}
          {item.attributes.condition&&<Chip label={item.attributes.condition} variant="neutral"/>}
        </div>
        <div style={{ marginTop:"auto",paddingTop:8,borderTop:"1px solid #f5f6f7" }}>
          <p style={{ fontSize:10.5,color:"#546478",fontWeight:500,margin:"0 0 2px" }}>📍 {item.locationName}</p>
          <p style={{ fontSize:10,color:"#8695a4",margin:0 }}>🗓 {item.date}</p>
        </div>
      </div>
    </div>
  );
}

export default function FoundItems() {
  const [cat, setCat] = useState("All");
  const [search, setSearch] = useState("");

  const filtered = MOCK_ITEMS.filter(item=>{
    const matchCat = cat==="All" || item.attributes.category===cat;
    const q = search.toLowerCase();
    const matchSearch = !q || item.description.toLowerCase().includes(q) || item.locationName.toLowerCase().includes(q) || item.attributes.brand.toLowerCase().includes(q);
    return matchCat && matchSearch;
  });

  return (
    <div style={{ padding:"28px 28px",maxWidth:1100 }}>
      <div style={{ display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:24,flexWrap:"wrap",gap:12 }}>
        <div>
          <h2 style={{ fontFamily:"'Chakra Petch',sans-serif",fontSize:17,fontWeight:700,color:"#1c2b39",margin:"0 0 4px" }}>Found Items</h2>
          <p style={{ fontSize:12,color:"#8695a4",margin:0 }}>{filtered.length} items in database</p>
        </div>
        <Link href="/admin/upload" style={{ display:"inline-flex",alignItems:"center",gap:7,padding:"10px 18px",borderRadius:9,background:"#006341",color:"#fff",textDecoration:"none",fontSize:13,fontWeight:600,fontFamily:"'Inter',sans-serif" }}>
          + Log New Item
        </Link>
      </div>

      {/* Filters */}
      <div style={{ display:"flex",gap:12,marginBottom:20,flexWrap:"wrap",alignItems:"center" }}>
        <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search items, location, brand…" className="field-input" style={{ maxWidth:320 }}/>
        <div style={{ display:"flex",gap:6,flexWrap:"wrap" }}>
          {CATS.map(c=>(
            <button key={c} onClick={()=>setCat(c)} style={{ padding:"6px 14px",borderRadius:999,border:`1.5px solid ${cat===c?"#006341":"#dde2e7"}`,background:cat===c?"#006341":"#fff",color:cat===c?"#fff":"#546478",fontFamily:"'Inter',sans-serif",fontSize:12,fontWeight:600,cursor:"pointer",transition:"all .15s" }}>{c}</button>
          ))}
        </div>
      </div>

      {/* Grid */}
      <div style={{ display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(200px,1fr))",gap:14 }}>
        {filtered.map(item=><ItemCard key={item.id} item={item}/>)}
      </div>
      {filtered.length===0&&(
        <div style={{ textAlign:"center",padding:"72px 24px",color:"#8695a4",fontFamily:"'Inter',sans-serif" }}>
          <p style={{ fontSize:16,fontWeight:600,color:"#1c2b39",marginBottom:8 }}>No items found</p>
          <p>Try adjusting your search or filter.</p>
        </div>
      )}
    </div>
  );
}
