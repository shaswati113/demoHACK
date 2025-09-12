// src/Home.jsx
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import anime from "animejs";
import { query, orderBy, limit, onSnapshot } from "firebase/firestore";
import { studentsCollection } from "./firebase";
import { db } from "./firebase";

export default function Home(){
  const [leaders, setLeaders] = useState([]);

  useEffect(()=>{
    anime({ targets: ".logo", translateY: [-20,0], opacity: [0,1], duration: 900, easing: "spring(1,80,10,0)" });
  },[]);

  useEffect(()=>{
    const q = query(studentsCollection, orderBy("score","desc"), limit(5));
    const unsub = onSnapshot(q, snap=>{
      const arr = [];
      snap.forEach(d => arr.push({ id: d.id, ...d.data() }));
      setLeaders(arr);
    });
    return () => unsub();
  },[]);

  return (
    <div>
      <div className="row">
        <div className="card">
          <h3 style={{marginBottom:12}}>Play & Learn</h3>
          <p className="subtle" style={{marginBottom:10}}>Select a module to start a scenario-based quiz. One life per attempt — learn by doing.</p>

          <div style={{display:"flex", gap:12, marginTop:12}}>
            <Link to="/modules" style={{textDecoration:"none"}}>
              <div className="module-tile" style={{width:220}}>
                <div style={{display:"flex", gap:10}}>
                  <div className="module-icon" style={{background:"var(--space-cadet"}}>🏫</div>
                  <div>
                    <div className="module-title">Modules</div>
                    <div className="module-desc">Choose a disaster module</div>
                  </div>
                </div>
              </div>
            </Link>

            <div className="module-tile" style={{width:220}}>
              <div style={{display:"flex", gap:10}}>
                <div className="module-icon" style={{background:"var(--caput-mortuum"}}>📈</div>
                <div>
                  <div className="module-title">Progress</div>
                  <div className="module-desc">Preparedness tracker & stats</div>
                </div>
              </div>
            </div>
          </div>

          <div style={{marginTop:18}}>
            <h4 style={{marginBottom:8}}>Quick tips</h4>
            <ul style={{color:"var(--slate-gray)", fontSize:14}}>
              <li>Watch the short lesson before attempting the quiz.</li>
              <li>Attempt region-relevant modules first.</li>
            </ul>
          </div>
        </div>

        <aside className="leaderboard card">
          <h4>Leaderboard</h4>
          <div className="subtle" style={{fontSize:12}}>Top students (live)</div>
          <div style={{marginTop:12, display:"grid", gap:8}}>
            {leaders.length===0 && <div className="subtle center">No scores yet</div>}
            {leaders.map((row, idx) => (
              <div className="lb-item" key={row.id}>
                <div style={{display:"flex", gap:12, alignItems:"center"}}>
                  <div className="lb-rank" style={{background: idx===0? "var(--caput-mortuum)" : "var(--tan)"}}>{idx+1}</div>
                  <div>
                    <div style={{fontWeight:700}}>{row.name}</div>
                    <div style={{fontSize:12, color:"var(--slate-gray)"}}>{row.school || row.course || "School"}</div>
                  </div>
                </div>
                <div style={{fontWeight:700, color:"var(--space-cadet)"}}>{row.score || 0}</div>
              </div>
            ))}
          </div>
        </aside>
      </div>
    </div>
  );
}
