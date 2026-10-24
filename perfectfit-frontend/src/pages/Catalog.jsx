import React, { useState } from 'react';
import './Catalog.css';
// Importamos la fuente única de verdad
import { menuData } from '../data/menuData';

function Catalog() {
  const [categoriaActiva, setCategoriaActiva] = useState('todos');

  const categorias = [
    { id: 'todos', label: '✨ Todos' },
    { id: 'desayunos', label: '🍳 Desayunos' },
    { id: 'snacks', label: '🍎 Snacks' },
    { id: 'pre-entreno', label: '⚡ Pre-Entreno' },
    { id: 'post-entreno', label: '🏆 Post-Entreno' },
  ];

  const productosFiltrados =
    categoriaActiva === 'todos'
      ? menuData
      : menuData.filter((producto) => producto.category === categoriaActiva);

  return (
    <div className="catalog-page">
      <div className="container">
        
        <h1 className="catalog-main-title">Nuestro Menú Funcional</h1>
        <p className="catalog-description-top">
          Selecciona el momento de tu rutina para ver las opciones ideales para ti en Cartagena.
        </p>

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
                <img src={producto.image} alt={producto.name} loading="lazy" />
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
                    onClick={() => console.info(`Producto seleccionado: ${producto.name}`)}
                  >
                    Pedir Fit
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>

        {productosFiltrados.length === 0 && (
          <p className="catalog-empty-message">
            No hay productos disponibles en esta categoría.
          </p>
        )}
      </div>
    </div>
  );
}

export default Catalog;
