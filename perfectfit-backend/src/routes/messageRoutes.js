import express from 'express';
import { registrarMensaje, obtenerMensajes, eliminarMensaje } from '../controllers/messageController.js';
const router = express.Router();

router.route('/')
  .post(registrarMensaje)
  .get(obtenerMensajes); // GET /api/messages -> Para cargar la bandeja de entrada admin

router.route('/:id')
  .delete(eliminarMensaje); // DELETE /api/messages/:id -> Para el boton rojo de borrar

export default router;
