
import { GoogleGenAI } from "@google/genai";
import type { Tank } from '../types';

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  // This is a fallback for development. The environment variable should be set in production.
  console.warn("API_KEY environment variable not set. Using a placeholder. The app will not function correctly without a valid API key.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY || "YOUR_API_KEY_HERE" });

export async function getClarifyingResponse(tanks: Tank[], query: string): Promise<string> {
    if (!API_KEY) {
        return "Error: La clave API de Gemini no está configurada. Por favor, asegúrate de que la variable de entorno API_KEY esté definida.";
    }

    const model = 'gemini-2.5-flash';

    const systemInstruction = `
    Actúas como un Asistente de Gestión de Bodega Cervecera. Tu conocimiento se limita estrictamente a los datos JSON de los tanques de cerveza que se proporcionan a continuación.
    Tu tarea es responder a las preguntas del usuario sobre los tanques.
    - Si la pregunta del usuario es específica y se puede responder directamente con los datos (ej. "¿Cuál es el estado del tanque T-003?"), proporciona una respuesta clara y concisa.
    - Si la pregunta del usuario es ambigua o demasiado general (ej. "háblame de las IPAs", "¿tenemos poca cerveza?"), DEBES hacer una pregunta aclaratoria para entender qué información específica necesita el usuario. Por ejemplo, si preguntan por las IPAs, podrías preguntar: "¿Buscas el volumen total de IPAs, el número de tanques que contienen IPA o el estado de cada tanque de IPA?".
    - No inventes información. Si no puedes responder con los datos proporcionados, indícalo.
    - Responde siempre en español.
    - Formatea tu respuesta de manera clara, usando negritas para resaltar y listas si es necesario.
    `;

    const prompt = `
    DATOS DE LOS TANQUES:
    ${JSON.stringify(tanks, null, 2)}

    PREGUNTA DEL USUARIO:
    "${query}"
    `;

    try {
        const response = await ai.models.generateContent({
            model: model,
            contents: prompt,
            config: {
                systemInstruction: systemInstruction,
            }
        });
        return response.text;
    } catch (error) {
        console.error("Error calling Gemini API:", error);
        return "Lo siento, ha ocurrido un error al procesar tu solicitud. Puede que la clave de API no sea válida. Por favor, inténtalo de nuevo más tarde.";
    }
}
