
import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export async function generateTitanReport(subject: string) {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Generate a brief, gritty intelligence report for ${subject} from the perspective of the Survey Corps. Mention their role as a host, their titan form, and current status within Wall Rose. Format as JSON.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            subject: { type: Type.STRING },
            classification: { type: Type.STRING },
            status: { type: Type.STRING },
            dangerLevel: { type: Type.STRING },
            description: { type: Type.STRING },
          },
          required: ["subject", "classification", "status", "dangerLevel", "description"]
        },
      },
    });

    return JSON.parse(response.text);
  } catch (error) {
    console.error("Failed to fetch report:", error);
    return {
      subject: "Eren Yeager",
      classification: "Coordinate / Attack Titan",
      status: "Active - Under Supervision",
      dangerLevel: "Extreme",
      description: "Subject shows high volatility. Ability to manifest the Attack Titan and Founding Titan confirmed. Vital for the reclamation of Shiganshina."
    };
  }
}
