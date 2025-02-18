import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import { NavBar } from './NavBar';
import { Inicio } from './Inicio';
import { SobreNosotros } from './SobreNosotros';
import { Historial } from './Historial';



export function App() {
  return (
    <Router>
     
      <Routes>
        <Route path="/" element={<Inicio />} />
        <Route path="/historial" element={<Historial />} />
        <Route path="/sobre-nosotros" element={<SobreNosotros />} />
      </Routes>
    </Router>
  );
}



