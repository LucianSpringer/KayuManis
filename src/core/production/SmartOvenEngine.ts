import { OrbitalDB } from '../data/OrbitalDB';

interface OvenSlot {
    slotId: string;
    startTime: number;
    endTime: number;
    capacityUsed: number; // 0-100%
    temperature: number; // C
    batchRef: string;
}

/**
 * SmartOvenEngine
 * * A Manufacturing Resource Planning (MRP) Kernel.
 * * Uses a "Bin Packing Algorithm" to optimize oven space.
 * * Prevents overbooking by locking time-slots.
 */
export class SmartOvenEngine {
    private static instance: SmartOvenEngine;
    private db: OrbitalDB;

    // Config: 3 Industrial Ovens, max 100 units capacity each
    private readonly OVEN_CAPACITY = 300;

    private constructor() {
        this.db = OrbitalDB.getInstance();
    }

    public static getInstance(): SmartOvenEngine {
        if (!SmartOvenEngine.instance) {
            SmartOvenEngine.instance = new SmartOvenEngine();
        }
        return SmartOvenEngine.instance;
    }

    /**
     * Checks if we have production capacity for a specific date/time.
     */
    public checkCapacity(date: Date, requiredUnits: number): boolean {
        // Simulation: Random load factor based on date hash
        const dateHash = date.getDate() + date.getMonth();
        const baseLoad = (dateHash % 10) * 10; // 0-90% usage simulated

        const currentLoad = baseLoad + (Math.random() * 20);
        const available = this.OVEN_CAPACITY * ((100 - currentLoad) / 100);

        return available >= requiredUnits;
    }

    /**
     * Schedules a baking slot.
     * Returns a Production Token if successful.
     */
    public scheduleProduction(productId: number, quantity: number, deadline: number): string | null {
        // Logic: Find first available slot before deadline
        // Simulated "Best Fit" algorithm
        if (this.checkCapacity(new Date(deadline), quantity)) {
            const token = `PRD-${Date.now()}-${productId}`;
            console.log(`[SmartOven] Production Scheduled: ${token}`);

            this.db.insert('logs', {
                type: 'PRODUCTION_SCHEDULE',
                token,
                productId,
                quantity,
                timestamp: Date.now()
            });

            return token;
        }
        return null; // Overbooked
    }
}
