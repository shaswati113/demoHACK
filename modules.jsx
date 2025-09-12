// src/Modules.jsx
import React, { useEffect, useState } from "react";
import anime from "animejs";
import { Link } from "react-router-dom";
import { query, orderBy, onSnapshot } from "firebase/firestore";
import { modulesCollection, studentsCollection } from "./firebase";

export default function Modules(){
  const [modules, setModules] = useState([]);
  const [leaders, setLeaders] = useState([]);

  useEffect(()=>{
    anime({ targets: ".module-tile", translateY: [30,0], opacity: [0,1], delay: anime.stagger(70), duration: 700 });
  },[]);

  useEffect(()=>{
    const q = query(modulesCollection, orderBy("order"));
    const unsub = onSnapshot(q, snap=>{
      const arr=[];
      snap.forEach(d => arr.push({ id: d.id, ...d.data() }));
      setModules(arr);
    });
    return () => unsub();
  },[]);

  useEffect(()=>{
    const q2 = query(studentsCollection, orderBy("score","desc"));
    const unsub2 = onSnapshot(q2, snap=>{
      const arr=[];
      snap.forEach(d => arr.push({ id: d.id, ...d.data() }));
      setLeaders(arr.slice(0,10));
    });
    return () => unsub2();
  },[]);

  return (
    <div>
      <div className="row">
        <div className="card">
          <h3>Modules</h3>
          <div className="subtle" style={{marginBottom:12}}>Tap a module to view the lesson and start the scenario quiz</div>

          <div className="module-grid">
            {modules.length===0 && <div className="subtle center">Loading modules…</div>}
            {modules.map(m => (
              <Link key={m.id} to={`/module/${m.id}`} style={{textDecoration:"none"}}>
                <div className="module-tile" aria-label={m.title} role="button">
                  <div style={{display:"flex", justifyContent:"space-between", alignItems:"center"}}>
                    <div style={{display:"flex", gap:12}}>
                      <div className="module-icon" style={{background: m.color || "var(--space-cadet)"}}>
                        {m.icon ? <img src={m.icon} alt="" style={{width:28,height:28}}/> : m.title.charAt(0)}
                      </div>
                      <div>
                        <div className="module-title">{m.title}</div>
                        <div className="module-desc">{m.description}</div>
                      </div>
                    </div>
                    <div style={{color:"var(--slate-gray)", fontSize:12}}>Start →</div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        <aside className="leaderboard card">
          <h4>Leaderboard</h4>
          <div className="subtle">Top scorers across all modules</div>
          <div style={{marginTop:12, display:"grid", gap:8}}>
            {leaders.length===0 && <div className="subtle center">No entries yet</div>}
            {leaders.map((r,i)=>(
              <div className="lb-item" key={r.id}>
                <div style={{display:"flex",gap:12,alignItems:"center"}}>
                  <div className="lb-rank" style={{background: i===0? "var(--caput-mortuum)" : "var(--tan)"}}>{i+1}</div>
                  <div>
                    <div style={{fontWeight:700}}>{r.name}</div>
                    <div style={{fontSize:12,color:"var(--slate-gray)"}}>{r.school || r.course}</div>
                  </div>
                </div>
                <div style={{fontWeight:700,color:"var(--space-cadet)"}}>{r.score || 0}</div>
              </div>
            ))}
          </div>
        </aside>
      </div>
    </div>
  );
}
