import React, { useMemo, useState, useEffect } from 'react';
import { Gift, Calendar, ChevronRight, X } from 'lucide-react';
import { OccasionPredictionEngine } from '../../core/analytics/OccasionPredictionEngine';

export const OccasionReminder: React.FC = () => {
    // Engine Injection
    const predictor = useMemo(() => OccasionPredictionEngine.getInstance(), []);
    const [prediction, setPrediction] = useState<any>(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        // Simulate analyzing user history on mount
        const result = predictor.predictNextOccasion('USER_ME');
        if (result && result.confidenceScore > 0.7) {
            setPrediction(result);
            setIsVisible(true);
        }
    }, [predictor]);

    if (!isVisible || !prediction) return null;

    const message = predictor.getReminderMessage(prediction);

    return (
        <div className="fixed bottom-24 left-6 z-40 max-w-sm animate-slide-in-left">
            <div className="bg-white p-5 rounded-2xl shadow-2xl border-2 border-amber-100 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-16 h-16 bg-amber-500 rounded-bl-full opacity-10"></div>
                <button
                    onClick={() => setIsVisible(false)}
                    className="absolute top-2 right-2 text-stone-400 hover:text-red-500"
                >
                    <X className="w-4 h-4" />
                </button>

                <div className="flex items-start gap-4">
                    <div className="bg-amber-100 p-3 rounded-full text-amber-600">
                        <Gift className="w-6 h-6" />
                    </div>
                    <div>
                        <h4 className="font-bold text-stone-900 text-sm flex items-center gap-2">
                            Upcoming Occasion
                            <span className="bg-green-100 text-green-700 text-[10px] px-2 py-0.5 rounded-full">
                                {Math.floor(prediction.confidenceScore * 100)}% Conf
                            </span>
                        </h4>
                        <p className="text-xs text-stone-500 mt-1 leading-relaxed">
                            {message}
                        </p>
                        <div className="mt-3 flex items-center gap-2">
                            <Calendar className="w-3 h-3 text-stone-400" />
                            <span className="text-xs font-mono text-stone-600">
                                {new Date(prediction.predictedDate).toLocaleDateString()}
                            </span>
                        </div>
                        <button className="mt-3 w-full bg-stone-900 text-white py-2 rounded-lg text-xs font-bold flex items-center justify-center gap-2 hover:bg-amber-600 transition">
                            Re-Order Now <ChevronRight className="w-3 h-3" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};
