import { Product } from '../../../types';
import { PRODUCTS } from '../../../constants'; // Raw Data Source
import { TaxonomyEngine } from './TaxonomyEngine';
import { InventoryAllocator } from './InventoryAllocator';
import { CategoryHeuristics } from './CategoryHeuristics';

export interface QueryParams {
    search?: string;
    category?: string;
    sortBy?: 'price-low' | 'price-high' | 'recommended';
}

/**
 * ProductEngine
 * * The Central Nervous System for the Catalogue.
 * * Orchestrates Vector Search, Inventory Filtering, and Heuristic Sorting.
 * * This is the "Service Layer" that prevents the UI from touching raw data.
 */
export class ProductEngine {
    private static instance: ProductEngine;
    private taxonomy: TaxonomyEngine;
    private inventory: InventoryAllocator;
    private heuristics: CategoryHeuristics;

    private constructor() {
        this.taxonomy = TaxonomyEngine.getInstance();
        this.inventory = InventoryAllocator.getInstance();
        this.heuristics = CategoryHeuristics.getInstance();

        // Hydrate Vector Index
        PRODUCTS.forEach(p => this.taxonomy.indexProduct(p));
    }

    public static getInstance(): ProductEngine {
        if (!ProductEngine.instance) {
            ProductEngine.instance = new ProductEngine();
        }
        return ProductEngine.instance;
    }

    /**
     * The Master Query Method.
     * Replaces simple .filter() with a multi-stage pipeline.
     */
    public query(params: QueryParams): Product[] {
        let results: Product[] = PRODUCTS;

        // Stage 1: Vector Search (if search term exists)
        if (params.search && params.search.trim().length > 0) {
            const searchResults = this.taxonomy.search(params.search, results);
            results = searchResults.map(r => r.product);
        }

        // Stage 2: Weighted Category Filtering
        if (params.category && params.category !== 'All') {
            results = this.taxonomy.getCategoryWeightedProducts(params.category, results);
        }

        // Stage 3: Inventory-Aware Sorting
        // Bubbles up items that are in-stock AND expiring soon (FIFO logic)
        results = results.sort((a, b) => {
            const stockA = this.inventory.getAvailableStock(a.id);
            const stockB = this.inventory.getAvailableStock(b.id);
            const healthA = this.inventory.getInventoryHealthIndex(a.id);
            const healthB = this.inventory.getInventoryHealthIndex(b.id);

            // Primary Sort: Explicit User Sort
            if (params.sortBy === 'price-low') return a.price - b.price;
            if (params.sortBy === 'price-high') return b.price - a.price;

            // Secondary Sort: "Recommended" (Business Logic)
            // Push In-Stock items to top
            if (stockA > 0 && stockB === 0) return -1;
            if (stockA === 0 && stockB > 0) return 1;

            // Push "Expiring Soon" items to top (Dynamic Discounting Potential)
            return healthA - healthB;
        });

        return results;
    }

    public getProductById(id: number): Product | undefined {
        return PRODUCTS.find(p => p.id === id);
    }
}
