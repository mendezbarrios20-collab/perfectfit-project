import express from 'express';
import { obtenerProductos, crearProducto } from '../controllers/productController.js';

const router = express.Router();

// Define las rutas para el catálogo de platos
router.route('/')
  .get(obtenerProductos)   // GET /api/products -> Para traer los 16 platos al catálogo de React
  .post(crearProducto);    // POST /api/products -> Para que el administrador cree platos nuevos

export default router;
