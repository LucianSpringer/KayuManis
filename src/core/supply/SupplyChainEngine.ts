import { OrbitalDB } from '../data/OrbitalDB';
import { PRODUCTS } from '../../../constants';

interface SupplierOrder {
    poNumber: string;
    ingredient: string;
    quantityKg: number;
    status: 'DRAFT' | 'SENT' | 'FULFILLED';
}

/**
 * SupplyChainEngine
 * * An Automated Procurement System.
 * * Monitors raw material levels (inferred from product stock) and triggers POs.
 */
export class SupplyChainEngine {
    private static instance: SupplyChainEngine;
    private db: OrbitalDB;

    // Mapping Product Category to Raw Materials
    private readonly BOM_MATRIX: Record<string, string[]> = {
        'Bread': ['Flour', 'Yeast', 'Water'],
        'Cake': ['Flour', 'Sugar', 'Eggs', 'Butter'],
        'Pastry': ['Butter', 'Flour', 'Sugar']
    };

    private constructor() {
        this.db = OrbitalDB.getInstance();
    }

    public static getInstance(): SupplyChainEngine {
        if (!SupplyChainEngine.instance) {
            SupplyChainEngine.instance = new SupplyChainEngine();
        }
        return SupplyChainEngine.instance;
    }

    /**
     * Analyzes inventory velocity and auto-generates Purchase Orders.
     */
    public runProcurementCycle(lowStockProductIds: number[]): SupplierOrder[] {
        const orders: SupplierOrder[] = [];

        lowStockProductIds.forEach(pid => {
            const product = PRODUCTS.find(p => p.id === pid);
            if (!product) return;

            const materials = this.BOM_MATRIX[product.category] || ['Flour'];

            materials.forEach(mat => {
                const po: SupplierOrder = {
                    poNumber: `PO-${Date.now()}-${Math.floor(Math.random() * 999)}`,
                    ingredient: mat,
                    quantityKg: 50, // Auto-order batch size
                    status: 'SENT'
                };
                orders.push(po);

                // Log to Shadow DB
                this.db.insert('audit_trail', {
                    action: 'AUTO_PROCUREMENT',
                    details: po,
                    timestamp: Date.now()
                });
            });
        });

        return orders;
    }
}
