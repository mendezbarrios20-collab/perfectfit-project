import bcrypt from 'bcryptjs';
import User from '../models/User.js';
import { crearSesion, revocarSesion } from '../middleware/authMiddleware.js';

const HASH_ROUNDS = 12;

const normalizarEmail = (email) => (
  typeof email === 'string' ? email.trim().toLowerCase() : ''
);

const usuarioPublico = (usuario) => ({
  id: usuario._id,
  name: usuario.name,
  email: usuario.email,
  role: usuario.role
});

export const registerUsuario = async (req, res) => {
  try {
    const name = typeof req.body?.name === 'string' ? req.body.name.trim() : '';
    const email = normalizarEmail(req.body?.email);
    const { password } = req.body ?? {};

    if (!name || !email || typeof password !== 'string' || password.length < 6) {
      return res.status(400).json({
        success: false,
        error: 'Proporcione un nombre, un correo válido y una contraseña de al menos 6 caracteres.'
      });
    }

    const existeUsuario = await User.exists({ email });
    if (existeUsuario) {
      return res.status(409).json({
        success: false,
        error: 'Ya existe una cuenta con ese correo electrónico.'
      });
    }

    const passwordHash = await bcrypt.hash(password, HASH_ROUNDS);
    const usuario = await User.create({
      name,
      email,
      password: passwordHash,
      role: 'user'
    });

    return res.status(201).json({
      success: true,
      message: 'Cuenta creada correctamente.',
      user: usuarioPublico(usuario)
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).json({
        success: false,
        error: 'Ya existe una cuenta con ese correo electrónico.'
      });
    }
    if (error.name === 'ValidationError') {
      return res.status(400).json({ success: false, error: error.message });
    }

    console.error('Error al registrar el usuario:', error);
    return res.status(500).json({ success: false, error: 'No se pudo crear la cuenta.' });
  }
};

/**
 * @desc    Iniciar sesión (Login)
 * @route   POST /api/auth/login
 * @access  Public
 */
export const loginUsuario = async (req, res) => {
  try {
    const email = normalizarEmail(req.body?.email);
    const { password } = req.body ?? {};

    if (!email || typeof password !== 'string' || !password) {
      return res.status(400).json({
        success: false,
        error: 'Por favor, proporcione un correo y una contraseña.'
      });
    }

    const usuario = await User.findOne({ email }).select('+password');
    const passwordValida = usuario
      ? await bcrypt.compare(password, usuario.password)
      : false;

    if (!usuario || !passwordValida) {
      return res.status(401).json({
        success: false,
        error: 'Correo o contraseña inválidos.'
      });
    }

    const token = crearSesion(usuario.role);
    return res.status(200).json({
      success: true,
      message: 'Inicio de sesión exitoso.',
      user: usuarioPublico(usuario),
      token
    });
  } catch (error) {
    console.error('Error al iniciar sesión:', error);
    return res.status(500).json({ success: false, error: 'No se pudo iniciar sesión.' });
  }
};

export const cerrarSesion = (req, res) => {
  revocarSesion(req.authToken);
  res.status(200).json({ success: true, message: 'Sesión cerrada correctamente.' });
};
