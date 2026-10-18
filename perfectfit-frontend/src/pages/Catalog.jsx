import React, { useState } from 'react';

// Catálogo completo oficial de PerfectFit Bowl con las 16 recetas reales
const inicialProducts = [
  /* 🍳 1. DESAYUNOS */
  {
    id: 1,
    name: "Overnight Oats de Proteína",
    category: "desayunos",
    price: 24900,
    description: "Avena trasnochada preparada con proteína, semillas de chía y arándanos. Energía sostenida y saciedad por la mañana.",
    macros: "Carbohidratos complejos + Fibra + Proteína"
  },
  {
    id: 2,
    name: "Waffles de Yuca y Clara de Huevo",
    category: "desayunos",
    price: 23900,
    description: "Waffles elaborados con almidón de yuca y claras de huevo. Una alternativa libre de gluten y de muy fácil digestión.",
    macros: "Carbohidratos limpios + Proteína magra"
  },
  {
    id: 3,
    name: "Toast de Masa Madre con Aguacate y Huevo",
    category: "desayunos",
    price: 26900,
    description: "Tostada de masa madre con medio aguacate, huevo poché, semillas de cáñamo y hojuelas de chile.",
    macros: "Grasas saludables + Proteína de alto valor biológico"
  },
  {
    id: 4,
    name: "Bowl de Acaí y Kéfir",
    category: "desayunos",
    price: 29900,
    description: "Bowl refrescante elaborado con pulpa de acaí puro, kéfir, granola artesanal baja en azúcar, fresas y semillas de calabaza.",
    macros: "Antioxidantes + Probióticos + Fibra"
  },
  {
    id: 5,
    name: "Muffins de Huevo, Espinaca y Pavo",
    category: "desayunos",
    price: 18900,
    description: "Muffins individuales de huevo, espinaca baby, pechuga de pavo y champiñones. Formato ideal tipo Grab & Go.",
    macros: "Alto aporte proteico + Micronutrientes esenciales"
  },

  /* 🍎 2. SNACKS */
  {
    id: 6,
    name: "Pudín de Chía y Coco con Colágeno",
    category: "snacks",
    price: 19900,
    description: "Pudín elaborado con leche de coco ligera, semillas de chía, péptidos de colágeno hidrolizado y canela.",
    macros: "Fibra soluble + Omega-3 + Colágeno"
  },
  {
    id: 7,
    name: "Bocaditos de Garbanzos Crujientes",
    category: "snacks",
    price: 11900,
    description: "Garbanzos horneados en air fryer sazonados con aceite de oliva extra virgen, pimentón ahumado y ajo en polvo.",
    macros: "Proteína vegetal + Fibra + Magnesio"
  },
  {
    id: 8,
    name: "Chips de Kale con Levadura Nutricional",
    category: "snacks",
    price: 14900,
    description: "Hojas de kale crujientes horneadas con aceite de aguacate, levadura nutricional y sal rosa del Himalaya.",
    macros: "Vitaminas A, C, K + Complejo B"
  },
  {
    id: 9,
    name: "Trufas de Almendra y Matcha",
    category: "snacks",
    price: 16900,
    description: "Pequeñas trufas elaboradas con harina y mantequilla de almendras natural, té matcha en polvo y un toque de sirope de agave.",
    macros: "Grasas saludables + Antioxidantes + Concentración"
  },

  /* ⚡ 3. PRE-ENTRENO */
  {
    id: 10,
    name: "Barritas Energéticas de Dátiles y Café",
    category: "pre-entreno",
    price: 12500,
    description: "Barritas compactas de dátiles sin hueso, nueces del nogal, café espresso en polvo y cacao puro sin azúcar.",
    macros: "Energía rápida + Estimulante natural"
  },
  {
    id: 11,
    name: "Arroz Inflado con Mantequilla de Maní y Banano",
    category: "pre-entreno",
    price: 14900,
    description: "Tortitas de arroz inflado acompañadas de mantequilla de maní 100% natural, rodajas de banano y sésamo negro.",
    macros: "Carbohidratos de rápida absorción + Potasio"
  },
  {
    id: 12,
    name: "Pancakes de Banano y Avena",
    category: "pre-entreno",
    price: 21900,
    description: "Pancakes ligeros preparados con banano maduro, harina de avena de grano entero y claras de huevo.",
    macros: "Glucógeno limpio + Digestión óptima"
  },

  /* 🏆 4. POST-ENTRENO */
  {
    id: 13,
    name: "Smoothie Cremoso de Proteína y Camote",
    category: "post-entreno",
    price: 23900,
    description: "Batido elaborado con puré de camote cocido, proteína de suero aislada (Whey Isolate), leche de almendras y canela.",
    macros: "Reposición de glucógeno + Aminoácidos de absorción rápida"
  },
  {
    id: 14,
    name: "Bowl de Quinoa, Salmón y Edamame",
    category: "post-entreno",
    price: 26900,
    description: "Plato completo con quinoa cocida, salmón a la plancha, edamame y aguacate, con un aderezo ligero de soya baja en sodio.",
    macros: "Proteína completa + Omega-3 cardioprotector"
  },
  {
    id: 15,
    name: "Parfait de Yogur Griego y Cerezas Ácidas",
    category: "post-entreno",
    price: 18900,
    description: "Combinación fresca de yogur griego natural rico en proteínas, cerezas ácidas, semillas de cáñamo y un toque de miel cruda.",
    macros: "Proteína láctea + Antioxidantes post-esfuerzo"
  },
  {
    id: 16,
    name: "Wrap de Pollo, Hummus y Espinaca",
    category: "post-entreno",
    price: 28900,
    description: "Wrap en tortilla a base de linaza o coco, relleno de pechuga de pollo desmechada, hummus artesanal, espinaca fresca y tomate.",
    macros: "Proteína magra + Fibra saciante + Grasas saludables"
  }
];

function Catalog() {
  const [categoriaActiva, setCategoriaActiva] = useState('todos');

  // Filtrado de las 16 opciones
  const productosFiltrados = categoriaActiva === 'todos' 
    ? inicialProducts 
    : inicialProducts.filter(p => p.category === categoriaActiva);

  return (
    <div className="catalog-page" style={{ padding: '3rem 0' }}>
      <div className="container">
        <h1 style={{ textAlign: 'center', marginBottom: '1rem', fontSize: '2.5rem' }}>Nuestro Menú Funcional</h1>
        <p style={{ textAlign: 'center', marginBottom: '3rem', fontFamily: 'var(--font-nav)', color: '#4a5568' }}>
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
          <button onClick={() => setCategoriaActiva('snacks')} className="btn" style={{ background: categoriaActiva === 'snacks' ? 'var(--rose-dark)' : 'var(--blue-light)', color: categoriaActiva === 'snacks' ? 'white' : 'var(--text-dark)' }}>🍎 Snacks</button>
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
