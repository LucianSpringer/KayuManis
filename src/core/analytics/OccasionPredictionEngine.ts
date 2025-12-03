import { TransactionLedger } from '../commerce/TransactionLedger';
import { PRODUCTS } from '../../../constants';

interface OccasionPrediction {
    predictionId: string;
    userId: string;
    occasionType: 'BIRTHDAY' | 'ANNIVERSARY' | 'WEEKLY_RITUAL';
    confidenceScore: number; // 0.0 to 1.0
    predictedDate: number; // Unix Timestamp
    recommendedProducts: number[];
}

/**
 * OccasionPredictionEngine
 * * A Time-Series Heuristic Engine.
 * * Analyzes the Transaction Ledger to identify cyclical purchasing patterns.
 * * Used to trigger "Upcoming Occasion" reminders (Feature #2).
 */
export class OccasionPredictionEngine {
    private static instance: OccasionPredictionEngine;
    private ledger: TransactionLedger;

    // Config: Weighting factors
    private readonly CAKE_WEIGHT = 0.8; // Cakes imply occasions
    private readonly RECURRENCE_THRESHOLD = 300 * 24 * 60 * 60 * 1000; // ~300 days (Yearly check)

    private constructor() {
        this.ledger = TransactionLedger.getInstance();
    }

    public static getInstance(): OccasionPredictionEngine {
        if (!OccasionPredictionEngine.instance) {
            OccasionPredictionEngine.instance = new OccasionPredictionEngine();
        }
        return OccasionPredictionEngine.instance;
    }

    /**
     * Scans user history to predict next likely purchase date.
     * Complexity: O(n) scan with heuristic filtering.
     */
    public predictNextOccasion(userId: string): OccasionPrediction | null {
        // In a real app, we filter ledger by User ID. 
        // Here we scan the mock ledger history.
        const history = this.ledger.getLedgerHistory();

        // 1. Filter for high-signal items (Cakes)
        const cakeOrders = history.filter(entry => {
            const pid = entry.metadata.productId as number;
            const product = PRODUCTS.find(p => p.id === pid);
            return product && product.category === 'Cake';
        });

        if (cakeOrders.length === 0) return null;

        // 2. Analyze Timestamps for clustering
        // Simplification: Take the last cake order and project 1 year forward
        const lastOrder = cakeOrders[cakeOrders.length - 1];
        const lastDate = new Date(lastOrder.timestamp);

        const nextYear = new Date(lastDate);
        nextYear.setFullYear(lastDate.getFullYear() + 1);

        // 3. Calculate Confidence
        // If they ordered a cake with a message, confidence is high
        // Note: We'd need to inspect metadata deep structure
        const hasMessage = true; // Simulated metadata check
        const confidence = hasMessage ? 0.95 : 0.6;

        return {
            predictionId: `PRED-${Date.now()}`,
            userId,
            occasionType: 'BIRTHDAY',
            confidenceScore: confidence,
            predictedDate: nextYear.getTime(),
            recommendedProducts: [lastOrder.metadata.productId as number]
        };
    }

    public getReminderMessage(prediction: OccasionPrediction): string {
        const daysUntil = Math.ceil((prediction.predictedDate - Date.now()) / (1000 * 60 * 60 * 24));
        if (daysUntil < 0) return "It looks like we missed a special date!";

        return `We noticed a special celebration coming up in ${daysUntil} days. Would you like to re-order the ${this.getProductName(prediction.recommendedProducts[0])}?`;
    }

    private getProductName(id: number): string {
        return PRODUCTS.find(p => p.id === id)?.name || "Cake";
    }
}
