import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./home";
import Modules from "./modules";
import Checklist from "./checklist";
import "./index.css";

function App(){
  return (
    <Router>
      <div className="app">
        <header className="header">
          <div className="logo">EduSafe</div>
          <div className="subtle">Gamified Disaster Preparedness</div>
        </header>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/modules" element={<Modules />} />
          <Route path="/module/:id" element={<ModulePage />} />
          <Route path="/checklist" element={<Checklist />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
