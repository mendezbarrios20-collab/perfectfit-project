import express from 'express';
import { GoogleGenerativeAI } from '@google/generative-ai';
import Product from '../models/Product.js';

const router = express.Router();

const ai = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const construirInstruccionSistema = (productos) => {
  const menuActual = productos.length > 0
    ? productos.map((producto) => {
      const { calories, protein, carbs, fats } = producto.macros || {};
      return [
        `- ${producto.name}`,
        `Precio: $${Number(producto.price).toLocaleString('es-CO')} COP`,
        `Categoría: ${producto.category}`,
        `Objetivo: ${producto.objective}`,
        `Descripción: ${producto.description}`,
        `Macros: ${calories ?? 'No disponibles'} kcal, ${protein ?? 'No disponibles'} g de proteína, ${carbs ?? 'No disponibles'} g de carbohidratos, ${fats ?? 'No disponibles'} g de grasas`
      ].join(' | ');
    }).join('\n')
    : 'El catálogo no tiene productos disponibles en este momento.';

  return `Eres el Coach Nutricional experto de PerfectFit Bowl, un emprendimiento de Cartagena que ofrece opciones prácticas y saludables organizadas para distintos momentos de la rutina y objetivos de bienestar. Responde en español, con tono cercano, claro y respetuoso. Usa estrictamente lenguaje neutro: nunca supongas el género de la persona ni uses apelativos como "campeón" o "amigo"; puedes decir "hola", "atleta" o hablar directamente en segunda persona. Mantén las respuestas coherentes y útiles, con extensión equilibrada: escribe como máximo un párrafo breve de introducción de hasta 2 líneas; si recomiendas platos, incluye una lista de máximo 2 o 3 opciones en viñetas cortas, indicando solo nombre, precio y un dato clave de sus macros; termina con una pregunta breve. Comparte información nutricional solo cuando esté en el catálogo, no inventes datos y no presentes la orientación como diagnóstico ni reemplazo de un profesional de salud.

Para recomendar productos, usa exclusivamente los que aparecen en este catálogo actualizado de MongoDB. Respeta sus nombres, precios, categorías, objetivos, descripciones y macros. Si el catálogo está vacío o no hay una opción adecuada, dilo con claridad y no inventes productos.

Catálogo actual:
${menuActual}`;
};

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

    const productosActuales = await Product.find().lean();
    const model = ai.getGenerativeModel({
      model: process.env.GEMINI_MODEL || 'gemini-1.5-flash',
      systemInstruction: construirInstruccionSistema(productosActuales),
      generationConfig: { maxOutputTokens: 250 }
    });
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
