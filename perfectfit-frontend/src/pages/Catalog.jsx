import React, { useState } from 'react';

// 📷 IMPORTACIÓN DE IMÁGENES CON TUS NOMBRES EXACTOS DE ARCHIVO
import imgArrozInflado from '../assets/images/Arroz Inflado con Mantequilla de Maní y Banano.jpg';
import imgArrozCurry from '../assets/images/Arroz Jasmín con Pechuga de Pavo al Curry y Piña.jpg';
import imgBarritas from '../assets/images/Barritas Energéticas de Dátiles y Café.jpg';
import imgGarbanzos from '../assets/images/Bocaditos de Garbanzos Crujientes.jpg';
import imgAcai from '../assets/images/Bowl de Acaí y Kéfir.jpg';
import imgSalmon from '../assets/images/Bowl de Quinoa, Salmón y Edamame.jpg';
import imgMuffins from '../assets/images/Muffins de Huevo, Espinaca y Pavo.jpg';
import imgPancakes from '../assets/images/Pancakes de Banano y Avena.jpg';
import imgParfait from '../assets/images/Parfait de Yogur Griego y Cerezas Ácidas con un toque de miel cruda.jpg';
import imgPudin from '../assets/images/Pudín de Chía y Coco con Colágeno.jpg';
import imgSmoothie from '../assets/images/Smoothie Cremoso de Proteína, Camote y Canela.jpg';
import imgTostada from '../assets/images/Toast de Masa Madre con Aguacate y Huevo Poché.jpg';
import imgWaffles from '../assets/images/Waffles de Yuca y Clara de Huevo.jpg';

// ⚠️ ATENCIÓN A LAS EXTENSIONES DIFERENTES (.jpeg y .avif)
import imgAvena from '../assets/images/Overnight Oats de Proteína.jpeg';
import imgTrufas from '../assets/images/Trufas de Almendra y Matcha.jpeg';
import imgWrap from '../assets/images/Wrap de Pollo, Hummus y Espinaca.avif';

const inicialProducts = [
  /* 🍳 1. DESAYUNOS */
  { id: 1, name: "Overnight Oats de Proteína", category: "desayunos", price: 24900, image: imgAvena, description: "Avena trasnochada preparada con proteína, semillas de chía y arándanos.", macros: "Carbohidratos complejos + Fibra + Proteína" },
  { id: 2, name: "Waffles de Yuca y Clara de Huevo", category: "desayunos", price: 23900, image: imgWaffles, description: "Waffles elaborados con almidón de yuca y claras de huevo. Libre de gluten.", macros: "Carbohidratos limpios + Proteína magra" },
  { id: 3, name: "Toast de Masa Madre con Aguacate y Huevo", category: "desayunos", price: 26900, image: imgTostada, description: "Tostada de masa madre con medio aguacate, huevo poché y semillas de cáñamo.", macros: "Grasas saludables + Proteína de alto valor" },
  { id: 4, name: "Bowl de Acaí y Kéfir", category: "desayunos", price: 29900, image: imgAcai, description: "Bowl refrescante elaborado con pulpa de acaí puro, kéfir y granola artesanal.", macros: "Antioxidantes + Probióticos + Fibra" },
  { id: 5, name: "Muffins de Huevo, Espinaca y Pavo", category: "desayunos", price: 18900, image: imgMuffins, description: "Muffins individuales de huevo, espinaca baby y pechuga de pavo. Formato Grab & Go.", macros: "Alto aporte proteico + Micronutrientes" },

  /* 🍎 2. SNACKS */
  { id: 6, name: "Pudín de Chía y Coco con Colágeno", category: "snacks", price: 19900, image: imgPudin, description: "Pudín elaborado con leche de coco ligera, chía y péptidos de colágeno.", macros: "Fibra soluble + Omega-3 + Colágeno" },
  { id: 7, name: "Bocaditos de Garbanzos Crujientes", category: "snacks", price: 11900, image: imgGarbanzos, description: "Garbanzos horneados en air fryer sazonados con oliva y pimentón ahumado.", macros: "Proteína vegetal + Fibra + Magnesio" },
  { id: 8, name: "Trufas de Almendra y Matcha", category: "snacks", price: 16900, image: imgTrufas, description: "Trufas elaboradas con harina de almendras natural, té matcha y sirope de agave.", macros: "Grasas saludables + Antioxidantes" },

  /* ⚡ 3. PRE-ENTRENO */
  { id: 9, name: "Barritas Energéticas de Dátiles y Café", category: "pre-entreno", price: 12500, image: imgBarritas, description: "Barritas compactas de dátiles sin hueso, nueces del nogal y café espresso.", macros: "Energía rápida + Estimulante natural" },
  { id: 10, name: "Arroz Inflado con Mantequilla de Maní y Banano", category: "pre-entreno", price: 14900, image: imgArrozInflado, description: "Tortitas de arroz inflado acompañadas de mantequilla de maní 100% natural y banano.", macros: "Carbohidratos rápidos + Potasio" },
  { id: 11, name: "Pancakes de Banano y Avena", category: "pre-entreno", price: 21900, image: imgPancakes, description: "Pancakes ligeros preparados con banano maduro, avena y claras de huevo.", macros: "Glucógeno limpio + Digestión óptima" },

  /* 🏆 4. POST-ENTRENO */
  { id: 12, name: "Smoothie Cremoso de Proteína y Camote", category: "post-entreno", price: 23900, image: imgSmoothie, description: "Batido elaborado con puré de camote cocido y proteína de suero aislada.", macros: "Reposición de glucógeno + Aminoácidos" },
  { id: 13, name: "Bowl de Quinoa, Salmón y Edamame", category: "post-entreno", price: 26900, image: imgSalmon, description: "Plato completo con quinoa cocida, salmón a la plancha, edamame y aguacate.", macros: "Proteína completa + Omega-3" },
  { id: 14, name: "Parfait de Yogur Griego y Cerezas Ácidas", category: "post-entreno", price: 18900, image: imgParfait, description: "Combinación fresca de yogur griego rico en proteínas y cerezas ácidas.", macros: "Proteína láctea + Antioxidantes" },
  { id: 15, name: "Wrap de Pollo, Hummus y Espinaca", category: "post-entreno", price: 28900, image: imgWrap, description: "Wrap en tortilla a base de linaza o coco, pechuga de pollo y hummus.", macros: "Proteína magra + Grasas saludables" },
  { id: 16, name: "Arroz Jasmín con Pavo al Curry y Piña", category: "post-entreno", price: 30900, image: imgArrozCurry, description: "Plato elaborado con arroz jasmín, pechuga de pavo, curry en polvo y piña natural.", macros: "Reposición de glucógeno + Proteína magra" }
];

function Catalog() {
  const [categoriaActiva, setCategoriaActiva] = useState('todos');

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

        {/* 🎛️ FILTROS */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', marginBottom: '3rem', flexWrap: 'wrap' }}>
          <button onClick={() => setCategoriaActiva('todos')} className="btn" style={{ background: categoriaActiva === 'todos' ? 'var(--rose-dark)' : 'var(--blue-light)', color: categoriaActiva === 'todos' ? 'white' : 'var(--text-dark)' }}>✨ Todos</button>
          <button onClick={() => setCategoriaActiva('desayunos')} className="btn" style={{ background: categoriaActiva === 'desayunos' ? 'var(--rose-dark)' : 'var(--blue-light)', color: categoriaActiva === 'desayunos' ? 'white' : 'var(--text-dark)' }}>🍳 Desayunos</button>
          <button onClick={() => setCategoriaActiva('snacks')} className="btn" style={{ background: categoriaActiva === 'snacks' ? 'var(--rose-dark)' : 'var(--blue-light)', color: categoriaActiva === 'snacks' ? 'white' : 'var(--text-dark)' }}>🍎 Snacks</button>
          <button onClick={() => setCategoriaActiva('pre-entreno')} className="btn" style={{ background: categoriaActiva === 'pre-entreno' ? 'var(--rose-dark)' : 'var(--blue-light)', color: categoriaActiva === 'pre-entreno' ? 'white' : 'var(--text-dark)' }}>⚡ Pre-Entreno</button>
          <button onClick={() => setCategoriaActiva('post-entreno')} className="btn" style={{ background: categoriaActiva === 'post-entreno' ? 'var(--rose-dark)' : 'var(--blue-light)', color: categoriaActiva === 'post-entreno' ? 'white' : 'var(--text-dark)' }}>🏆 Post-Entreno</button>
        </div>

        {/* 🗂️ GRID DE PRODUCTOS */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}>
          {productosFiltrados.map(producto => (
            <div key={producto.id} style={{ 
              background: 'var(--white)', 
              borderRadius: 'var(--border-radius)', 
              boxShadow: 'var(--shadow-soft)',
              border: '1px solid var(--blue-light)',
              display: 'flex',
              flexDirection: 'column',
              overflow: 'hidden'
            }}>
              <img 
                src={producto.image} 
                alt={producto.name} 
                style={{ width: '100%', height: '200px', objectFit: 'cover' }} 
              />
              
              <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
                <h3 style={{ marginBottom: '0.5rem', color: 'var(--text-dark)' }}>{producto.name}</h3>
                <p style={{ fontSize: '0.9rem', color: '#718096', marginBottom: '1rem', flexGrow: 1 }}>{producto.description}</p>
                
                <div style={{ background: 'var(--green-light)', padding: '0.5rem', borderRadius: '6px', marginBottom: '1rem', fontSize: '0.85rem', fontWeight: '600', color: 'var(--green-dark)', textAlign: 'center' }}>
                  💪 {producto.macros}
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontFamily: 'var(--font-nav)', fontWeight: '700', fontSize: '1.2rem', color: 'var(--text-dark)' }}>
                    ${producto.price.toLocaleString('es-CO')}
                  </span>
                  <button className="btn btn-secondary" style={{ padding: '0.5rem 1rem', fontSize: '0.9rem' }}>Pedir</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Catalog;
