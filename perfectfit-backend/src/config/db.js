import bcrypt from 'bcryptjs';
import mongoose from 'mongoose';
import Product from '../models/Product.js';
import User from '../models/User.js';
import menuInicial from '../data/menuInicial.js';

const ADMIN_EMAIL = 'admin@perfectfit.com';
const HASH_ROUNDS = 12;

const conectarDB = async () => {
  try {
    const { MONGODB_URI, ADMIN_PASSWORD, ADMIN_BOOTSTRAP_CONFIRM } = process.env;

    if (!MONGODB_URI) {
      throw new Error('Falta MONGODB_URI en las variables de entorno.');
    }

    await mongoose.connect(MONGODB_URI);
    console.log('🟢 Conexión con MongoDB establecida.');

    const administradorExiste = await User.exists({
      email: ADMIN_EMAIL,
      role: 'admin'
    });

    if (!administradorExiste) {
      const cuentaExistente = await User.exists({ email: ADMIN_EMAIL });

      if (cuentaExistente) {
        throw new Error(
          `La cuenta ${ADMIN_EMAIL} existe sin rol de administrador. Usa crearAdmin.js para actualizarla de forma explícita.`
        );
      }

      if (ADMIN_BOOTSTRAP_CONFIRM !== 'I_OWN_THIS_DATABASE') {
        throw new Error(
          `No existe ${ADMIN_EMAIL}. Para crearla, configura ADMIN_BOOTSTRAP_CONFIRM=I_OWN_THIS_DATABASE en el entorno.`
        );
      }

      if (!ADMIN_PASSWORD || ADMIN_PASSWORD.length < 12) {
        throw new Error('ADMIN_PASSWORD debe tener al menos 12 caracteres para crear el administrador.');
      }

      const passwordHash = await bcrypt.hash(ADMIN_PASSWORD, HASH_ROUNDS);
      await User.create({
        name: 'Administrador',
        email: ADMIN_EMAIL,
        password: passwordHash,
        role: 'admin'
      });
      console.log(`Cuenta administradora creada para ${ADMIN_EMAIL}.`);
    }

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
