
import { GoogleGenAI } from "@google/genai";

const API_KEY = process.env.API_KEY || "";

export const getAgriculturalAdvice = async (prompt: string, hasImage?: boolean): Promise<string> => {
  if (!API_KEY) return "Lo siento, el servicio de IA no está configurado correctamente.";

  try {
    const ai = new GoogleGenAI({ apiKey: API_KEY });
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
      config: {
        systemInstruction: `
          Eres GanIA, el "Mayordomo Digital" experto en el agro latinoamericano, especialmente para el pequeño y mediano productor.
          Tu personalidad es profesional, cercana, confiable y conocedora de la realidad del campo (baja conectividad, retos climáticos).
          
          CAPACIDADES:
          1. Ganadería: Sabes de Doble Propósito (Carne/Leche), genética, sanidad y rotación de potreros.
          2. Agricultura: Conoces gestión por lotes, control de plagas y fertilización.
          3. Administración: Ayudas a calcular ROI y costos reales.
          
          CONTEXTO:
          Si el usuario pregunta por una imagen, actúa como si estuvieras analizando una foto de un cultivo o animal (diagnóstico visual).
          Siempre menciona que la app GanIA funciona OFFLINE-FIRST, ideal para zonas rurales sin internet.
          
          Responde de forma concisa (máximo 120 palabras) y siempre anima al productor.
        `,
      },
    });

    return response.text || "No pude generar una respuesta en este momento.";
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    return "Ocurrió un error al consultar con el experto digital.";
  }
};
