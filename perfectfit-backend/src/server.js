import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import messageRoutes from './routes/messageRoutes.js';
import productRoutes from './routes/productRoutes.js';
import authRoutes from './routes/authRoutes.js';
import conectarDB from './config/db.js'; // <- 1. IMPORTACIÓN REAL DE LA BASE DE DATOS

// Cargar la configuración de variables secretas
dotenv.config();

// Inicializar la aplicación del servidor Express
const app = express();

// Middlewares globales obligatorios
app.use(cors());          
app.use(express.json()); 

// 2. EJECUCIÓN REAL DE LA CONEXIÓN (Eliminamos el log mentiroso que tenías aquí)
conectarDB();

// Vincular las Rutas Modulares del Sistema
app.use('/api/messages', messageRoutes); 
app.use('/api/products', productRoutes); 
app.use('/api/auth', authRoutes);         

// Ruta base de prueba (Verificación de salud de la API)
app.get('/', (req, res) => {
    res.send('API de PerfectFit Bowl corriendo correctamente en Cartagena 🥗✨');
});

// Configuración del puerto de escucha
const PORT = process.env.PORT || 5000;

// Encender el servidor en el puerto asignado
app.listen(PORT, () => {
    console.log(`🚀 Servidor ejecutándose con éxito en http://localhost:${PORT}`);
});
