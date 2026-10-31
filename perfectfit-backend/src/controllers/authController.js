/**
 * @desc    Registrar un nuevo administrador
 * @route   POST /api/auth/register
 * @access  Public
 */
export const registrarUsuario = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        error: 'Por favor, ingrese todos los campos obligatorios.'
      });
    }

    // Simulamos la creación exitosa y devolvemos un token de prueba estructurado
    res.status(201).json({
      success: true,
      message: '¡Administrador registrado exitosamente de forma local! 🛡️',
      user: { name, email, role: 'admin' },
      token: 'jwt_mock_token_perfectfit_secret_12345'
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

/**
 * @desc    Iniciar sesión (Login)
 * @route   POST /api/auth/login
 * @access  Public
 */
export const loginUsuario = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        error: 'Por favor, proporcione un correo y una contraseña.'
      });
    }

    // Simulación de credenciales correctas para tu Login de React
    // Si el usuario escribe este correo de prueba, le damos acceso total
    if (email === 'admin@perfectfit.com' && password === 'admin123') {
      return res.status(200).json({
        success: true,
        message: '¡Inicio de sesión exitoso! Bienvenido al Panel PerfectFit 🥗✨',
        user: { name: 'Valeria Méndez', email, role: 'admin' },
        token: 'jwt_mock_token_perfectfit_secret_12345'
      });
    }

    // Si las credenciales no coinciden con la prueba
    res.status(401).json({
      success: false,
      error: 'Credenciales inválidas. Intente con admin@perfectfit.com y admin123'
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
