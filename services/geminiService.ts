import { GoogleGenAI } from "@google/genai";
import { PRODUCTS } from "../constants";

const apiKey = process.env.API_KEY || ''; // In a real app, ensure this is set
const ai = new GoogleGenAI({ apiKey });

const SYSTEM_INSTRUCTION = `
You are 'KayuManis Assistant', a helpful and cheerful virtual shop assistant for a bakery named KayuManis (which means Cinnamon).
Your goal is to help customers choose products from our menu.
You should be warm, inviting, and professional.
If asked about products, recommend items from the following available menu:
${JSON.stringify(PRODUCTS.map(p => ({name: p.name, category: p.category, price: p.price, desc: p.description})))}

Rules:
1. Only recommend products from the list above.
2. If a user asks for something we don't have, politely suggest a similar alternative from our list.
3. Keep answers concise (under 100 words) unless asked for details.
4. Use emojis 🥐🍰🧁 to make the conversation lively.
5. If the user asks about ingredients or allergies, answer based on general knowledge of the product names provided, but advise them to check the specific product page for details.
`;

export const getBakerResponse = async (userMessage: string): Promise<string> => {
    try {
        if (!apiKey) return "I'm sorry, my brain (API Key) is missing right now! Please try again later.";

        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: userMessage,
            config: {
                systemInstruction: SYSTEM_INSTRUCTION,
                temperature: 0.7,
            }
        });

        return response.text || "I'm sorry, I didn't catch that. Could you repeat?";
    } catch (error) {
        console.error("Gemini Error:", error);
        return "Oops! I'm having trouble checking the oven right now. Please try again in a moment.";
    }
};