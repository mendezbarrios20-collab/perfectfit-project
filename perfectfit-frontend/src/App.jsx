import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, NavLink, useLocation } from 'react-router-dom';
import { Menu, X, ShoppingCart, Trash2 } from 'lucide-react'; 
import './App.css';

// Importación de tus páginas reales
import Home from './pages/Home';
import Catalog from './pages/Catalog';
import Contact from './pages/Contact';
import Recommender from './pages/Recommender';
import Login from './pages/Login';
import Footer from './pages/Footer';

// Componente para resolver el scroll instantáneo hacia arriba
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0); // Salto inmediato al tope sin transiciones molestas
  }, [pathname]);
  return null;
}

// Componente para el Panel de Administración exigido por el curso
function AdminPanel() {
  return (
    <div style={{ padding: '5rem 2rem', textAlign: 'center', minHeight: '80vh', backgroundColor: '#f7fafc' }}>
      <h1 style={{ fontSize: '2.5rem', color: 'var(--green-dark)', marginBottom: '1rem' }}>🛡️ Panel de Gestión Interno</h1>
      <p style={{ fontSize: '1.2rem', color: 'var(--text-dark)', maxWidth: '600px', margin: '0 auto' }}>
        ¡Bienvenida, Valentina! Aquí podrás gestionar los 16 platos de tu menú funcional y revisar los mensajes de tus clientes en Cartagena.
      </p>
    </div>
  );
}

function App() {
  const [menuAbierto, setMenuAbierto] = useState(false);
  const [carrito, setCarrito] = useState([]); // Estado del carrito
  const [verCarrito, setVerCarrito] = useState(false); // Estado para abrir/cerrar modal

  const toggleMenu = () => setMenuAbierto(!menuAbierto);
  const cerrarMenu = () => setMenuAbierto(false);

  // LÓGICA: Agregar plato o incrementar cantidad
  const agregarAlCarrito = (producto) => {
    setCarrito((prevCarrito) => {
      const existe = prevCarrito.find((item) => item.id === producto.id);
      if (existe) {
        return prevCarrito.map((item) =>
          item.id === producto.id ? { ...item, cantidad: item.cantidad + 1 } : item
        );
      }
      return [...prevCarrito, { ...producto, cantidad: 1 }];
    });
  };

  // LÓGICA: Quitar plato del carrito
  const eliminarDelCarrito = (id) => {
    setCarrito((prevCarrito) => prevCarrito.filter((item) => item.id !== id));
  };

  // LÓGICA: Cálculos de totales
  const totalArticulos = carrito.reduce((acc, item) => acc + item.cantidad, 0);
  const precioTotal = carrito.reduce((acc, item) => acc + (item.price * item.cantidad), 0);

  return (
    <Router>
      <ScrollToTop />
      
      {/* Navbar Superior con tu diseño original exacto + Carrito Integrado */}
      <nav className="navbar-principal">
        
        {/* Botón de Hamburguesa */}
        <button onClick={toggleMenu} className="boton-hamburguesa" aria-label="Menu de navegación">
          {menuAbierto ? <X size={26} /> : <Menu size={26} />}
        </button>

        {/* Contenedor de enlaces subdividido de forma profesional */}
        <div className={`nav-enlaces ${menuAbierto ? 'nav-enlaces-movil-abierto' : ''}`}>
          
          {/* Subgrupo Izquierdo */}
          <div className="nav-grupo-izquierdo">
            <NavLink to="/" onClick={cerrarMenu} className="nav-link-custom">Inicio</NavLink>
            <NavLink to="/catalogo" onClick={cerrarMenu} className="nav-link-custom">Catálogo</NavLink>
            <NavLink to="/recomendador" onClick={cerrarMenu} className="nav-link-custom">IA Nutrición</NavLink>
            <NavLink to="/contacto" onClick={cerrarMenu} className="nav-link-custom">Contacto</NavLink>
            <button
              type="button"
              onClick={() => setVerCarrito(!verCarrito)}
              className="nav-carrito-btn nav-link-custom"
              aria-label="Abrir carrito"
            >
              <ShoppingCart size={22} />
              {totalArticulos > 0 && <span className="contador-carrito">{totalArticulos}</span>}
            </button>
          </div>
          
          {/* Subgrupo Derecho */}
          <div className="nav-grupo-derecho">
            <NavLink to="/login" onClick={cerrarMenu} className="nav-link-custom boton-admin-derecho">Admin</NavLink>
          </div>
        </div>

      </nav>

      {/* VENTANA MODAL FLOTANTE DEL CARRITO */}
      {verCarrito && (
        <div className="carrito-modal-overlay" onClick={() => setVerCarrito(false)}>
          <div className="carrito-modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="carrito-header">
              <h3>🛒 Tu Pedido Fit</h3>
              <button className="cerrar-carrito-btn" onClick={() => setVerCarrito(false)}><X size={20} /></button>
            </div>
            
            {carrito.length === 0 ? (
              <p className="carrito-vacio-txt">El carrito está vacío. ¡Explora el menú y añade tus bowls favoritos! 🥗</p>
            ) : (
              <>
                <div className="carrito-items-lista">
                  {carrito.map((item) => (
                    <div key={item.id} className="carrito-item-card">
                      <div className="carrito-item-info">
                        <h4>{item.name}</h4>
                        <p>{item.cantidad} x ${item.price.toLocaleString('es-CO')}</p>
                      </div>
                      <button className="eliminar-item-btn" onClick={() => eliminarDelCarrito(item.id)}>
                        <Trash2 size={16} />
                      </button>
                    </div>
                  ))}
                </div>
                
                <div className="carrito-footer">
                  <div className="carrito-total-fila">
                    <span>Total estimado:</span>
                    <strong>${precioTotal.toLocaleString('es-CO')} COP</strong>
                  </div>
                  <button 
                    className="btn btn-primary cta-finalizar-pedido" 
                    onClick={() => {
                      alert("✨ ¡Tu Pedido Fit ha sido procesado con éxito! Nos comunicaremos contigo para coordinar la entrega en Cartagena.");
                      setCarrito([]);
                      setVerCarrito(false);
                    }}
                  >
                    Finalizar Pedido en Cartagena
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {/* Selector de Pantallas */}
      <main style={{ minHeight: '85vh', width: '100%', display: 'block', clear: 'both' }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/catalogo" element={<Catalog alAgregarPlato={agregarAlCarrito} />} />
          <Route path="/contacto" element={<Contact />} />
          <Route path="/recomendador" element={<Recommender />} />
          <Route path="/login" element={<Login />} />
          <Route path="/admin" element={<AdminPanel />} /> 
        </Routes>
      </main>
      
      <Footer />
    </Router>
  );
}

export default App;
