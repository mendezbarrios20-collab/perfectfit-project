import React, { useState, useEffect } from 'react';
import axios from 'axios'; // <- Conexión obligatoria con tu API local
import './Catalog.css';

// Importación de tus imágenes locales originales para enlazarlas con la data del servidor [1]
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

function Catalog() {
  const [productos, setProductos] = useState([]); // <- Estado para guardar los platos del backend
  const [categoriaActiva, setCategoriaActiva] = useState('todos');
  const [error, setError] = useState('');

  // Diccionario para enlazar los IDs de los platos con tus archivos de imagen importados [1]
  const mapaImagenes = {
    1: imgAvena, 2: imgWaffles, 3: imgTostada, 4: imgAcai, 5: imgMuffins,
    6: imgPudin, 7: imgGarbanzos, 8: imgTrufas, 9: imgBarritas, 10: imgArrozInflado,
    11: imgPancakes, 12: imgSmoothie, 13: imgSalmon, 14: imgParfait, 15: imgWrap,
    16: imgArrozCurry
  };

  const categorias = [
    { id: 'todos', label: '✨ Todos' },
    { id: 'desayunos', label: '🍳 Desayunos' },
    { id: 'snacks', label: '🍎 Snacks' },
    { id: 'pre-entreno', label: '⚡ Pre-Entreno' },
    { id: 'post-entreno', label: '🏆 Post-Entreno' },
  ];

  // Efecto asíncrono para consumir los productos al cargar la pantalla [1]
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

  // Filtrado reactivo en el lado del cliente basado en la data del servidor [1]
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

        {/* Mensaje de error visual en pantalla si el backend se apaga */}
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
          {productosFiltrados.map((producto) => (
            <article key={producto.id} className="perfectfit-card">
              <div className="perfectfit-card-img-wrapper">
                {/* Usamos el mapa para pintar tu imagen local original basándonos en el ID del servidor */}
                <img src={mapaImagenes[producto.id]} alt={producto.name} loading="lazy" />
                <span className="category-badge">{producto.category}</span>
              </div>
              <div className="card-body">
                <h3 className="card-title">{producto.name}</h3>
                <p className="card-description">{producto.description}</p>
                
                <div className="macros-box">
                  💪 <span>Macros: {producto.macros}</span>
                </div>
                <div className="card-footer">
                  <span className="card-price">
                    ${producto.price.toLocaleString('es-CO')}
                  </span>
                  <button
                    type="button"
                    className="btn btn-primary card-btn"
                    onClick={() => console.info(`Producto seleccionado desde el servidor: ${producto.name}`)}
                  >
                    Pedir Fit
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>

        {productosFiltrados.length === 0 && !error && (
          <p className="catalog-empty-message">
            No hay productos disponibles en esta categoría.
          </p>
        )}
      </div>
    </div>
  );
}

export default Catalog;
