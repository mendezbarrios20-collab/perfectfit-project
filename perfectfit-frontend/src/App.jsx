import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

// 1. IMPORTACIÓN DE TODAS TUS PÁGINAS REALES (Carpeta pages)
import Home from './pages/Home';
import Catalog from './pages/Catalog';
import Contact from './pages/Contact';
import Recommender from './pages/Recommender';
import Login from './pages/Login';

function App() {
  return (
    <Router>
      {/* Navbar o Menú superior con tus colores corporativos */}
      <nav style={{ background: 'var(--blue-medium)', padding: '1rem', display: 'flex', gap: '1rem', alignItems: 'center' }}>
        <Link to="/" style={{ fontWeight: 'bold', fontFamily: 'var(--font-nav)' }}>Inicio</Link>
        <Link to="/catalogo" style={{ fontFamily: 'var(--font-nav)' }}>Catálogo</Link>
        <Link to="/recomendador" style={{ fontFamily: 'var(--font-nav)' }}>IA Nutrición</Link>
        <Link to="/contacto" style={{ fontFamily: 'var(--font-nav)' }}>Contacto</Link>
        <Link to="/login" style={{ marginLeft: 'auto', fontFamily: 'var(--font-nav)', fontWeight: 'bold' }}>Admin</Link>
      </nav>

      {/* Selector Inteligente de Pantallas */}
      <Routes>
        {/* Todas tus rutas conectadas a tus componentes de producción */}
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
