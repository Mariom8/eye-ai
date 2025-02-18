import React from 'react';
import { Link } from 'react-router-dom';
import './NavBar.css';

export function NavBar() {
  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <span className="navbar-name">EYE AI</span>
      </div>
      <ul className="navbar-menu">
        <li><Link to="/">Inicio</Link></li>
        <li><Link to="/historial">Historial</Link></li>
        <li><Link to="/sobre-nosotros">Sobre nosotros</Link></li>
      </ul>
      <img src="https://firebasestorage.googleapis.com/v0/b/eye-ai-2a78d.appspot.com/o/resources%2Feyelogo.png?alt=media&token=a2d988bd-3e14-4a7c-bf13-5a859a210483" alt="Logo" className="navbar-logo" />
    </nav>
  );
}
