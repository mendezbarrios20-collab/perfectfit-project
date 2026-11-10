import express from 'express';
import { registrarMensaje, obtenerMensajes, marcarMensajeLeido, eliminarMensaje } from '../controllers/messageController.js';
import { autenticarToken, autorizarAdmin } from '../middleware/authMiddleware.js';
const router = express.Router();

router.route('/')
  .post(registrarMensaje)
  .get(autenticarToken, autorizarAdmin, obtenerMensajes);

router.route('/:id')
  .delete(autenticarToken, autorizarAdmin, eliminarMensaje);

router.patch('/:id/leer', autenticarToken, autorizarAdmin, marcarMensajeLeido);

export default router;
