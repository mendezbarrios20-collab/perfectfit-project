import React, { useState } from 'react';
import './Login.css';

// Importación de tu recurso oficial limpio sin textos
import imgLogoCorporate from '../assets/images/solo-logo.jpg';

function Login() {
  const [credentials, setCredentials] = useState({
    username: '',
    password: ''
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value
    });
  };

  const handleLogin = (e) => {
    e.preventDefault();
    setError('');
    
    console.log("Intentando iniciar sesión con:", credentials);
    
    if (credentials.username === 'admin' && credentials.password === 'perfectfit2026') {
      alert("¡Ingreso exitoso al sistema de gestión de PerfectFit Bowl!");
    } else {
      setError('⚠️ Credenciales incorrectas. Verifica el usuario o la contraseña de administración.');
    }
  };

  return (
    <div className="login-page">
      
      {/* Contenedor Flotante de Alta Gama */}
      <div className="login-canvas-container">
        
        {/* Lado Izquierdo: Tu Logo de Marca Libre */}
        <div className="login-logo-canvas">
          <img 
            src={imgLogoCorporate} 
            alt="PerfectFit Bowl Admin Logo" 
            className="login-logo-premium" 
          />
        </div>

        {/* Lado Derecho: Los Campos del Panel de Gestión */}
        <div className="login-form-canvas">
          <form onSubmit={handleLogin}>
            
            <h1 className="login-title">
              Panel <span style={{ color: 'var(--rose-dark)' }}>Interno</span>
            </h1>
            
            <p className="login-subtitle">
              Acceso exclusivo para el administrador de PerfectFit Bowl.
            </p>

            {/* Manejo de Alertas de Error */}
            {error && <div className="login-error-box">{error}</div>}

            {/* Campo: Usuario */}
            <div className="login-field-group">
              <label className="login-label">Usuario Administrador:</label>
              <input 
                type="text" 
                name="username"
                value={credentials.username}
                onChange={handleChange}
                required
                placeholder="Ej. admin"
                className="login-input"
              />
            </div>

            {/* Campo: Contraseña */}
            <div className="login-field-group-last">
              <label className="login-label">Contraseña de Seguridad:</label>
              <input 
                type="password" 
                name="password"
                value={credentials.password}
                onChange={handleChange}
                required
                placeholder="••••••••••••"
                className="login-input"
              />
            </div>

            {/* Botón de Entrada Autenticada */}
            <button type="submit" className="btn btn-secondary login-submit-btn">
              Autenticar Entrada
            </button>

          </form>
        </div>

      </div>

    </div>
  );
}

export default Login;
