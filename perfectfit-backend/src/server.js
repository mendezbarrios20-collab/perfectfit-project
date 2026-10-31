import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import conectarDB from './config/db.js';
import messageRoutes from './routes/messageRoutes.js';
import productRoutes from './routes/productRoutes.js'; // <- Importamos las rutas del catálogo

// 1. Cargar la configuración de variables secretas del archivo .env
dotenv.config();

// 2. Ejecutar la conexión asíncrona a la base de datos (Comentado temporalmente por red)
// conectarDB();

// 3. Inicializar la aplicación del servidor Express
const app = express();

// 4. Middlewares globales obligatorios
app.use(cors());          
app.use(express.json()); 

// 5. Vincular las Rutas Modulares del Sistema
app.use('/api/messages', messageRoutes); // Endpoint para el formulario de contacto
app.use('/api/products', productRoutes); // <- ¡Aquí está la línea que faltaba para el catálogo! 🥗

// 6. Ruta base de prueba (Verificación de salud de la API)
app.get('/', (req, res) => {
    res.send('API de PerfectFit Bowl corriendo correctamente en Cartagena 🥗✨');
});

// 7. Configuración del puerto de escucha
const PORT = process.env.PORT || 5000;

// 8. Encender el servidor en el puerto asignado
app.listen(PORT, () => {
    console.log(`🚀 Servidor ejecutándose con éxito en http://localhost:${PORT}`);
});
