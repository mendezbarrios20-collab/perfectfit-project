import 'dotenv/config';
import bcrypt from 'bcryptjs';
import mongoose from 'mongoose';
import User from './src/models/User.js';

const ADMIN_EMAIL = 'admin@perfectfit.com';
const HASH_ROUNDS = 12;

const restablecerAdmin = async () => {
  const { MONGODB_URI, ADMIN_PASSWORD, ADMIN_BOOTSTRAP_CONFIRM } = process.env;

  if (!MONGODB_URI) {
    throw new Error('Falta MONGODB_URI en las variables de entorno.');
  }

  if (ADMIN_BOOTSTRAP_CONFIRM !== 'I_OWN_THIS_DATABASE') {
    throw new Error('Confirma que esta es tu base de datos configurando ADMIN_BOOTSTRAP_CONFIRM=I_OWN_THIS_DATABASE.');
  }

  if (!ADMIN_PASSWORD || ADMIN_PASSWORD.length < 12) {
    throw new Error('ADMIN_PASSWORD debe tener al menos 12 caracteres.');
  }

  await mongoose.connect(MONGODB_URI);

  const password = await bcrypt.hash(ADMIN_PASSWORD, HASH_ROUNDS);
  const adminActualizado = await User.findOneAndUpdate(
    { email: ADMIN_EMAIL },
    {
      $set: { role: 'admin', password },
      $setOnInsert: { name: 'Administrador' }
    },
    { upsert: true, new: true, runValidators: true, setDefaultsOnInsert: true }
  );

  if (!adminActualizado) {
    throw new Error(`No se pudo actualizar o crear la cuenta administradora ${ADMIN_EMAIL}.`);
  }

  console.log(`Cuenta administradora actualizada o creada para ${ADMIN_EMAIL}.`);
};

try {
  await restablecerAdmin();
} catch (error) {
  console.error(`No se pudo restablecer el administrador: ${error.message}`);
  process.exitCode = 1;
} finally {
  if (mongoose.connection.readyState !== 0) {
    await mongoose.disconnect();
  }
}
