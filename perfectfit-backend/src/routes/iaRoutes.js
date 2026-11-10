import express from 'express';
import { GoogleGenerativeAI } from '@google/generative-ai';

const router = express.Router();

// 🟢 LÍNEAS DE CONTROL DE SEGURIDAD RECOMENDADAS POR TU GUÍA:
const geminiApiKey = process.env.GEMINI_API_KEY;
console.log('[Gemini] Clave cargada:', Boolean(geminiApiKey), '| Longitud:', geminiApiKey?.length ?? 0);

// Inicializamos el cliente de Google Generative AI con la API Key del archivo .env
const ai = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Configuración limpia y dinámica del modelo moderno
// Configuración blindada y dinámica del modelo moderno
const model = ai.getGenerativeModel({
  model: process.env.GEMINI_MODEL || 'gemini-1.5-flash', // 🟢 Si el .env falla, usa este por defecto
  systemInstruction: 'Eres un Coach Nutricional experto de la marca PerfectFit Bowl en Cartagena. Tu objetivo es asesorar a los clientes sobre opciones de alimentación saludable, bowls y nutrición de manera cercana, motivadora y profesional. Tus respuestas deben ser concisas, amables y tener como máximo 3 líneas.'
});


// Endpoint POST /api/ia/consultar-guia
router.post('/consultar-guia', async (req, res) => {
  try {
    const { mensaje } = req.body;

    if (!mensaje) {
      return res.status(400).json({ error: 'El campo "mensaje" es obligatorio.' });
    }

    const result = await model.generateContent(mensaje);
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
