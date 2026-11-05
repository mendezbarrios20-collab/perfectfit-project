import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Trash2, Edit3, Check, X } from 'lucide-react';
import './Admin.css';
import imgLogoSmall from '../assets/images/solo-logo.jpg';

function Admin() {
  const [mensajes, setMensajes] = useState([]);
  const [platos, setPlatos] = useState([]);
  const [cargando, setCargando] = useState(true);

  // Estados exclusivos para el motor de edición en vivo
  const [editandoId, setEditandoId] = useState(null);
  const [formEditar, setFormEditar] = useState({ name: '', price: '', category: 'desayunos' });

  useEffect(() => {
    const cargarDatosPanel = async () => {
      try {
        setCargando(true);
        const resMensajes = await axios.get('http://localhost:5000/api/messages');
        if (resMensajes.data.success) setMensajes(resMensajes.data.data);

        const resPlatos = await axios.get('http://localhost:5000/api/products');
        if (resPlatos.data.success) setPlatos(resPlatos.data.data);
      } catch (err) {
        console.error("Error al cargar la consola administrativa:", err);
      } finally {
        setCargando(false);
      }
    };
    cargarDatosPanel();
  }, []);

  const handleBorrarMensaje = async (id) => {
    if (window.confirm("¿Estás segura de que deseas eliminar este mensaje?")) {
      try {
        const respuesta = await axios.delete(`http://localhost:5000/api/messages/${id}`);
        if (respuesta.data.success) {
          setMensajes(mensajes.filter(msg => msg._id !== id));
          alert("✨ Mensaje removido con éxito.");
        }
      } catch (err) {
        console.error(err);
      }
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
      const respuesta = await axios.put(`http://localhost:5000/api/products/${id}`, formEditar);
      if (respuesta.data.success) {
        setPlatos(platos.map(p => p.id === id ? { ...p, name: formEditar.name, price: Number(formEditar.price), category: formEditar.category } : p));
        setEditandoId(null);
        alert("🥗 ¡Plato actualizado con éxito en el menú!");
      }
    } catch (err) {
      console.error("Error al actualizar el plato:", err);
    }
  };

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
                    {/* MEJORA UX: Formateo de fecha y hora local para Cartagena de forma limpia */}
                    <p className="message-meta">
                      📧 {msg.email} | 📱 Celular: {msg.phone}
                    </p>
                    <p className="message-date-badge">
                      📅 Recibido el: <strong>{new Date(msg.createdAt).toLocaleString('es-CO', { dateStyle: 'short', timeStyle: 'short' })}</strong>
                    </p>
                    <p className="message-text">"{msg.message}"</p>
                  </div>
                  <button onClick={() => handleBorrarMensaje(msg._id)} className="btn btn-delete">
                    <Trash2 size={16} /> Borrar
                  </button>
                </article>
              ))}
            </div>
          )}
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
                        {esEditando ? (
                          <div className="admin-actions-btn-group">
                            <button onClick={() => guardarEdicion(plato.id)} className="btn-action-save" title="Guardar Cambios"><Check size={16} /></button>
                            <button onClick={cancelarEdicion} className="btn-action-cancel" title="Cancelar"><X size={16} /></button>
                          </div>
                        ) : (
                          <button onClick={() => iniciarEdicion(plato)} className="btn-action-edit" title="Editar Plato"><Edit3 size={16} /> Editar</button>
                        )}
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
