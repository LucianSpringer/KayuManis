import React, { useState, useMemo } from 'react';
import { Calendar, Clock, Thermometer, AlertCircle, ChevronLeft, ChevronRight } from 'lucide-react';
import { SmartOvenEngine } from '../../core/production/SmartOvenEngine';

// Visual Types for Gantt
interface TimeBlock {
    id: string;
    productName: string;
    startTime: number; // Hour 0-23
    duration: number; // Hours
    ovenId: number;
    status: 'PREHEATING' | 'BAKING' | 'COOLING' | 'IDLE';
    temp: number;
}

/**
 * ProductionScheduler
 * * A Visual Resource Planning (MRP) Interface.
 * * Uses CSS Grid to map "Time" (X-Axis) vs "Resources" (Y-Axis).
 */
export const ProductionScheduler: React.FC = () => {
    // Engine Link (Simulated Read)
    const engine = useMemo(() => SmartOvenEngine.getInstance(), []);
    const [viewDate, setViewDate] = useState(new Date());

    // Mock Data Generator (Simulating Engine.getSchedule())
    const schedule: TimeBlock[] = [
        { id: 'JOB-101', productName: 'Roti Sobek (Batch A)', startTime: 7, duration: 2, ovenId: 1, status: 'BAKING', temp: 180 },
        { id: 'JOB-102', productName: 'Croissant (Lamination)', startTime: 9.5, duration: 3, ovenId: 1, status: 'COOLING', temp: 200 },
        { id: 'JOB-103', productName: 'Sourdough Starter', startTime: 6, duration: 4, ovenId: 2, status: 'BAKING', temp: 230 },
        { id: 'JOB-104', productName: 'Cake Base', startTime: 11, duration: 1.5, ovenId: 2, status: 'PREHEATING', temp: 170 },
        { id: 'JOB-105', productName: 'Flash Sale: Lava Cake', startTime: 13, duration: 2, ovenId: 3, status: 'IDLE', temp: 0 },
    ];

    const hours = Array.from({ length: 12 }, (_, i) => i + 6); // 06:00 to 18:00

    return (
        <div className="bg-white p-6 rounded-2xl border border-stone-100 shadow-sm animate-fade-in">
            <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
                <div>
                    <h3 className="font-bold text-stone-900 flex items-center gap-2">
                        <Calendar className="w-5 h-5 text-amber-600" /> Smart Oven Schedule
                    </h3>
                    <p className="text-xs text-stone-500 font-mono mt-1">CAPACITY_LOAD: 78% | THERMAL_EFFICIENCY: 92%</p>
                </div>
                <div className="flex gap-2">
                    <button className="p-2 hover:bg-stone-100 rounded-full"><ChevronLeft className="w-5 h-5" /></button>
                    <span className="font-bold text-sm bg-stone-100 px-4 py-2 rounded-lg">{viewDate.toLocaleDateString()}</span>
                    <button className="p-2 hover:bg-stone-100 rounded-full"><ChevronRight className="w-5 h-5" /></button>
                </div>
            </div>

            {/* The Gantt Grid Container - Mobile Scrollable */}
            <div className="overflow-x-auto pb-4 custom-scrollbar">
                <div className="min-w-[800px]">
                    {/* Header Row (Hours) */}
                    <div className="flex border-b border-stone-200 mb-4">
                        <div className="w-24 shrink-0 font-bold text-xs text-stone-400 uppercase tracking-wider py-2">Resource</div>
                        <div className="flex-1 grid grid-cols-12 gap-px bg-stone-100 border-l border-stone-200">
                            {hours.map(h => (
                                <div key={h} className="text-center text-xs font-mono text-stone-500 py-2 bg-white">
                                    {h}:00
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Resources Rows (Ovens) */}
                    {[1, 2, 3].map(ovenId => (
                        <div key={ovenId} className="flex mb-4 group relative">
                            {/* Y-Axis Label */}
                            <div className="w-24 shrink-0 flex flex-col justify-center">
                                <span className="font-bold text-stone-800 text-sm">Oven 0{ovenId}</span>
                                <span className="text-[10px] text-stone-400">Industrial Deck</span>
                            </div>

                            {/* Timeline Track */}
                            <div className="flex-1 relative h-16 bg-stone-50 rounded-lg border border-stone-100 overflow-hidden">
                                {/* Grid Lines */}
                                <div className="absolute inset-0 grid grid-cols-12 gap-px pointer-events-none">
                                    {hours.map(h => <div key={h} className="border-r border-stone-200/50 h-full"></div>)}
                                </div>

                                {/* Render Tasks */}
                                {schedule.filter(t => t.ovenId === ovenId).map(task => {
                                    // Calculate Position
                                    const startOffset = task.startTime - 6; // Relative to 06:00
                                    const leftPct = (startOffset / 12) * 100;
                                    const widthPct = (task.duration / 12) * 100;

                                    let statusColor = 'bg-stone-200 border-stone-300 text-stone-600';
                                    if (task.status === 'BAKING') statusColor = 'bg-amber-100 border-amber-300 text-amber-800';
                                    if (task.status === 'PREHEATING') statusColor = 'bg-red-50 border-red-200 text-red-600 animate-pulse';
                                    if (task.status === 'COOLING') statusColor = 'bg-blue-50 border-blue-200 text-blue-600';

                                    return (
                                        <div
                                            key={task.id}
                                            className={`absolute top-2 bottom-2 rounded-md border ${statusColor} px-2 py-1 flex flex-col justify-center shadow-sm transition-all hover:scale-[1.02] hover:z-10 cursor-pointer`}
                                            style={{ left: `${leftPct}%`, width: `${widthPct}%` }}
                                            title={`${task.productName} (${task.status})`}
                                        >
                                            <div className="font-bold text-[10px] truncate leading-tight">{task.productName}</div>
                                            <div className="flex items-center gap-1 text-[9px] opacity-80 mt-0.5">
                                                <Clock className="w-3 h-3" /> {task.duration}h
                                                {task.temp > 0 && <span className="flex items-center gap-0.5 ml-1"><Thermometer className="w-3 h-3" /> {task.temp}°C</span>}
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Legend */}
            <div className="flex flex-wrap gap-4 mt-4 pt-4 border-t border-stone-100 text-xs">
                <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded bg-amber-100 border border-amber-300"></div>
                    <span className="text-stone-600">Active Baking</span>
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded bg-red-50 border border-red-200"></div>
                    <span className="text-stone-600">Pre-Heating (High Power)</span>
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded bg-blue-50 border border-blue-200"></div>
                    <span className="text-stone-600">Cooling / Resting</span>
                </div>
            </div>
        </div>
    );
};
