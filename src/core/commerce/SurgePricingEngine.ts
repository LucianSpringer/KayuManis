/**
 * SurgePricingEngine
 * * A Dynamic Elasticity Pricing Model.
 * * Adjusts base prices based on temporal triggers (Holidays) and velocity.
 */
export class SurgePricingEngine {
    private static instance: SurgePricingEngine;

    // Config: Multipliers
    private readonly LEBARAN_MULTIPLIER = 1.35; // +35%
    private readonly WEEKEND_MULTIPLIER = 1.10; // +10%
    private readonly RUSH_HOUR_MULTIPLIER = 1.05; // +5%

    private constructor() { }

    public static getInstance(): SurgePricingEngine {
        if (!SurgePricingEngine.instance) {
            SurgePricingEngine.instance = new SurgePricingEngine();
        }
        return SurgePricingEngine.instance;
    }

    public calculateMultiplier(): { rate: number; reason: string | null } {
        const now = new Date();
        const month = now.getMonth(); // 0-11
        const day = now.getDay(); // 0-6 (Sun-Sat)
        const hour = now.getHours();

        // 1. Seasonal Check (Mocking Lebaran/Ramadan in April/May for demo)
        if (month === 3 || month === 4) {
            return { rate: this.LEBARAN_MULTIPLIER, reason: "High Demand (Seasonal)" };
        }

        // 2. Weekend Check
        if (day === 0 || day === 6) {
            return { rate: this.WEEKEND_MULTIPLIER, reason: "Weekend Surge" };
        }

        // 3. Rush Hour Check (Morning Coffee Run)
        if (hour >= 7 && hour <= 9) {
            return { rate: this.RUSH_HOUR_MULTIPLIER, reason: "Morning Rush" };
        }

        return { rate: 1.0, reason: null };
    }

    public getDynamicPrice(basePrice: number): number {
        const { rate } = this.calculateMultiplier();
        return Math.ceil(basePrice * rate);
    }
}
