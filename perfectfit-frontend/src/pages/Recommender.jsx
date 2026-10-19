
import React, { useState } from 'react';
import imgFondoRecomendador from '../assets/images/Acai.jpg';

// Menú local de PerfectFit Bowl
const menuData = [
  { name: 'Overnight Oats de Proteína', objective: 'saciedad', price: 24900, description: 'Avena trasnochada preparada con proteína, semillas de chía y arándanos.' },
  { name: 'Bowl de Acaí y Kéfir', objective: 'saciedad', price: 29900, description: 'Bowl refrescante elaborado con pulpa de acaí puro, kéfir y granola artesanal.' },
  { name: 'Muffins de Huevo, Espinaca y Pavo', objective: 'saciedad', price: 18900, description: 'Muffins individuales de huevo, espinaca baby y pechuga de pavo. Grab & Go.' },
  { name: 'Waffles de Yuca y Clara de Huevo', objective: 'saciedad', price: 23900, description: 'Waffles elaborados con almidón de yuca y claras de huevo. Libre de gluten.' },
  { name: 'Bocaditos de Garbanzos Crujientes', objective: 'saciedad', price: 11900, description: 'Garbanzos horneados en air fryer sazonados con oliva y pimentón ahumado.' },
  { name: 'Pudín de Chía y Coco con Colágeno', objective: 'saciedad', price: 19900, description: 'Pudín elaborado con leche de coco ligera, chía y péptidos de colágeno.' },
  { name: 'Trufas de Almendra y Matcha', objective: 'energia', price: 16900, description: 'Trufas elaboradas con harina de almendras natural, té matcha y sirope de agave.' },
  { name: 'Barritas Energéticas de Dátiles y Café', objective: 'energia', price: 12500, description: 'Barritas compactas de dátiles sin hueso, nueces del nogal y café espresso.' },
  { name: 'Arroz Inflado con Mantequilla de Maní y Banano', objective: 'energia', price: 14900, description: 'Tortitas de arroz inflado acompañadas de mantequilla de maní 100% natural y banano.' },
  { name: 'Pancakes de Banano y Avena', objective: 'energia', price: 21900, description: 'Pancakes ligeros preparados con banano maduro, avena y claras de huevo.' },
  { name: 'Smoothie Cremoso de Proteína y Camote', objective: 'recuperacion', price: 23900, description: 'Batido elaborado con puré de camote cocido y proteína de suero aislada.' },
  { name: 'Bowl de Quinoa, Salmón y Edamame', objective: 'recuperacion', price: 26900, description: 'Plato completo con quinoa cocida, salmón a la plancha, edamame y aguacate.' },
  { name: 'Parfait de Yogur Griego y Cerezas Ácidas', objective: 'recuperacion', price: 18900, description: 'Combinación fresca de yogur griego rico en proteínas y cerezas ácidas.' },
  { name: 'Wrap de Pollo, Hummus y Espinaca', objective: 'recuperacion', price: 28900, description: 'Wrap en tortilla a base de linaza o coco, pechuga de pollo y hummus.' },
  { name: 'Arroz Jasmín con Pavo al Curry y Piña', objective: 'recuperacion', price: 30900, description: 'Plato elaborado con arroz jasmín, pechuga de pavo, curry en polvo y piña natural.' }
];

function Recommender() {
  const [objective, setObjective] = useState('');
  const [budget, setBudget] = useState('');
  const [recommendations, setRecommendations] = useState([]);
  const [searched, setSearched] = useState(false);
  const [error, setError] = useState('');

  const handleRecommend = (e) => {
    e.preventDefault();
    setError('');

    const maxBudget = Number(budget);

    if (!objective) {
      setError('Selecciona tu objetivo nutricional.');
      return;
    }

    if (!budget.trim() || !Number.isFinite(maxBudget) || maxBudget <= 0) {
      setError('Ingresa un presupuesto válido mayor que cero.');
      return;
    }

    const filtered = menuData.filter(
      (item) =>
        item.objective === objective &&
        item.price <= maxBudget
    );

    setRecommendations(filtered);
    setSearched(true);
  };

  const formatPrice = (price) =>
    `$${price.toLocaleString('es-CO')} COP`;

  return (
    <div
      className="recommender-page"
      style={{
        position: 'relative',
        isolation: 'isolate',
        backgroundImage: `url(${imgFondoRecomendador})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center center',
        backgroundRepeat: 'no-repeat',
        padding: 'clamp(2.5rem, 6vw, 5rem) 1rem',
        minHeight: '100vh',
        boxSizing: 'border-box',
        display: 'flex',
        alignItems: 'center'
      }}
    >
      <style>{`
        .recommender-page,
        .recommender-page * {
          box-sizing: border-box;
        }

        .recommender-page input:focus,
        .recommender-page select:focus {
          outline: 2px solid var(--rose-dark, #c65c8b);
          outline-offset: 2px;
        }

        .recommender-page .recommendation-card {
          min-width: 0;
          overflow-wrap: anywhere;
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }

        .recommender-page .recommendation-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 15px 35px rgba(0, 0, 0, 0.25);
        }

        .recommender-page .recommendation-heading {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          flex-wrap: wrap;
          gap: 0.75rem;
          margin-bottom: 0.6rem;
        }

        .recommender-page .recommendation-heading h3 {
          flex: 1 1 220px;
          min-width: 0;
          overflow-wrap: anywhere;
        }

        .recommender-page .recommendation-price {
          flex: 0 1 auto;
          overflow-wrap: anywhere;
        }

        @keyframes recommenderFadeIn {
          from {
            opacity: 0;
            transform: translateY(12px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .recommender-page .recommendation-results {
          animation: recommenderFadeIn 0.5s ease;
        }

        @media (max-width: 480px) {
          .recommender-page .recommendation-card {
            padding: 1.25rem !important;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .recommender-page *,
          .recommender-page *::before,
          .recommender-page *::after {
            animation: none !important;
            transition: none !important;
          }
        }
      `}</style>

      {/* Capa oscura para mejorar la lectura */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'linear-gradient(180deg, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.65) 100%)',
          zIndex: -1
        }}
      />

      <main
        className="container"
        style={{
          width: '100%',
          maxWidth: '650px',
          margin: '0 auto'
        }}
      >
        {/* Encabezado */}
        <h1
          style={{
            textAlign: 'center',
            marginBottom: '0.8rem',
            fontSize: 'clamp(2rem, 6vw, 3rem)',
            lineHeight: 1.2,
            fontFamily: 'var(--font-title)',
            color: 'var(--white)',
            textShadow: '0 2px 10px rgba(0,0,0,0.4)'
          }}
        >
          Asesoría de Nutrición IA
        </h1>

        <p
          style={{
            textAlign: 'center',
            marginBottom: '2.5rem',
            fontFamily: 'var(--font-nav)',
            color: 'var(--blue-light)',
            fontSize: '1.05rem',
            lineHeight: 1.7,
            fontWeight: '500',
            textShadow: '0 1px 5px rgba(0,0,0,0.4)'
          }}
        >
          Cuéntanos tus metas del día y nuestro sistema seleccionará
          opciones del menú que se ajusten a tus preferencias y
          presupuesto en Cartagena.
        </p>

        {/* Formulario con efecto de vidrio */}
        <form
          onSubmit={handleRecommend}
          style={{
            background: 'rgba(255, 255, 255, 0.82)',
            backdropFilter: 'blur(14px)',
            WebkitBackdropFilter: 'blur(14px)',
            padding: 'clamp(1.25rem, 5vw, 3rem)',
            borderRadius: '30px',
            boxShadow: '0 25px 50px rgba(0, 0, 0, 0.3)',
            border: '1px solid rgba(255, 255, 255, 0.5)',
            marginBottom: '3rem'
          }}
        >
          {/* Objetivo nutricional */}
          <div style={{ marginBottom: '2rem' }}>
            <label
              htmlFor="nutrition-objective"
              style={{
                display: 'block',
                marginBottom: '0.8rem',
                fontWeight: '700',
                fontFamily: 'var(--font-nav)',
                color: 'var(--text-dark)',
                fontSize: '1.05rem'
              }}
            >
              ¿Cuál es tu objetivo nutricional de hoy?
            </label>

            <select
              id="nutrition-objective"
              value={objective}
              onChange={(e) => {
                setObjective(e.target.value);
                setSearched(false);
                setError('');
              }}
              required
              style={{
                width: '100%',
                padding: '1rem',
                borderRadius: '14px',
                border: '1px solid rgba(0, 0, 0, 0.12)',
                fontFamily: 'var(--font-body)',
                fontSize: '0.95rem',
                color: 'var(--text-dark)',
                backgroundColor: 'rgba(255, 255, 255, 0.9)'
              }}
            >
              <option value="">-- Selecciona un objetivo --</option>
              <option value="energia">
                ⚡ Tener energía para entrenar (Pre-Entreno)
              </option>
              <option value="recuperacion">
                🏆 Apoyar la recuperación después de entrenar
              </option>
              <option value="saciedad">
                🍳 Sentirme satisfecho (Snacks / Desayunos)
              </option>
            </select>
          </div>

          {/* Presupuesto */}
          <div style={{ marginBottom: '2rem' }}>
            <label
              htmlFor="nutrition-budget"
              style={{
                display: 'block',
                marginBottom: '0.8rem',
                fontWeight: '700',
                fontFamily: 'var(--font-nav)',
                color: 'var(--text-dark)',
                fontSize: '1.05rem'
              }}
            >
              ¿Cuál es tu presupuesto máximo disponible (COP)?
            </label>

            <input
              id="nutrition-budget"
              type="number"
              min="1"
              step="1"
              value={budget}
              onChange={(e) => {
                setBudget(e.target.value);
                setSearched(false);
                setError('');
              }}
              placeholder="Ej. 25000"
              required
              style={{
                width: '100%',
                padding: '1rem',
                borderRadius: '14px',
                border: '1px solid rgba(0, 0, 0, 0.12)',
                fontFamily: 'var(--font-body)',
                fontSize: '0.95rem',
                color: 'var(--text-dark)',
                backgroundColor: 'rgba(255, 255, 255, 0.9)'
              }}
            />
          </div>

          {/* Mensaje de validación */}
          {error && (
            <p
              role="alert"
              style={{
                color: '#9b1c31',
                fontWeight: '700',
                lineHeight: 1.5,
                marginBottom: '1.25rem'
              }}
            >
              {error}
            </p>
          )}

          {/* Botón */}
          <button
            type="submit"
            className="btn"
            style={{
              width: '100%',
              fontSize: 'clamp(0.95rem, 3vw, 1.1rem)',
              padding: '1rem',
              borderRadius: '30px',
              fontWeight: '700',
              fontFamily: 'var(--font-nav)',
              background:
                'linear-gradient(135deg, var(--rose-dark) 0%, var(--rose-medium, #d77fa7) 100%)',
              color: 'var(--white)',
              border: 'none',
              cursor: 'pointer',
              boxShadow: '0 6px 18px rgba(235, 154, 192, 0.45)',
              transition: 'transform 0.2s ease, opacity 0.2s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-2px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
            }}
          >
            Generar Recomendación Inteligente
          </button>
        </form>

        {/* Resultados */}
        {searched && (
          <section
            className="recommendation-results"
            aria-live="polite"
            aria-labelledby="recommendation-title"
          >
            <h2
              id="recommendation-title"
              style={{
                marginBottom: '1.5rem',
                textAlign: 'center',
                color: 'var(--white)',
                fontFamily: 'var(--font-title)',
                fontSize: 'clamp(1.7rem, 5vw, 2.2rem)',
                textShadow: '0 2px 8px rgba(0,0,0,0.3)'
              }}
            >
              🎯 Platos recomendados para ti
            </h2>

            {recommendations.length > 0 ? (
              <>
                <p
                  style={{
                    color: 'var(--white)',
                    textAlign: 'center',
                    marginBottom: '1.5rem',
                    lineHeight: 1.6
                  }}
                >
                  Encontramos {recommendations.length}{' '}
                  {recommendations.length === 1
                    ? 'opción'
                    : 'opciones'}{' '}
                  dentro de tu presupuesto.
                </p>

                <div style={{ display: 'grid', gap: '1.5rem' }}>
                  {recommendations.map((item) => (
                    <article
                      key={item.name}
                      className="recommendation-card"
                      style={{
                        background: 'rgba(255, 255, 255, 0.9)',
                        backdropFilter: 'blur(10px)',
                        WebkitBackdropFilter: 'blur(10px)',
                        padding: '1.8rem',
                        borderRadius: '20px',
                        borderLeft: '6px solid var(--rose-dark)',
                        boxShadow: '0 12px 30px rgba(0,0,0,0.15)'
                      }}
                    >
                      <div className="recommendation-heading">
                        <h3
                          style={{
                            margin: 0,
                            fontSize: '1.25rem',
                            lineHeight: 1.4,
                            color: 'var(--text-dark)',
                            fontFamily: 'var(--font-title)'
                          }}
                        >
                          {item.name}
                        </h3>

                        <span
                          className="recommendation-price"
                          style={{
                            fontWeight: '800',
                            color: 'var(--green-dark)',
                            fontSize: '1.15rem',
                            fontFamily: 'var(--font-nav)'
                          }}
                        >
                          {formatPrice(item.price)}
                        </span>
                      </div>

                      <p
                        style={{
                          margin: 0,
                          fontSize: '0.95rem',
                          color: '#2d3748',
                          lineHeight: 1.7,
                          fontWeight: '500'
                        }}
                      >
                        {item.description}
                      </p>
                    </article>
                  ))}
                </div>
              </>
            ) : (
              <div
                style={{
                  background: 'rgba(255, 254, 196, 0.95)',
                  backdropFilter: 'blur(10px)',
                  color: 'var(--text-dark)',
                  padding: '1.8rem',
                  borderRadius: '20px',
                  textAlign: 'center',
                  fontWeight: '600',
                  lineHeight: 1.7,
                  boxShadow: '0 15px 30px rgba(0,0,0,0.2)',
                  border: '1px solid var(--yellow-dark)'
                }}
              >
                <p style={{ margin: '0 0 0.5rem', fontSize: '1.1rem' }}>
                  No encontramos opciones para tu presupuesto.
                </p>
                <p style={{ margin: 0 }}>
                  Intenta aumentar el monto disponible para encontrar
                  platos que correspondan a tu objetivo.
                </p>
              </div>
            )}
          </section>
        )}
      </main>
    </div>
  );
}

export default Recommender;
