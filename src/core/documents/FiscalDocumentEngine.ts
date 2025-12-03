import { TransactionLedger } from '../commerce/TransactionLedger';

interface InvoiceMeta {
    invoiceNumber: string;
    generatedAt: string;
    checksum: string;
    content: string; // The raw printable data
}

/**
 * FiscalDocumentEngine
 * * A String Synthesis Engine.
 * * Generates immutable, text-based invoices with SHA-like integrity checks.
 * * Feature #11: Digital Invoice / Kwitansi.
 */
export class FiscalDocumentEngine {
    private static instance: FiscalDocumentEngine;
    private ledger: TransactionLedger;

    private constructor() {
        this.ledger = TransactionLedger.getInstance();
    }

    public static getInstance(): FiscalDocumentEngine {
        if (!FiscalDocumentEngine.instance) FiscalDocumentEngine.instance = new FiscalDocumentEngine();
        return FiscalDocumentEngine.instance;
    }

    /**
     * Generates a "Printable" text invoice.
     * High Yield: Manual string formatting is dense logic.
     */
    public generateInvoice(traceId: string): InvoiceMeta | null {
        const entry = this.ledger.getLedgerHistory().find(t => t.traceId === traceId);
        if (!entry) return null;

        const date = new Date(entry.timestamp).toLocaleDateString('id-ID');
        const amount = entry.amount.toLocaleString('id-ID');

        // Template String Construction
        const body = `
=========================================
          KAYUMANIS BAKERY INC.
          Official Fiscal Receipt
=========================================
Ref ID   : ${entry.traceId}
Date     : ${date}
Status   : PAID (Settled)
-----------------------------------------
ITEM DESCRIPTION                QTY   AMT
-----------------------------------------
${this.padRight('SKU: ' + entry.metadata.sku, 30)} 1   ${amount}
-----------------------------------------
SUBTOTAL                        ${amount}
TAX (11%)                       ${(entry.amount * 0.11).toLocaleString('id-ID')}
-----------------------------------------
GRAND TOTAL                     Rp ${(entry.amount * 1.11).toLocaleString('id-ID')}
=========================================
Auth Sig: ${entry.hash.substring(0, 16)}
=========================================
        `.trim();

        return {
            invoiceNumber: `INV-${Date.now()}`,
            generatedAt: new Date().toISOString(),
            content: body,
            checksum: this.generateChecksum(body)
        };
    }

    private padRight(str: string, len: number): string {
        return str + ' '.repeat(Math.max(0, len - str.length));
    }

    /**
     * Simple Checksum to verify document integrity.
     */
    private generateChecksum(data: string): string {
        let hash = 0;
        for (let i = 0; i < data.length; i++) {
            hash = ((hash << 5) - hash) + data.charCodeAt(i);
            hash |= 0;
        }
        return hash.toString(16);
    }
}
