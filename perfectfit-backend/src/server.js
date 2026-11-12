import 'dotenv/config'; // 1. CARGA LAS VARIABLES SECRETAS DE INMEDIATO EN LA PRIMERA LÍNEA
import express from 'express';
import cors from 'cors';
import messageRoutes from './routes/messageRoutes.js';
import productRoutes from './routes/productRoutes.js';
import authRoutes from './routes/authRoutes.js';
import iaRoutes from './routes/iaRoutes.js';
import conectarDB from './config/db.js'; 

// Inicializar la aplicación del servidor Express
const app = express();
const origenesPermitidos = [
    'http://localhost:5173',
    process.env.FRONTEND_URL
].filter(Boolean);

// Middlewares globales obligatorios
app.use(cors({ origin: origenesPermitidos }));
app.use(express.json()); 

// Vincular las Rutas Modulares del Sistema
app.use('/api/messages', messageRoutes); 
app.use('/api/products', productRoutes); 
app.use('/api/auth', authRoutes);         
app.use('/api/ia', iaRoutes);         

// Ruta base de prueba (Verificación de salud de la API)
app.get('/', (req, res) => {
    res.send('API de PerfectFit Bowl corriendo correctamente en Cartagena 🥗✨');
});

// Configuración del puerto de escuha (lee el puerto del .env o usa el 5000 por defecto)
const PORT = process.env.PORT || 5000;

// Función asíncrona para arrancar la base de datos antes de encender el servidor
const iniciarServidor = async () => {
    await conectarDB(); // Abre la manguera real hacia MongoDB Atlas en internet
    app.listen(PORT, () => {
        console.log(`🚀 Servidor ejecutándose con éxito en http://localhost:${PORT}`);
    });
};

// Ejecutar el arranque y capturar errores si la red o las credenciales fallan
iniciarServidor().catch((error) => {
    console.error(`❌ El servidor no pudo iniciar: ${error.message}`);
    process.exitCode = 1;
});
