import React, { useMemo, useState } from 'react';
import { Users, Plus, Shield, Download, FileText } from 'lucide-react';
import { FamilyGraphEngine } from '../../core/identity/FamilyGraphEngine';
import { FiscalDocumentEngine } from '../../core/documents/FiscalDocumentEngine';
import { TransactionLedger } from '../../core/commerce/TransactionLedger';

export const FamilyAccountManager: React.FC = () => {
    const familyEngine = useMemo(() => FamilyGraphEngine.getInstance(), []);
    const docEngine = useMemo(() => FiscalDocumentEngine.getInstance(), []);
    const ledger = useMemo(() => TransactionLedger.getInstance(), []);

    // Simulate current logged in user
    const currentUser = 'john@example.com';
    const { household } = familyEngine.getHouseholdLimit(currentUser);

    // For Invoice Demo
    const recentTx = ledger.getLedgerHistory().slice(-1)[0];
    const [invoicePreview, setInvoicePreview] = useState<string | null>(null);

    const handleGenerateInvoice = () => {
        if (!recentTx) return;
        const inv = docEngine.generateInvoice(recentTx.traceId);
        if (inv) setInvoicePreview(inv.content);
    };

    return (
        <div className="space-y-8 animate-fade-in">
            {/* Feature #15: Family Graph Visualization */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-stone-200">
                <div className="flex justify-between items-center mb-6">
                    <h3 className="text-lg font-bold text-stone-900 flex items-center gap-2">
                        <Users className="w-5 h-5 text-amber-600" /> Household Protocol
                    </h3>
                    {household && (
                        <span className="bg-amber-100 text-amber-800 text-xs font-bold px-3 py-1 rounded-full">
                            Pooled Points: {household.totalPooledPoints}
                        </span>
                    )}
                </div>

                {household ? (
                    <div className="space-y-4">
                        {household.members.map((member, i) => (
                            <div key={i} className="flex items-center justify-between p-3 bg-stone-50 rounded-xl border border-stone-100">
                                <div className="flex items-center gap-3">
                                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${member.role === 'HEAD' ? 'bg-stone-900 text-white' : 'bg-stone-200 text-stone-600'}`}>
                                        {member.userId[0].toUpperCase()}
                                    </div>
                                    <div>
                                        <div className="text-sm font-bold text-stone-800">{member.userId}</div>
                                        <div className="text-[10px] text-stone-500 uppercase tracking-wider">{member.role}</div>
                                    </div>
                                </div>
                                <div className="text-sm font-mono text-green-600">
                                    +{member.pooledPointsContribution} pts
                                </div>
                            </div>
                        ))}
                        <button className="w-full py-3 mt-4 border-2 border-dashed border-stone-200 text-stone-400 rounded-xl font-bold text-sm hover:border-amber-400 hover:text-amber-600 transition flex items-center justify-center gap-2">
                            <Plus className="w-4 h-4" /> Link New Member
                        </button>
                    </div>
                ) : (
                    <p className="text-stone-500 text-sm">No household linked. Initialize a graph to pool points.</p>
                )}
            </div>

            {/* Feature #11: Fiscal Document Engine */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-stone-200">
                <h3 className="text-lg font-bold text-stone-900 flex items-center gap-2 mb-4">
                    <FileText className="w-5 h-5 text-blue-600" /> Fiscal Documents
                </h3>

                {recentTx ? (
                    <div>
                        <div className="flex items-center justify-between mb-4">
                            <span className="text-sm text-stone-600">Last Order: <span className="font-mono font-bold">{recentTx.traceId}</span></span>
                            <button
                                onClick={handleGenerateInvoice}
                                className="text-xs bg-stone-900 text-white px-3 py-1.5 rounded-lg flex items-center gap-2 hover:bg-stone-700"
                            >
                                <Download className="w-3 h-3" /> Generate PDF
                            </button>
                        </div>

                        {invoicePreview && (
                            <div className="bg-stone-900 text-stone-300 p-4 rounded-xl font-mono text-[10px] leading-relaxed whitespace-pre overflow-x-auto shadow-inner">
                                {invoicePreview}
                            </div>
                        )}
                    </div>
                ) : (
                    <p className="text-sm text-stone-500">No recent transactions found to generate invoices.</p>
                )}
            </div>
        </div>
    );
};
