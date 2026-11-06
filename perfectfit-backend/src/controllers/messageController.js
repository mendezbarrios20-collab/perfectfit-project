import Message from '../models/Message.js';

/**
 * @desc Registrar un mensaje de contacto en MongoDB
 * @route POST /api/messages
 * @access Public
 */
export const registrarMensaje = async (req, res) => {
  try {
    const { name, email, phone, message } = req.body;
    const nombre = typeof name === 'string' ? name.trim() : '';
    const correo = typeof email === 'string' ? email.trim() : '';
    const telefono = typeof phone === 'string' ? phone.trim() : '';
    const contenido = typeof message === 'string' ? message.trim() : '';

    if (!nombre || !correo || !telefono || !contenido) {
      return res.status(400).json({
        success: false,
        error: 'Todos los campos son obligatorios.'
      });
    }

    const nuevoMensaje = await Message.create({
      name: nombre,
      email: correo,
      phone: telefono,
      message: contenido
    });

    return res.status(201).json({
      success: true,
      message: 'Mensaje guardado correctamente.',
      data: nuevoMensaje
    });
  } catch (error) {
    console.error('Error al registrar el mensaje:', error);
    return res.status(500).json({ success: false, error: 'No se pudo guardar el mensaje.' });
  }
};

/**
 * @desc Obtener los mensajes recibidos para la bandeja administrativa
 * @route GET /api/messages
 * @access Admin
 */
export const obtenerMensajes = async (req, res) => {
  try {
    const mensajes = await Message.find().sort({ createdAt: -1 }).lean();
    return res.status(200).json({
      success: true,
      count: mensajes.length,
      data: mensajes
    });
  } catch (error) {
    console.error('Error al obtener los mensajes:', error);
    return res.status(500).json({ success: false, error: 'No se pudieron obtener los mensajes.' });
  }
};

/**
 * @desc Eliminar un mensaje por su ID
 * @route DELETE /api/messages/:id
 * @access Admin
 */
export const eliminarMensaje = async (req, res) => {
  try {
    const mensaje = await Message.findByIdAndDelete(req.params.id);

    if (!mensaje) {
      return res.status(404).json({ success: false, error: 'Mensaje no encontrado.' });
    }

    return res.status(200).json({
      success: true,
      message: 'Mensaje eliminado correctamente.'
    });
  } catch (error) {
    if (error.name === 'CastError') {
      return res.status(400).json({ success: false, error: 'El ID del mensaje no es válido.' });
    }

    console.error('Error al eliminar el mensaje:', error);
    return res.status(500).json({ success: false, error: 'No se pudo eliminar el mensaje.' });
  }
};
