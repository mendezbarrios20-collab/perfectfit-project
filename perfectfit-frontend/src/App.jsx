import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

// 1. Importamos tus páginas reales desde la carpeta pages
import Home from './pages/Home';
import Catalog from './pages/Catalog';
import Contact from './pages/Contact';
import Recommender from './pages/Recommender';

// 2. Componente temporal restante (Se actualizará en el próximo paso)
const Login = () => <div className="container" style={{padding: '2rem'}}><h1>🔑 Ingreso Administrador</h1><p>Inicia sesión de forma segura al panel de gestión.</p></div>;

function App() {
  return (
    <Router>
      {/* Navbar o Menú superior con tus colores corporativos */}
      <nav style={{ background: 'var(--blue-medium)', padding: '1rem', display: 'flex', gap: '1rem' }}>
        <Link to="/" style={{ fontWeight: 'bold' }}>Inicio</Link>
        <Link to="/catalogo">Catálogo</Link>
        <Link to="/recomendador">IA Nutrición</Link>
        <Link to="/contacto">Contacto</Link>
        <Link to="/login" style={{ marginLeft: 'auto' }}>Admin</Link>
      </nav>

      {/* Selector Inteligente de Pantallas */}
      <Routes>
        {/* Rutas reales conectadas a tus componentes de la carpeta pages */}
        <Route path="/" element={<Home />} />
        <Route path="/catalogo" element={<Catalog />} />
        <Route path="/contacto" element={<Contact />} />
        <Route path="/recomendador" element={<Recommender />} />
        
        {/* Ruta con componente temporal restante */}
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;
