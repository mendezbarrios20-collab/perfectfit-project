import express from 'express';
import { cerrarSesion, loginUsuario, registerUsuario } from '../controllers/authController.js';
import { autenticarToken } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/register', registerUsuario);
router.post('/login', loginUsuario);
router.post('/logout', autenticarToken, cerrarSesion);

export default router;
