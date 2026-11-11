import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Login.css';
import imgLogoCorporate from '../assets/images/solo-logo.jpg';

function Login() {
  // Estado local usando tus variables de credenciales originales
  const [credentials, setCredentials] = useState({
    username: '', // Tu formulario usa 'username' en el input
    password: ''
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(''); // Limpiamos alertas previas

    try {
      // Disparamos la petición POST al backend modular en el puerto 5000
      // Enviamos credentials.username como el email que espera el servidor
      const respuesta = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: credentials.username,
          password: credentials.password
        })
      });
      const datos = await respuesta.json();

      if (!respuesta.ok || !datos.success) {
        throw new Error(datos.error || 'No se pudo iniciar sesión.');
      }

      if (datos.success) {
        console.log("¡Ingreso exitoso al sistema de gestión!", datos);
        
        // El backend valida este token al recibir solicitudes de administración.
        localStorage.setItem('token', datos.token);
        localStorage.setItem('user', JSON.stringify(datos.user));
        
        const role = datos.user?.role;
        navigate(role === 'admin' ? '/admin' : '/recomendador');
      }
    } catch (err) {
      console.error("Error detectado en el inicio de sesión:", err);
      
      // Capturamos el mensaje de error específico que programamos en tu backend
      if (err instanceof TypeError) {
        setError('⚠️ Error de conexión con el servidor. Verifica que el backend esté encendido.');
      } else if (err.message) {
        setError(err.message);
      } else {
        setError('⚠️ Error de conexión con el servidor. Verifica que el backend esté encendido.');
      }
    }
  };

  return (
    <div className="login-page">
      
      {/* Contenedor Flotante de Alta Gama Restaurado */}
      <div className="login-canvas-container">
        
        {/* Lado Izquierdo: Tu Logo de Marca Libre Restaurado */}
        <div className="login-logo-canvas">
          <img 
            src={imgLogoCorporate} 
            alt="PerfectFit Bowl Admin Logo" 
            className="login-logo-premium" 
          />
        </div>

        {/* Lado Derecho: Los Campos del Panel de Gestión Conectados */}
        <div className="login-form-canvas">
          <form onSubmit={handleLogin}>
            
            <h1 className="login-title">
              Panel <span style={{ color: 'var(--rose-dark)' }}>Interno</span>
            </h1>
            
            <p className="login-subtitle">
              Acceso exclusivo para el administrador de PerfectFit Bowl.
            </p>

            {/* Manejo de Alertas de Error Estilizado */}
            {error && <div className="login-error-box">{error}</div>}

            {/* Campo: Usuario */}
            <div className="login-field-group">
              <label className="login-label">Usuario Administrador (Correo):</label>
              <input 
                type="text" 
                name="username"
                value={credentials.username}
                onChange={handleChange}
                required
                placeholder="Ej. admin@perfectfit.com"
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
                placeholder="••••••••"
                className="login-input"
              />
            </div>

            {/* Botón de Entrada Autenticada Estilizado Original */}
            <button type="submit" className="btn btn-secondary login-submit-btn">
              Autenticar Entrada
            </button>
            <p className="register-link">
              ¿No tienes una cuenta? <Link to="/register">Regístrate aquí</Link>
            </p>
          </form>
        </div>

      </div>
    </div>
  );
}

export default Login;
