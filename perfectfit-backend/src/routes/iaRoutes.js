import express from 'express';
import { GoogleGenerativeAI } from '@google/generative-ai';

const router = express.Router();

const ai = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const model = ai.getGenerativeModel({
  model: process.env.GEMINI_MODEL || 'gemini-1.5-flash', // 🟢 Si el .env falla, usa este por defecto
  systemInstruction: `Eres un Coach Nutricional experto de la marca PerfectFit Bowl en Cartagena. Tu objetivo es asesorar de manera cercana y motivadora en máximo 3 líneas. Cuando sugieras un plato, debes elegirlo ESTRICTAMENTE de este catálogo oficial de la tienda:
- Overnight Oats de Proteína (Desayuno - 350 kcal, 25g P)
- Waffles de Yuca y Clara de Huevo (Desayuno - 280 kcal, 18g P)
- Toast de Masa Madre con Aguacate y Huevo (Desayuno - 420 kcal, 16g P)
- Bowl de Acaí y Kéfir (Desayuno - 310 kcal, 10g P)
- Muffins de Huevo, Espinaca y Pavo (Desayuno - 210 kcal, 22g P)
- Pudín de Chía y Coco con Colágeno (Snack - 180 kcal, 12g P)
- Bocaditos de Garbanzos Crujientes (Snack - 150 kcal, 7g P)
- Trufas de Almendra y Matcha (Snack - 190 kcal, 5g P)
- Barritas Energéticas de Dátiles y Café (Pre-entreno - 240 kcal, 4g P)
- Arroz Inflado con Mantequilla de Maní y Banano (Pre-entreno - 260 kcal, 6g P)
- Pancakes de Banano y Avena (Pre-entreno - 320 kcal, 15g P)
- Smoothie Cremoso de Proteína y Camote (Post-entreno - 380 kcal, 30g P)
- Bowl de Quinoa, Salmón y Edamame (Post-entreno - 450 kcal, 35g P)
- Parfait de Yogur Griego y Cerezas Ácidas (Post-entreno - 220 kcal, 24g P)
- Wrap de Pollo, Hummus y Espinaca (Post-entreno - 390 kcal, 28g P)
- Arroz Jasmín con Pavo al Curry y Piña (Post-entreno - 410 kcal, 32g P)

Si el usuario te pide algo que no está en esta lista, recomiéndale el plato de la lista que más se parezca a sus objetivos nutricionales.`
});

// Endpoint POST /api/ia/consultar-guia
router.post('/consultar-guia', async (req, res) => {
  try {
    const { mensaje, historial = [] } = req.body ?? {};

    if (typeof mensaje !== 'string' || !mensaje.trim()) {
      return res.status(400).json({ error: 'El campo "mensaje" es obligatorio.' });
    }

    if (
      !Array.isArray(historial) ||
      historial.some((item, index) => {
        if (
          !item ||
          !['usuario', 'bot'].includes(item.autor) ||
          typeof item.texto !== 'string' ||
          !item.texto.trim()
        ) {
          return true;
        }

        if (index === 0) {
          return item.autor !== 'usuario';
        }

        return item.autor === historial[index - 1].autor;
      }) ||
      (historial.length > 0 && historial[historial.length - 1].autor !== 'bot')
    ) {
      return res.status(400).json({
        error: 'El historial debe contener mensajes alternados de usuario y bot, y terminar con el bot.'
      });
    }

    const historialMapeado = historial.map((item) => ({
      role: item.autor === 'usuario' ? 'user' : 'model',
      parts: [{ text: item.texto.trim() }]
    }));

    const chat = model.startChat({ history: historialMapeado });
    const result = await chat.sendMessage(mensaje.trim());
    const respuesta = result.response.text();

    return res.json({ respuesta });
  } catch (error) {
    console.error('Error en la consulta a Gemini:', error);
    return res.status(500).json({ 
      error: 'Hubo un inconveniente al consultar con el Coach Nutricional.' 
    });
  }
});

export default router;
