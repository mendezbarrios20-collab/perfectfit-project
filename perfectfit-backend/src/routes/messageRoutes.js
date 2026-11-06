import express from 'express';
import { registrarMensaje, obtenerMensajes, eliminarMensaje } from '../controllers/messageController.js';
import { autenticarToken } from '../middleware/authMiddleware.js';
const router = express.Router();

router.route('/')
  .post(registrarMensaje)
  .get(autenticarToken, obtenerMensajes);

router.route('/:id')
  .delete(autenticarToken, eliminarMensaje);

export default router;
