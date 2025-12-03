import { CartItem } from '../../../types';

interface RouteSegment {
    segmentId: string;
    depotId: string;
    items: number[]; // Product IDs
    estimatedDispatch: number; // Timestamp
}

/**
 * OrderRouting
 * * A Logistics Orchestrator.
 * * Determines if an order needs to be split across multiple kitchen depots
 * * based on SKU availability (Simulated).
 */
export class OrderRouting {
    private static instance: OrderRouting;

    private constructor() { }

    public static getInstance(): OrderRouting {
        if (!OrderRouting.instance) {
            OrderRouting.instance = new OrderRouting();
        }
        return OrderRouting.instance;
    }

    /**
     * Route Optimization Logic
     * Splits a cart into "Shipments" based on item category (Simulation of specialized kitchens).
     */
    public optimizeRoute(cart: CartItem[]): RouteSegment[] {
        const segments: RouteSegment[] = [];

        // Logic: Cakes come from "Cold Kitchen", Breads from "Hot Kitchen"
        const coldItems = cart.filter(i => i.category === 'Cake');
        const hotItems = cart.filter(i => i.category !== 'Cake');

        if (coldItems.length > 0) {
            segments.push({
                segmentId: `RTE-COLD-${Date.now()}`,
                depotId: 'DEPOT_COLD_STORAGE_01',
                items: coldItems.map(i => i.id),
                estimatedDispatch: Date.now() + (1000 * 60 * 60 * 2) // +2 Hours
            });
        }

        if (hotItems.length > 0) {
            segments.push({
                segmentId: `RTE-HOT-${Date.now()}`,
                depotId: 'DEPOT_MAIN_OVEN_01',
                items: hotItems.map(i => i.id),
                estimatedDispatch: Date.now() + (1000 * 60 * 45) // +45 Mins
            });
        }

        return segments;
    }
}
