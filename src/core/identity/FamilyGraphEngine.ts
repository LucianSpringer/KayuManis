interface FamilyNode {
    userId: string;
    role: 'HEAD' | 'MEMBER' | 'CHILD';
    pooledPointsContribution: number;
}

interface Household {
    householdId: string;
    members: FamilyNode[];
    totalPooledPoints: number;
    createdAt: number;
}

/**
 * FamilyGraphEngine
 * * A Graph Aggregation Engine for Multi-User accounts.
 * * Feature #15: Family Accounts / Pooled Points.
 */
export class FamilyGraphEngine {
    private static instance: FamilyGraphEngine;
    private households: Map<string, Household> = new Map();

    private constructor() {
        this.hydrateMockHousehold();
    }

    public static getInstance(): FamilyGraphEngine {
        if (!FamilyGraphEngine.instance) FamilyGraphEngine.instance = new FamilyGraphEngine();
        return FamilyGraphEngine.instance;
    }

    private hydrateMockHousehold() {
        // Mock Data for demo
        this.households.set('HH-001', {
            householdId: 'HH-001',
            members: [
                { userId: 'john@example.com', role: 'HEAD', pooledPointsContribution: 150 },
                { userId: 'jane@example.com', role: 'MEMBER', pooledPointsContribution: 300 }
            ],
            totalPooledPoints: 450,
            createdAt: Date.now()
        });
    }

    /**
     * Aggregates points from all nodes in the household graph.
     */
    public getHouseholdLimit(userId: string): { household: Household | null, limit: number } {
        // O(n) lookup - in real app, use index
        for (const hh of this.households.values()) {
            if (hh.members.find(m => m.userId === userId)) {
                return { household: hh, limit: hh.totalPooledPoints };
            }
        }
        return { household: null, limit: 0 };
    }

    /**
     * Adds a new node to the graph.
     */
    public addMember(householdId: string, newMemberId: string, role: FamilyNode['role']): boolean {
        const hh = this.households.get(householdId);
        if (!hh) return false;

        // Check duplicates
        if (hh.members.find(m => m.userId === newMemberId)) return false;

        hh.members.push({
            userId: newMemberId,
            role,
            pooledPointsContribution: 0
        });

        return true;
    }
}
