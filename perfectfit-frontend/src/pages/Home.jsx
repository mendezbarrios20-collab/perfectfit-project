import React from 'react';
import { Flame, ShieldCheck, Clock, Award } from 'lucide-react';

function Home() {
  return (
    <div className="home-page">
      {/* 🏋️ SECCIÓN HERO (Presentación Principal) */}
      <header style={{
        background: 'linear-gradient(135deg, var(--blue-light) 0%, var(--rose-light) 100%)',
        padding: '5rem 0',
        textAlign: 'center'
      }}>
        <div className="container">
          <h1 style={{ fontSize: '3.5rem', marginBottom: '1rem', color: 'var(--text-dark)' }}>
            PerfectFit Bowl
          </h1>
          <p style={{ 
            fontFamily: 'var(--font-nav)', 
            fontSize: '1.4rem', 
            fontWeight: '600', 
            maxWidth: '700px', 
            margin: '0 auto 2rem auto',
            color: 'var(--text-dark)'
          }}>
            "Estoy construyendo un estilo de vida y esta cafetería me ayuda a mantenerlo."
          </p>
          <p style={{ maxWidth: '600px', margin: '0 auto 2rem auto', fontSize: '1.1rem' }}>
            Olvídate de la falta de tiempo. Te ofrecemos alternativas prácticas organizadas exactamente según el momento de tu rutina diaria en Cartagena.
          </p>
          <button className="btn btn-primary" style={{ fontSize: '1.1rem' }}>
            Ver Menú Inteligente
          </button>
        </div>
      </header>

      {/* 🌟 SECCIÓN DE BENEFICIOS / PROPUESTA DE VALOR */}
      <section style={{ padding: '5rem 0', backgroundColor: var(--white) }}>
        <div className="container">
          <h2 style={{ textAlign: 'center', fontSize: '2.5rem', marginBottom: '3rem' }}>
            ¿Por qué elegirnos?
          </h2>
          
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
            gap: '2.5rem' 
          }}>
            {/* Beneficio 1 */}
            <div style={{ textAlign: 'center', padding: '1.5rem', borderRadius: 'var(--border-radius)', boxShadow: 'var(--shadow-soft)' }}>
              <div style={{ display: 'inline-block', padding: '1rem', backgroundColor: 'var(--blue-medium)', borderRadius: '50%', marginBottom: '1rem' }}>
                <Clock size={32} color="var(--text-dark)" />
              </div>
              <h3 style={{ marginBottom: '0.5rem' }}>Ahorro de Tiempo</h3>
              <p style={{ fontSize: '0.95rem' }}>Comida Grab & Go lista para acompañar tus responsabilidades laborales o académicas.</p>
            </div>

            {/* Beneficio 2 */}
            <div style={{ textAlign: 'center', padding: '1.5rem', borderRadius: 'var(--border-radius)', boxShadow: 'var(--shadow-soft)' }}>
              <div style={{ display: 'inline-block', padding: '1rem', backgroundColor: 'var(--yellow-medium)', borderRadius: '50%', marginBottom: '1rem' }}>
                <Flame size={32} color="var(--text-dark)" />
              </div>
              <h3 style={{ marginBottom: '0.5rem' }}>Nutrición por Momentos</h3>
              <p style={{ fontSize: '0.95rem' }}>Platos clasificados para tus desayunos, snacks, antes o después de entrenar duro.</p>
            </div>

            {/* Beneficio 3 */}
            <div style={{ textAlign: 'center', padding: '1.5rem', borderRadius: 'var(--border-radius)', boxShadow: 'var(--shadow-soft)' }}>
              <div style={{ display: 'inline-block', padding: '1rem', backgroundColor: 'var(--green-medium)', borderRadius: '50%', marginBottom: '1rem' }}>
                <ShieldCheck size={32} color="var(--white)" />
              </div>
              <h3 style={{ marginBottom: '0.5rem' }}>Información Transparente</h3>
              <p style={{ fontSize: '0.95rem' }}>Sin engaños. Conoce los ingredientes exactos y aportes nutricionales de cada tazón.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;
