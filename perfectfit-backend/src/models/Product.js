import mongoose from 'mongoose';

// Esquema técnico y estricto para los platos del catálogo de PerfectFit Bowl
const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'El nombre del plato es obligatorio.'],
    trim: true
  },
  price: {
    type: Number,
    required: [true, 'El precio del plato es obligatorio.']
  },
  description: {
    type: String,
    required: [true, 'La descripción es obligatoria.'],
    trim: true
  },
  image: {
    type: String,
    required: [true, 'La ruta de la imagen local es obligatoria.']
  },
  category: {
    type: String,
    required: [true, 'La categoría (Desayunos, Snacks, Pre/Post Entreno) es obligatoria.'],
    enum: ['desayunos', 'snacks', 'pre-entreno', 'post-entreno']
  },
  macros: {
    calories: { type: Number, required: true },
    protein: { type: Number, required: true },
    carbs: { type: Number, required: true },
    fats: { type: Number, required: true }
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Exportamos el modelo listo para ser usado por los controladores
export default mongoose.model('Product', productSchema);
