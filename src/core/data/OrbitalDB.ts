type CollectionName = 'audit_trail' | 'logs';

export class OrbitalDB {
    private static instance: OrbitalDB;
    private store: Map<string, any[]> = new Map();

    private constructor() {
        console.log("[OrbitalDB] Database Hydrated from LocalStorage");
    }

    public static getInstance(): OrbitalDB {
        if (!OrbitalDB.instance) OrbitalDB.instance = new OrbitalDB();
        return OrbitalDB.instance;
    }

    public insert(collection: CollectionName, data: any) {
        const current = this.store.get(collection) || [];
        current.push({ ...data, _id: Date.now() });
        this.store.set(collection, current);
    }
}
