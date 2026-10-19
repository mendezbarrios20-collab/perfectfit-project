
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Flame, ShieldCheck, Clock, ArrowRight } from 'lucide-react';

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
      {/* 1. PRESENTACIÓN PRINCIPAL */}
      <header
        style={{
          position: 'relative',
          backgroundImage: `url(${imgFondoCafeteria})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center center',
          padding: '8rem 0',
          display: 'flex',
          alignItems: 'center',
          minHeight: '85vh',
          borderBottom: '1px solid var(--blue-medium)',
          overflow: 'hidden',
        }}
      >
        {/* Oscurece el fondo sin desenfocarlo */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background:
              'linear-gradient(180deg, rgba(0, 0, 0, 0.55) 0%, rgba(0, 0, 0, 0.65) 100%)',
            zIndex: 1,
          }}
        />

        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          <div style={{ maxWidth: '640px', textAlign: 'left' }}>
            <span
              style={{
                backgroundColor: 'var(--rose-dark)',
                color: 'var(--white)',
                padding: '0.6rem 1.2rem',
                borderRadius: '20px',
                fontSize: '0.85rem',
                fontWeight: '700',
                fontFamily: 'var(--font-nav)',
                letterSpacing: '1px',
                display: 'inline-block',
                marginBottom: '1.5rem',
                boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
              }}
            >
              🚀 TU ENTRADA A LA COMUNIDAD SALUDABLE
            </span>

            <h1
              style={{
                fontSize: '4.5rem',
                lineHeight: '1.05',
                marginBottom: '1.5rem',
                color: 'var(--white)',
                fontFamily: 'var(--font-title)',
                textShadow: '0 2px 10px rgba(0,0,0,0.4)',
              }}
            >
              PerfectFit <br />
              <span style={{ color: 'var(--rose-light)' }}>Bowl</span>
            </h1>

            <p
              style={{
                fontFamily: 'var(--font-nav)',
                fontSize: '1.3rem',
                fontWeight: '600',
                color: 'var(--blue-light)',
                marginBottom: '1rem',
                fontStyle: 'italic',
                textShadow: '0 1px 5px rgba(0,0,0,0.3)',
              }}
            >
              "Estoy construyendo un estilo de vida y esta cafetería me ayuda a mantenerlo."
            </p>

            <p
              style={{
                fontSize: '1.15rem',
                lineHeight: '1.6',
                color: '#e2e8f0',
                marginBottom: '2.5rem',
                borderLeft: '4px solid var(--rose-dark)',
                paddingLeft: '1rem',
                fontWeight: '500',
                textShadow: '0 1px 4px rgba(0,0,0,0.3)',
              }}
            >
              Olvídate de la falta de tiempo. Te ofrecemos alternativas prácticas
              organizadas exactamente según el momento de tu rutina diaria en Cartagena.
            </p>

            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              <button
                onClick={irAlCatalogo}
                className="btn btn-primary"
                style={{
                  fontSize: '1.05rem',
                  padding: '1rem 2.5rem',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  borderRadius: '30px',
                  boxShadow: '0 6px 20px rgba(235, 154, 192, 0.4)',
                }}
              >
                Ver Menú Inteligente <ArrowRight size={18} />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* 2. QUIÉNES SOMOS */}
      <section style={{ padding: '6rem 0', backgroundColor: '#f7fafc' }}>
        <div
          className="container"
          style={{
            backgroundColor: 'var(--white)',
            borderRadius: '24px',
            padding: '3.5rem',
            boxShadow: '0 20px 40px rgba(162, 199, 231, 0.2)',
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            gap: '4rem',
            flexWrap: 'wrap',
            border: '1px solid rgba(162, 199, 231, 0.15)',
          }}
        >
          <div
            style={{
              flex: '1 1 350px',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <img
              src={imgLogo}
              alt="Logo PerfectFit Bowl"
              style={{
                width: '100%',
                maxWidth: '400px',
                height: 'auto',
                objectFit: 'contain',
                borderRadius: '18px',
                boxShadow: '0 10px 25px rgba(0,0,0,0.04)',
              }}
            />
          </div>

          <div
            style={{
              flex: '1.5 1 450px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
            }}
          >
            <h2
              style={{
                fontSize: '3rem',
                marginBottom: '1.5rem',
                color: 'var(--text-dark)',
                fontFamily: 'var(--font-title)',
              }}
            >
              Quiénes <span style={{ color: 'var(--rose-dark)' }}>Somos</span>
            </h2>

            <p
              style={{
                fontSize: '1.15rem',
                marginBottom: '1.2rem',
                color: '#4a5568',
                textAlign: 'justify',
                lineHeight: '1.7',
                fontFamily: 'var(--font-body)',
              }}
            >
              En <strong>PerfectFit Bowl</strong> (catálogo bajo nuestro concepto{' '}
              <em>Frutofeel</em>), nacimos en Cartagena con el propósito de
              revolucionar la forma en que las personas activas se alimentan.
              Sabemos que el día a día exige energía, concentración y practicidad,
              pero no por eso debes sacrificar tu salud ni el sabor.
            </p>

            <p
              style={{
                fontSize: '1.15rem',
                color: '#4a5568',
                textAlign: 'justify',
                lineHeight: '1.7',
                fontFamily: 'var(--font-body)',
              }}
            >
              No creemos en las dietas restrictivas y aburridas. Diseñamos
              combinaciones funcionales y deliciosas, estructuradas minuciosamente
              para cada momento de tu rutina: desde un desayuno energizante hasta
              la recuperación perfecta post-entrenamiento. ¡Somos el aliado ideal
              de tus metas diarias!
            </p>
          </div>
        </div>
      </section>

      {/* 3. POR QUÉ ELEGIRNOS Y PRODUCTOS DESTACADOS */}
      <section
        style={{
          padding: '6rem 0',
          backgroundColor: 'rgba(188, 244, 203, 0.2)',
          borderBottom: '1px solid rgba(130, 194, 148, 0.15)',
        }}
      >
        <div className="container">
          <h2
            style={{
              textAlign: 'center',
              fontSize: '2.8rem',
              marginBottom: '3.5rem',
              color: 'var(--text-dark)',
              fontFamily: 'var(--font-title)',
            }}
          >
            ¿Por qué elegirnos?
          </h2>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
              gap: '2.5rem',
            }}
          >
            {/* Beneficio 1 */}
            <div
              style={{
                textAlign: 'center',
                padding: '2.5rem 2rem',
                borderRadius: 'var(--border-radius)',
                boxShadow: 'var(--shadow-soft)',
                background: 'var(--white)',
                border: '1px solid rgba(162, 199, 231, 0.2)',
              }}
            >
              <div
                style={{
                  display: 'inline-block',
                  padding: '1rem',
                  backgroundColor: 'var(--blue-light)',
                  borderRadius: '50%',
                  marginBottom: '1.5rem',
                }}
              >
                <Clock size={32} color="var(--text-dark)" />
              </div>

              <h3
                style={{
                  marginBottom: '0.8rem',
                  fontSize: '1.4rem',
                  color: 'var(--text-dark)',
                }}
              >
                Ahorro de Tiempo
              </h3>

              <p style={{ fontSize: '1rem', color: '#4a5568', lineHeight: '1.6' }}>
                Comida Grab & Go lista para acompañar tus responsabilidades
                laborales o académicas.
              </p>
            </div>

            {/* Beneficio 2 */}
            <div
              style={{
                textAlign: 'center',
                padding: '2.5rem 2rem',
                borderRadius: 'var(--border-radius)',
                boxShadow: 'var(--shadow-soft)',
                background: 'var(--white)',
                border: '1px solid rgba(162, 199, 231, 0.2)',
              }}
            >
              <div
                style={{
                  display: 'inline-block',
                  padding: '1rem',
                  backgroundColor: 'var(--yellow-medium)',
                  borderRadius: '50%',
                  marginBottom: '1.5rem',
                }}
              >
                <Flame size={32} color="var(--text-dark)" />
              </div>

              <h3
                style={{
                  marginBottom: '0.8rem',
                  fontSize: '1.4rem',
                  color: 'var(--text-dark)',
                }}
              >
                Nutrición por Momentos
              </h3>

              <p style={{ fontSize: '1rem', color: '#4a5568', lineHeight: '1.6' }}>
                Platos clasificados para tus desayunos, snacks, antes o después de
                entrenar duro.
              </p>
            </div>

            {/* Beneficio 3 */}
            <div
              style={{
                textAlign: 'center',
                padding: '2.5rem 2rem',
                borderRadius: 'var(--border-radius)',
                boxShadow: 'var(--shadow-soft)',
                background: 'var(--white)',
                border: '1px solid rgba(162, 199, 231, 0.2)',
              }}
            >
              <div
                style={{
                  display: 'inline-block',
                  padding: '1rem',
                  backgroundColor: 'var(--green-light)',
                  borderRadius: '50%',
                  marginBottom: '1.5rem',
                }}
              >
                <ShieldCheck size={32} color="var(--text-dark)" />
              </div>

              <h3
                style={{
                  marginBottom: '0.8rem',
                  fontSize: '1.4rem',
                  color: 'var(--text-dark)',
                }}
              >
                Información Transparente
              </h3>

              <p style={{ fontSize: '1rem', color: '#4a5568', lineHeight: '1.6' }}>
                Sin engaños. Conoce los ingredientes exactos y aportes nutricionales
                de cada tazón.
              </p>
            </div>
          </div>

          {/* 4. NUESTROS DESTACADOS */}
          <div style={{ marginTop: '6rem' }}>
            <h2
              style={{
                textAlign: 'center',
                fontSize: '2.8rem',
                marginBottom: '1rem',
                color: 'var(--text-dark)',
                fontFamily: 'var(--font-title)',
              }}
            >
              Nuestros Destacados
            </h2>

            <p
              style={{
                textAlign: 'center',
                marginBottom: '3.5rem',
                fontFamily: 'var(--font-nav)',
                color: '#4a5568',
                fontSize: '1.1rem',
                fontWeight: '500',
              }}
            >
              Una pequeña muestra de las opciones saludables favoritas de nuestra
              comunidad.
            </p>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                gap: '2.5rem',
                marginBottom: '4rem',
              }}
            >
              {destacados.map((plato) => (
                <div
                  key={plato.name}
                  style={{
                    background: 'var(--white)',
                    borderRadius: 'var(--border-radius)',
                    boxShadow: 'var(--shadow-soft)',
                    overflow: 'hidden',
                    display: 'flex',
                    flexDirection: 'column',
                    border: '1px solid rgba(130, 194, 148, 0.2)',
                  }}
                >
                  <img
                    src={plato.image}
                    alt={plato.name}
                    style={{
                      width: '100%',
                      height: '220px',
                      objectFit: 'cover',
                    }}
                  />

                  <div
                    style={{
                      padding: '1.8rem',
                      flexGrow: 1,
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between',
                    }}
                  >
                    <div>
                      <h3
                        style={{
                          fontSize: '1.3rem',
                          marginBottom: '0.6rem',
                          color: 'var(--text-dark)',
                        }}
                      >
                        {plato.name}
                      </h3>

                      <p
                        style={{
                          fontSize: '0.95rem',
                          color: '#718096',
                          marginBottom: '1.5rem',
                          lineHeight: '1.6',
                        }}
                      >
                        {plato.desc}
                      </p>
                    </div>

                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        gap: '0.75rem',
                        flexWrap: 'wrap',
                        paddingTop: '1rem',
                        borderTop: '1px solid #edf2f7',
                      }}
                    >
                      <span
                        style={{
                          fontWeight: '800',
                          fontSize: '1.25rem',
                          color: 'var(--text-dark)',
                        }}
                      >
                        ${plato.price.toLocaleString('es-CO')}
                      </span>

                      <span
                        style={{
                          fontSize: '0.85rem',
                          backgroundColor: 'var(--rose-light)',
                          color: 'var(--text-dark)',
                          padding: '0.4rem 0.8rem',
                          borderRadius: '12px',
                          fontWeight: '700',
                          fontFamily: 'var(--font-nav)',
                        }}
                      >
                        Favorito Fit ⭐
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div style={{ textAlign: 'center' }}>
              <button
                onClick={irAlCatalogo}
                className="btn btn-secondary"
                style={{
                  padding: '1rem 2.5rem',
                  fontSize: '1.1rem',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  boxShadow: 'var(--shadow-soft)',
                }}
              >
                Explora Nuestro Catálogo Completo
                <ArrowRight size={18} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 5. LLAMADO A LA ACCIÓN FINAL */}
      <section
        style={{
          position: 'relative',
          backgroundImage: `url(${imgFondoContacto})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center center',
          padding: '6rem 0',
          textAlign: 'center',
          overflow: 'hidden',
        }}
      >
        {/* Capa oscura: mantiene la imagen nítida */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background:
              'linear-gradient(180deg, rgba(0, 0, 0, 0.55) 0%, rgba(0, 0, 0, 0.65) 100%)',
            zIndex: 1,
          }}
        />

        <div
          className="container"
          style={{ position: 'relative', zIndex: 2 }}
        >
          <h2
            style={{
              fontSize: '2.8rem',
              marginBottom: '1.2rem',
              color: 'var(--white)',
              fontFamily: 'var(--font-title)',
              textShadow: '0 2px 8px rgba(0,0,0,0.5)',
            }}
          >
            ¿Listo para transformar tu alimentación?
          </h2>

          <p
            style={{
              maxWidth: '650px',
              margin: '0 auto 2.5rem auto',
              fontSize: '1.25rem',
              fontFamily: 'var(--font-nav)',
              color: 'var(--blue-light)',
              fontWeight: '600',
              lineHeight: '1.6',
              textShadow: '0 1px 5px rgba(0,0,0,0.4)',
            }}
          >
            Descubre combinaciones inteligentes diseñadas por expertos para
            potenciar tu energía y salud en cada momento de tu rutina.
          </p>

          <button
            onClick={() => {
              navigate('/contacto');
              window.scrollTo(0, 0);
            }}
            className="btn btn-primary"
            style={{
              padding: '1.1rem 3.2rem',
              fontSize: '1.15rem',
              borderRadius: '30px',
              fontWeight: '700',
              boxShadow: '0 8px 25px rgba(235, 154, 192, 0.45)',
            }}
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
