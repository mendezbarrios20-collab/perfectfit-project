/**
 * @desc    Registrar un nuevo mensaje de contacto de forma local
 * @route   POST /api/messages
 * @access  Public
 */
export const registrarMensaje = async (req, res) => {
  try {
    const { name, email, phone, message } = req.body;

    // Validación básica de campos obligatorios
    if (!name || !email || !phone || !message) {
      return res.status(400).json({
        success: false,
        error: 'Todos los campos son obligatorios.'
      });
    }

    console.log('✉️ Nuevo mensaje recibido de forma local en el servidor:', req.body);

    // Respondemos con éxito de forma local e inmediata sin tocar internet
    res.status(201).json({
      success: true,
      message: '¡Mensaje recibido y procesado con éxito en el servidor local! 🥗✨'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Error interno en el servidor local.'
    });
  }
};
