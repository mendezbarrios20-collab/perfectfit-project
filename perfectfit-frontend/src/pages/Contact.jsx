import React, { useState, useEffect } from 'react';
// Importación de estilos independientes
import './Contact.css';
// Imagen de fondo corporativa
import imgFondoContacto from '../assets/images/contacto.jpg';

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [enviado, setEnviado] = useState(false);
  const [tituloAnimado, setTituloAnimado] = useState('');
  
  useEffect(() => {
    const textoCompleto = 'Escríbenos...';
    let index = 0;
    let escribiendo = true;
    
    const ejecutarMaquina = () => {
      if (escribiendo) {
        setTituloAnimado(textoCompleto.slice(0, index + 1));
        index++;
        if (index === textoCompleto.length) {
          escribiendo = false;
          setTimeout(ejecutarMaquina, 2500);
          return;
        }
        setTimeout(ejecutarMaquina, 250);
      } else {
        setTituloAnimado('');
        index = 0;
        escribiendo = true;
        setTimeout(ejecutarMaquina, 500);
      }
    };
    
    ejecutarMaquina();
    return () => { index = 0; };
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
    <div className="contact-page" style={{ backgroundImage: `url(${imgFondoContacto})` }}>
      
      {/* Capa protectora oscura */}
      <div className="contact-overlay" />
      
      <div className="contact-container">
        
        {/* Encabezado Animado */}
        <h1 className="contact-title">
          {tituloAnimado}
          <span className="contact-cursor">|</span>
        </h1>
        
        <p className="contact-subtitle">
          ¿Tienes dudas sobre los macros, un pedido para tu entrenamiento o sugerencias? Déjanos tu mensaje.
        </p>

        {enviado ? (
          <div className="contact-success-card">
            🎉 ¡Mensaje recibido con éxito! En breve nos pondremos en contacto contigo para coordinar tu pedido fit en Cartagena.
          </div>
        ) : (
          
          /* Formulario Glassmorphism */
          <form onSubmit={handleSubmit} className="contact-glass-form">
            
            {/* Campo: Nombre */}
            <div className="form-group">
              <label className="contact-label">Nombre Completo:</label>
              <input 
                type="text" 
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder="Ej. Valeria Méndez"
                className="contact-input"
              />
            </div>

            {/* Campo: Correo */}
            <div className="form-group">
              <label className="contact-label">Correo Electrónico:</label>
              <input 
                type="email" 
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="valeria@example.com"
                className="contact-input"
              />
            </div>

            {/* Campo: Celular */}
            <div className="form-group">
              <label className="contact-label">Teléfono Celular:</label>
              <input 
                type="tel" 
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
                placeholder="Ej. 3001234567"
                className="contact-input"
              />
            </div>

            {/* Campo: Mensaje */}
            <div className="form-group-last">
              <label className="contact-label">Tu Mensaje o Pedido:</label>
              <textarea 
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows="4"
                placeholder="Cuéntanos qué productos deseas o tus restricciones alimentarias..."
                className="contact-textarea"
              ></textarea>
            </div>

            {/* Botón de Envío */}
            <button 
              type="submit" 
              className="contact-submit-btn"
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
