import React, { useState, useEffect } from 'react';

// 🏢 TU HERMOSA FOTO DE LA BARRA DE PREPARACIÓN EXTENDIDA DE FONDO
import imgFondoContacto from '../assets/images/contacto.jpg';

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [enviado, setEnviado] = useState(false);

  // 📝 ESTADOS PARA EL BUCLE INFINITO Y PAUSADO DE MÁQUINA DE ESCRIBIR
  const [tituloAnimado, setTituloAnimado] = useState('');
  
  useEffect(() => {
    const textoCompleto = 'Escríbenos...';
    let index = 0;
    let escribiendo = true;

    const ejecutarMaquina = () => {
      if (escribiendo) {
        // Modo Escritura: Va agregando letra por letra de forma más lenta
        setTituloAnimado(textoCompleto.slice(0, index + 1));
        index++;

        // Si ya escribió todo el texto ("Escríbenos...")
        if (index === textoCompleto.length) {
          escribiendo = false;
          // Pausa de 2.5 segundos al final para que el cliente lo lea cómodamente
          setTimeout(ejecutarMaquina, 2500);
          return;
        }
        // Velocidad de escritura más pausada: 250ms por carácter
        setTimeout(ejecutarMaquina, 2500 / 10);
      } else {
        // Modo Borrado: Limpia el texto de golpe para reiniciar el bucle con fuerza
        setTituloAnimado('');
        index = 0;
        escribiendo = true;
        // Pausa de medio segundo antes de volver a empezar a escribir
        setTimeout(ejecutarMaquina, 500);
      }
    };

    // Arranca el bucle inicial
    ejecutarMaquina();

    // Limpieza al salir de la pestaña
    return () => {
      index = 0;
    };
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Datos capturados para enviar a MongoDB:", formData);
    setEnviado(true);
    setFormData({ name: '', email: '', phone: '', message: '' });
  };

  return (
    <div 
      className="contact-page" 
      style={{ 
        position: 'relative',
        backgroundImage: `url(${imgFondoContacto})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center center',
        padding: '5rem 0', 
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        overflow: 'hidden'
      }}
    >
      {/* 🖤 Capa protectora oscura extendida: Tonalidad opaca exacta de la IA */}
      <div 
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'linear-gradient(180deg, rgba(0, 0, 0, 0.55) 0%, rgba(0, 0, 0, 0.65) 100%)',
          zIndex: 1
        }}
      />

      <div className="container" style={{ maxWidth: '650px', position: 'relative', zIndex: 2 }}>
        
        {/* 🪄 ENCABEZADO PRINCIPAL CON BUCLE INFINITO PAUSADO Y CURSOR TITILANTE */}
        <h1 
          style={{ 
            textAlign: 'center', 
            marginBottom: '0.8rem', 
            fontSize: '3.2rem', 
            fontFamily: 'var(--font-title)', 
            color: 'var(--white)', 
            textShadow: '0 2px 10px rgba(0,0,0,0.4)',
            minHeight: '3.8rem' 
          }}
        >
          {tituloAnimado}
          <span style={{
            color: 'var(--rose-light)',
            animation: 'parpadeoCursor 0.8s infinite',
            fontWeight: '300',
            marginLeft: '2px'
          }}>|</span>
        </h1>
        
        {/* Animación CSS local para el cursor parpadeante de escritura */}
        <style>{`
          @keyframes parpadeoCursor {
            0%, 100% { opacity: 1; }
            50% { opacity: 0; }
          }
        `}</style>

        <p style={{ textAlign: 'center', marginBottom: '3.5rem', fontFamily: 'var(--font-nav)', color: 'var(--blue-light)', fontSize: '1.15rem', fontWeight: '500', textShadow: '0 1px 5px rgba(0,0,0,0.4)' }}>
          ¿Tienes dudas sobre los macros, un pedido para tu entrenamiento o sugerencias? Déjanos tu mensaje.
        </p>

        {enviado ? (
          <div style={{ 
            background: 'rgba(188, 244, 203, 0.95)', 
            backdropFilter: 'blur(10px)',
            color: 'var(--green-dark)', 
            padding: '2.5rem', 
            borderRadius: '24px', 
            textAlign: 'center',
            boxShadow: '0 20px 40px rgba(0,0,0,0.25)',
            fontWeight: '700',
            fontSize: '1.2rem',
            border: '1px solid var(--green-medium)'
          }}>
            🎉 ¡Mensaje recibido con éxito! En breve nos pondremos en contacto contigo para coordinar tu pedido fit en Cartagena.
          </div>
        ) : (
          /* 📝 RECUADRO CON EFECTO DE VIDRIO TRASLÚCIDO (GLASSMORPHISM) */
          <form onSubmit={handleSubmit} style={{ 
            background: 'rgba(255, 255, 255, 0.78)', 
            backdropFilter: 'blur(14px)', 
            WebkitBackdropFilter: 'blur(14px)',
            padding: '3.5rem 3rem', 
            borderRadius: '30px', 
            boxShadow: '0 25px 50px rgba(0, 0, 0, 0.3)',
            border: '1px solid rgba(255, 255, 255, 0.4)' 
          }}>
            
            {/* Campo: Nombre */}
            <div style={{ marginBottom: '1.8rem' }}>
              <label style={{ display: 'block', marginBottom: '0.6rem', fontWeight: '700', fontFamily: 'var(--font-nav)', color: 'var(--text-dark)', fontSize: '0.95rem' }}>Nombre Completo:</label>
              <input 
                type="text" 
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder="Ej. Valeria Méndez"
                style={{ width: '100%', padding: '0.9rem 1rem', borderRadius: '12px', border: '1px solid rgba(0, 0, 0, 0.12)', fontFamily: 'var(--font-body)', fontSize: '0.95rem', backgroundColor: 'rgba(255, 255, 255, 0.85)', outline: 'none' }}
              />
            </div>

            {/* Campo: Correo */}
            <div style={{ marginBottom: '1.8rem' }}>
              <label style={{ display: 'block', marginBottom: '0.6rem', fontWeight: '700', fontFamily: 'var(--font-nav)', color: 'var(--text-dark)', fontSize: '0.95rem' }}>Correo Electrónico:</label>
              <input 
                type="email" 
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="valeria@example.com"
                style={{ width: '100%', padding: '0.9rem 1rem', borderRadius: '12px', border: '1px solid rgba(0, 0, 0, 0.12)', fontFamily: 'var(--font-body)', fontSize: '0.95rem', backgroundColor: 'rgba(255, 255, 255, 0.85)', outline: 'none' }}
              />
            </div>

            {/* Campo: Celular */}
            <div style={{ marginBottom: '1.8rem' }}>
              <label style={{ display: 'block', marginBottom: '0.6rem', fontWeight: '700', fontFamily: 'var(--font-nav)', color: 'var(--text-dark)', fontSize: '0.95rem' }}>Teléfono Celular:</label>
              <input 
                type="tel" 
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
                placeholder="Ej. 3001234567"
                style={{ width: '100%', padding: '0.9rem 1rem', borderRadius: '12px', border: '1px solid rgba(0, 0, 0, 0.12)', fontFamily: 'var(--font-body)', fontSize: '0.95rem', backgroundColor: 'rgba(255, 255, 255, 0.85)', outline: 'none' }}
              />
            </div>

            {/* Campo: Mensaje */}
            <div style={{ marginBottom: '2.5rem' }}>
              <label style={{ display: 'block', marginBottom: '0.6rem', fontWeight: '700', fontFamily: 'var(--font-nav)', color: 'var(--text-dark)', fontSize: '0.95rem' }}>Tu Mensaje o Pedido:</label>
              <textarea 
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows="4"
                placeholder="Cuéntanos qué productos deseas o tus restricciones alimentarias..."
                style={{ width: '100%', padding: '0.9rem 1rem', borderRadius: '12px', border: '1px solid rgba(0, 0, 0, 0.12)', fontFamily: 'var(--font-body)', fontSize: '0.95rem', backgroundColor: 'rgba(255, 255, 255, 0.85)', resize: 'none', outline: 'none', lineHeight: '1.6' }}
              ></textarea>
            </div>

            {/* Botón de Envío */}
            <button 
              type="submit" 
              className="btn" 
              style={{ 
                width: '100%', 
                fontSize: '1.1rem',
                padding: '1rem',
                borderRadius: '30px',
                fontWeight: '700',
                fontFamily: 'var(--font-nav)',
                background: 'linear-gradient(135deg, var(--rose-dark) 0%, var(--rose-medium) 100%)',
                color: 'var(--white)',
                border: 'none',
                cursor: 'pointer',
                boxShadow: '0 6px 18px rgba(235, 154, 192, 0.45)',
                transition: 'transform 0.2s ease'
              }}
              onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
              onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
            >
              Enviar Mensaje Seguro
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

export default Contact;
