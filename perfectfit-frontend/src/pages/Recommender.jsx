import React, { useState } from 'react';
import './Recommender.css';
// Importamos la fuente única de verdad de los platos
import { menuData } from '../data/menuData';
// Imagen de fondo corporativa
import imgFondoRecomendador from '../assets/images/Acai.jpg';

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
      (item) => item.objective === objective && item.price <= maxBudget
    );
    setRecommendations(filtered);
    setSearched(true);
  };

  const formatPrice = (price) => `$${price.toLocaleString('es-CO')} COP`;

  return (
    <div className="recommender-page" style={{ backgroundImage: `url(${imgFondoRecomendador})` }}>
      
      {/* Capa de contraste */}
      <div aria-hidden="true" className="recommender-overlay" />
      
      <main className="recommender-container">
        
        {/* Encabezado */}
        <h1 style={{ textAlign: 'center', marginBottom: '0.8rem', fontSize: 'clamp(2rem, 6vw, 3rem)', color: 'var(--white)', textShadow: '0 2px 10px rgba(0,0,0,0.4)' }}>
          Asesoría de Nutrición IA
        </h1>
        
        <p style={{ textAlign: 'center', marginBottom: '2.5rem', fontFamily: 'var(--font-nav)', color: 'var(--blue-light)', fontSize: '1.05rem', fontWeight: '500', textShadow: '0 1px 5px rgba(0,0,0,0.4)' }}>
          Cuéntanos tus metas del día y nuestro sistema seleccionará opciones del menú que se ajusten a tus preferencias y presupuesto en Cartagena.
        </p>

        {/* Formulario Glassmorphism */}
        <form onSubmit={handleRecommend} className="recommender-glass-form">
          
          {/* Campo: Objetivo */}
          <div style={{ marginBottom: '2rem' }}>
            <label htmlFor="nutrition-objective" style={{ display: 'block', marginBottom: '0.8rem', fontWeight: '700', fontFamily: 'var(--font-nav)', color: 'var(--text-dark)', fontSize: '1.05rem' }}>
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
              style={{ width: '100%', padding: '1rem', borderRadius: '14px', border: '1px solid rgba(0, 0, 0, 0.12)', fontFamily: 'var(--font-body)', fontSize: '0.95rem', color: 'var(--text-dark)', backgroundColor: 'rgba(255, 255, 255, 0.9)' }}
            >
              <option value="">-- Selecciona un objetivo --</option>
              <option value="energia">⚡ Tener energía para entrenar (Pre-Entreno)</option>
              <option value="recuperacion">🏆 Apoyar la recuperación después de entrenar</option>
              <option value="saciedad">🍳 Sentirme satisfecho (Snacks / Desayunos)</option>
            </select>
          </div>

          {/* Campo: Presupuesto */}
          <div style={{ marginBottom: '2rem' }}>
            <label htmlFor="nutrition-budget" style={{ display: 'block', marginBottom: '0.8rem', fontWeight: '700', fontFamily: 'var(--font-nav)', color: 'var(--text-dark)', fontSize: '1.05rem' }}>
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
              style={{ width: '100%', padding: '1rem', borderRadius: '14px', border: '1px solid rgba(0, 0, 0, 0.12)', fontFamily: 'var(--font-body)', fontSize: '0.95rem', color: 'var(--text-dark)', backgroundColor: 'rgba(255, 255, 255, 0.9)' }}
            />
          </div>

          {/* Manejo de Alertas de Validación */}
          {error && (
            <p role="alert" style={{ color: '#9b1c31', fontWeight: '700', marginBottom: '1.25rem' }}>
              {error}
            </p>
          )}

          <button
            type="submit"
            className="btn"
            style={{ width: '100%', padding: '1rem', borderRadius: '30px', fontWeight: '700', fontFamily: 'var(--font-nav)', background: 'linear-gradient(135deg, var(--rose-dark) 0%, var(--rose-medium) 100%)', color: 'var(--white)', border: 'none', cursor: 'pointer', boxShadow: '0 6px 18px rgba(235, 154, 192, 0.45)', transition: 'transform 0.2s ease' }}
            onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
            onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
          >
            Generar Recomendación Inteligente
          </button>
        </form>

        {/* Bloque de Resultados */}
        {searched && (
          <section className="recommendation-results" aria-live="polite" aria-labelledby="recommendation-title">
            <h2 id="recommendation-title" style={{ marginBottom: '1.5rem', textAlign: 'center', color: 'var(--white)', fontSize: 'clamp(1.7rem, 5vw, 2.2rem)', textShadow: '0 2px 8px rgba(0,0,0,0.3)' }}>
              🎯 Platos recomendados para ti
            </h2>
            
            {recommendations.length > 0 ? (
              <>
                <p style={{ color: 'var(--white)', textAlign: 'center', marginBottom: '1.5rem' }}>
                  Encontramos {recommendations.length} {recommendations.length === 1 ? 'opción' : 'opciones'} dentro de tu presupuesto.
                </p>
                <div style={{ display: 'grid', gap: '1.5rem' }}>
                  {recommendations.map((item) => (
                    <article key={item.name} className="recommendation-card">
                      <div className="recommendation-heading">
                        <h3 style={{ margin: 0, fontSize: '1.25rem', color: 'var(--text-dark)', fontFamily: 'var(--font-title)' }}>
                          {item.name}
                        </h3>
                        <span className="recommendation-price">{formatPrice(item.price)}</span>
                      </div>
                      <p style={{ margin: 0, fontSize: '0.95rem', color: '#2d3748', lineHeight: 1.7, fontWeight: '500' }}>
                        {item.description}
                      </p>
                    </article>
                  ))}
                </div>
              </>
            ) : (
              <div className="recommender-alert-box">
                <p style={{ margin: '0 0 0.5rem', fontSize: '1.1rem' }}>No encontramos opciones para tu presupuesto.</p>
                <p style={{ margin: 0 }}>Intenta aumentar el monto disponible para encontrar platos que correspondan a tu objetivo.</p>
              </div>
            )}
          </section>
        )}
      </main>
    </div>
  );
}

export default Recommender;
