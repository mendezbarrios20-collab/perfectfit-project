// Array global en la memoria del servidor para simular la base de datos de forma local y persistente mientras corre el proceso
const baseDatosMensajesLocales = [
  { _id: '1', name: 'Carlos Mendoza', email: 'carlos@fit.com', phone: '3005551234', message: 'Deseo cotizar 5 Overnight Oats para mi plan semanal en Bocagrande.', createdAt: new Date() }
];

/**
 * @desc    Registrar un nuevo mensaje de contacto en la base de datos local de contingencia
 * @route   POST /api/messages
 * @access  Public
 */
export const registrarMensaje = async (req, res) => {
  try {
    const { name, email, phone, message } = req.body;

    if (!name || !email || !phone || !message) {
      return res.status(400).json({
        success: false,
        error: 'Todos los campos son obligatorios.'
      });
    }

    // Creamos el objeto imitando el esquema técnico de Mongoose
    const nuevoMensaje = {
      _id: 'msg_local_' + Math.random().toString(36).substr(2, 9),
      name,
      email,
      phone,
      message,
      createdAt: new Date()
    };

    // Almacenamos el mensaje en nuestra lista local unificada
    baseDatosMensajesLocales.push(nuevoMensaje);
    console.log('✉️ Nuevo mensaje persistido con éxito en el cluster local:', nuevoMensaje);

    res.status(201).json({
      success: true,
      message: '¡Mensaje recibido y guardado con éxito de forma local! 🥗✨',
      data: nuevoMensaje
    });
  } catch (error) {
    console.error('❌ Error en el controlador de contingencia:', error);
    res.status(500).json({ success: false, error: 'Error interno en el servidor.' });
  }
};

/**
 * @desc    Obtener todos los mensajes guardados (Para la bandeja de entrada del Administrador)
 * @route   GET /api/messages
 * @access  Public
 */
export const obtenerMensajes = async (req, res) => {
  try {
    // El administrador lee directamente los mensajes acumulados en la memoria local
    res.status(200).json({
      success: true,
      count: baseDatosMensajesLocales.length,
      data: baseDatosMensajesLocales
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

/**
 * @desc    Eliminar un mensaje por su ID de la bandeja de entrada
 * @route   DELETE /api/messages/:id
 * @access  Public
 */
export const eliminarMensaje = async (req, res) => {
  try {
    const { id } = req.params;
    
    // Buscamos el índice del elemento en nuestro array local
    const indice = baseDatosMensajesLocales.findIndex(msg => msg._id === id);
    
    if (indice !== -1) {
      baseDatosMensajesLocales.splice(indice, 1);
      console.log(`🗑️ Mensaje con ID ${id} eliminado del cluster local por el administrador.`);
      return res.status(200).json({ success: true, message: 'Mensaje eliminado correctamente.' });
    }

    res.status(404).json({ success: false, error: 'Mensaje no encontrado.' });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
