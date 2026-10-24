import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Flame, ShieldCheck, Clock, ArrowRight } from 'lucide-react';
import './Home.css';

// Imágenes reales y logo del negocio
import imgAvena from '../assets/images/Avena.jpeg';
import imgAcai from '../assets/images/Acai.jpg';
import imgWaffles from '../assets/images/Waffles.jpg';
import imgLogo from '../assets/images/logo.jpeg';

// Fondos corporativos
import imgFondoCafeteria from '../assets/images/fondo-cafeteria.jpg';
import imgFondoContacto from '../assets/images/fondo-contacto.jpg';

// Footer
import Footer from './Footer';

function Home() {
  const navigate = useNavigate();
  
  const irAlCatalogo = () => {
    navigate('/catalogo');
    window.scrollTo(0, 0);
  };

  const destacados = [
    {
      name: 'Overnight Oats de Proteína',
      price: 24900,
      image: imgAvena,
      desc: 'Avena trasnochada preparada con proteína, semillas de chía y arándanos.',
    },
    {
      name: 'Waffles de Yuca y Clara de Huevo',
      price: 23900,
      image: imgWaffles,
      desc: 'Waffles de almidón de yuca y claras de huevo. 100% libres de gluten y livianos.',
    },
    {
      name: 'Bowl de Acaí y Kéfir',
      price: 29900,
      image: imgAcai,
      desc: 'Bowl super refrescante elaborado con pulpa de acaí puro, kéfir natural y granola.',
    },
  ];

  return (
    <div className="home-page">
      
      {/* 1. PRESENTACIÓN PRINCIPAL (HERO) */}
      <header className="home-hero" style={{ backgroundImage: `url(${imgFondoCafeteria})` }}>
        <div className="home-hero-overlay" />
        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          <div className="home-hero-content">
            <span className="community-badge">🚀 TU ENTRADA A LA COMUNIDAD SALUDABLE</span>
            <h1 className="home-hero-title">
              PerfectFit <br />
              <span style={{ color: 'var(--rose-light)' }}>Bowl</span>
            </h1>
            <p className="home-hero-tagline">
              "Estoy construyendo un estilo de vida y esta cafetería me ayuda a mantenerlo."
            </p>
            <p className="home-hero-description">
              Olvídate de la falta de tiempo. Te ofrecemos alternativas prácticas
              organizadas exactamente según el momento de tu rutina diaria en Cartagena.
            </p>
            <div className="btn-container">
              <button onClick={irAlCatalogo} className="btn btn-primary hero-btn">
                Ver Menú Inteligente <ArrowRight size={18} />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* 2. QUIÉNES SOMOS */}
      <section className="about-section">
        <div className="container about-card">
          <div className="about-img-wrapper">
            <img src={imgLogo} alt="Logo PerfectFit Bowl" className="about-logo-img" />
          </div>
          <div className="about-text-content">
            <h2 className="about-title">
              Quiénes <span style={{ color: 'var(--rose-dark)' }}>Somos</span>
            </h2>
            <p className="about-paragraph">
              <strong>PerfectFit Bowl</strong>, nace en Cartagena con el propósito de revolucionar la forma en que las personas activas se alimentan. Sabemos que el día a día exige energía, concentración y practicidad, pero no por eso debes sacrificar tu salud ni el sabor.
            </p>
            <p className="about-paragraph">
              No creemos en las dietas restrictivas y aburridas. Diseñamos combinaciones funcionales y deliciosas, estructuradas minuciosamente para cada momento de tu rutina: desde un desayuno energizante hasta la recuperación perfecta post-entrenamiento. ¡Somos el aliado ideal de tus metas diarias!
            </p>
          </div>
        </div>
      </section>

      {/* 3. POR QUÉ ELEGIRNOS Y PRODUCTOS DESTACADOS */}
      <section className="benefits-section">
        <div className="container">
          <h2 className="benefits-title">¿Por qué elegirnos?</h2>
          
          <div className="benefits-grid">
            {/* Beneficio 1 */}
            <div className="benefit-card">
              <div className="benefit-icon-box clock">
                <Clock size={32} color="var(--text-dark)" />
              </div>
              <h3 className="benefit-card-title">Ahorro de Tiempo</h3>
              <p className="benefit-card-desc">
                Comida Grab & Go lista para acompañar tus responsabilidades laborales o académicas.
              </p>
            </div>

            {/* Beneficio 2 */}
            <div className="benefit-card">
              <div className="benefit-icon-box flame">
                <Flame size={32} color="var(--text-dark)" />
              </div>
              <h3 className="benefit-card-title">Nutrición por Momentos</h3>
              <p className="benefit-card-desc">
                Platos clasificados para tus desayunos, snacks, antes o después de entrenar duro.
              </p>
            </div>

            {/* Beneficio 3 */}
            <div className="benefit-card">
              <div className="benefit-icon-box shield">
                <ShieldCheck size={32} color="var(--text-dark)" />
              </div>
              <h3 className="benefit-card-title">Información Transparente</h3>
              <p className="benefit-card-desc">
                Sin engaños. Conoce los ingredientes exactos y aportes nutricionales de cada tazón.
              </p>
            </div>
          </div>

          {/* 4. NUESTROS DESTACADOS */}
          <div className="featured-block">
            <h2 className="benefits-title" style={{ marginBottom: '1rem' }}>Nuestros Destacados</h2>
            <p style={{ textAlign: 'center', marginBottom: '3.5rem', fontFamily: 'var(--font-nav)', color: '#4a5568', fontSize: '1.1rem', fontWeight: '500' }}>
              Una pequeña muestra de las opciones saludables favoritas de nuestra comunidad.
            </p>
            
            <div className="featured-grid">
              {destacados.map((plato) => (
                <div key={plato.name} className="featured-card">
                  <img src={plato.image} alt={plato.name} className="featured-card-img" />
                  <div className="featured-card-body">
                    <div>
                      <h3 className="featured-card-title">{plato.name}</h3>
                      <p className="featured-card-desc">{plato.desc}</p>
                    </div>
                    <div className="featured-card-footer">
                      <span className="featured-card-price">
                        ${plato.price.toLocaleString('es-CO')}
                      </span>
                      <span className="featured-badge">Favorito Fit ⭐</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="center-btn-wrapper">
              <button onClick={irAlCatalogo} className="btn btn-secondary explore-catalog-btn">
                Explora Nuestro Catálogo Completo <ArrowRight size={18} />
              </button>
            </div>
          </div>

        </div>
      </section>

      {/* 5. LLAMADO A LA ACCIÓN FINAL */}
      <section className="home-cta-section" style={{ backgroundImage: `url(${imgFondoContacto})` }}>
        <div className="home-hero-overlay" />
        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          <h2 className="home-cta-title">¿Listo para transformar tu alimentación?</h2>
          <p className="home-cta-desc">
            Descubre combinaciones inteligentes diseñadas por expertos para potenciar tu energía y salud en cada momento de tu rutina.
          </p>
          <button
            onClick={() => {
              navigate('/contacto');
              window.scrollTo(0, 0);
            }}
            className="btn btn-primary home-cta-btn"
          >
            Haz tu pedido desde la Web
          </button>
        </div>
      </section>

      {/* 6. FOOTER */}
      <Footer />
    </div>
  );
}

export default Home;
