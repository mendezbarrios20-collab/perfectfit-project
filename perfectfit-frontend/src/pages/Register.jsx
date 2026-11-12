import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Login.css';
import imgLogoCorporate from '../assets/images/solo-logo.jpg';
import { API_URL } from '../config/api';

function Register() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [exito, setExito] = useState('');
  const [cargando, setCargando] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');
    setCargando(true);

    try {
      const respuesta = await fetch(`${API_URL}/api/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name.trim(),
          email: formData.email.trim(),
          password: formData.password
        })
      });
      const datos = await respuesta.json();

      if (!respuesta.ok) {
        throw new Error(datos.error || 'No se pudo crear la cuenta.');
      }

      setExito('¡Tu cuenta se creó correctamente! Te llevaremos al inicio de sesión.');
      setFormData({ name: '', email: '', password: '' });
      window.setTimeout(() => navigate('/login', { replace: true }), 1800);
    } catch (err) {
      console.error('Error al registrar la cuenta:', err);
      setError(err.message || 'No se pudo conectar con el servidor. Inténtalo de nuevo.');
    } finally {
      setCargando(false);
    }
  };

  return (
    <div className="login-page">
      <div className="login-canvas-container">
        <div className="login-logo-canvas">
          <img
            src={imgLogoCorporate}
            alt="Logo de PerfectFit Bowl"
            className="login-logo-premium"
          />
        </div>

        <div className="login-form-canvas">
          <form onSubmit={handleRegister}>
            <h1 className="login-title">Crear cuenta</h1>
            <p className="login-subtitle">
              Regístrate en PerfectFit Bowl para crear tu cuenta.
            </p>

            {error && (
              <div className="login-error-box" role="alert">
                {error}
              </div>
            )}
            {exito && (
              <div
                className="login-error-box"
                role="status"
                style={{
                  background: '#f0fff4',
                  borderColor: '#9ae6b4',
                  color: '#276749'
                }}
              >
                {exito}
              </div>
            )}

            <div className="login-field-group">
              <label className="login-label" htmlFor="register-name">
                Nombre completo:
              </label>
              <input
                id="register-name"
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                autoComplete="name"
                className="login-input"
              />
            </div>

            <div className="login-field-group">
              <label className="login-label" htmlFor="register-email">
                Correo electrónico:
              </label>
              <input
                id="register-email"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                autoComplete="email"
                className="login-input"
              />
            </div>

            <div className="login-field-group-last">
              <label className="login-label" htmlFor="register-password">
                Contraseña (mínimo 6 caracteres):
              </label>
              <input
                id="register-password"
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                minLength={6}
                autoComplete="new-password"
                className="login-input"
              />
            </div>

            <button
              type="submit"
              className="btn btn-secondary login-submit-btn"
              disabled={cargando}
            >
              {cargando ? 'Creando cuenta…' : 'Registrarme'}
            </button>

            <p className="login-subtitle" style={{ marginTop: '1.5rem', marginBottom: 0 }}>
              ¿Ya tienes cuenta? <Link to="/login">Inicia sesión</Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Register;
