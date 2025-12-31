
import { GoogleGenAI, GenerateContentResponse } from "@google/genai";

// Initialize the GoogleGenAI client using process.env.API_KEY directly.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const askTutor = async (question: string, context?: string): Promise<string> => {
  try {
    // Calling generateContent with the model name and prompt directly.
    const response: GenerateContentResponse = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Actúa como un tutor experto de IA futurista. Responde a la pregunta del estudiante.
            Contexto: ${context || 'General IA'}
            Pregunta: ${question}`,
      config: {
        temperature: 0.7,
        systemInstruction: "Eres 'Nexus', el núcleo de inteligencia de EducateSobreIA. Tu tono es motivador, futurista y altamente técnico pero comprensible. Usa Markdown."
      }
    });

    // response.text is a property, not a method.
    return response.text || "Error al conectar con la red neuronal.";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Mi red está experimentando interferencias. Intenta de nuevo en unos nano-segundos.";
  }
};

export const getSmartSummary = async (content: string): Promise<string> => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Resume lo siguiente en 3 puntos clave con un toque futurista: ${content}`
    });
    // response.text is a property.
    return response.text || "Sin resumen disponible.";
  } catch {
    return "Error en la síntesis de datos.";
  }
};
