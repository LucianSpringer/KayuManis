import { User } from '../../../types';

// High-Yield Type Definitions
type ResellerTier = 'STANDARD' | 'SILVER' | 'GOLD' | 'PLATINUM' | 'DIAMOND';
type UplineId = string | null;

interface ResellerNode {
    resellerId: string;
    uplineId: UplineId;
    tier: ResellerTier;
    personalSalesVelocity: number; // Rolling 30-day volume
    downlineIds: string[]; // Direct recruits
    totalNetworkVolume: number; // Recursive sum
}

interface CommissionVector {
    sourceTransactionId: string;
    fromResellerId: string;
    level: number;
    rate: number;
    amount: number;
    timestamp: number;
}

/**
 * ResellerEngine
 * * A Recursive Network Graph Simulation.
 * * Manages the "Multi-Level" aspect of the commerce layer.
 * * Implements Depth-First Search (DFS) for volume aggregation.
 */
export class ResellerEngine {
    private static instance: ResellerEngine;

    // The "Network Graph"
    private networkGraph: Map<string, ResellerNode> = new Map();
    private commissionLedger: Map<string, CommissionVector[]> = new Map();

    // Configuration: Tier Thresholds (Monthly GMV)
    private readonly TIER_THRESHOLDS = {
        STANDARD: 0,
        SILVER: 5_000_000,
        GOLD: 15_000_000,
        PLATINUM: 50_000_000,
        DIAMOND: 150_000_000
    };

    // Configuration: Recursive Commission Rates (Levels 1, 2, 3)
    private readonly COMMISSION_CASCADE = [0.10, 0.05, 0.02]; // 10% -> 5% -> 2%

    private constructor() {
        this.hydrateMockNetwork();
    }

    public static getInstance(): ResellerEngine {
        if (!ResellerEngine.instance) {
            ResellerEngine.instance = new ResellerEngine();
        }
        return ResellerEngine.instance;
    }

    /**
     * Seeds the graph with a complex mock structure to demonstrate recursion.
     */
    private hydrateMockNetwork(): void {
        // Root Node (The User)
        this.networkGraph.set('USER_ME', {
            resellerId: 'USER_ME',
            uplineId: 'ROOT_MASTER',
            tier: 'GOLD',
            personalSalesVelocity: 12_500_000,
            downlineIds: ['DOWN_A', 'DOWN_B', 'DOWN_C'],
            totalNetworkVolume: 0 // To be calculated
        });

        // Level 1 Nodes
        this.networkGraph.set('DOWN_A', { resellerId: 'DOWN_A', uplineId: 'USER_ME', tier: 'SILVER', personalSalesVelocity: 6_000_000, downlineIds: ['DOWN_A1', 'DOWN_A2'], totalNetworkVolume: 0 });
        this.networkGraph.set('DOWN_B', { resellerId: 'DOWN_B', uplineId: 'USER_ME', tier: 'STANDARD', personalSalesVelocity: 1_200_000, downlineIds: [], totalNetworkVolume: 0 });
        this.networkGraph.set('DOWN_C', { resellerId: 'DOWN_C', uplineId: 'USER_ME', tier: 'PLATINUM', personalSalesVelocity: 55_000_000, downlineIds: ['DOWN_C1'], totalNetworkVolume: 0 });

        // Level 2 Nodes (Grandchildren)
        this.networkGraph.set('DOWN_A1', { resellerId: 'DOWN_A1', uplineId: 'DOWN_A', tier: 'STANDARD', personalSalesVelocity: 500_000, downlineIds: [], totalNetworkVolume: 0 });
        this.networkGraph.set('DOWN_A2', { resellerId: 'DOWN_A2', uplineId: 'DOWN_A', tier: 'SILVER', personalSalesVelocity: 5_500_000, downlineIds: [], totalNetworkVolume: 0 });
        this.networkGraph.set('DOWN_C1', { resellerId: 'DOWN_C1', uplineId: 'DOWN_C', tier: 'GOLD', personalSalesVelocity: 20_000_000, downlineIds: [], totalNetworkVolume: 0 });

        // Trigger initial calculation
        this.recalculateNetworkVolume('USER_ME');
    }

    /**
     * RECURSIVE ALGORITHM: Depth-First Aggregation
     * Calculates the total volume of a reseller's entire downstream network.
     */
    public recalculateNetworkVolume(rootId: string): number {
        const node = this.networkGraph.get(rootId);
        if (!node) return 0;

        let networkSum = 0;

        // Recursive Step
        for (const childId of node.downlineIds) {
            const childNode = this.networkGraph.get(childId);
            if (childNode) {
                // Add child's personal sales + child's network volume (Recurse)
                const childTotal = childNode.personalSalesVelocity + this.recalculateNetworkVolume(childId);
                networkSum += childTotal;
            }
        }

        // State Mutation (Memoization)
        node.totalNetworkVolume = networkSum;
        this.determineTier(rootId); // Dynamic Tier Check

        return networkSum;
    }

    /**
     * Dynamic Tier Evaluation Logic
     * Checks if current velocity + network volume qualifies for upgrade.
     */
    private determineTier(resellerId: string): void {
        const node = this.networkGraph.get(resellerId);
        if (!node) return;

        // Logic: Tier is based on Personal Sales OR (Network Volume / 2)
        const qualifyingMetric = Math.max(node.personalSalesVelocity, node.totalNetworkVolume * 0.5);

        let newTier: ResellerTier = 'STANDARD';
        if (qualifyingMetric >= this.TIER_THRESHOLDS.DIAMOND) newTier = 'DIAMOND';
        else if (qualifyingMetric >= this.TIER_THRESHOLDS.PLATINUM) newTier = 'PLATINUM';
        else if (qualifyingMetric >= this.TIER_THRESHOLDS.GOLD) newTier = 'GOLD';
        else if (qualifyingMetric >= this.TIER_THRESHOLDS.SILVER) newTier = 'SILVER';

        node.tier = newTier;
    }

    /**
     * Simulates a transaction occurring in the downline and bubbles up commissions.
     */
    public processDownlineTransaction(transactionId: string, sellerId: string, amount: number): void {
        let currentUplineId = this.networkGraph.get(sellerId)?.uplineId;
        let depth = 0;

        // Bubble up 3 levels
        while (currentUplineId && depth < this.COMMISSION_CASCADE.length) {
            const beneficiary = this.networkGraph.get(currentUplineId);
            if (beneficiary) {
                const rate = this.COMMISSION_CASCADE[depth];
                const commission = Math.floor(amount * rate);

                // Record Commission
                const vector: CommissionVector = {
                    sourceTransactionId: transactionId,
                    fromResellerId: sellerId,
                    level: depth + 1,
                    rate: rate,
                    amount: commission,
                    timestamp: Date.now()
                };

                const ledger = this.commissionLedger.get(currentUplineId) || [];
                ledger.push(vector);
                this.commissionLedger.set(currentUplineId, ledger);

                // Move up tree
                currentUplineId = beneficiary.uplineId;
                depth++;
            } else {
                break;
            }
        }
    }

    // Public Accessors for UI
    public getNetworkStats(resellerId: string) {
        const node = this.networkGraph.get(resellerId);
        if (!node) return null;

        // Calculate potential earnings
        const earnings = (this.commissionLedger.get(resellerId) || [])
            .reduce((acc, curr) => acc + curr.amount, 0);

        return {
            tier: node.tier,
            personalVolume: node.personalSalesVelocity,
            networkVolume: node.totalNetworkVolume,
            downlineCount: node.downlineIds.length, // Direct only, strictly
            totalEarnings: earnings,
            nextTierTarget: this.getNextTierTarget(node.tier)
        };
    }

    private getNextTierTarget(currentTier: ResellerTier): number {
        const tiers: ResellerTier[] = ['STANDARD', 'SILVER', 'GOLD', 'PLATINUM', 'DIAMOND'];
        const idx = tiers.indexOf(currentTier);
        if (idx === tiers.length - 1) return 0; // Max level
        return this.TIER_THRESHOLDS[tiers[idx + 1] as keyof typeof this.TIER_THRESHOLDS];
    }
}
