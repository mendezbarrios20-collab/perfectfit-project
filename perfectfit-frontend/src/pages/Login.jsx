import React, { useState } from 'react';

function Login() {
  const [credentials, setCredentials] = useState({
    username: '',
    password: ''
  });

  const [error, setError] = useState('');

  // Captura lo que el usuario escribe en los campos de ingreso
  const handleChange = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value
    });
  };

  const handleLogin = (e) => {
    e.preventDefault();
    setError('');

    // Simulación temporal en el Frontend (Se conectará a la API y JWT en el Backend)
    console.log("Intentando iniciar sesión con:", credentials);
    
    if (credentials.username === 'admin' && credentials.password === 'perfectfit2026') {
      alert("¡Ingreso exitoso al sistema de gestión!");
      // Aquí redirigiremos al Dashboard interno más adelante
    } else {
      setError('⚠️ Credenciales incorrectas. Verifica el usuario o la contraseña de administración.');
    }
  };

  return (
    <div className="login-page" style={{ padding: '5rem 0', background: 'linear-gradient(135deg, var(--rose-light) 0%, var(--blue-light) 100%)', minHeight: '80vh', display: 'flex', alignItems: 'center' }}>
      <div className="container" style={{ maxWidth: '450px' }}>
        
        <form onSubmit={handleLogin} style={{ 
          background: 'var(--white)', 
          padding: '2.5rem', 
          borderRadius: 'var(--border-radius)', 
          boxShadow: 'var(--shadow-soft)',
          border: '1px solid var(--blue-medium)'
        }}>
          <h1 style={{ textAlign: 'center', marginBottom: '0.5rem', fontSize: '2.2rem' }}>Panel Interno</h1>
          <p style={{ textAlign: 'center', marginBottom: '2rem', fontFamily: 'var(--font-nav)', color: '#718096', fontSize: '0.95rem' }}>
            Acceso exclusivo para el administrador de PerfectFit Bowl.
          </p>

          {/* Caja de alerta en caso de error */}
          {error && (
            <div style={{ background: '#fff5f5', color: '#e53e3e', padding: '0.8rem', borderRadius: '8px', marginBottom: '1.5rem', fontSize: '0.85rem', fontWeight: '600', border: '1px solid #fed7d7' }}>
              {error}
            </div>
          )}

          {/* Campo: Usuario */}
          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600', fontFamily: 'var(--font-nav)', fontSize: '0.9rem' }}>Usuario Administrador:</label>
            <input 
              type="text" 
              name="username"
              value={credentials.username}
              onChange={handleChange}
              required
              placeholder="Ej. admin"
              style={{ width: '100%', padding: '0.8rem', borderRadius: '8px', border: '1px solid var(--blue-dark)', fontFamily: 'var(--font-body)' }}
            />
          </div>

          {/* Campo: Contraseña */}
          <div style={{ marginBottom: '2rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600', fontFamily: 'var(--font-nav)', fontSize: '0.9rem' }}>Contraseña de Seguridad:</label>
            <input 
              type="password" 
              name="password"
              value={credentials.password}
              onChange={handleChange}
              required
              placeholder="••••••••••••"
              style={{ width: '100%', padding: '0.8rem', borderRadius: '8px', border: '1px solid var(--blue-dark)', fontFamily: 'var(--font-body)' }}
            />
          </div>

          {/* Botón de Ingreso con tus estilos Azul-Fitness */}
          <button type="submit" className="btn btn-secondary" style={{ width: '100%', fontSize: '1.1rem', padding: '0.9rem', fontWeight: '700' }}>
            Autenticar Entrada
          </button>
        </form>

      </div>
    </div>
  );
}

export default Login;
