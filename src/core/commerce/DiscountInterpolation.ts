/**
 * DiscountInterpolation
 * * A Mathematical Engine for dynamic price reduction.
 * * Uses Sigmoid functions to calculate discounts based on cart value.
 */
export class DiscountInterpolation {
    private static instance: DiscountInterpolation;

    // Config: Maximum discount cap (25%)
    private readonly MAX_DISCOUNT_RATE = 0.25;
    // Config: Midpoint for sigmoid (Rp 500,000)
    private readonly INFLECTION_POINT = 500_000;
    // Config: Steepness of the curve
    private readonly K_FACTOR = 0.000005;

    private constructor() { }

    public static getInstance(): DiscountInterpolation {
        if (!DiscountInterpolation.instance) {
            DiscountInterpolation.instance = new DiscountInterpolation();
        }
        return DiscountInterpolation.instance;
    }

    /**
     * Sigmoid Decay Function
     * f(x) = L / (1 + e^(-k(x - x0)))
     * Calculates a smooth discount curve based on spending.
     */
    public calculateAlgorithmicDiscount(cartTotal: number): number {
        const rawRate = this.MAX_DISCOUNT_RATE / (1 + Math.exp(-this.K_FACTOR * (cartTotal - this.INFLECTION_POINT)));

        // Floor to 2 decimal places for currency precision
        return Math.floor(rawRate * 100) / 100;
    }

    /**
     * Validates if a manual code overrides the algorithmic curve.
     */
    public resolveBestRate(cartTotal: number, manualRate: number): number {
        const autoRate = this.calculateAlgorithmicDiscount(cartTotal);
        return Math.max(autoRate, manualRate);
    }
}
