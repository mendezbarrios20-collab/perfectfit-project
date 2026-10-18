import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

// Componentes temporales para verificar que nos movemos entre pantallas
const Home = () => <div className="container" style={{padding: '2rem'}}><h1>🏠 Inicio - PerfectFit Bowl</h1><p>Tu estilo de vida en un tazón.</p></div>;
const Catalog = () => <div className="container" style={{padding: '2rem'}}><h1>🥗 Catálogo Nutritivo</h1><p>Alimentos organizados según tu rutina.</p></div>;
const Recommender = () => <div className="container" style={{padding: '2rem'}}><h1>🤖 Recomendador de IA</h1><p>Encuentra tu plato ideal según tus objetivos.</p></div>;
const Contact = () => <div className="container" style={{padding: '2rem'}}><h1>✉️ Contáctanos</h1><p>Envíanos tus sugerencias o pedidos.</p></div>;
const Login = () => <div className="container" style={{padding: '2rem'}}><h1>🔑 Ingreso Administrador</h1><p>Inicia sesión de forma segura.</p></div>;

function App() {
  return (
    <Router>
      {/* Menú de navegación temporal con tus variables de color */}
      <nav style={{ background: 'var(--blue-medium)', padding: '1rem', display: 'flex', gap: '1rem' }}>
        <Link to="/" style={{ fontWeight: 'bold' }}>Inicio</Link>
        <Link to="/catalogo">Catálogo</Link>
        <Link to="/recomendador">IA Nutrición</Link>
        <Link to="/contacto">Contacto</Link>
        <Link to="/login" style={{ marginLeft: 'auto' }}>Admin</Link>
      </nav>

      {/* Selector Dinámico de Páginas */}
      <Routes>
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
