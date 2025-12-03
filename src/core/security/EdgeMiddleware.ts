import { OrbitalDB } from '../data/OrbitalDB';

export class EdgeMiddleware {
    private static instance: EdgeMiddleware;
    private db: OrbitalDB;

    private constructor() {
        this.db = OrbitalDB.getInstance();
        console.log("[EdgeMiddleware] WAF Rules Loaded");
    }

    public static getInstance(): EdgeMiddleware {
        if (!EdgeMiddleware.instance) EdgeMiddleware.instance = new EdgeMiddleware();
        return EdgeMiddleware.instance;
    }
}
