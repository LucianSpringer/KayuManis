/**
 * TelemetryEngine
 * * A User Behavior Tracker.
 * * Aggregates "View" events to build a Heatmap of interest vs conversion.
 */
export class TelemetryEngine {
    private static instance: TelemetryEngine;
    private viewCounts: Map<number, number> = new Map();
    private conversionCounts: Map<number, number> = new Map();

    private constructor() { }

    public static getInstance(): TelemetryEngine {
        if (!TelemetryEngine.instance) {
            TelemetryEngine.instance = new TelemetryEngine();
        }
        return TelemetryEngine.instance;
    }

    public logView(productId: number) {
        const current = this.viewCounts.get(productId) || 0;
        this.viewCounts.set(productId, current + 1);
    }

    public logConversion(productId: number) {
        const current = this.conversionCounts.get(productId) || 0;
        this.conversionCounts.set(productId, current + 1);
    }

    public getHeatmapData(): { productId: number; views: number; conversionRate: number }[] {
        const data = [];
        for (const [pid, views] of this.viewCounts.entries()) {
            const buys = this.conversionCounts.get(pid) || 0;
            data.push({
                productId: pid,
                views,
                conversionRate: views > 0 ? (buys / views) * 100 : 0
            });
        }
        return data.sort((a, b) => b.views - a.views);
    }
}
