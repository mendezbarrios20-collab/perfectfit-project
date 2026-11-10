import mongoose from 'mongoose';

// Esquema para los usuarios/administradores de PerfectFit Bowl
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'El nombre es obligatorio.'],
    trim: true
  },
  email: {
    type: String,
    required: [true, 'El correo electrónico es obligatorio.'],
    unique: true, // No permite dos usuarios con el mismo correo
    lowercase: true,
    trim: true,
    match: [/.+\@.+\..+/, 'Por favor ingrese un correo válido.']
  },
  password: {
    type: String,
    required: [true, 'La contraseña es obligatoria.'],
    minlength: [6, 'La contraseña debe tener al menos 6 caracteres.'],
    select: false
  },
  role: {
    type: String,
    enum: ['admin', 'user'],
    default: 'user'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model('User', userSchema);
