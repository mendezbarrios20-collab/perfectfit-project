// Importación de imágenes locales desde la ruta centralizada
import imgArrozInflado from '../assets/images/ArrozInflado.jpg';
import imgArrozCurry from '../assets/images/ArrozCurry.jpg';
import imgBarritas from '../assets/images/Barritas.jpg';
import imgGarbanzos from '../assets/images/Garbanzos.jpg';
import imgAcai from '../assets/images/Acai.jpg';
import imgSalmon from '../assets/images/Salmon.jpg';
import imgMuffins from '../assets/images/Muffins.jpg';
import imgPancakes from '../assets/images/Pancakes.jpg';
import imgParfait from '../assets/images/parfait.jpg';
import imgPudin from '../assets/images/Pudin.jpg';
import imgSmoothie from '../assets/images/Smoothie.jpg';
import imgTostada from '../assets/images/Tostada.jpg';
import imgWaffles from '../assets/images/Waffles.jpg';
import imgAvena from '../assets/images/Avena.jpeg';
import imgTrufas from '../assets/images/Trufas.jpeg';
import imgWrap from '../assets/images/Wrap.avif';

export const menuData = [
  // 1. DESAYUNOS
  {
    id: 1,
    name: 'Overnight Oats de Proteína',
    category: 'desayunos',
    objective: 'saciedad',
    price: 24900,
    image: imgAvena,
    description: 'Avena trasnochada preparada con proteína, semillas de chía y arándanos.',
    macros: 'Carbohidratos complejos + Fibra + Proteína',
  },
  {
    id: 2,
    name: 'Waffles de Yuca y Clara de Huevo',
    category: 'desayunos',
    objective: 'saciedad',
    price: 23900,
    image: imgWaffles,
    description: 'Waffles de almidón de yuca y claras de huevo. 100% libres de gluten y livianos.',
    macros: 'Carbohidratos limpios + Proteína magra',
  },
  {
    id: 3,
    name: 'Toast de Masa Madre con Aguacate y Huevo',
    category: 'desayunos',
    objective: 'saciedad',
    price: 26900,
    image: imgTostada,
    description: 'Tostada de masa madre con medio aguacate, huevo poché y semillas de cáñamo.',
    macros: 'Grasas saludables + Proteína de alto valor',
  },
  {
    id: 4,
    name: 'Bowl de Acaí y Kéfir',
    category: 'desayunos',
    objective: 'saciedad',
    price: 29900,
    image: imgAcai,
    description: 'Bowl refrescante elaborado con pulpa de acaí puro, kéfir y granola artesanal.',
    macros: 'Antioxidantes + Probióticos + Fibra',
  },
  {
    id: 5,
    name: 'Muffins de Huevo, Espinaca y Pavo',
    category: 'desayunos',
    objective: 'saciedad',
    price: 18900,
    image: imgMuffins,
    description: 'Muffins individuales de huevo, espinaca baby y pechuga de pavo. Formato Grab & Go.',
    macros: 'Alto aporte proteico + Micronutrientes',
  },
  // 2. SNACKS
  {
    id: 6,
    name: 'Pudín de Chía y Coco con Colágeno',
    category: 'snacks',
    objective: 'saciedad',
    price: 19900,
    image: imgPudin,
    description: 'Pudín elaborado con leche de coco ligera, chía y péptidos de colágeno.',
    macros: 'Fibra soluble + Omega-3 + Colágeno',
  },
  {
    id: 7,
    name: 'Bocaditos de Garbanzos Crujientes',
    category: 'snacks',
    objective: 'saciedad',
    price: 11900,
    image: imgGarbanzos,
    description: 'Garbanzos horneados en air fryer sazonados con oliva y pimentón ahumado.',
    macros: 'Proteína vegetal + Fibra + Magnesio',
  },
  {
    id: 8,
    name: 'Trufas de Almendra y Matcha',
    category: 'snacks',
    objective: 'energia',
    price: 16900,
    image: imgTrufas,
    description: 'Trufas elaboradas con harina de almendras natural, té matcha y sirope de agave.',
    macros: 'Grasas saludables + Antioxidantes',
  },
  // 3. PRE-ENTRENO
  {
    id: 9,
    name: 'Barritas Energéticas de Dátiles y Café',
    category: 'pre-entreno',
    objective: 'energia',
    price: 12500,
    image: imgBarritas,
    description: 'Barritas compactas de dátiles sin hueso, nueces del nogal y café espresso.',
    macros: 'Energía rápida + Estimulante natural',
  },
  {
    id: 10,
    name: 'Arroz Inflado con Mantequilla de Maní y Banano',
    category: 'pre-entreno',
    objective: 'energia',
    price: 14900,
    image: imgArrozInflado,
    description: 'Tortitas de arroz inflado acompañadas de mantequilla de maní 100% natural y banano.',
    macros: 'Carbohidratos rápidos + Potasio',
  },
  {
    id: 11,
    name: 'Pancakes de Banano y Avena',
    category: 'pre-entreno',
    objective: 'energia',
    price: 21900,
    image: imgPancakes,
    description: 'Pancakes ligeros preparados con banano maduro, avena y claras de huevo.',
    macros: 'Glucógeno limpio + Digestión óptima',
  },
  // 4. POST-ENTRENO
  {
    id: 12,
    name: 'Smoothie Cremoso de Proteína y Camote',
    category: 'post-entreno',
    objective: 'recuperacion',
    price: 23900,
    image: imgSmoothie,
    description: 'Batido elaborado con puré de camote cocido y proteína de suero aislada.',
    macros: 'Reposición de glucógeno + Aminoácidos',
  },
  {
    id: 13,
    name: 'Bowl de Quinoa, Salmón y Edamame',
    category: 'post-entreno',
    objective: 'recuperacion',
    price: 26900,
    image: imgSalmon,
    description: 'Plato completo con quinoa cocida, salmón a la plancha, edamame y aguacate.',
    macros: 'Proteína completa + Omega-3',
  },
  {
    id: 14,
    name: 'Parfait de Yogur Griego y Cerezas Ácidas',
    category: 'post-entreno',
    objective: 'recuperacion',
    price: 18900,
    image: imgParfait,
    description: 'Combinación fresca de yogur griego rico en proteínas y cerezas ácidas.',
    macros: 'Proteína láctea + Antioxidantes',
  },
  {
    id: 15,
    name: 'Wrap de Pollo, Hummus y Espinaca',
    category: 'post-entreno',
    objective: 'recuperacion',
    price: 28900,
    image: imgWrap,
    description: 'Wrap en tortilla a base de linaza o coco, pechuga de pollo y hummus.',
    macros: 'Proteína magra + Grasas saludables',
  },
  {
    id: 16,
    name: 'Arroz Jasmín con Pavo al Curry y Piña',
    category: 'post-entreno',
    objective: 'recuperacion',
    price: 30900,
    image: imgArrozCurry,
    description: 'Plato elaborado con arroz jasmín, pechuga de pavo, curry en polvo y piña natural.',
    macros: 'Reposición de glucógeno + Proteína magra',
  },
];
