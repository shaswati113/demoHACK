// src/Checklist.jsx
import React, { useState } from "react";
import "./index.css";

// Predefined kits per disaster
const disasterKits = {
  Earthquake: [
    "Water bottles",
    "First-aid kit",
    "Flashlight & batteries",
    "Emergency whistle",
    "Important documents",
  ],
  Flood: [
    "Dry food packets",
    "Water purification tablets",
    "Raincoat & waterproof bag",
    "Torch & batteries",
    "Emergency contact list",
  ],
  Fire: [
    "Fire extinguisher",
    "Wet towels",
    "Emergency exit plan",
    "Mask (for smoke)",
    "Important documents",
  ],
  Cyclone: [
    "Battery-powered radio",
    "Non-perishable food",
    "Power bank",
    "Raincoat",
    "First-aid kit",
  ],
};

export default function Checklist() {
  const [selectedDisaster, setSelectedDisaster] = useState(null);
  const [oldLists, setOldLists] = useState([
    { name: "Flood Kit – July", items: ["Dry food", "Raincoat", "Torch"] },
    { name: "Earthquake Drill Kit – June", items: ["Whistle", "Flashlight"] },
  ]);

  const handleSelect = (d) => setSelectedDisaster(d);

  return (
    <div>
      <header className="header">
        <div className="logo">EduSafe</div>
        <div className="subtle">Disaster Preparedness Checklist</div>
      </header>

      <div className="row">
        {/* LEFT: Disasters */}
        <div className="card">
          <h3>Disasters</h3>
          <div style={{ display: "grid", gap: "10px", marginTop: "12px" }}>
            {Object.keys(disasterKits).map((d) => (
              <button
                key={d}
                onClick={() => handleSelect(d)}
                className="module-btn"
              >
                {d}
              </button>
            ))}
          </div>
        </div>

        {/* CENTRE: Current Kit */}
        <div className="card">
          <h3>
            {selectedDisaster ? `${selectedDisaster} Safety Kit` : "Select a Disaster"}
          </h3>
          {selectedDisaster && (
            <ul style={{ marginTop: "12px", color: "var(--slate-gray)" }}>
              {disasterKits[selectedDisaster].map((item, idx) => (
                <li key={idx}>{item}</li>
              ))}
            </ul>
          )}
        </div>

        {/* RIGHT: Older lists */}
        <aside className="card">
          <h3>Older Lists</h3>
          {oldLists.length === 0 && <p className="subtle">No saved lists</p>}
          {oldLists.map((list, idx) => (
            <div key={idx} className="lb-item" style={{ flexDirection: "column", alignItems: "flex-start" }}>
              <strong>{list.name}</strong>
              <ul style={{ fontSize: "0.85rem", color: "var(--slate-gray)", marginTop: "6px" }}>
                {list.items.map((i, j) => (
                  <li key={j}>{i}</li>
                ))}
              </ul>
            </div>
          ))}
        </aside>
      </div>
    </div>
  );
}
