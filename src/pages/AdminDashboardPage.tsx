import React, { useState, useEffect, useMemo } from 'react';
import {
    Activity, Shield, DollarSign, Users, RefreshCw,
    AlertTriangle, Lock, Unlock, Database, Terminal
} from 'lucide-react';

// Engine Imports
import { IdentityAccessEngine } from '../core/security/IdentityAccessEngine';
import { SubscriptionCore } from '../core/commerce/SubscriptionCore';
import { TransactionLedger } from '../core/commerce/TransactionLedger';
import { OrbitalDB } from '../core/data/OrbitalDB';

// Component Imports
import { ProductionScheduler } from '../components/production/ProductionScheduler';

// --- VISUAL COMPONENTS (Refactored for Mobile) ---

const MetricCard: React.FC<{
    title: string;
    value: string | number;
    trend?: string;
    icon: React.ElementType;
    color: string
}> = ({ title, value, trend, icon: Icon, color }) => (
    <div className="bg-white p-6 rounded-2xl border border-stone-100 shadow-sm relative overflow-hidden group hover:shadow-md transition-shadow">
        <div className={`absolute top-0 right-0 p-4 opacity-10 group-hover:scale-110 transition transform ${color}`}>
            <Icon className="w-16 h-16" />
        </div>
        <div className="relative z-10">
            <div className="flex items-center gap-2 mb-2 text-stone-500 text-xs font-bold uppercase tracking-wider">
                <Icon className="w-4 h-4" /> {title}
            </div>
            <div className="text-2xl md:text-3xl font-serif font-bold text-stone-900">{value}</div>
            {trend && <div className="text-xs font-mono mt-2 text-green-600 bg-green-50 inline-block px-2 py-0.5 rounded">{trend}</div>}
        </div>
    </div>
);

const BitwiseMatrix: React.FC = () => {
    const roles = ['GUEST', 'CUSTOMER', 'RESELLER', 'ADMIN'];
    const permissions = [
        { name: 'VIEW_DQ', bit: 1 },
        { name: 'EDIT_CAT', bit: 2 },
        { name: 'APPR_TX', bit: 4 },
        { name: 'SYS_ADM', bit: 8 }
    ];

    const matrix = roles.map(role => {
        const mask = IdentityAccessEngine.getInstance()['ROLE_MAP'][role] || 0;
        return { role, mask };
    });

    return (
        <div className="bg-stone-900 text-white p-6 rounded-2xl font-mono text-xs shadow-xl overflow-hidden">
            <div className="flex justify-between items-center mb-4">
                <h3 className="font-bold text-amber-500 flex items-center gap-2">
                    <Shield className="w-4 h-4" /> RBAC_BITMASK_VISUALIZER
                </h3>
                <span className="bg-stone-800 px-2 py-1 rounded text-[10px]">LIVE</span>
            </div>

            {/* Mobile Scroll Wrapper */}
            <div className="overflow-x-auto pb-2">
                <table className="w-full min-w-[400px]">
                    <thead>
                        <tr className="text-stone-500 border-b border-stone-800">
                            <th className="text-left py-2">ROLE</th>
                            {permissions.map(p => <th key={p.name} className="text-center px-2">{p.name}</th>)}
                            <th className="text-right">HEX</th>
                        </tr>
                    </thead>
                    <tbody>
                        {matrix.map((row) => (
                            <tr key={row.role} className="border-b border-stone-800/50 hover:bg-white/5 transition">
                                <td className="py-3 font-bold text-amber-500">{row.role}</td>
                                {permissions.map(p => (
                                    <td key={p.name} className="text-center">
                                        {(row.mask & p.bit) === p.bit ? (
                                            <Unlock className="w-3 h-3 text-green-500 mx-auto" />
                                        ) : (
                                            <Lock className="w-3 h-3 text-stone-700 mx-auto" />
                                        )}
                                    </td>
                                ))}
                                <td className="text-right text-stone-400">0x{row.mask.toString(16).padStart(4, '0')}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

const PaymentStreamLog: React.FC = () => {
    const [logs, setLogs] = useState<any[]>([]);

    useEffect(() => {
        const interval = setInterval(() => {
            const newLog = {
                id: `TX-${Date.now().toString().slice(-6)}`,
                state: Math.random() > 0.8 ? 'CHALLENGE_REQUIRED' : 'SETTLED',
                latency: Math.floor(Math.random() * 200) + 'ms',
                hash: Math.random().toString(36).substring(7)
            };
            setLogs(prev => [newLog, ...prev].slice(0, 5));
        }, 2000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="bg-white p-6 rounded-2xl border border-stone-100 shadow-sm h-full">
            <h3 className="font-bold text-stone-900 mb-4 flex items-center gap-2">
                <Activity className="w-4 h-4 text-blue-600" /> Payment FSM Telemetry
            </h3>
            <div className="space-y-3">
                {logs.map(log => (
                    <div key={log.id} className="flex items-center justify-between text-xs p-3 bg-stone-50 rounded-lg border border-stone-100 animate-fade-in hover:bg-blue-50 transition">
                        <div className="flex items-center gap-3">
                            <span className={`w-2 h-2 rounded-full ${log.state === 'SETTLED' ? 'bg-green-500' : 'bg-amber-500 animate-pulse'}`}></span>
                            <span className="font-mono font-bold text-stone-700">{log.id}</span>
                        </div>
                        <div className="text-right">
                            <div className="font-bold text-stone-600">{log.state}</div>
                            <div className="font-mono text-[10px] text-stone-400">{log.latency}</div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

// --- MAIN PAGE COMPONENT ---

export const AdminDashboardPage: React.FC = () => {
    const [isLoading, setIsLoading] = useState(true);
    const ledger = useMemo(() => TransactionLedger.getInstance(), []);
    const subCore = useMemo(() => SubscriptionCore.getInstance(), []);
    const audit = ledger.getAuditBalance();
    const [churnRisk, setChurnRisk] = useState(0);

    useEffect(() => {
        setTimeout(() => {
            setIsLoading(false);
            setChurnRisk(subCore.calculateChurnRisk({} as any, 12, 1));
        }, 1000);
    }, [subCore]);

    if (isLoading) return (
        <div className="min-h-screen flex items-center justify-center bg-stone-50">
            <div className="text-center">
                <RefreshCw className="w-10 h-10 text-amber-600 animate-spin mx-auto mb-4" />
                <p className="font-mono text-sm text-stone-500 tracking-widest">BOOTING_LUMEN_KERNEL...</p>
            </div>
        </div>
    );

    return (
        <div className="max-w-7xl mx-auto px-4 py-8 md:py-12 animate-fade-in">
            {/* Header - Stacked on Mobile */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                <div>
                    <h1 className="text-2xl md:text-3xl font-serif font-bold text-stone-900">System Command</h1>
                    <p className="text-stone-500 font-mono text-xs mt-1 flex items-center gap-2">
                        <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                        ID: ADMIN_ROOT | SECURE_MODE: ACTIVE
                    </p>
                </div>
                <div className="flex gap-3 w-full md:w-auto">
                    <button className="flex-1 md:flex-none justify-center bg-white border border-stone-200 text-stone-600 px-4 py-2 rounded-lg font-bold text-sm flex items-center gap-2 hover:bg-stone-50 transition">
                        <Terminal className="w-4 h-4" /> Logs
                    </button>
                    <button className="flex-1 md:flex-none justify-center bg-stone-900 text-white px-6 py-2 rounded-lg font-bold text-sm flex items-center gap-2 shadow-lg hover:bg-stone-800 transition">
                        <Database className="w-4 h-4" /> Purge
                    </button>
                </div>
            </div>

            {/* Top Metrics Grid - Responsive Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-8 md:mb-12">
                <MetricCard
                    title="Gross Ledger Volume"
                    value={`Rp ${audit.total.toLocaleString()}`}
                    trend="+12.4%"
                    icon={DollarSign}
                    color="text-green-500 bg-green-500"
                />
                <MetricCard
                    title="Active Sessions"
                    value="1,248"
                    trend="Argon2 OK"
                    icon={Users}
                    color="text-blue-500 bg-blue-500"
                />
                <MetricCard
                    title="Churn Risk Index"
                    value={`${(churnRisk * 100).toFixed(1)}%`}
                    trend="High Alert"
                    icon={AlertTriangle}
                    color="text-red-500 bg-red-500"
                />
                <MetricCard
                    title="System Health"
                    value="99.9%"
                    trend="Stable"
                    icon={Activity}
                    color="text-amber-500 bg-amber-500"
                />
            </div>

            {/* NEW: Production Scheduler (Gantt) - Full Width */}
            <div className="mb-8 md:mb-12">
                <ProductionScheduler />
            </div>

            {/* The Dense Visuals - Responsive Split */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8 mb-8 md:mb-12">
                <div className="lg:col-span-2">
                    <BitwiseMatrix />
                </div>
                <div className="lg:col-span-1">
                    <PaymentStreamLog />
                </div>
            </div>

            {/* Recurring Revenue Graph */}
            <div className="bg-white p-6 md:p-8 rounded-2xl border border-stone-100 shadow-sm">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                    <h3 className="font-bold text-stone-900 flex items-center gap-2">
                        <RefreshCw className="w-4 h-4 text-purple-600" /> Subscription Cohort Retention
                    </h3>
                    <div className="flex gap-2 w-full md:w-auto overflow-x-auto pb-1">
                        {['W1', 'W2', 'W3', 'W4'].map(w => (
                            <span key={w} className="flex-1 md:flex-none text-center px-3 py-1 bg-stone-100 text-stone-500 text-xs font-bold rounded cursor-pointer hover:bg-stone-200 transition">{w}</span>
                        ))}
                    </div>
                </div>
                <div className="flex items-end gap-2 h-32 md:h-48 w-full">
                    {[65, 59, 80, 81, 56, 55, 40, 70, 75, 85, 90, 95].map((h, i) => (
                        <div key={i} className="flex-1 flex flex-col justify-end group cursor-pointer relative">
                            <div
                                className="bg-purple-500 rounded-t-sm opacity-80 group-hover:opacity-100 transition-all duration-500 relative"
                                style={{ height: `${h}%` }}
                            >
                                <div className="hidden group-hover:block absolute -top-8 left-1/2 -translate-x-1/2 bg-stone-900 text-white text-xs px-2 py-1 rounded z-20 whitespace-nowrap shadow-lg">
                                    {h}% Retention
                                </div>
                            </div>
                            <div className="text-center text-[10px] md:text-xs text-stone-400 mt-2 font-mono">C{i + 1}</div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};
