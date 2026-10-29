import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom';
import { Menu, X } from 'lucide-react'; // Tus iconos de la hamburguesa
import './App.css';

// Importación de tus páginas reales
import Home from './pages/Home';
import Catalog from './pages/Catalog';
import Contact from './pages/Contact';
import Recommender from './pages/Recommender';
import Login from './pages/Login';

function App() {
  const [menuAbierto, setMenuAbierto] = useState(false);

  const toggleMenu = () => {
    setMenuAbierto(!menuAbierto);
  };

  const cerrarMenu = () => {
    setMenuAbierto(false);
  };

  return (
    <Router>
      {/* Navbar Superior con tu diseño original exacto */}
      <nav className="navbar-principal">
        
        {/* Botón de Hamburguesa: Totalmente escondido en la portátil, solo sale en celular */}
        <button onClick={toggleMenu} className="boton-hamburguesa" aria-label="Menu de navegación">
          {menuAbierto ? <X size={26} /> : <Menu size={26} />}
        </button>

        {/* Contenedor de enlaces: En tu portátil se verá idéntico a antes */}
        <div className={`nav-enlaces ${menuAbierto ? 'nav-enlaces-movil-abierto' : ''}`}>
          <NavLink to="/" onClick={cerrarMenu} className="nav-link-custom">Inicio</NavLink>
          <NavLink to="/catalogo" onClick={cerrarMenu} className="nav-link-custom">Catálogo</NavLink>
          <NavLink to="/recomendador" onClick={cerrarMenu} className="nav-link-custom">IA Nutrición</NavLink>
          <NavLink to="/contacto" onClick={cerrarMenu} className="nav-link-custom">Contacto</NavLink>
          <NavLink to="/login" onClick={cerrarMenu} className="nav-link-custom boton-admin-derecho">Admin</NavLink>
        </div>

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
