import React from 'react';
import { Link } from 'react-router-dom';

// 📷 RUTA CORREGIDA: Sube un nivel a src/ y entra a assets/images/
import imgLogo from '../assets/images/solo-logo.jpg';

function Footer() {
  return (
    <div 
      style={{ 
        backgroundColor: '#1a202c', 
        color: '#ffffff', 
        padding: '4rem 2rem 2rem 2rem', 
        borderTop: '4px solid #eb9ac0', 
        marginTop: '5rem', 
        width: '100%', 
        boxSizing: 'border-box',
        display: 'block',
        clear: 'both'
      }}
    >
      <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '3rem' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1.2rem' }}>
            <img src={imgLogo} alt="Logo PerfectFit" style={{ height: '35px', width: 'auto', borderRadius: '50%', background: 'white', padding: '2px' }} />
            <h3 style={{ fontSize: '1.2rem', color: '#f3aacb', margin: 0, fontWeight: '700' }}>PerfectFit Bowl</h3>
          </div>
          <p style={{ color: '#a0aec0', fontSize: '0.9rem', lineHeight: '1.6', margin: 0, textAlign: 'justify' }}>
            Nutrición inteligente y bowls funcionales. Diseñados para potenciar tus metas físicas diarias en Cartagena.
          </p>
        </div>
        <div>
          <h4 style={{ color: '#ffffff', marginBottom: '1.2rem', borderBottom: '2px solid #a2c7e7', paddingBottom: '0.5rem', display: 'inline-block', fontWeight: '600' }}>⏰ Horarios</h4>
          <p style={{ color: '#a0aec0', fontSize: '0.9rem', margin: 0 }}>Lunes a Viernes: 6:00 AM - 8:00 PM</p>
          <p style={{ color: '#a0aec0', fontSize: '0.9rem', margin: '0.5rem 0 0 0' }}>Sábados: 7:00 AM - 4:00 PM</p>
        </div>
        <div>
          <h4 style={{ color: '#ffffff', marginBottom: '1.2rem', borderBottom: '2px solid #a2c7e7', paddingBottom: '0.5rem', display: 'inline-block', fontWeight: '600' }}>🔗 Enlaces</h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.9rem' }}>
            <Link to="/" style={{ color: '#a0aec0', textDecoration: 'none' }}>🏠 Inicio</Link>
            <Link to="/catalogo" style={{ color: '#a0aec0', textDecoration: 'none' }}>🥗 Catálogo</Link>
            <Link to="/contacto" style={{ color: '#a0aec0', textDecoration: 'none' }}>✉️ Contacto</Link>
          </div>
        </div>
        <div>
          <h4 style={{ color: '#ffffff', marginBottom: '1.2rem', borderBottom: '2px solid #a2c7e7', paddingBottom: '0.5rem', display: 'inline-block', fontWeight: '600' }}>📍 Sede</h4>
          <p style={{ color: '#a0aec0', fontSize: '0.9rem', margin: 0 }}>Bocagrande, Carrera x #5-120</p>
          <p style={{ color: '#ffff83', fontSize: '0.9rem', margin: '0.5rem 0 0 0', fontWeight: '700' }}>✨ @PerfectFit.Bowl</p>
        </div>
      </div>
      <div style={{ borderTop: '1px solid #2d3748', marginTop: '2.5rem', paddingTop: '1.5rem', textAlign: 'center', fontSize: '0.8rem', color: '#718096' }}>
        <p style={{ margin: 0 }}>&copy; 2026 PerfectFit Bowl - Desarrollado por Valentina Barrios Mendez para Proyecto Final de Jóvenes creaTIvos.</p>
      </div>
    </div>
  );
}

export default Footer;
