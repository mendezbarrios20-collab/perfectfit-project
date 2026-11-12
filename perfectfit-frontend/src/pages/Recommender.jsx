import { useEffect, useRef, useState } from 'react';
import './Recommender.css';
import { API_URL } from '../config/api';

function Recommender() {
  const [abierto, setAbierto] = useState(true);
  const [mensajes, setMensajes] = useState([
    { id: 'bienvenida', autor: 'bot', texto: '¡Hola! ¿En qué te puedo ayudar?' }
  ]);
  const [texto, setTexto] = useState('');
  const [cargando, setCargando] = useState(false);
  const ultimoMensajeRef = useRef(null);

  useEffect(() => {
    const ventanaChat = ultimoMensajeRef.current?.parentElement;
    ventanaChat?.scrollTo({
      top: ventanaChat.scrollHeight,
      behavior: 'smooth'
    });
  }, [mensajes, cargando, abierto]);

  async function manejarEnvio(e) {
    e.preventDefault();

    if (!texto.trim() || cargando) {
      return;
    }

    const mensaje = texto.trim();
    const mensajeId = `${Date.now()}-usuario`;
    const nuevoMensaje = {
      id: mensajeId,
      autor: 'usuario',
      texto: mensaje
    };
    const historial = mensajes
      .filter((item) => item.id !== 'bienvenida' && item.tipo !== 'error')
      .map(({ autor, texto: textoMensaje }) => ({ autor, texto: textoMensaje }));

    setMensajes((prev) => [...prev, nuevoMensaje]);
    setTexto('');
    setCargando(true);

    try {
      const respuestaHttp = await fetch(`${API_URL}/api/ia/consultar-guia`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ mensaje, historial })
      });
      const datos = await respuestaHttp.json();

      if (!respuestaHttp.ok) {
        throw new Error(datos.error || 'No se pudo obtener una respuesta del asistente.');
      }

      if (typeof datos.respuesta !== 'string' || !datos.respuesta.trim()) {
        throw new Error('El asistente devolvió una respuesta vacía.');
      }

      const respuestaBot = {
        id: `${Date.now()}-bot`,
        autor: 'bot',
        texto: datos.respuesta
      };

      setMensajes((prev) => [...prev, respuestaBot]);
    } catch (error) {
      console.error('Error al enviar el mensaje al asistente:', error);
      setMensajes((prev) => [
        ...prev.map((item) =>
          item.id === mensajeId ? { ...item, tipo: 'error' } : item
        ),
        {
          id: `${Date.now()}-error`,
          autor: 'bot',
          texto: 'No pude responder en este momento. Verifica que el backend esté activo e inténtalo de nuevo.',
          tipo: 'error'
        }
      ]);
    } finally {
      setCargando(false);
    }
  }

  return (
    <div className="recommender-page">
      <main className="recommender-container">
        <h1 className="recommender-title">Asesoría de Nutrición IA</h1>
        <p className="recommender-intro">
          Pregúntale a nuestro Coach Nutricional por opciones saludables de PerfectFit Bowl en Cartagena.
        </p>

        <section className="chat-panel" aria-label="Chat de nutrición">
          <div className="chat-header">
            <div>
              <h2>Coach Nutricional</h2>
              <p>Tu asistente de PerfectFit Bowl</p>
            </div>
            <button
              type="button"
              className="chat-toggle"
              onClick={() => setAbierto((prev) => !prev)}
              aria-expanded={abierto}
              aria-controls="chat-contenido"
            >
              {abierto ? 'Cerrar chat' : 'Abrir chat'}
            </button>
          </div>

          {abierto && (
            <div id="chat-contenido" className="chat-content">
              <div className="chat-ventana">
                <ul className="chat-mensajes" aria-live="polite" aria-relevant="additions">
                  {mensajes.map((item) => (
                    <li key={item.id} className={`chat-msg ${item.autor}`}>
                      {item.texto}
                    </li>
                  ))}
                  {cargando && <li className="chat-msg bot">Escribiendo…</li>}
                </ul>
                <div ref={ultimoMensajeRef} className="chat-scroll-anchor" aria-hidden="true" />
              </div>

              <form className="chat-form" onSubmit={manejarEnvio}>
                <label className="chat-sr-only" htmlFor="chat-texto">
                  Escribe tu mensaje
                </label>
                <input
                  id="chat-texto"
                  type="text"
                  value={texto}
                  onChange={(e) => setTexto(e.target.value)}
                  placeholder="Escribe tu pregunta..."
                  autoComplete="off"
                  autoFocus
                  disabled={cargando}
                />
                <button type="submit" disabled={cargando || !texto.trim()}>
                  {cargando ? 'Enviando…' : 'Enviar'}
                </button>
              </form>
            </div>
          )}
        </section>
      </main>
    </div>
  );
}

export default Recommender;
