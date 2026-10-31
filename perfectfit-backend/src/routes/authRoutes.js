import express from 'express';
import { registrarUsuario, loginUsuario } from '../controllers/authController.js';

const router = express.Router();

// Rutas para la autenticación y protección del panel
router.post('/register', registrarUsuario); // POST /api/auth/register -> Crear cuenta de admin
router.post('/login', loginUsuario);       // POST /api/auth/login -> Iniciar sesión desde React

export default router;
