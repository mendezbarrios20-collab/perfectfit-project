import Product from '../models/Product.js';

const categoriasPermitidas = ['desayunos', 'snacks', 'pre-entreno', 'post-entreno'];
const objetivosPermitidos = ['saciedad', 'energia', 'recuperacion'];

const validarMacros = (macros) => (
  macros &&
  ['calories', 'protein', 'carbs', 'fats'].every((key) => (
    Number.isFinite(Number(macros[key])) && Number(macros[key]) >= 0
  ))
);

/**
 * @desc Obtener todos los productos del catálogo
 * @route GET /api/products
 * @access Public
 */
export const obtenerProductos = async (req, res) => {
  try {
    const productos = await Product.find().sort({ id: 1 }).lean();
    return res.status(200).json({
      success: true,
      count: productos.length,
      data: productos
    });
  } catch (error) {
    console.error('Error al obtener los productos:', error);
    return res.status(500).json({ success: false, error: 'Error al obtener el menú.' });
  }
};

/**
 * @desc Crear un producto en MongoDB
 * @route POST /api/products
 * @access Admin
 */
export const crearProducto = async (req, res) => {
  try {
    const { name, price, description, image, category, objective, macros } = req.body;
    const nombre = typeof name === 'string' ? name.trim() : '';
    const precio = Number(price);

    if (
      !nombre ||
      !Number.isFinite(precio) ||
      precio <= 0 ||
      typeof description !== 'string' ||
      !description.trim() ||
      typeof image !== 'string' ||
      !image.trim() ||
      !categoriasPermitidas.includes(category) ||
      !objetivosPermitidos.includes(objective) ||
      !validarMacros(macros)
    ) {
      return res.status(400).json({
        success: false,
        error: 'Proporciona nombre, precio, descripción, imagen, categoría, objetivo y macros válidos.'
      });
    }

    const ultimoProducto = await Product.findOne().sort({ id: -1 }).select('id').lean();
    const nuevoProducto = await Product.create({
      id: (ultimoProducto?.id || 0) + 1,
      name: nombre,
      price: precio,
      description: description.trim(),
      image: image.trim(),
      category,
      objective,
      macros: {
        calories: Number(macros.calories),
        protein: Number(macros.protein),
        carbs: Number(macros.carbs),
        fats: Number(macros.fats)
      }
    });

    return res.status(201).json({
      success: true,
      message: 'Producto creado correctamente.',
      data: nuevoProducto
    });
  } catch (error) {
    console.error('Error al crear el producto:', error);
    return res.status(500).json({ success: false, error: 'No se pudo crear el producto.' });
  }
};

/**
 * @desc Actualizar nombre, precio y categoría de un producto
 * @route PUT /api/products/:id
 * @access Admin
 */
export const actualizarProducto = async (req, res) => {
  try {
    const id = Number(req.params.id);
    const { name, price, category } = req.body;
    const nombre = typeof name === 'string' ? name.trim() : '';
    const precio = Number(price);

    if (!Number.isInteger(id) || id <= 0) {
      return res.status(400).json({ success: false, error: 'El ID del plato no es válido.' });
    }

    if (
      !nombre ||
      !Number.isFinite(precio) ||
      precio <= 0 ||
      !categoriasPermitidas.includes(category)
    ) {
      return res.status(400).json({
        success: false,
        error: 'Proporciona un nombre, un precio mayor que cero y una categoría válida.'
      });
    }

    const producto = await Product.findOneAndUpdate(
      { id },
      { $set: { name: nombre, price: precio, category } },
      { new: true, runValidators: true }
    );

    if (!producto) {
      return res.status(404).json({ success: false, error: 'Plato no encontrado en el menú.' });
    }

    return res.status(200).json({
      success: true,
      message: 'Producto actualizado correctamente.',
      data: producto
    });
  } catch (error) {
    console.error('Error al actualizar el producto:', error);
    return res.status(500).json({ success: false, error: 'No se pudo actualizar el producto.' });
  }
};
