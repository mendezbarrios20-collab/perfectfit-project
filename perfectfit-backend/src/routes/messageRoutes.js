import express from 'express';
import { registrarMensaje } from '../controllers/messageController.js';

const router = express.Router();

// Define que cuando llegue una petición HTTP POST a la raíz de este enrutador, ejecute la lógica del controlador
router.post('/', registrarMensaje);

export default router;
