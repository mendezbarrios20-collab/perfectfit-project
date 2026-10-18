import React, { useState } from 'react';

// Base de datos local para alimentar el algoritmo de recomendación de IA en el Frontend
const menuData = [
  { name: "Overnight Oats de Proteína", objective: "saciedad", price: 24900, description: "Avena trasnochada preparada con proteína, semillas de chía y arándanos." },
  { name: "Bowl de Acaí y Kéfir", objective: "saciedad", price: 29900, description: "Bowl refrescante elaborado con pulpa de acaí puro, kéfir y granola artesanal." },
  { name: "Muffins de Huevo, Espinaca y Pavo", objective: "saciedad", price: 18900, description: "Muffins individuales de huevo, espinaca baby y pechuga de pavo. Grab & Go." },
  { name: "Waffles de Yuca y Clara de Huevo", objective: "saciedad", price: 23900, description: "Waffles elaborados con almidón de yuca y claras de huevo. Libre de gluten." },
  { name: "Bocaditos de Garbanzos Crujientes", objective: "saciedad", price: 11900, description: "Garbanzos horneados en air fryer sazonados con oliva y pimentón ahumado." },
  { name: "Pudín de Chía y Coco con Colágeno", objective: "saciedad", price: 19900, description: "Pudín elaborado con leche de coco ligera, chía y péptidos de colágeno." },
  { name: "Trufas de Almendra y Matcha", objective: "energia", price: 16900, description: "Trufas elaboradas con harina de almendras natural, té matcha y sirope de agave." },
  { name: "Barritas Energéticas de Dátiles y Café", objective: "energia", price: 12500, description: "Barritas compactas de dátiles sin hueso, nueces del nogal y café espresso." },
  { name: "Arroz Inflado con Mantequilla de Maní y Banano", objective: "energia", price: 14900, description: "Tortitas de arroz inflado acompañadas de mantequilla de maní 100% natural y banano." },
  { name: "Pancakes de Banano y Avena", objective: "energia", price: 21900, description: "Pancakes ligeros preparados con banano maduro, avena y claras de huevo." },
  { name: "Smoothie Cremoso de Proteína y Camote", objective: "recuperacion", price: 23900, description: "Batido elaborado con puré de camote cocido y proteína de suero aislada." },
  { name: "Bowl de Quinoa, Salmón y Edamame", objective: "recuperacion", price: 26900, description: "Plato completo con quinoa cocida, salmón a la plancha, edamame y aguacate." },
  { name: "Parfait de Yogur Griego y Cerezas Ácidas", objective: "recuperacion", price: 18900, description: "Combinación fresca de yogur griego rico en proteínas y cerezas ácidas." },
  { name: "Wrap de Pollo, Hummus y Espinaca", objective: "recuperacion", price: 28900, description: "Wrap en tortilla a base de linaza o coco, pechuga de pollo y hummus." },
  { name: "Arroz Jasmín con Pavo al Curry y Piña", objective: "recuperacion", price: 30900, description: "Plato elaborado con arroz jasmín, pechuga de pavo, curry en polvo y piña natural." }
];

function Recommender() {
  const [objective, setObjective] = useState('');
  const [budget, setBudget] = useState('');
  const [recommendations, setRecommendations] = useState([]);
  const [searched, setSearched] = useState(false);

  const handleRecommend = (e) => {
    e.preventDefault();
    
    // Algoritmo Inteligente de Filtrado Cross-Reference
    const filtered = menuData.filter(item => {
      const matchObjective = objective ? item.objective === objective : true;
      const matchBudget = budget ? item.price <= Number(budget) : true;
      return matchObjective && matchBudget;
    });

    setRecommendations(filtered);
    setSearched(true);
  };

  return (
    <div className="recommender-page" style={{ padding: '4rem 0' }}>
      <div className="container" style={{ maxWidth: '700px' }}>
        <h1 style={{ textAlign: 'center', marginBottom: '1rem', fontSize: '2.5rem' }}>Asesoría de Nutrición IA</h1>
        <p style={{ textAlign: 'center', marginBottom: '3rem', fontFamily: 'var(--font-nav)', color: '#4a5568' }}>
          Cuéntanos tus metas del día y nuestro sistema inteligente seleccionará el tazón perfecto para ti.
        </p>

        {/* 📝 FORMULARIO DE ENTRADA DE DATOS */}
        <form onSubmit={handleRecommend} style={{ 
          background: 'var(--white)', 
          padding: '2.5rem', 
          borderRadius: 'var(--border-radius)', 
          boxShadow: 'var(--shadow-soft)',
          border: '1px solid var(--blue-medium)',
          marginBottom: '3rem'
        }}>
          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600', fontFamily: 'var(--font-nav)' }}>¿Cuál es tu objetivo nutricional de hoy?</label>
            <select 
              value={objective} 
              onChange={(e) => setObjective(e.target.value)}
              required
              style={{ width: '100%', padding: '0.8rem', borderRadius: '8px', border: '1px solid var(--blue-dark)', fontFamily: 'var(--font-body)' }}
            >
              <option value="">-- Selecciona un objetivo --</option>
              <option value="energia">⚡ Tener energía rápida para entrenar duro (Pre-Entreno)</option>
              <option value="recuperacion">🏆 Recuperar mis músculos y glucógeno (Post-Entreno)</option>
              <option value="saciedad">🍳 Sentirme lleno y controlar la ansiedad (Snacks / Desayunos)</option>
            </select>
          </div>

          <div style={{ marginBottom: '2rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600', fontFamily: 'var(--font-nav)' }}>¿Cuál es tu presupuesto máximo disponible? (COP):</label>
            <input 
              type="number" 
              value={budget} 
              onChange={(e) => setBudget(e.target.value)}
              placeholder="Ej. 25000"
              required
              style={{ width: '100%', padding: '0.8rem', borderRadius: '8px', border: '1px solid var(--blue-dark)', fontFamily: 'var(--font-body)' }}
            />
          </div>

          <button type="submit" className="btn btn-primary" style={{ width: '100%', fontSize: '1.1rem' }}>
            Generar Recomendación Inteligente
          </button>
        </form>

        {/* 🎯 SECCIÓN DE RESULTADOS DE IA */}
        {searched && (
          <div>
            <h2 style={{ marginBottom: '1.5rem', textAlign: 'center' }}>🎯 Platos Recomendados para ti</h2>
            {recommendations.length > 0 ? (
              <div style={{ display: 'grid', gap: '1.5rem' }}>
                {recommendations.map((item, index) => (
                  <div key={index} style={{ background: 'var(--white)', padding: '1.5rem', borderRadius: 'var(--border-radius)', borderLeft: '6px solid var(--rose-dark)', boxShadow: 'var(--shadow-soft)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                      <h3 style={{ fontSize: '1.2rem' }}>{item.name}</h3>
                      <span style={{ fontWeight: '700', color: 'var(--green-dark)' }}>${item.price.toLocaleString('es-CO')}</span>
                    </div>
                    <p style={{ fontSize: '0.9rem', color: '#718096' }}>{item.description}</p>
                  </div>
                ))}
              </div>
            ) : (
              <div style={{ background: 'var(--yellow-light)', color: 'var(--text-dark)', padding: '1.5rem', borderRadius: 'var(--border-radius)', textAlign: 'center', fontWeight: '600' }}>
                ❌ No encontramos platos que se ajusten exactamente a ese presupuesto tan bajo para el objetivo seleccionado. Intenta subir el monto.
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default Recommender;
