import React from 'react';
import { NavLink } from 'react-router-dom';
import './Footer.css';
// Ruta corregida del logo central del negocio
import imgLogo from '../assets/images/solo-logo.jpg';

function Footer() {
  // Función para devolver el scroll al inicio de la pantalla automáticamente al cambiar de página
  const manejarScrollArriba = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="perfectfit-footer">
      <div className="footer-grid">
        
        {/* Columna 1: Identidad Corporativa */}
        <div>
          <div className="footer-brand-box">
            <img src={imgLogo} alt="Logo PerfectFit" className="footer-logo-img" />
            <h3 className="footer-brand-title">PerfectFit Bowl</h3>
          </div>
          <p className="footer-text-justify">
            Nutrición inteligente y bowls funcionales. Diseñados para potenciar tus metas físicas diarias en Cartagena.
          </p>
        </div>

        {/* Columna 2: Horarios de Atención */}
        <div>
          <h4 className="footer-column-title">⏰ Horarios</h4>
          <p className="footer-text-muted">Lunes a Viernes: 6:00 AM - 8:00 PM</p>
          <p className="footer-text-spacing">Sábados: 7:00 AM - 4:00 PM</p>
        </div>

        {/* Columna 3: Enlaces de Acceso Rápido */}
        <div>
          <h4 className="footer-column-title">🔗 Enlaces</h4>
          <div className="footer-links-container">
            <NavLink to="/" onClick={manejarScrollArriba} className="footer-link-item">🏠 Inicio</NavLink>
            <NavLink to="/catalogo" onClick={manejarScrollArriba} className="footer-link-item">🥗 Catálogo</NavLink>
            <NavLink to="/recomendador" onClick={manejarScrollArriba} className="footer-link-item">🤖 IA Nutrición</NavLink>
            <NavLink to="/contacto" onClick={manejarScrollArriba} className="footer-link-item">✉️ Contacto</NavLink>
          </div>
        </div>

        {/* Columna 4: Ubicación Geográfica */}
        <div>
          <h4 className="footer-column-title">📍 Sede</h4>
          <p className="footer-text-muted">Bocagrande, Carrera x #5-120</p>
          <p className="footer-text-highlight">✨ @PerfectFit.Bowl</p>
        </div>

      </div>

      {/* Barra de Créditos Académicos */}
      <div className="footer-bottom-bar">
        <p>&copy; 2026 PerfectFit Bowl - Desarrollado por Valentina Barrios Mendez como Proyecto Final de Jóvenes creaTIvos.</p>
      </div>
    </footer>
  );
}

export default Footer;
