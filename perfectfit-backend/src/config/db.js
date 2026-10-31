import mongoose from 'mongoose';

const conectarDB = async () => {
  try {
    // Colocamos el enlace directo para saltarnos los terca bloqueos de IP del módem
    const uriDirecta = "mongodb://mendezbarrios20_db_user:hxtDct3VD1yREE19@ac-igas7yl-shard-00-00.mongodb.net:27017,ac-igas7yl-shard-00-01.mongodb.net:27017,ac-igas7yl-shard-00-02.mongodb.net:27017/perfectfit_db?ssl=true&replicaSet=atlas-mshb73-shard-00&authSource=admin&retryWrites=true&w=majority";
    
    const conn = await mongoose.connect(uriDirecta);
    console.log(`🍃 Base de Datos Conectada Correctamente: ${conn.connection.host}`);
  } catch (error) {
    console.error(`❌ Error al conectar a la Base de Datos: ${error.message}`);
    // Dejamos comentado el cierre para que tu servidor NO se apague nunca por la red
    // process.exit(1);
  }
};

export default conectarDB;
