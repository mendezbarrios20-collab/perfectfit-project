import mongoose from 'mongoose';

// Definición del esquema estricto de Mongoose para la colección de mensajes
const messageSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'El nombre completo es obligatorio.'],
    trim: true
  },
  email: {
    type: String,
    required: [true, 'El correo electrónico es obligatorio.'],
    trim: true,
    lowercase: true
  },
  phone: {
    type: String,
    required: [true, 'El teléfono celular es obligatorio.'],
    trim: true
  },
  message: {
    type: String,
    required: [true, 'El contenido del mensaje o pedido es obligatorio.'],
    trim: true
  },
  read: {
    type: Boolean,
    default: false
  },
  createdAt: {
    type: Date,
    default: Date.now // Guarda automáticamente la fecha y hora exacta del envío
  }
});

// Exportamos el modelo listo para ser usado en los controladores
export default mongoose.model('Message', messageSchema);
