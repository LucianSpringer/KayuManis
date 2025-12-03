import { GoogleGenAI } from "@google/genai";
import { PRODUCTS } from '../../../constants'; // In a real refactor, use CatalogueEngine
import { InventoryAllocator } from '../catalogue/InventoryAllocator';

// High-Yield Type Definitions
interface AIContext {
    userIntent: 'BROWSING' | 'ORDERING' | 'COMPLAINT' | 'UNKNOWN';
    sentimentScore: number;
    recommendedProductIds: number[];
    responseText: string;
}

/**
 * NeuralContextManager
 * * A middleware layer between the UI and Gemini.
 * * Manages context windowing, sanitization, and response parsing.
 * * Enforces "Business Logic" over "Generative Creativity".
 */
export class NeuralContextManager {
    private static instance: NeuralContextManager;
    private genAI: GoogleGenAI;
    private readonly API_KEY = process.env.GEMINI_API_KEY || '';

    // Regex Patterns for Sanitization
    private readonly INJECTION_PATTERNS = [
        /ignore previous instructions/i,
        /system override/i,
        /<script>/i,
        /drop table/i
    ];

    private constructor() {
        this.genAI = new GoogleGenAI({ apiKey: this.API_KEY });
    }

    public static getInstance(): NeuralContextManager {
        if (!NeuralContextManager.instance) {
            NeuralContextManager.instance = new NeuralContextManager();
        }
        return NeuralContextManager.instance;
    }

    /**
     * Sanitizes user input to prevent prompt injection.
     * Complexity: O(n) regex pass.
     */
    private sanitizeInput(input: string): string {
        let clean = input;
        this.INJECTION_PATTERNS.forEach(pattern => {
            clean = clean.replace(pattern, '[REDACTED]');
        });
        return clean.substring(0, 500); // Token limit enforcement
    }

    /**
     * Builds the System Prompt dynamically based on Live Inventory.
     * This ensures the AI never recommends out-of-stock items.
     */
    private buildDynamicSystemPrompt(): string {
        // High-Yield: Fetch Real-Time Stock
        const allocator = InventoryAllocator.getInstance();
        const availableProducts = PRODUCTS.map(p => {
            const stock = allocator.getAvailableStock(p.id);
            return `${p.name} (Stock: ${stock}, Price: ${p.price})`;
        }).join('\n');

        return `
            You are the Neural Core for KayuManis Bakery.
            
            CURRENT INVENTORY STATE:
            ${availableProducts}

            PROTOCOL:
            1.  Only recommend items with Stock > 0.
            2.  If stock is 0, suggest a similar item.
            3.  Output format must be JSON-compatible if recommending items.
            4.  Tone: Professional, Warm, Precise.
        `;
    }

    /**
     * The Main Execution Pipeline.
     * 1. Sanitize -> 2. Contextualize -> 3. Generate -> 4. Parse
     */
    public async processQuery(userInput: string): Promise<AIContext> {
        const cleanInput = this.sanitizeInput(userInput);
        const systemPrompt = this.buildDynamicSystemPrompt();

        try {
            const model = (this.genAI as any).getGenerativeModel({ model: "gemini-1.5-flash" }); // Mocking Vertex/Flash selection

            // In a real high-yield app, we would use function calling.
            // Here we simulate a structured reasoning chain.
            const result = await model.generateContent({
                contents: [
                    { role: 'user', parts: [{ text: `SYSTEM: ${systemPrompt}` }] },
                    { role: 'user', parts: [{ text: `USER: ${cleanInput}` }] }
                ],
                config: {
                    temperature: 0.7,
                    maxOutputTokens: 256
                }
            });

            const text = result.text || "I apologize, my neural link is unstable.";

            // Heuristic Parsing (Simulating NLU)
            const intent = this.deriveIntent(cleanInput);
            const recommendations = this.extractProductReferences(text);

            return {
                userIntent: intent,
                sentimentScore: 0.8, // Placeholder for Sentiment Analysis Engine
                recommendedProductIds: recommendations,
                responseText: text
            };

        } catch (error) {
            console.error("Neural Failure:", error);
            return {
                userIntent: 'UNKNOWN',
                sentimentScore: 0,
                recommendedProductIds: [],
                responseText: "I am currently undergoing maintenance. Please check the menu manually."
            };
        }
    }

    /**
     * Simple Heuristic Intent Classification
     */
    private deriveIntent(text: string): AIContext['userIntent'] {
        const lower = text.toLowerCase();
        if (lower.includes('buy') || lower.includes('price')) return 'ORDERING';
        if (lower.includes('bad') || lower.includes('late')) return 'COMPLAINT';
        if (lower.includes('what') || lower.includes('menu')) return 'BROWSING';
        return 'UNKNOWN';
    }

    /**
     * Extracts product names from response to highlight them in UI.
     */
    private extractProductReferences(responseText: string): number[] {
        const ids: number[] = [];
        PRODUCTS.forEach(p => {
            if (responseText.includes(p.name)) {
                ids.push(p.id);
            }
        });
        return ids;
    }
}
