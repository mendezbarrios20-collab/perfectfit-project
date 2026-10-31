import Message from '../models/Message.js';

/**
 * @desc    Registrar y guardar un nuevo mensaje o pedido de contacto
 * @route   POST /api/messages
 * @access  Public
 */
export const registrarMensaje = async (req, res) => {
  try {
    const { name, email, phone, message } = req.body;

    // 1. Crear una nueva instancia del mensaje con los datos recibidos del formulario
    const nuevoMensaje = new Message({
      name,
      email,
      phone,
      message
    });

    // 2. Guardar físicamente el registro en la base de datos de MongoDB
    const mensajeGuardado = await nuevoMensaje.save();

    // 3. Responder al Frontend con un código 201 (Creado Exitosamente) y el objeto guardado
    res.status(201).json({
      success: true,
      message: '¡Mensaje recibido con éxito en el servidor! 🚀',
      data: mensajeGuardado
    });

  } catch (error) {
    // Si algún campo requerido falta o hay un error, respondemos con código 400 (Bad Request)
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
};
