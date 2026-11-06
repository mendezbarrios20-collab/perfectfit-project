import express from 'express';
import { obtenerProductos, crearProducto, actualizarProducto } from '../controllers/productController.js';
import { autenticarToken } from '../middleware/authMiddleware.js';
const router = express.Router();

// Ruta para la raíz de productos: Descargar (GET) y Crear (POST)
router.route('/')
  .get(obtenerProductos)
  .post(autenticarToken, crearProducto);

// Ruta modular por ID: Recibe el ID numérico y procesa la actualización (PUT)
router.route('/:id')
  .put(autenticarToken, actualizarProducto);

export default router;
