import React, { useState } from 'react';

function Contact() {
  // Estado local para capturar lo que el cliente escribe en tiempo real
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  const [enviado, setEnviado] = useState(false);

  // Manejador que actualiza el estado cada vez que se presiona una tecla
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // Función para procesar el envío del formulario
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Por ahora simulamos el envío exitoso en la consola del Frontend
    console.log("Datos capturados para enviar a MongoDB:", formData);
    setEnviado(true);
    
    // Limpiamos los campos
    setFormData({ name: '', email: '', phone: '', message: '' });
  };

  return (
    <div className="contact-page" style={{ padding: '4rem 0', background: 'linear-gradient(180deg, var(--white) 0%, var(--blue-light) 100%)' }}>
      <div className="container" style={{ maxWidth: '600px' }}>
        <h1 style={{ textAlign: 'center', marginBottom: '1rem', fontSize: '2.5rem' }}>Escríbenos</h1>
        <p style={{ textAlign: 'center', marginBottom: '3rem', fontFamily: 'var(--font-nav)', color: '#4a5568' }}>
          ¿Tienes dudas sobre los macros, un pedido para tu entrenamiento o sugerencias? Déjanos tu mensaje.
        </p>

        {enviado ? (
          /* Mensaje de éxito dinámico con tus colores saludables */
          <div style={{ 
            background: 'var(--green-light)', 
            color: 'var(--green-dark)', 
            padding: '2rem', 
            borderRadius: 'var(--border-radius)', 
            textAlign: 'center',
            boxShadow: 'var(--shadow-soft)',
            fontWeight: '600'
          }}>
            🎉 ¡Mensaje recibido con éxito! En breve nos pondremos en contacto contigo para coordinar tu pedido fit.
          </div>
        ) : (
          /* Formulario de captura validado */
          <form onSubmit={handleSubmit} style={{ 
            background: 'var(--white)', 
            padding: '2.5rem', 
            borderRadius: 'var(--border-radius)', 
            boxShadow: 'var(--shadow-soft)',
            border: '1px solid var(--blue-medium)'
          }}>
            
            {/* Campo: Nombre */}
            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600', fontFamily: 'var(--font-nav)' }}>Nombre Completo:</label>
              <input 
                type="text" 
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder="Ej. Valeria Méndez"
                style={{ width: '100%', padding: '0.8rem', borderRadius: '8px', border: '1px solid var(--blue-dark)', fontFamily: 'var(--font-body)' }}
              />
            </div>

            {/* Campo: Correo */}
            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600', fontFamily: 'var(--font-nav)' }}>Correo Electrónico:</label>
              <input 
                type="email" 
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="valeria@example.com"
                style={{ width: '100%', padding: '0.8rem', borderRadius: '8px', border: '1px solid var(--blue-dark)', fontFamily: 'var(--font-body)' }}
              />
            </div>

            {/* Campo: Celular */}
            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600', fontFamily: 'var(--font-nav)' }}>Teléfono Celular:</label>
              <input 
                type="tel" 
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
                placeholder="Ej. 3001234567"
                style={{ width: '100%', padding: '0.8rem', borderRadius: '8px', border: '1px solid var(--blue-dark)', fontFamily: 'var(--font-body)' }}
              />
            </div>

            {/* Campo: Mensaje */}
            <div style={{ marginBottom: '2rem' }}>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600', fontFamily: 'var(--font-nav)' }}>Tu Mensaje o Pedido:</label>
              <textarea 
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows="4"
                placeholder="Cuéntanos qué productos deseas o tus restricciones alimentarias..."
                style={{ width: '100%', padding: '0.8rem', borderRadius: '8px', border: '1px solid var(--blue-dark)', fontFamily: 'var(--font-body)', resize: 'none' }}
              ></textarea>
            </div>

            {/* Botón de Envío con tus estilos Rosa-Aesthetic */}
            <button type="submit" className="btn btn-primary" style={{ width: '100%', fontSize: '1.1rem' }}>
              Enviar Mensaje Seguro
            </button>

          </form>
        )}
      </div>
    </div>
  );
}

export default Contact;
