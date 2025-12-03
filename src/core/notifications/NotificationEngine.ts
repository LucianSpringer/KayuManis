import { OrbitalDB } from '../data/OrbitalDB';

export type Channel = 'EMAIL' | 'SMS' | 'WHATSAPP';
export type TemplateId = 'ORDER_CONFIRMED' | 'ORDER_SHIPPED' | 'OTP_VERIFY';

interface NotificationLog {
    id: string;
    recipient: string;
    channel: Channel;
    status: 'QUEUED' | 'SENT' | 'FAILED';
    timestamp: number;
    contentHash: string;
}

/**
 * NotificationEngine
 * * A Virtual Message Broker.
 * * Simulates async dispatch queues and template interpolation.
 * * Persists delivery reports to OrbitalDB for auditability.
 */
export class NotificationEngine {
    private static instance: NotificationEngine;
    private db: OrbitalDB;

    // Config: Simulated Gateway Latency
    private readonly LATENCY_MS = 800;

    // Templates Matrix (i18n ready)
    private readonly TEMPLATES: Record<TemplateId, (data: any) => string> = {
        ORDER_CONFIRMED: (d) => `Thank you ${d.name}. Order ${d.orderId} (Rp ${d.total}) is confirmed.`,
        ORDER_SHIPPED: (d) => `Good news! Order ${d.orderId} is on the way. Track: ${d.trackingLink}`,
        OTP_VERIFY: (d) => `Your KayuManis code is ${d.code}. Do not share.`
    };

    private constructor() {
        this.db = OrbitalDB.getInstance();
    }

    public static getInstance(): NotificationEngine {
        if (!NotificationEngine.instance) {
            NotificationEngine.instance = new NotificationEngine();
        }
        return NotificationEngine.instance;
    }

    /**
     * Dispatcher: The main public API.
     * Enqueues a message for delivery.
     */
    public async dispatch(
        recipient: string,
        channel: Channel,
        templateId: TemplateId,
        data: any
    ): Promise<{ success: boolean; messageId: string }> {
        const messageId = `MSG-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
        const content = this.render(templateId, data);

        console.log(`[NotificationEngine] Dispatching via ${channel} to ${recipient}...`);

        // Simulate Network IO
        await new Promise(resolve => setTimeout(resolve, this.LATENCY_MS));

        const logEntry: NotificationLog = {
            id: messageId,
            recipient,
            channel,
            status: 'SENT',
            timestamp: Date.now(),
            contentHash: this.hashContent(content)
        };

        // Write to Shadow DB
        this.db.insert('logs', logEntry);

        return { success: true, messageId };
    }

    private render(templateId: TemplateId, data: any): string {
        const template = this.TEMPLATES[templateId];
        return template ? template(data) : "Template Error";
    }

    private hashContent(content: string): string {
        let hash = 0;
        for (let i = 0; i < content.length; i++) {
            hash = ((hash << 5) - hash) + content.charCodeAt(i);
            hash |= 0;
        }
        return hash.toString(16);
    }
}
