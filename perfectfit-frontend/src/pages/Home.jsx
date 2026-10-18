import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Flame, ShieldCheck, Clock, ArrowRight } from 'lucide-react';

// 📷 IMPORTACIÓN DE IMÁGENES CORREGIDA CON TUS RUTAS CORTAS REALES
import imgAvena from '../assets/images/Avena.jpeg';
import imgAcai from '../assets/images/Acai.jpg';
import imgWaffles from '../assets/images/Waffles.jpg';

function Home() {
  const navigate = useNavigate();

  const irAlCatalogo = () => {
    navigate('/catalogo');
    window.scrollTo(0, 0);
  };

  // Muestra estática alineada con tus archivos existentes
  const destacados = [
    { name: "Overnight Oats de Proteína", price: 24900, image: imgAvena, desc: "Avena trasnochada preparada con proteína, semillas de chía y arándanos." },
    { name: "Waffles de Yuca y Clara de Huevo", price: 23900, image: imgWaffles, desc: "Waffles de almidón de yuca y claras de huevo. 100% libres de gluten y livianos." },
    { name: "Bowl de Acaí y Kéfir", price: 29900, image: imgAcai, desc: "Bowl super refrescante elaborado con pulpa de acaí puro, kéfir natural y granola." }
  ];

  return (
    <div className="home-page">
      
      {/* 🏋️ 1. PRESENTACIÓN PRINCIPAL (HERO SECTION) */}
      <header style={{
        background: 'linear-gradient(135deg, var(--blue-light) 0%, var(--rose-light) 100%)',
        padding: '6rem 0',
        textAlign: 'center'
      }}>
        <div className="container">
          <h1 style={{ fontSize: '3.8rem', marginBottom: '1rem', color: 'var(--text-dark)' }}>
            PerfectFit Bowl
          </h1>
          <p style={{ 
            fontFamily: 'var(--font-nav)', 
            fontSize: '1.4rem', 
            fontWeight: '600', 
            maxWidth: '750px', 
            margin: '0 auto 2rem auto',
            color: 'var(--text-dark)'
          }}>
            "Estoy construyendo un estilo de vida y esta cafetería me ayuda a mantenerlo."
          </p>
          <p style={{ maxWidth: '600px', margin: '0 auto 2.5rem auto', fontSize: '1.1rem', color: '#4a5568' }}>
            Olvídate de la falta de tiempo. Te ofrecemos alternativas prácticas organizadas exactamente según el momento de tu rutina diaria en Cartagena.
          </p>
          <button onClick={irAlCatalogo} className="btn btn-primary" style={{ fontSize: '1.1rem', padding: '1rem 2.5rem' }}>
            Ver Menú Inteligente
          </button>
        </div>
      </header>

      {/* 🌟 2. ¿POR QUÉ ELEGIRNOS? */}
      <section style={{ padding: '5rem 0', backgroundColor: 'var(--white)' }}>
        <div className="container">
          <h2 style={{ textAlign: 'center', fontSize: '2.5rem', marginBottom: '3rem' }}>
            ¿Por qué elegirnos?
          </h2>
          
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
            gap: '2.5rem' 
          }}>
            <div style={{ textAlign: 'center', padding: '2rem', borderRadius: 'var(--border-radius)', boxShadow: 'var(--shadow-soft)', background: 'var(--white)' }}>
              <div style={{ display: 'inline-block', padding: '1rem', backgroundColor: 'var(--blue-light)', borderRadius: '50%', marginBottom: '1rem' }}>
                <Clock size={32} color="var(--text-dark)" />
              </div>
              <h3 style={{ marginBottom: '0.5rem', fontSize: '1.3rem' }}>Ahorro de Tiempo</h3>
              <p style={{ fontSize: '0.95rem', color: '#718096' }}>Comida Grab & Go lista para acompañar tus responsabilidades laborales o académicas.</p>
            </div>

            <div style={{ textAlign: 'center', padding: '2rem', borderRadius: 'var(--border-radius)', boxShadow: 'var(--shadow-soft)', background: 'var(--white)' }}>
              <div style={{ display: 'inline-block', padding: '1rem', backgroundColor: 'var(--yellow-light)', borderRadius: '50%', marginBottom: '1rem' }}>
                <Flame size={32} color="var(--text-dark)" />
              </div>
              <h3 style={{ marginBottom: '0.5rem', fontSize: '1.3rem' }}>Nutrición por Momentos</h3>
              <p style={{ fontSize: '0.95rem', color: '#718096' }}>Platos clasificados para tus desayunos, snacks, antes o después de entrenar duro.</p>
            </div>

            <div style={{ textAlign: 'center', padding: '2rem', borderRadius: 'var(--border-radius)', boxShadow: 'var(--shadow-soft)', background: 'var(--white)' }}>
              <div style={{ display: 'inline-block', padding: '1rem', backgroundColor: 'var(--green-light)', borderRadius: '50%', marginBottom: '1rem' }}>
                <ShieldCheck size={32} color="var(--white)" />
              </div>
              <h3 style={{ marginBottom: '0.5rem', fontSize: '1.3rem' }}>Información Transparente</h3>
              <p style={{ fontSize: '0.95rem', color: '#4a5568' }}>Sin engaños. Conoce los ingredientes exactos y aportes nutricionales de cada tazón.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 🥗 3. VISTA PREVIA DEL CATÁLOGO / NUESTROS DESTACADOS */}
      <section style={{ padding: '5rem 0', backgroundColor: 'var(--bg-light)' }}>
        <div className="container">
          <h2 style={{ textAlign: 'center', fontSize: '2.5rem', marginBottom: '1rem' }}>Nuestros Destacados</h2>
          <p style={{ textAlign: 'center', marginBottom: '3rem', fontFamily: 'var(--font-nav)', color: '#718096' }}>
            Una pequeña muestra de las opciones saludables favoritas de nuestra comunidad.
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem', marginBottom: '4rem' }}>
            {destacados.map((plato, index) => (
              <div key={index} style={{ 
                background: 'var(--white)', 
                borderRadius: 'var(--border-radius)', 
                boxShadow: 'var(--shadow-soft)',
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column'
              }}>
                <img src={plato.image} alt={plato.name} style={{ width: '100%', height: '200px', objectFit: 'cover' }} />
                <div style={{ padding: '1.5rem', flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                  <div>
                    <h3 style={{ fontSize: '1.2rem', marginBottom: '0.5rem' }}>{plato.name}</h3>
                    <p style={{ fontSize: '0.9rem', color: '#718096', marginBottom: '1.5rem' }}>{plato.desc}</p>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontWeight: '700', fontSize: '1.15rem' }}>${plato.price.toLocaleString('es-CO')}</span>
                    <span style={{ fontSize: '0.85rem', color: 'var(--rose-dark)', fontWeight: '600', fontFamily: 'var(--font-nav)' }}>Favorito Fit ⭐</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div style={{ textAlign: 'center' }}>
            <button onClick={irAlCatalogo} className="btn btn-secondary" style={{ padding: '1rem 2.5rem', fontSize: '1.1rem', display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
              Explora Nuestro Catálogo Completo <ArrowRight size={18} />
            </button>
          </div>
        </div>
      </section>

      {/* 📣 4. LLAMADO A LA ACCIÓN FINAL */}
      <section style={{ 
        padding: '5rem 0', 
        background: 'linear-gradient(135deg, var(--rose-light) 0%, var(--blue-light) 100%)',
        textAlign: 'center' 
      }}>
        <div className="container">
          <h2 style={{ fontSize: '2.3rem', marginBottom: '1rem' }}>¿Listo para transformar tu alimentación?</h2>
          <p style={{ maxWidth: '600px', margin: '0 auto 2rem auto', fontSize: '1.1rem', fontFamily: 'var(--font-nav)' }}>
            Descubre combinaciones inteligentes diseñadas por expertos para potenciar tu energía y salud en cada momento de tu rutina.
          </p>
          <button onClick={() => { navigate('/contacto'); window.scrollTo(0,0); }} className="btn btn-primary" style={{ padding: '1rem 2.5rem', fontSize: '1.1rem' }}>
            Haz tu pedido desde la Web
          </button>
        </div>
      </section>

    </div>
  );
}

export default Home;
