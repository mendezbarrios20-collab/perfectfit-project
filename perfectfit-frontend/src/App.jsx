import React from 'react';
import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom';

// Importación de tus páginas reales
import Home from './pages/Home';
import Catalog from './pages/Catalog';
import Contact from './pages/Contact';
import Recommender from './pages/Recommender';
import Login from './pages/Login';

function App() {
  return (
    <Router>
      {/* Navbar Superior Modernizada */}
      <nav style={{ 
        background: 'var(--white)', 
        padding: '1.2rem 2rem', 
        display: 'flex', 
        gap: '2rem', 
        alignItems: 'center',
        boxShadow: '0 2px 10px rgba(0,0,0,0.03)',
        position: 'sticky',
        top: 0,
        zIndex: 1000
      }}>
        <NavLink to="/" className="nav-link-custom" style={({ isActive }) => ({ fontWeight: isActive ? '700' : '400' })}>Inicio</NavLink>
        <NavLink to="/catalogo" className="nav-link-custom">Catálogo</NavLink>
        <NavLink to="/recomendador" className="nav-link-custom">IA Nutrición</NavLink>
        <NavLink to="/contacto" className="nav-link-custom">Contacto</NavLink>
        <NavLink to="/login" className="nav-link-custom" style={{ marginLeft: 'auto', fontWeight: 'bold' }}>Admin</NavLink>
      </nav>

      {/* Selector de Pantallas */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/catalogo" element={<Catalog />} />
        <Route path="/contacto" element={<Contact />} />
        <Route path="/recomendador" element={<Recommender />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;
