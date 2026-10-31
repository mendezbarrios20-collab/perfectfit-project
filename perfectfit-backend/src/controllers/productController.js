/**
 * @desc    Obtener todos los platos de la cafetería PerfectFit Bowl
 * @route   GET /api/products
 * @access  Public
 */
export const obtenerProductos = async (req, res) => {
  try {
    // Tu lista oficial de 16 platos reales estructurada perfectamente para el Frontend
    const menuCompleto = [
      // 1. DESAYUNOS
      { id: 1, name: 'Overnight Oats de Proteína', category: 'desayunos', objective: 'saciedad', price: 24900, description: 'Avena trasnochada preparada con proteína, semillas de chía y arándanos.', macros: 'Carbohidratos complejos + Fibra + Proteína' },
      { id: 2, name: 'Waffles de Yuca y Clara de Huevo', category: 'desayunos', objective: 'saciedad', price: 23900, description: 'Waffles de almidón de yuca y claras de huevo. 100% libres de gluten y livianos.', macros: 'Carbohidratos limpios + Proteína magra' },
      { id: 3, name: 'Toast de Masa Madre con Aguacate y Huevo', category: 'desayunos', objective: 'saciedad', price: 26900, description: 'Tostada de masa madre con medio aguacate, huevo poché y semillas de cáñamo.', macros: 'Grasas saludables + Proteína de alto valor' },
      { id: 4, name: 'Bowl de Acaí y Kéfir', category: 'desayunos', objective: 'saciedad', price: 29900, description: 'Bowl refrescante elaborado con pulpa de acaí puro, kéfir y granola artesanal.', macros: 'Antioxidantes + Probióticos + Fibra' },
      { id: 5, name: 'Muffins de Huevo, Espinaca y Pavo', category: 'desayunos', objective: 'saciedad', price: 18900, description: 'Muffins individuales de huevo, espinaca baby y pechuga de pavo. Formato Grab & Go.', macros: 'Alto aporte proteico + Micronutrientes' },
      
      // 2. SNACKS
      { id: 6, name: 'Pudín de Chía y Coco con Colágeno', category: 'snacks', objective: 'saciedad', price: 19900, description: 'Pudín elaborado con leche de coco ligera, chía y péptidos de colágeno.', macros: 'Fibra soluble + Omega-3 + Colágeno' },
      { id: 7, name: 'Bocaditos de Garbanzos Crujientes', category: 'snacks', objective: 'saciedad', price: 11900, description: 'Garbanzos horneados en air fryer sazonados con oliva y pimentón ahumado.', macros: 'Proteína vegetal + Fibra + Magnesio' },
      { id: 8, name: 'Trufas de Almendra y Matcha', category: 'snacks', objective: 'energia', price: 16900, description: 'Trufas elaboradas con harina de almendras natural, té matcha y sirope de agave.', macros: 'Grasas saludables + Antioxidantes' },
      
      // 3. PRE-ENTRENO
      { id: 9, name: 'Barritas Energéticas de Dátiles y Café', category: 'pre-entreno', objective: 'energia', price: 12500, description: 'Barritas compactas de dátiles sin hueso, nueces del nogal y café espresso.', macros: 'Energía rápida + Estimulante natural' },
      { id: 10, name: 'Arroz Inflado con Mantequilla de Maní y Banano', category: 'pre-entreno', objective: 'energia', price: 14900, description: 'Tortitas de arroz inflado acompañadas de mantequilla de maní 100% natural y banano.', macros: 'Carbohidratos rápidos + Potasio' },
      { id: 11, name: 'Pancakes de Banano y Avena', category: 'pre-entreno', objective: 'energia', price: 21900, description: 'Pancakes ligeros preparados con banano maduro, avena y claras de huevo.', macros: 'Glucógeno limpio + Digestión óptima' },
      
      // 4. POST-ENTRENO
      { id: 12, name: 'Smoothie Cremoso de Proteína y Camote', category: 'post-entreno', objective: 'recuperacion', price: 23900, description: 'Batido elaborado con puré de camote cocido y proteína de suero aislada.', macros: 'Reposición de glucógeno + Aminoácidos' },
      { id: 13, name: 'Bowl de Quinoa, Salmón y Edamame', category: 'post-entreno', objective: 'recuperacion', price: 26900, description: 'Plato completo con quinoa cocida, salmón a la plancha, edamame y aguacate.', macros: 'Proteína completa + Omega-3' },
      { id: 14, name: 'Parfait de Yogur Griego y Cerezas Ácidas', category: 'post-entreno', objective: 'recuperacion', price: 18900, description: 'Combinación fresca de yogur griego rico en proteínas y cerezas ácidas.', macros: 'Proteína láctea + Antioxidantes' },
      { id: 15, name: 'Wrap de Pollo, Hummus y Espinaca', category: 'post-entreno', objective: 'recuperacion', price: 28900, description: 'Wrap en tortilla a base de linaza o coco, pechuga de pollo y hummus.', macros: 'Proteína magra + Grasas saludables' },
      { id: 16, name: 'Arroz Jasmín con Pavo al Curry y Piña', category: 'post-entreno', objective: 'recuperacion', price: 30900, description: 'Plato elaborado con arroz jasmín, pechuga de pavo, curry en polvo y piña natural.', macros: 'Reposición de glucógeno + Proteína magra' }
    ];

    // Respondemos al Frontend enviando con éxito toda la data real
    res.status(200).json({
      success: true,
      count: menuCompleto.length,
      data: menuCompleto
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Error interno en el servidor local al obtener el menú.'
    });
  }
};

/**
 * @desc    Registrar un nuevo plato de forma local
 * @route   POST /api/products
 * @access  Public
 */
export const crearProducto = async (req, res) => {
  try {
    const nuevoProducto = { 
      ...req.body, 
      _id: "plato_prueba_" + Math.random().toString(36).substr(2, 9), 
      createdAt: new Date() 
    };
    
    res.status(201).json({
      success: true,
      message: '¡Plato recibido y registrado exitosamente en el servidor local! 🥞',
      data: nuevoProducto
    });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};
