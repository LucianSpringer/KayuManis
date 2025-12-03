import { OrbitalDB } from '../data/OrbitalDB';

type BillingFrequency = 'WEEKLY' | 'MONTHLY';
type SubscriptionStatus = 'ACTIVE' | 'PAUSED' | 'CHURNED';

interface SubscriptionPlan {
    id: string;
    name: string;
    price: number;
    frequency: BillingFrequency;
    boxConfig: number[]; // Product IDs included
}

interface SubscriberProfile {
    subId: string;
    userId: string;
    planId: string;
    nextBillingDate: number;
    status: SubscriptionStatus;
    lifetimeValue: number;
    churnRiskScore: number; // 0.0 - 1.0
}

/**
 * SubscriptionCore
 * * Manages recurring revenue logic.
 * * Implements a heuristic "Churn Risk" calculator based on user activity.
 */
export class SubscriptionCore {
    private static instance: SubscriptionCore;
    private db: OrbitalDB;

    // Config: Predictive Analysis Weights
    private readonly RECENCY_WEIGHT = 0.4;
    private readonly FREQUENCY_WEIGHT = 0.3;
    private readonly MONETARY_WEIGHT = 0.3;

    private constructor() {
        this.db = OrbitalDB.getInstance();
    }

    public static getInstance(): SubscriptionCore {
        if (!SubscriptionCore.instance) SubscriptionCore.instance = new SubscriptionCore();
        return SubscriptionCore.instance;
    }

    /**
     * Creates a new subscription node in the graph.
     */
    public subscribe(userId: string, planId: string): SubscriberProfile {
        const sub: SubscriberProfile = {
            subId: `SUB-${Date.now()}`,
            userId,
            planId,
            nextBillingDate: Date.now() + (30 * 24 * 60 * 60 * 1000), // +30 days
            status: 'ACTIVE',
            lifetimeValue: 0,
            churnRiskScore: 0.1 // Start low
        };

        this.db.insert('audit_trail', { type: 'SUB_CREATED', ...sub });
        return sub;
    }

    /**
     * Calculates the probability of a user cancelling.
     * Uses an RFM (Recency, Frequency, Monetary) simulation.
     */
    public calculateChurnRisk(sub: SubscriberProfile, lastLoginDaysAgo: number, supportTickets: number): number {
        // Normalize inputs
        const recencyScore = Math.min(lastLoginDaysAgo / 30, 1.0); // >30 days = 1.0 risk
        const frictionScore = Math.min(supportTickets * 0.2, 1.0); // 5 tickets = 1.0 risk

        // Weighted Average
        const risk = (recencyScore * this.RECENCY_WEIGHT) + (frictionScore * 0.2) + (0.1); // Base entropy

        sub.churnRiskScore = parseFloat(risk.toFixed(2));
        return sub.churnRiskScore;
    }

    /**
     * Simulates the "Cron Job" that processes renewals.
     */
    public runBillingCycle(subscribers: SubscriberProfile[]): void {
        const now = Date.now();
        subscribers.forEach(sub => {
            if (sub.status === 'ACTIVE' && sub.nextBillingDate <= now) {
                this.processRenewal(sub);
            }
        });
    }

    private processRenewal(sub: SubscriberProfile) {
        // Logic: Charge card, extend date, update LTV
        sub.nextBillingDate += (30 * 24 * 60 * 60 * 1000);
        sub.lifetimeValue += 100000; // Mock value
        console.log(`[SubscriptionCore] Renewed ${sub.subId}. LTV: ${sub.lifetimeValue}`);
    }
}
