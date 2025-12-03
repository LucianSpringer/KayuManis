import { TransactionLedger } from './TransactionLedger';

type PaymentState = 'IDLE' | 'TOKENIZING' | 'CHALLENGE_REQUIRED' | 'PROCESSING' | 'SETTLED' | 'FAILED';

interface PaymentIntent {
    intentId: string;
    amount: number;
    currency: 'IDR';
    state: PaymentState;
    idempotencyKey: string;
    webhookSignature?: string;
}

/**
 * PaymentGatewayBridge
 * * A Finite State Machine (FSM) for handling async payments.
 * * Simulates 3DSecure challenges and Webhook verifications.
 */
export class PaymentGatewayBridge {
    private static instance: PaymentGatewayBridge;
    private ledger: TransactionLedger;

    private constructor() {
        this.ledger = TransactionLedger.getInstance();
    }

    public static getInstance(): PaymentGatewayBridge {
        if (!PaymentGatewayBridge.instance) PaymentGatewayBridge.instance = new PaymentGatewayBridge();
        return PaymentGatewayBridge.instance;
    }

    /**
     * Initiates a stateful payment flow.
     */
    public async createPaymentIntent(amount: number, idempotencyKey: string): Promise<PaymentIntent> {
        // 1. Idempotency Check
        // In real app: check DB. Here simulate success.

        const intent: PaymentIntent = {
            intentId: `pi_${Date.now()}_${Math.random().toString(36).substr(2, 5)}`,
            amount,
            currency: 'IDR',
            state: 'IDLE',
            idempotencyKey
        };

        return this.transitionState(intent, 'TOKENIZING');
    }

    private async transitionState(intent: PaymentIntent, target: PaymentState): Promise<PaymentIntent> {
        console.log(`[PaymentFSM] Transition: ${intent.state} -> ${target}`);
        intent.state = target;

        if (target === 'TOKENIZING') {
            await new Promise(r => setTimeout(r, 500)); // Latency
            return this.transitionState(intent, 'PROCESSING');
        }

        if (target === 'PROCESSING') {
            // Heuristic: Randomly trigger 3DSecure Challenge for high amounts
            if (intent.amount > 1_000_000 && Math.random() > 0.7) {
                return this.transitionState(intent, 'CHALLENGE_REQUIRED');
            }
            return this.transitionState(intent, 'SETTLED');
        }

        if (target === 'SETTLED') {
            // Finalize in Ledger
            // this.ledger.recordSettlement(intent); // Assuming this method exists or similar
            intent.webhookSignature = this.generateHmac(intent.intentId);
        }

        return intent;
    }

    /**
     * Simulates HMAC-SHA256 signature generation for Webhooks.
     */
    private generateHmac(payload: string): string {
        let h = 0xdeadbeef;
        for (let i = 0; i < payload.length; i++) {
            h = Math.imul(h ^ payload.charCodeAt(i), 2654435761);
        }
        return ((h ^ h >>> 16) >>> 0).toString(16);
    }
}
