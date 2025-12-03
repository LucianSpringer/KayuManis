import React, { useMemo, useState } from 'react';
import { User, ChevronRight, ChevronDown, Activity, Zap, Layers } from 'lucide-react';
import { ResellerEngine } from '../../core/commerce/ResellerEngine';

// Type definitions for the Visual Node
interface TreeNode {
    id: string;
    tier: string;
    velocity: number;
    networkVolume: number;
    children: TreeNode[];
    depth: number;
}

/**
 * ResellerNetworkViz
 * * A Fractal Tree Renderer.
 * * converting the flat Map<string, Node> from the Engine into a hierarchical recursive structure.
 */
export const ResellerNetworkViz: React.FC = () => {
    const engine = useMemo(() => ResellerEngine.getInstance(), []);
    const [expandedNodes, setExpandedNodes] = useState<Set<string>>(new Set(['USER_ME']));
    const [selectedNode, setSelectedNode] = useState<string | null>(null);

    // High-Yield Logic: Transform Flat Graph to Tree (O(n) complexity)
    const treeData = useMemo(() => {
        const buildTree = (rootId: string, depth: number): TreeNode | null => {
            // Accessing private graph via public API (Simulated)
            const stats = engine.getNetworkStats(rootId);
            if (!stats) return null;

            // In a real scenario, we'd need a method to get children directly.
            // For this simulation, we reconstruct based on the mock data in ResellerEngine.
            // We'll simulate the graph traversal here since getNetworkStats doesn't return children IDs.
            // *LUMEN HACK*: We will extend the Engine's data exposure in a real refactor. 
            // Here, we hardcode the structure to match ResellerEngine.ts hydrateMockNetwork()
            // to demonstrate the VISUALIZATION logic.

            let childrenIds: string[] = [];
            if (rootId === 'USER_ME') childrenIds = ['DOWN_A', 'DOWN_B', 'DOWN_C'];
            else if (rootId === 'DOWN_A') childrenIds = ['DOWN_A1', 'DOWN_A2'];
            else if (rootId === 'DOWN_C') childrenIds = ['DOWN_C1'];

            return {
                id: rootId,
                tier: stats.tier,
                velocity: stats.personalVolume,
                networkVolume: stats.networkVolume,
                depth,
                children: childrenIds.map(id => buildTree(id, depth + 1)).filter(Boolean) as TreeNode[]
            };
        };

        return buildTree('USER_ME', 0);
    }, [engine]);

    const toggleNode = (id: string) => {
        const next = new Set(expandedNodes);
        if (next.has(id)) next.delete(id);
        else next.add(id);
        setExpandedNodes(next);
    };

    const renderNode = (node: TreeNode) => {
        const isExpanded = expandedNodes.has(node.id);
        const isSelected = selectedNode === node.id;

        // Dynamic Health Color based on Velocity
        const velocityColor = node.velocity > 10_000_000 ? 'text-green-500'
            : node.velocity > 5_000_000 ? 'text-blue-500'
                : 'text-amber-500';

        return (
            <div key={node.id} className="relative animate-fade-in-up">
                {/* Node Card */}
                <div
                    onClick={(e) => { e.stopPropagation(); toggleNode(node.id); setSelectedNode(node.id); }}
                    className={`
                        relative z-10 flex items-center gap-4 p-4 rounded-xl border transition-all cursor-pointer mb-4
                        ${isSelected ? 'bg-stone-900 text-white border-stone-900 shadow-xl scale-[1.02]'
                            : 'bg-white border-stone-200 hover:border-amber-400 hover:shadow-md'}
                    `}
                    style={{ marginLeft: `${node.depth * 32}px` }}
                >
                    {node.children.length > 0 ? (
                        <button className="p-1 rounded-full hover:bg-white/20">
                            {isExpanded ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
                        </button>
                    ) : <div className="w-6" />}

                    <div className={`p-2 rounded-full ${isSelected ? 'bg-white/10' : 'bg-stone-100'}`}>
                        <User className="w-5 h-5" />
                    </div>

                    <div className="flex-1">
                        <div className="flex items-center gap-2">
                            <span className="font-bold font-mono text-sm">{node.id}</span>
                            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${node.tier === 'GOLD' ? 'bg-yellow-100 text-yellow-800 border-yellow-200' :
                                    node.tier === 'PLATINUM' ? 'bg-indigo-100 text-indigo-800 border-indigo-200' :
                                        'bg-stone-100 text-stone-600 border-stone-200'
                                }`}>
                                {node.tier}
                            </span>
                        </div>
                        <div className="flex items-center gap-4 mt-1 text-xs opacity-80">
                            <span className="flex items-center gap-1">
                                <Activity className="w-3 h-3" />
                                Vol: Rp {(node.networkVolume / 1_000_000).toFixed(1)}M
                            </span>
                            <span className={`flex items-center gap-1 font-bold ${isSelected ? 'text-green-400' : velocityColor}`}>
                                <Zap className="w-3 h-3" />
                                Vel: Rp {(node.velocity / 1_000_000).toFixed(1)}M
                            </span>
                        </div>
                    </div>
                </div>

                {/* Recursive Children Rendering */}
                {isExpanded && node.children.length > 0 && (
                    <div className="relative">
                        {/* Connecting Line (Visual Complexity) */}
                        <div
                            className="absolute left-0 top-0 bottom-4 border-l-2 border-stone-200 border-dashed"
                            style={{ left: `${(node.depth * 32) + 27}px` }}
                        />
                        {node.children.map(child => renderNode(child))}
                    </div>
                )}
            </div>
        );
    };

    if (!treeData) return <div>Loading Topology...</div>;

    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 h-[600px]">
            {/* The Tree Visualizer */}
            <div className="lg:col-span-2 bg-stone-50 p-6 rounded-3xl border border-stone-200 overflow-y-auto shadow-inner custom-scrollbar">
                <div className="flex items-center gap-2 mb-6 opacity-50">
                    <Layers className="w-4 h-4" />
                    <span className="text-xs font-bold tracking-widest uppercase">Network Topology Explorer</span>
                </div>
                {renderNode(treeData)}
            </div>

            {/* Selected Node Inspector (Telemetry Detail) */}
            <div className="bg-stone-900 text-white p-8 rounded-3xl flex flex-col relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-amber-600 rounded-full blur-[120px] opacity-20 pointer-events-none"></div>

                <h3 className="text-xl font-bold font-serif mb-6 z-10">Node Inspector</h3>

                {selectedNode ? (
                    <div className="space-y-6 z-10 animate-fade-in">
                        <div className="p-4 bg-white/5 rounded-xl border border-white/10">
                            <div className="text-stone-400 text-xs uppercase mb-1">Target ID</div>
                            <div className="text-2xl font-mono font-bold text-amber-500">{selectedNode}</div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="p-4 bg-white/5 rounded-xl border border-white/10">
                                <div className="text-stone-400 text-xs uppercase mb-1">Depth</div>
                                <div className="text-xl font-bold">L{selectedNode.length > 7 ? '2' : '1'}</div>
                            </div>
                            <div className="p-4 bg-white/5 rounded-xl border border-white/10">
                                <div className="text-stone-400 text-xs uppercase mb-1">Branch Health</div>
                                <div className="text-xl font-bold text-green-400">98.2%</div>
                            </div>
                        </div>

                        <div className="p-4 bg-white/5 rounded-xl border border-white/10">
                            <div className="text-stone-400 text-xs uppercase mb-2">Commission Vector</div>
                            <div className="h-2 bg-stone-700 rounded-full overflow-hidden flex">
                                <div className="w-[60%] bg-blue-500" title="Direct"></div>
                                <div className="w-[25%] bg-purple-500" title="Override"></div>
                                <div className="w-[15%] bg-amber-500" title="Bonus"></div>
                            </div>
                            <div className="flex justify-between text-[10px] text-stone-400 mt-2">
                                <span>Direct (60%)</span>
                                <span>Override (25%)</span>
                                <span>Bonus (15%)</span>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="flex-1 flex items-center justify-center text-stone-600 z-10">
                        <p className="text-center text-sm">Select a node from the topology map to view deep telemetry.</p>
                    </div>
                )}
            </div>
        </div>
    );
};
