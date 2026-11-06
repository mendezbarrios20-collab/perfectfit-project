import React, { useState, useEffect } from 'react';
import axios from 'axios'; // <- 1. CORREGIDO: Importación oficial de la librería instalada
import './Catalog.css';

// Importación de tus imágenes originales
import imgArrozInflado from '../assets/images/ArrozInflado.jpg';
import imgArrozCurry from '../assets/images/ArrozCurry.jpg';
import imgBarritas from '../assets/images/Barritas.jpg';
import imgGarbanzos from '../assets/images/Garbanzos.jpg';
import imgAcai from '../assets/images/Acai.jpg';
import imgSalmon from '../assets/images/Salmon.jpg';
import imgMuffins from '../assets/images/Muffins.jpg';
import imgPancakes from '../assets/images/Pancakes.jpg';
import imgParfait from '../assets/images/parfait.jpg';
import imgPudin from '../assets/images/Pudin.jpg';
import imgSmoothie from '../assets/images/Smoothie.jpg';
import imgTostada from '../assets/images/Tostada.jpg';
import imgWaffles from '../assets/images/Waffles.jpg';
import imgAvena from '../assets/images/Avena.jpeg';
import imgTrufas from '../assets/images/Trufas.jpeg';
import imgWrap from '../assets/images/Wrap.avif';

function Catalog({ alAgregarPlato }) { 
  const [productos, setProductos] = useState([]);
  const [categoriaActiva, setCategoriaActiva] = useState('todos');
  const [error, setError] = useState('');

  const mapaImagenesPorId = {
    1: imgAvena, 2: imgWaffles, 3: imgTostada, 4: imgAcai, 5: imgMuffins,
    6: imgPudin, 7: imgGarbanzos, 8: imgTrufas, 9: imgBarritas, 10: imgArrozInflado,
    11: imgPancakes, 12: imgSmoothie, 13: imgSalmon, 14: imgParfait, 15: imgWrap,
    16: imgArrozCurry
  };

  const mapaImagenesPorNombre = {
    'Avena.jpeg': imgAvena, 'Waffles.jpg': imgWaffles, 'Tostada.jpg': imgTostada,
    'Acai.jpg': imgAcai, 'Muffins.jpg': imgMuffins, 'Pudin.jpg': imgPudin,
    'Garbanzos.jpg': imgGarbanzos, 'Trufas.jpeg': imgTrufas, 'Barritas.jpg': imgBarritas,
    'ArrozInflado.jpg': imgArrozInflado, 'Pancakes.jpg': imgPancakes, 'Smoothie.jpg': imgSmoothie,
    'Salmon.jpg': imgSalmon, 'parfait.jpg': imgParfait, 'Wrap.avif': imgWrap,
    'ArrozCurry.jpg': imgArrozCurry
  };

  const categorias = [
    { id: 'todos', label: '✨ Todos' },
    { id: 'desayunos', label: '🍳 Desayunos' },
    { id: 'snacks', label: '🍎 Snacks' },
    { id: 'pre-entreno', label: '⚡ Pre-Entreno' },
    { id: 'post-entreno', label: '🏆 Post-Entreno' },
  ];

  useEffect(() => {
    const consultarAPI = async () => {
      try {
        setError('');
        const respuesta = await axios.get('http://localhost:5000/api/products');
        if (respuesta.data.success) {
          setProductos(respuesta.data.data);
        }
      } catch (err) {
        console.error("Error al conectar el catálogo con el servidor:", err);
        setError('⚠️ No se pudieron cargar los platos. Verifica que el servidor del Backend esté activo.');
      }
    };
    consultarAPI();
  }, []);

  const productosFiltrados =
    categoriaActiva === 'todos'
      ? productos
      : productos.filter((producto) => producto.category === categoriaActiva);

  return (
    <div className="catalog-page">
      <div className="container">
        
        <h1 className="catalog-main-title">Nuestro Menú Funcional</h1>
        <p className="catalog-description-top">
          Selecciona el momento de tu rutina para ver las opciones ideales para ti en Cartagena.
        </p>
        
        {error && <div className="login-error-box" style={{ marginBottom: '2rem', textAlign: 'center' }}>{error}</div>}
        
        <div className="catalog-filters">
          {categorias.map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => setCategoriaActiva(cat.id)}
              aria-pressed={categoriaActiva === cat.id}
              className={`btn filter-btn ${categoriaActiva === cat.id ? 'filter-btn-active' : 'filter-btn-inactive'}`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        <div className="catalog-grid">
          {productosFiltrados.map((producto) => {
            const idPlato = producto.id || producto._id;
            const imagenPlato = mapaImagenesPorNombre[producto.image] || mapaImagenesPorId[idPlato];
            return (
              <article key={idPlato} className="perfectfit-card">
                <div className="perfectfit-card-img-wrapper">
                  <img src={imagenPlato} alt={producto.name} loading="lazy" />
                  <span className="category-badge">{producto.category}</span>
                </div>
                <div className="card-body">
                  <h3 className="card-title">{producto.name}</h3>
                  <p className="card-description">{producto.description}</p>
                  
                  {/* Conservamos intacta tu increíble idea de diseño estético para los macros */}
                  <div className="macros-box" style={{ lineHeight: '1.8' }}>
                    <div style={{ fontWeight: '700', marginBottom: '0.4rem', color: 'var(--green-dark)' }}>
                      💪 Aporte Nutricional:
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '0.2rem', fontWeight: '500', color: 'var(--text-dark)' }}>
                      <div>⚡ Calorías: <strong>{producto.macros?.calories || 0}</strong> kcal</div>
                      <div>🥩 Proteínas: <strong>{producto.macros?.protein || 0}g</strong></div>
                      <div>🌾 Carbohidratos: <strong>{producto.macros?.carbs || 0}g</strong></div>
                      <div>🥑 Grasas: <strong>{producto.macros?.fats || 0}g</strong></div>
                    </div>
                  </div>
                  
                  <div className="card-footer">
                    <span className="card-price">
                      ${producto.price.toLocaleString('es-CO')}
                    </span>
                    
                    <button
                      type="button"
                      className="btn btn-primary card-btn"
                      onClick={() => {
                        console.log("Añadiendo al carrito:", producto.name);
                        if (alAgregarPlato) {
                          alAgregarPlato(producto); 
                        }
                      }}
                    >
                      Pedir Fit
                    </button>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        {productosFiltrados.length === 0 && !error && (
          <p className="carrito-vacio-txt" style={{ textAlign: 'center', marginTop: '3rem' }}>
            No hay productos disponibles en esta categoría.
          </p>
        )}
      </div>
    </div>
  );
}

export default Catalog;
