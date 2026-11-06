import mongoose from 'mongoose';
import Product from '../models/Product.js';
import menuInicial from '../data/menuInicial.js';

const conectarDB = async () => {
  try {
    const { MONGODB_URI } = process.env;

    if (!MONGODB_URI) {
      throw new Error('Falta MONGODB_URI en las variables de entorno.');
    }

    await mongoose.connect(MONGODB_URI);
    console.log('🟢 Conexión con MongoDB establecida.');

    const cantidadProductos = await Product.countDocuments();
    if (cantidadProductos === 0) {
      await Product.insertMany(menuInicial);
      console.log(`🥗 Menú inicial cargado: ${menuInicial.length} productos.`);
    }
  } catch (error) {
    console.error(`❌ No se pudo inicializar MongoDB: ${error.message}`);
    throw error;
  }
};

export default conectarDB;
