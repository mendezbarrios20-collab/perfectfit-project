import React, { useState } from 'react';

// Simulamos los primeros platos de tu menú fitness basados en tu idea de negocio
const inicialProducts = [
  {
    id: 1,
    name: "Overnight Oats de Proteína",
    category: "desayunos",
    price: 24900,
    description: "Avena trasnochada preparada con proteína, semillas de chía y arándanos. Energía sostenida y saciedad.",
    macros: "Carbohidratos complejos + Proteína"
  },
  {
    id: 2,
    name: "Waffles de Yuca y Clara de Huevo",
    category: "desayunos",
    price: 23900,
    description: "Waffles elaborados con almidón de yuca y claras de huevo. Alternativa sin gluten de fácil digestión.",
    macros: "Carbohidratos limpios + Proteína magra"
  },
  {
    id: 3,
    name: "Barritas Energéticas de Dátiles y Café",
    category: "pre-entreno",
    price: 12500,
    description: "Barritas elaboradas con dátiles, nueces, café y cacao. Diseñadas para darte energía rápida y estimulación.",
    macros: "Energía rápida + Cafeína"
  },
  {
    id: 4,
    name: "Smoothie Cremoso de Proteína y Camote",
    category: "post-entreno",
    price: 23900,
    description: "Smoothie diseñado para aportar carbohidratos y proteína después del entrenamiento. Apoya la recuperación muscular.",
    macros: "Reposición de glucógeno + Aminoácidos"
  }
];

function Catalog() {
  const [categoriaActiva, setCategoriaActiva] = useState('todos');

  // Filtramos los productos según el botón que presione el usuario
  const productosFiltrados = categoriaActiva === 'todos' 
    ? inicialProducts 
    : inicialProducts.filter(p => p.category === categoriaActiva);

  return (
    <div className="catalog-page" style={{ padding: '3rem 0' }}>
      <div className="container">
        <h1 style={{ textAlign: 'center', marginBottom: '1rem', fontSize: '2.5rem' }}>Nuestro Menú Funcional</h1>
        <p style={{ textAlign: 'center', marginBottom: '3rem', fontFamily: 'var(--font-nav)' }}>
          Selecciona el momento de tu rutina para ver las opciones ideales para ti en Cartagena.
        </p>

        {/* 🎛️ BARRA DE FILTROS INTERACTIVOS */}
        <div style={{ 
          display: 'flex', 
          justifyContent: 'center', 
          gap: '1rem', 
          marginBottom: '3rem',
          flexWrap: 'wrap'
        }}>
          <button onClick={() => setCategoriaActiva('todos')} className="btn" style={{ background: categoriaActiva === 'todos' ? 'var(--rose-dark)' : 'var(--blue-light)', color: categoriaActiva === 'todos' ? 'white' : 'var(--text-dark)' }}>✨ Todos</button>
          <button onClick={() => setCategoriaActiva('desayunos')} className="btn" style={{ background: categoriaActiva === 'desayunos' ? 'var(--rose-dark)' : 'var(--blue-light)', color: categoriaActiva === 'desayunos' ? 'white' : 'var(--text-dark)' }}>🍳 Desayunos</button>
          <button onClick={() => setCategoriaActiva('pre-entreno')} className="btn" style={{ background: categoriaActiva === 'pre-entreno' ? 'var(--rose-dark)' : 'var(--blue-light)', color: categoriaActiva === 'pre-entreno' ? 'white' : 'var(--text-dark)' }}>⚡ Pre-Entreno</button>
          <button onClick={() => setCategoriaActiva('post-entreno')} className="btn" style={{ background: categoriaActiva === 'post-entreno' ? 'var(--rose-dark)' : 'var(--blue-light)', color: categoriaActiva === 'post-entreno' ? 'white' : 'var(--text-dark)' }}>🏆 Post-Entreno</button>
        </div>

        {/* 🗂️ GRID DE TARJETAS DE PRODUCTOS */}
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', 
          gap: '2rem' 
        }}>
          {productosFiltrados.map(producto => (
            <div key={producto.id} style={{ 
              background: 'var(--white)', 
              borderRadius: 'var(--border-radius)', 
              padding: '1.5rem', 
              boxShadow: 'var(--shadow-soft)',
              border: '1px solid var(--blue-light)',
              display: 'flex',
              flexDirection: 'column'
            }}>
              <h3 style={{ marginBottom: '0.5rem', color: 'var(--text-dark)' }}>{producto.name}</h3>
              <p style={{ fontSize: '0.9rem', color: '#718096', marginBottom: '1rem', flexGrow: 1 }}>{producto.description}</p>
              
              <div style={{ background: 'var(--green-light)', padding: '0.5rem', borderRadius: '6px', marginBottom: '1rem', fontSize: '0.85rem', fontWeight: '600', color: 'var(--green-dark)', textAlign: 'center' }}>
                💪 {producto.macros}
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 'auto' }}>
                <span style={{ fontFamily: 'var(--font-nav)', fontWeight: '700', fontSize: '1.2rem', color: 'var(--text-dark)' }}>
                  ${producto.price.toLocaleString('es-CO')}
                </span>
                <button className="btn btn-secondary" style={{ padding: '0.5rem 1rem', fontSize: '0.9rem' }}>Pedir</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Catalog;
