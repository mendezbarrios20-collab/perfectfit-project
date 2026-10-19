
import React, { useState } from 'react';

// Importación de imágenes
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

const inicialProducts = [
  // 1. DESAYUNOS
  {
    id: 1,
    name: 'Overnight Oats de Proteína',
    category: 'desayunos',
    price: 24900,
    image: imgAvena,
    description: 'Avena trasnochada preparada con proteína, semillas de chía y arándanos.',
    macros: 'Carbohidratos complejos + Fibra + Proteína',
  },
  {
    id: 2,
    name: 'Waffles de Yuca y Clara de Huevo',
    category: 'desayunos',
    price: 23900,
    image: imgWaffles,
    description: 'Waffles de almidón de yuca y claras de huevo. 100% libres de gluten y livianos.',
    macros: 'Carbohidratos limpios + Proteína magra',
  },
  {
    id: 3,
    name: 'Toast de Masa Madre con Aguacate y Huevo',
    category: 'desayunos',
    price: 26900,
    image: imgTostada,
    description: 'Tostada de masa madre con medio aguacate, huevo poché y semillas de cáñamo.',
    macros: 'Grasas saludables + Proteína de alto valor',
  },
  {
    id: 4,
    name: 'Bowl de Acaí y Kéfir',
    category: 'desayunos',
    price: 29900,
    image: imgAcai,
    description: 'Bowl refrescante elaborado con pulpa de acaí puro, kéfir y granola artesanal.',
    macros: 'Antioxidantes + Probióticos + Fibra',
  },
  {
    id: 5,
    name: 'Muffins de Huevo, Espinaca y Pavo',
    category: 'desayunos',
    price: 18900,
    image: imgMuffins,
    description: 'Muffins individuales de huevo, espinaca baby y pechuga de pavo. Formato Grab & Go.',
    macros: 'Alto aporte proteico + Micronutrientes',
  },

  // 2. SNACKS
  {
    id: 6,
    name: 'Pudín de Chía y Coco con Colágeno',
    category: 'snacks',
    price: 19900,
    image: imgPudin,
    description: 'Pudín elaborado con leche de coco ligera, chía y péptidos de colágeno.',
    macros: 'Fibra soluble + Omega-3 + Colágeno',
  },
  {
    id: 7,
    name: 'Bocaditos de Garbanzos Crujientes',
    category: 'snacks',
    price: 11900,
    image: imgGarbanzos,
    description: 'Garbanzos horneados en air fryer sazonados con oliva y pimentón ahumado.',
    macros: 'Proteína vegetal + Fibra + Magnesio',
  },
  {
    id: 8,
    name: 'Trufas de Almendra y Matcha',
    category: 'snacks',
    price: 16900,
    image: imgTrufas,
    description: 'Trufas elaboradas con harina de almendras natural, té matcha y sirope de agave.',
    macros: 'Grasas saludables + Antioxidantes',
  },

  // 3. PRE-ENTRENO
  {
    id: 9,
    name: 'Barritas Energéticas de Dátiles y Café',
    category: 'pre-entreno',
    price: 12500,
    image: imgBarritas,
    description: 'Barritas compactas de dátiles sin hueso, nueces del nogal y café espresso.',
    macros: 'Energía rápida + Estimulante natural',
  },
  {
    id: 10,
    name: 'Arroz Inflado con Mantequilla de Maní y Banano',
    category: 'pre-entreno',
    price: 14900,
    image: imgArrozInflado,
    description: 'Tortitas de arroz inflado acompañadas de mantequilla de maní 100% natural y banano.',
    macros: 'Carbohidratos rápidos + Potasio',
  },
  {
    id: 11,
    name: 'Pancakes de Banano y Avena',
    category: 'pre-entreno',
    price: 21900,
    image: imgPancakes,
    description: 'Pancakes ligeros preparados con banano maduro, avena y claras de huevo.',
    macros: 'Glucógeno limpio + Digestión óptima',
  },

  // 4. POST-ENTRENO
  {
    id: 12,
    name: 'Smoothie Cremoso de Proteína y Camote',
    category: 'post-entreno',
    price: 23900,
    image: imgSmoothie,
    description: 'Batido elaborado con puré de camote cocido y proteína de suero aislada.',
    macros: 'Reposición de glucógeno + Aminoácidos',
  },
  {
    id: 13,
    name: 'Bowl de Quinoa, Salmón y Edamame',
    category: 'post-entreno',
    price: 26900,
    image: imgSalmon,
    description: 'Plato completo con quinoa cocida, salmón a la plancha, edamame y aguacate.',
    macros: 'Proteína completa + Omega-3',
  },
  {
    id: 14,
    name: 'Parfait de Yogur Griego y Cerezas Ácidas',
    category: 'post-entreno',
    price: 18900,
    image: imgParfait,
    description: 'Combinación fresca de yogur griego rico en proteínas y cerezas ácidas.',
    macros: 'Proteína láctea + Antioxidantes',
  },
  {
    id: 15,
    name: 'Wrap de Pollo, Hummus y Espinaca',
    category: 'post-entreno',
    price: 28900,
    image: imgWrap,
    description: 'Wrap en tortilla a base de linaza o coco, pechuga de pollo y hummus.',
    macros: 'Proteína magra + Grasas saludables',
  },
  {
    id: 16,
    name: 'Arroz Jasmín con Pavo al Curry y Piña',
    category: 'post-entreno',
    price: 30900,
    image: imgArrozCurry,
    description: 'Plato elaborado con arroz jasmín, pechuga de pavo, curry en polvo y piña natural.',
    macros: 'Reposición de glucógeno + Proteína magra',
  },
];

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
      ? inicialProducts
      : inicialProducts.filter(
          (producto) => producto.category === categoriaActiva
        );

  return (
    <div
      className="catalog-page"
      style={{
        padding: '5rem 0',
        backgroundColor: 'rgba(188, 244, 203, 0.15)',
        minHeight: '100vh',
      }}
    >
      <style>{`
        .perfectfit-card {
          background: var(--white);
          border-radius: 20px;
          box-shadow: 0 8px 20px rgba(162, 199, 231, 0.12);
          border: 1px solid rgba(162, 199, 231, 0.15);
          display: flex;
          flex-direction: column;
          overflow: hidden;
          position: relative;
          transition:
            transform 0.3s cubic-bezier(0.25, 0.8, 0.25, 1),
            box-shadow 0.3s ease;
        }

        .perfectfit-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 15px 35px rgba(162, 199, 231, 0.4);
        }

        .perfectfit-card:active {
          transform: translateY(-2px) scale(0.97);
          box-shadow: 0 6px 15px rgba(162, 199, 231, 0.2);
        }

        .perfectfit-card img {
          transition: transform 0.4s ease;
        }

        .perfectfit-card:hover img {
          transform: scale(1.04);
        }

        @media (prefers-reduced-motion: reduce) {
          .perfectfit-card,
          .perfectfit-card img {
            transition: none;
          }

          .perfectfit-card:hover,
          .perfectfit-card:active {
            transform: none;
          }
        }
      `}</style>

      <div className="container">
        {/* Encabezado */}
        <h1
          style={{
            textAlign: 'center',
            marginBottom: '0.8rem',
            fontSize: '3rem',
            fontFamily: 'var(--font-title)',
            color: 'var(--text-dark)',
          }}
        >
          Nuestro Menú Funcional
        </h1>

        <p
          style={{
            textAlign: 'center',
            marginBottom: '4rem',
            fontFamily: 'var(--font-nav)',
            color: '#2d3748',
            fontSize: '1.15rem',
            fontWeight: '500',
          }}
        >
          Selecciona el momento de tu rutina para ver las opciones ideales para ti en Cartagena.
        </p>

        {/* Filtros */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '1rem',
            marginBottom: '4.5rem',
            flexWrap: 'wrap',
          }}
        >
          {categorias.map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => setCategoriaActiva(cat.id)}
              aria-pressed={categoriaActiva === cat.id}
              className="btn"
              style={{
                borderRadius: '30px',
                padding: '0.6rem 1.8rem',
                fontSize: '0.95rem',
                border: '1px solid rgba(162, 199, 231, 0.4)',
                background:
                  categoriaActiva === cat.id
                    ? 'var(--rose-dark)'
                    : 'var(--white)',
                color:
                  categoriaActiva === cat.id
                    ? 'white'
                    : 'var(--text-dark)',
                boxShadow:
                  categoriaActiva === cat.id
                    ? '0 4px 12px rgba(235, 154, 192, 0.3)'
                    : 'var(--shadow-soft)',
                textTransform: 'capitalize',
                cursor: 'pointer',
              }}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Cuadrícula de productos */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '2.5rem',
          }}
        >
          {productosFiltrados.map((producto) => (
            <article
              key={producto.id}
              className="perfectfit-card"
            >
              {/* Imagen */}
              <div
                style={{
                  overflow: 'hidden',
                  height: '220px',
                  position: 'relative',
                }}
              >
                <img
                  src={producto.image}
                  alt={producto.name}
                  loading="lazy"
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    display: 'block',
                  }}
                />

                <span
                  style={{
                    position: 'absolute',
                    top: '1rem',
                    right: '1rem',
                    background: 'rgba(255, 255, 255, 0.9)',
                    padding: '0.3rem 0.8rem',
                    borderRadius: '12px',
                    fontSize: '0.75rem',
                    fontWeight: '700',
                    color: 'var(--text-dark)',
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px',
                    boxShadow: '0 2px 6px rgba(0,0,0,0.05)',
                  }}
                >
                  {producto.category}
                </span>
              </div>

              {/* Información interna */}
              <div
                style={{
                  padding: '1.8rem',
                  display: 'flex',
                  flexDirection: 'column',
                  flexGrow: 1,
                }}
              >
                <h3
                  style={{
                    marginBottom: '0.6rem',
                    color: 'var(--text-dark)',
                    fontSize: '1.35rem',
                    fontFamily: 'var(--font-title)',
                  }}
                >
                  {producto.name}
                </h3>

                <p
                  style={{
                    fontSize: '0.95rem',
                    color: '#4a5568',
                    marginBottom: '1.5rem',
                    flexGrow: 1,
                    lineHeight: '1.6',
                  }}
                >
                  {producto.description}
                </p>

                {/* Bloque de macros */}
                <div
                  style={{
                    background: 'rgba(188, 244, 203, 0.25)',
                    padding: '0.6rem 1rem',
                    borderRadius: '10px',
                    marginBottom: '1.5rem',
                    fontSize: '0.85rem',
                    fontWeight: '700',
                    color: 'var(--green-dark)',
                    textAlign: 'left',
                    border: '1px solid rgba(71, 133, 91, 0.1)',
                  }}
                >
                  💪{' '}
                  <span
                    style={{
                      color: 'var(--text-dark)',
                      fontWeight: '500',
                    }}
                  >
                    Macros: {producto.macros}
                  </span>
                </div>

                {/* Precio y botón */}
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    gap: '0.75rem',
                    paddingTop: '1.2rem',
                    borderTop: '1px solid #edf2f7',
                    flexWrap: 'wrap',
                  }}
                >
                  <span
                    style={{
                      fontFamily: 'var(--font-nav)',
                      fontWeight: '800',
                      fontSize: '1.35rem',
                      color: 'var(--text-dark)',
                    }}
                  >
                    ${producto.price.toLocaleString('es-CO')}
                  </span>

                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={() => {
                      // Próximo paso: conectar con el flujo real de pedidos.
                      console.info(
                        `Producto seleccionado: ${producto.name}`
                      );
                    }}
                    style={{
                      padding: '0.6rem 1.6rem',
                      fontSize: '0.9rem',
                      borderRadius: '30px',
                      boxShadow: '0 4px 10px rgba(235, 154, 192, 0.2)',
                      cursor: 'pointer',
                    }}
                  >
                    Pedir Fit
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>

        {productosFiltrados.length === 0 && (
          <p style={{ textAlign: 'center', padding: '2rem' }}>
            No hay productos disponibles en esta categoría.
          </p>
        )}
      </div>
    </div>
  );
}

export default Catalog;
