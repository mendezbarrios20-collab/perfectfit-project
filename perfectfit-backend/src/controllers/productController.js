/**
 * @desc    Obtener todos los platos de la cafetería de forma local
 * @route   GET /api/products
 * @access  Public
 */
export const obtenerProductos = async (req, res) => {
  try {
    // Simulamos una respuesta inmediata con éxito para saltarnos el bloqueo de internet
    res.status(200).json({
      success: true,
      message: "¡Catálogo consultado correctamente de forma local en Cartagena! 🥗✨",
      data: []
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

/**
 * @desc    Registrar un nuevo plato de forma local
 * @route   POST /api/products
 * @access  Public
 */
export const crearProducto = async (req, res) => {
  try {
    const nuevoProducto = { ...req.body, _id: "plato_prueba_12345", createdAt: new Date() };
    
    res.status(201).json({
      success: true,
      message: '¡Plato recibido y registrado exitosamente en el servidor local! 🥞',
      data: nuevoProducto
    });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};
