import { Product } from '../../../types';

// High-Yield Type: Weighted Edge
interface CategoryEdge {
    target: string;
    weight: number; // 0.0 to 1.0 (Strength of association)
    bidirectional: boolean;
}

/**
 * CategoryHeuristics
 * * A Directed Graph Engine for semantic category associations.
 * * Used to "Upsell" products from related categories (e.g., Bread -> Jam).
 */
export class CategoryHeuristics {
    private static instance: CategoryHeuristics;
    private associationGraph: Map<string, CategoryEdge[]> = new Map();

    private constructor() {
        this.initializeGraph();
    }

    public static getInstance(): CategoryHeuristics {
        if (!CategoryHeuristics.instance) {
            CategoryHeuristics.instance = new CategoryHeuristics();
        }
        return CategoryHeuristics.instance;
    }

    private initializeGraph() {
        // Define high-yield associations
        this.addEdge('Bread', 'Jam', 0.8);
        this.addEdge('Cake', 'Candles', 0.9);
        this.addEdge('Pastry', 'Coffee', 0.7);
        this.addEdge('Snack', 'Drink', 0.5);
    }

    private addEdge(source: string, target: string, weight: number) {
        const edges = this.associationGraph.get(source) || [];
        edges.push({ target, weight, bidirectional: true });
        this.associationGraph.set(source, edges);
    }

    /**
     * Heuristic Recommendation Algorithm
     * Returns categories that are statistically likely to be bought together.
     */
    public getRelatedCategories(currentCategory: string): string[] {
        const edges = this.associationGraph.get(currentCategory);
        if (!edges) return [];

        // Sort by weight descent (Heuristic Optimization)
        return edges
            .sort((a, b) => b.weight - a.weight)
            .map(e => e.target);
    }

    /**
     * Cross-Selling Scorer
     * Calculates the probability of a cross-sell conversion.
     */
    public calculateCrossSellScore(productA: Product, productB: Product): number {
        if (productA.category === productB.category) return 0.1; // Low novelty

        const edges = this.associationGraph.get(productA.category) || [];
        const match = edges.find(e => e.target === productB.category);

        return match ? match.weight : 0.0;
    }
}
