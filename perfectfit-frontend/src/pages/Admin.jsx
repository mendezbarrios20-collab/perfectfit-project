import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Trash2, Edit3, Check, X, LogOut } from 'lucide-react';
import './Admin.css';
import imgLogoSmall from '../assets/images/solo-logo.jpg';
import { API_URL } from '../config/api';

const formularioProductoInicial = {
  name: '',
  price: '',
  description: '',
  image: '',
  category: 'desayunos',
  objective: 'saciedad',
  macros: {
    calories: '',
    protein: '',
    carbs: '',
    fats: ''
  }
};

const tieneAccesoAdminLocal = () => {
  if (!localStorage.getItem('token')) {
    return false;
  }

  try {
    return JSON.parse(localStorage.getItem('user') || 'null')?.role === 'admin';
  } catch {
    return false;
  }
};

const solicitarJson = async (url, opciones = {}) => {
  const respuesta = await fetch(url, opciones);
  const datos = await respuesta.json();

  if (!respuesta.ok || datos.success === false) {
    const error = new Error(datos.error || 'La solicitud no pudo completarse.');
    error.response = { status: respuesta.status, data: datos };
    throw error;
  }

  return datos;
};

function Admin() {
  const navigate = useNavigate();
  const [mensajes, setMensajes] = useState([]);
  const [mensajesMarcando, setMensajesMarcando] = useState(() => new Set());
  const [platos, setPlatos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [accesoAutorizado] = useState(tieneAccesoAdminLocal);
  const [formularioProducto, setFormularioProducto] = useState(formularioProductoInicial);
  const [creandoProducto, setCreandoProducto] = useState(false);
  const [productosEliminando, setProductosEliminando] = useState(() => new Set());
  const [errorProducto, setErrorProducto] = useState('');
  const [exitoProducto, setExitoProducto] = useState('');

  // ESTADOS DEL MOTOR DE EDICIÓN EN LÍNEA
  const [editandoId, setEditandoId] = useState(null);
  const [formEditar, setFormEditar] = useState({ name: '', price: '', category: 'desayunos' });
  const validacionAccesoHecha = useRef(false);

  const authConfig = () => ({
    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
  });

  const manejarErrorSesion = useCallback((err) => {
    if (err.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      navigate('/login', { replace: true });
    }
  }, [navigate]);

  const configAutenticacion = () => {
    const config = authConfig();
    return {
      ...config,
      headers: {
        ...config.headers,
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    };
  };

  const cargarProductos = useCallback(async () => {
    const datos = await solicitarJson(
      `${API_URL}/api/products`,
      configAutenticacion()
    );
    setPlatos(datos.data);
  }, []);

  useEffect(() => {
    if (validacionAccesoHecha.current) {
      return;
    }
    validacionAccesoHecha.current = true;

    const token = localStorage.getItem('token');
    let usuario = null;

    try {
      usuario = JSON.parse(localStorage.getItem('user') || 'null');
    } catch (error) {
      console.error('Los datos de usuario guardados no son válidos:', error);
    }

    if (!token || usuario?.role !== 'admin') {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.alert('Acceso no autorizado');
      navigate('/', { replace: true });
      return;
    }

    const cargarDatosPanel = async () => {
      try {
        const datosMensajes = await solicitarJson(
          `${API_URL}/api/messages`,
          configAutenticacion()
        );
        setMensajes(datosMensajes.data);

        await cargarProductos();
      } catch (err) {
        console.error("Error al cargar la consola administrativa:", err);
        manejarErrorSesion(err);
      } finally {
        setCargando(false);
      }
    };
    cargarDatosPanel();
  }, [cargarProductos, manejarErrorSesion, navigate]);

  const manejarCambioProducto = (e) => {
    const { name, value } = e.target;

    if (name.startsWith('macros.')) {
      const macro = name.slice('macros.'.length);
      setFormularioProducto((actual) => ({
        ...actual,
        macros: { ...actual.macros, [macro]: value }
      }));
      return;
    }

    setFormularioProducto((actual) => ({ ...actual, [name]: value }));
  };

  const crearProducto = async (e) => {
    e.preventDefault();
    setErrorProducto('');
    setExitoProducto('');
    setCreandoProducto(true);

    const productoNuevo = {
      ...formularioProducto,
      name: formularioProducto.name.trim(),
      price: Number(formularioProducto.price),
      description: formularioProducto.description.trim(),
      image: formularioProducto.image.trim(),
      macros: {
        calories: Number(formularioProducto.macros.calories),
        protein: Number(formularioProducto.macros.protein),
        carbs: Number(formularioProducto.macros.carbs),
        fats: Number(formularioProducto.macros.fats)
      }
    };

    try {
      const respuesta = await fetch(`${API_URL}/api/products`, {
        method: 'POST',
        headers: {
          ...configAutenticacion().headers,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(productoNuevo)
      });
      const datos = await respuesta.json();

      if (!respuesta.ok || !datos.success) {
        if (respuesta.status === 401) {
          manejarErrorSesion({ response: { status: 401 } });
        }
        throw new Error(datos.error || 'No se pudo crear el producto.');
      }

      setFormularioProducto(formularioProductoInicial);
      setPlatos((actuales) => [...actuales, datos.data]);
      setExitoProducto('El producto se creó correctamente.');

      try {
        await cargarProductos();
      } catch (error) {
        console.error('El producto se creó, pero no se pudo actualizar la lista:', error);
        setErrorProducto('El producto se guardó, pero no se pudo actualizar la lista. Recarga el panel.');
      }
    } catch (error) {
      console.error('Error al crear el producto:', error);
      setErrorProducto(error.message || 'No se pudo conectar con el servidor.');
    } finally {
      setCreandoProducto(false);
    }
  };

  const eliminarProducto = async (plato) => {
    if (!window.confirm(`¿Estás segura de que deseas eliminar "${plato.name}" del menú?`)) {
      return;
    }

    setErrorProducto('');
    setExitoProducto('');
    setProductosEliminando((actuales) => new Set(actuales).add(plato.id));

    try {
      const respuesta = await fetch(`${API_URL}/api/products/${plato.id}`, {
        method: 'DELETE',
        headers: {
          ...configAutenticacion().headers
        }
      });
      const datos = await respuesta.json();

      if (!respuesta.ok || !datos.success) {
        if (respuesta.status === 401) {
          manejarErrorSesion({ response: { status: 401 } });
        }
        throw new Error(datos.error || 'No se pudo eliminar el producto.');
      }

      setPlatos((actuales) => actuales.filter((producto) => producto.id !== plato.id));
      if (editandoId === plato.id) {
        setEditandoId(null);
      }
      setExitoProducto('El producto se eliminó correctamente.');
    } catch (error) {
      console.error('Error al eliminar el producto:', error);
      setErrorProducto(error.message || 'No se pudo conectar con el servidor.');
    } finally {
      setProductosEliminando((actuales) => {
        const siguientes = new Set(actuales);
        siguientes.delete(plato.id);
        return siguientes;
      });
    }
  };

  const handleBorrarMensaje = async (id) => {
    if (window.confirm("¿Estás segura de que deseas eliminar este mensaje?")) {
      try {
        await solicitarJson(
          `${API_URL}/api/messages/${id}`,
          { ...configAutenticacion(), method: 'DELETE' }
        );
        setMensajes((actuales) => actuales.filter((msg) => msg._id !== id));
        alert("✨ Mensaje removido con éxito.");
      } catch (err) {
        console.error(err);
        manejarErrorSesion(err);
      }
    }
  };

  const handleMarcarMensajeLeido = async (id) => {
    setMensajesMarcando((actuales) => new Set(actuales).add(id));

    try {
      const datos = await solicitarJson(
        `${API_URL}/api/messages/${id}/leer`,
        {
          ...configAutenticacion(),
          method: 'PATCH',
          headers: {
            ...configAutenticacion().headers,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({})
        }
      );

      setMensajes((actuales) => actuales.map((msg) => (
        msg._id === id ? { ...msg, ...datos.data, read: true } : msg
      )));
    } catch (err) {
      console.error('Error al marcar el mensaje como leído:', err);
      manejarErrorSesion(err);
    } finally {
      setMensajesMarcando((actuales) => {
        const siguientes = new Set(actuales);
        siguientes.delete(id);
        return siguientes;
      });
    }
  };

  const iniciarEdicion = (plato) => {
    setEditandoId(plato.id);
    setFormEditar({ name: plato.name, price: plato.price, category: plato.category });
  };

  const cancelarEdicion = () => {
    setEditandoId(null);
  };

  const guardarEdicion = async (id) => {
    try {
      await solicitarJson(`${API_URL}/api/products/${id}`, {
        ...configAutenticacion(),
        method: 'PUT',
        headers: {
          ...configAutenticacion().headers,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formEditar)
      });
      setPlatos((actuales) => actuales.map((producto) => (
        producto.id === id
          ? { ...producto, name: formEditar.name, price: Number(formEditar.price), category: formEditar.category }
          : producto
      )));
      setEditandoId(null);
      alert("🥗 ¡Plato actualizado con éxito en el menú!");
    } catch (err) {
      console.error(err);
      manejarErrorSesion(err);
    }
  };

  const cerrarSesion = async () => {
    try {
      await solicitarJson(`${API_URL}/api/auth/logout`, {
        ...configAutenticacion(),
        method: 'POST',
        headers: {
          ...configAutenticacion().headers,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({})
      });
    } catch (err) {
      console.error('No se pudo invalidar la sesión en el servidor:', err);
    } finally {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      navigate('/login', { replace: true });
    }
  };

  if (!accesoAutorizado) {
    return <div className="admin-loading" role="status">Verificando permisos...</div>;
  }

  if (cargando) return <div className="admin-loading">🔄 Cargando consola de gestión de PerfectFit...</div>;

  return (
    <div className="admin-page">
      <div className="container">
        
        <header className="admin-header">
          <div className="admin-brand-wrapper">
            <img src={imgLogoSmall} alt="Logo PerfectFit Admin" className="admin-logo-img" />
            <h1>Consola de Gestión Interna</h1>
          </div>
          <p className="admin-subtitle">Panel de administración · Valentina Barrios Méndez · Cartagena</p>
          <button type="button" className="btn btn-secondary" onClick={cerrarSesion}>
            <LogOut size={16} /> Cerrar sesión
          </button>
        </header>

        <section className="admin-metrics-grid">
          <div className="metric-card card-rose">
            <h4>🥗 Total Platos en Menú</h4>
            <strong>{platos.length} Platos</strong>
          </div>
          <div className="metric-card card-blue">
            <h4>Solicitudes de Clientes</h4>
            <strong>{mensajes.length} Mensajes</strong>
          </div>
          <div className="metric-card card-green">
            <h4>📈 Estado del Sistema</h4>
            <strong className="status-online">● Servidor En Línea</strong>
          </div>
        </section>

        <section className="admin-section">
          <h2>Mensajes y Pedidos Recibidos</h2>
          {mensajes.length === 0 ? (
            <p className="empty-notice">No hay mensajes pendientes en la bandeja de entrada.</p>
          ) : (
            <div className="messages-stack">
              {mensajes.map((msg) => (
                <article key={msg._id} className="message-row-card">
                  <div className="message-info-block">
                    <h3>{msg.name}</h3>
                    <p className="message-meta">📧 {msg.email} | 📱 Celular: {msg.phone}</p>
                    <p className="message-date-badge">
                      📅 Recibido el: <strong>{new Date(msg.createdAt).toLocaleString('es-CO', { dateStyle: 'short', timeStyle: 'short' })}</strong>
                    </p>
                    <p className="message-text">"{msg.message}"</p>
                  </div>
                  <div className="admin-actions-btn-group">
                    {msg.read ? (
                      <span className="status-online">✅ Visto</span>
                    ) : (
                      <button
                        type="button"
                        onClick={() => handleMarcarMensajeLeido(msg._id)}
                        className="btn btn-secondary"
                        disabled={mensajesMarcando.has(msg._id)}
                      >
                        📩 {mensajesMarcando.has(msg._id) ? 'Guardando...' : 'Marcar como leído'}
                      </button>
                    )}
                    <button
                      type="button"
                      onClick={() => handleBorrarMensaje(msg._id)}
                      className="btn btn-delete"
                    >
                      <Trash2 size={16} /> Borrar
                    </button>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>

        <section className="admin-section">
          <h2>Agregar un producto al menú</h2>
          {errorProducto && <p className="admin-product-notice admin-product-error" role="alert">{errorProducto}</p>}
          {exitoProducto && <p className="admin-product-notice admin-product-success" role="status">{exitoProducto}</p>}

          <form className="admin-create-form" onSubmit={crearProducto}>
            <div className="admin-create-form-grid">
              <div className="admin-form-field">
                <label htmlFor="producto-name">Nombre</label>
                <input id="producto-name" name="name" type="text" value={formularioProducto.name} onChange={manejarCambioProducto} required maxLength={100} />
              </div>
              <div className="admin-form-field">
                <label htmlFor="producto-price">Precio (COP)</label>
                <input id="producto-price" name="price" type="number" value={formularioProducto.price} onChange={manejarCambioProducto} required min="0.01" step="any" />
              </div>
              <div className="admin-form-field">
                <label htmlFor="producto-image">URL de la imagen</label>
                <input id="producto-image" name="image" type="url" value={formularioProducto.image} onChange={manejarCambioProducto} required placeholder="https://ejemplo.com/imagen.jpg" />
              </div>
              <div className="admin-form-field">
                <label htmlFor="producto-category">Categoría</label>
                <select id="producto-category" name="category" value={formularioProducto.category} onChange={manejarCambioProducto}>
                  <option value="desayunos">desayunos</option>
                  <option value="snacks">snacks</option>
                  <option value="pre-entreno">pre-entreno</option>
                  <option value="post-entreno">post-entreno</option>
                </select>
              </div>
              <div className="admin-form-field">
                <label htmlFor="producto-objective">Objetivo</label>
                <select id="producto-objective" name="objective" value={formularioProducto.objective} onChange={manejarCambioProducto}>
                  <option value="saciedad">saciedad</option>
                  <option value="energia">energia</option>
                  <option value="recuperacion">recuperacion</option>
                </select>
              </div>
              <div className="admin-form-field admin-form-description">
                <label htmlFor="producto-description">Descripción</label>
                <textarea id="producto-description" name="description" value={formularioProducto.description} onChange={manejarCambioProducto} required maxLength={500} rows="3" />
              </div>
            </div>

            <fieldset className="admin-macros-fieldset">
              <legend>Información nutricional</legend>
              <div className="admin-macros-grid">
                <div className="admin-form-field">
                  <label htmlFor="producto-calories">Calorías (kcal)</label>
                  <input id="producto-calories" name="macros.calories" type="number" value={formularioProducto.macros.calories} onChange={manejarCambioProducto} required min="0" step="any" />
                </div>
                <div className="admin-form-field">
                  <label htmlFor="producto-protein">Proteínas (g)</label>
                  <input id="producto-protein" name="macros.protein" type="number" value={formularioProducto.macros.protein} onChange={manejarCambioProducto} required min="0" step="any" />
                </div>
                <div className="admin-form-field">
                  <label htmlFor="producto-carbs">Carbohidratos (g)</label>
                  <input id="producto-carbs" name="macros.carbs" type="number" value={formularioProducto.macros.carbs} onChange={manejarCambioProducto} required min="0" step="any" />
                </div>
                <div className="admin-form-field">
                  <label htmlFor="producto-fats">Grasas (g)</label>
                  <input id="producto-fats" name="macros.fats" type="number" value={formularioProducto.macros.fats} onChange={manejarCambioProducto} required min="0" step="any" />
                </div>
              </div>
            </fieldset>

            <button type="submit" className="btn btn-primary admin-create-submit" disabled={creandoProducto}>
              {creandoProducto ? 'Guardando producto...' : 'Agregar producto'}
            </button>
          </form>
        </section>

        <section className="admin-section">
          <h2>🥗 Control de Inventario del Menú ({platos.length} Bowls)</h2>
          <div className="admin-table-wrapper">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Nombre del Plato</th>
                  <th>Categoría</th>
                  <th>Precio (COP)</th>
                  <th style={{ textAlign: 'center' }}>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {platos.map((plato) => {
                  const esEditando = editandoId === plato.id;
                  return (
                    <tr key={plato.id} className={esEditando ? "row-editing-active" : ""}>
                      <td className="table-id">#{plato.id}</td>
                      <td className="table-name">
                        {esEditando ? (
                          <input type="text" value={formEditar.name} onChange={(e) => setFormEditar({ ...formEditar, name: e.target.value })} className="admin-inline-input" />
                        ) : plato.name}
                      </td>
                      <td>
                        {esEditando ? (
                          <select value={formEditar.category} onChange={(e) => setFormEditar({ ...formEditar, category: e.target.value })} className="admin-inline-select">
                            <option value="desayunos">desayunos</option>
                            <option value="snacks">snacks</option>
                            <option value="pre-entreno">pre-entreno</option>
                            <option value="post-entreno">post-entreno</option>
                          </select>
                        ) : (
                          <span className="table-badge">{plato.category}</span>
                        )}
                      </td>
                      <td className="table-price">
                        {esEditando ? (
                          <input type="number" value={formEditar.price} onChange={(e) => setFormEditar({ ...formEditar, price: e.target.value })} className="admin-inline-input input-price-edit" />
                        ) : (
                          `$${plato.price.toLocaleString('es-CO')}`
                        )}
                      </td>
                      <td style={{ textAlign: 'center' }}>
                        <div className="admin-actions-btn-group">
                          {esEditando ? (
                            <>
                              <button type="button" onClick={() => guardarEdicion(plato.id)} className="btn-action-save" title="Guardar cambios" aria-label={`Guardar cambios de ${plato.name}`}><Check size={16} /></button>
                              <button type="button" onClick={cancelarEdicion} className="btn-action-cancel" title="Cancelar edición" aria-label={`Cancelar edición de ${plato.name}`}><X size={16} /></button>
                            </>
                          ) : (
                            <button type="button" onClick={() => iniciarEdicion(plato)} className="btn-action-edit" title="Editar plato"><Edit3 size={16} /> Editar</button>
                          )}
                          <button
                            type="button"
                            onClick={() => eliminarProducto(plato)}
                            className="btn-action-delete"
                            disabled={productosEliminando.has(plato.id)}
                          >
                            <Trash2 size={16} /> {productosEliminando.has(plato.id) ? 'Eliminando...' : 'Eliminar'}
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </div>
  );
}

export default Admin;
