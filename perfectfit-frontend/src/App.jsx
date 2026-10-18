import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

// 1. Importamos tu Landing Page real con tus colores y diseño premium
import Home from './pages/Home';

// 2. Componentes temporales (Se actualizarán en los próximos pasos por archivos reales)
const Catalog = () => <div className="container" style={{padding: '2rem'}}><h1>🥗 Catálogo Nutritivo</h1><p>Alimentos organizados según tu rutina en Cartagena.</p></div>;
const Recommender = () => <div className="container" style={{padding: '2rem'}}><h1>🤖 Recomendador de IA</h1><p>Encuentra tu plato ideal según tus objetivos.</p></div>;
const Contact = () => <div className="container" style={{padding: '2rem'}}><h1>✉️ Contáctanos</h1><p>Envíanos tus sugerencias o pedidos desde la web.</p></div>;
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
        {/* Aquí la ruta raíz '/' ya dibuja tu página Home con tus degradados y cajas de beneficios */}
        <Route path="/" element={<Home />} />
        
        <Route path="/catalogo" element={<Catalog />} />
        <Route path="/recomendador" element={<Recommender />} />
        <Route path="/contacto" element={<Contact />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;
