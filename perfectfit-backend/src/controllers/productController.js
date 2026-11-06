import Product from '../models/Product.js';

// 1. Convertimos el menú en una variable global modificable 'let' en la memoria del servidor
let menuCompletoPerfectFit = [
  // 1. DESAYUNOS
  { id: 1, name: 'Overnight Oats de Proteína', category: 'desayunos', objective: 'saciedad', price: 24900, description: 'Avena trasnochada preparada con proteína, semillas de chía y arándanos.', macros: { calories: 350, protein: 25, carbs: 45, fats: 6 } },
  { id: 2, name: 'Waffles de Yuca y Clara de Huevo', category: 'desayunos', objective: 'saciedad', price: 23900, description: 'Waffles de almidón de yuca y claras de huevo. 100% libres de gluten y livianos.', macros: { calories: 280, protein: 18, carbs: 35, fats: 4 } },
  { id: 3, name: 'Toast de Masa Madre con Aguacate y Huevo', category: 'desayunos', objective: 'saciedad', price: 26900, description: 'Tostada de masa madre con medio aguacate, huevo poché y semillas de cáñamo.', macros: { calories: 420, protein: 16, carbs: 38, fats: 14 } },
  { id: 4, name: 'Bowl de Acaí y Kéfir', category: 'desayunos', objective: 'saciedad', price: 29900, description: 'Bowl refrescante elaborado con pulpa de acaí puro, kéfir y granola artesanal.', macros: { calories: 310, protein: 10, carbs: 50, fats: 5 } },
  { id: 5, name: 'Muffins de Huevo, Espinaca y Pavo', category: 'desayunos', objective: 'saciedad', price: 18900, description: 'Muffins individuales de huevo, espinaca baby y pechuga de pavo. Formato Grab & Go.', macros: { calories: 210, protein: 22, carbs: 8, fats: 6 } },
  
  // 2. SNACKS
  { id: 6, name: 'Pudín de Chía y Coco con Colágeno', category: 'snacks', objective: 'saciedad', price: 19900, description: 'Pudín elaborado con leche de coco ligera, chía y péptidos de colágeno.', macros: { calories: 180, protein: 12, carbs: 15, fats: 8 } },
  { id: 7, name: 'Bocaditos de Garbanzos Crujientes', category: 'snacks', objective: 'saciedad', price: 11900, description: 'Garbanzos horneados en air fryer sazonados con oliva y pimentón ahumado.', macros: { calories: 150, protein: 7, carbs: 22, fats: 3 } },
  { id: 8, name: 'Trufas de Almendra y Matcha', category: 'snacks', objective: 'energia', price: 16900, description: 'Trufas elaboradas con harina de almendras natural, té matcha y sirope de agave.', macros: { calories: 190, protein: 5, carbs: 18, fats: 9 } },
  
  // 3. PRE-ENTRENO
  { id: 9, name: 'Barritas Energéticas de Dátiles y Café', category: 'pre-entreno', objective: 'energia', price: 12500, description: 'Barritas compactas de dátiles sin hueso, nueces del nogal y café espresso.', macros: { calories: 240, protein: 4, carbs: 42, fats: 7 } },
  { id: 10, name: 'Arroz Inflado con Mantequilla de Maní y Banano', category: 'pre-entreno', objective: 'energia', price: 14900, description: 'Tortitas de arroz inflado acompañadas de mantequilla de maní 100% natural y banano.', macros: { calories: 260, protein: 6, carbs: 38, fats: 8 } },
  { id: 11, name: 'Pancakes de Banano y Avena', category: 'pre-entreno', objective: 'energia', price: 21900, description: 'Pancakes ligeros preparados con banano maduro, avena y claras de huevo.', macros: { calories: 320, protein: 15, carbs: 55, fats: 3 } },
  
  // 4. POST-ENTRENO
  { id: 12, name: 'Smoothie Cremoso de Proteína y Camote', category: 'post-entreno', objective: 'recuperacion', price: 23900, description: 'Batido elaborado con puré de camote cocido y proteína de suero aislada.', macros: { calories: 380, protein: 30, carbs: 48, fats: 2 } },
  { id: 13, name: 'Bowl de Quinoa, Salmón y Edamame', category: 'post-entreno', objective: 'recuperacion', price: 26900, description: 'Plato completo con quinoa cocida, salmón a la plancha, edamame y aguacate.', macros: { calories: 450, protein: 35, carbs: 40, fats: 12 } },
  { id: 14, name: 'Parfait de Yogur Griego y Cerezas Ácidas', category: 'post-entreno', objective: 'recuperacion', price: 18900, description: 'Combinación fresca de yogur griego rico en proteínas y cerezas ácidas.', macros: { calories: 220, protein: 24, carbs: 20, fats: 1 } },
  { id: 15, name: 'Wrap de Pollo, Hummus y Espinaca', category: 'post-entreno', objective: 'recuperacion', price: 28900, description: 'Wrap en tortilla a base de linaza o coco, pechuga de pollo y hummus.', macros: { calories: 390, protein: 28, carbs: 32, fats: 9 } },
  { id: 16, name: 'Arroz Jasmín con Pavo al Curry y Piña', category: 'post-entreno', objective: 'recuperacion', price: 30900, description: 'Plato elaborado con arroz jasmín, pechuga de pavo, curry en polvo y piña natural.', macros: { calories: 410, protein: 32, carbs: 52, fats: 4 } }
];

/**
 * @desc    Obtener todos los platos de la cafetería PerfectFit Bowl
 * @route   GET /api/products
 */
export const obtenerProductos = async (req, res) => {
  try {
    res.status(200).json({
      success: true,
      count: menuCompletoPerfectFit.length,
      data: menuCompletoPerfectFit
    });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Error al obtener el menú.' });
  }
};

/**
 * @desc    Actualizar un plato existente en la memoria del servidor local
 * @route   PUT /api/products/:id
 */
export const actualizarProducto = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, price, category } = req.body;
    const nombreNormalizado = typeof name === 'string' ? name.trim() : '';
    const precioNormalizado = Number(price);
    const categoriasPermitidas = ['desayunos', 'snacks', 'pre-entreno', 'post-entreno'];

    if (!Number.isInteger(Number(id)) || Number(id) <= 0) {
      return res.status(400).json({ success: false, error: 'El ID del plato no es válido.' });
    }

    if (!nombreNormalizado || !Number.isFinite(precioNormalizado) || precioNormalizado <= 0 || !categoriasPermitidas.includes(category)) {
      return res.status(400).json({
        success: false,
        error: 'Proporciona un nombre, un precio mayor que cero y una categoría válida.'
      });
    }

    // Buscamos el plato en nuestro arreglo de memoria RAM por su ID numérico
    const index = menuCompletoPerfectFit.findIndex(p => p.id === Number(id));

    if (index !== -1) {
      // Actualizamos las propiedades con los nuevos datos enviados por React
      menuCompletoPerfectFit[index].name = nombreNormalizado;
      menuCompletoPerfectFit[index].price = precioNormalizado;
      menuCompletoPerfectFit[index].category = category;

      console.log(`📝 Plato ID #${id} editado con éxito en el servidor local:`, menuCompletoPerfectFit[index]);

      return res.status(200).json({
        success: true,
        message: '¡Plato actualizado de forma local exitosamente! 🥗',
        data: menuCompletoPerfectFit[index]
      });
    }

    res.status(404).json({ success: false, error: 'Plato no encontrado en el menú.' });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

/**
 * @desc    Registrar un nuevo plato de forma simulada
 * @route   POST /api/products
 */
export const crearProducto = async (req, res) => {
  try {
    res.status(201).json({
      success: true,
      message: '¡Plato recibido exitosamente en el servidor local! 🥞'
    });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};
