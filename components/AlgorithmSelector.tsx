import React from 'react';
import { Activity, ScatterChart, Share2, ArrowRight } from 'lucide-react';
import { ALGORITHMS } from '../constants';
import { Algorithm, AlgorithmType } from '../types';

interface AlgorithmSelectorProps {
  onSelect: (algo: Algorithm) => void;
}

const AlgorithmSelector: React.FC<AlgorithmSelectorProps> = ({ onSelect }) => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Activity': return <Activity className="w-8 h-8" />;
      case 'ScatterChart': return <ScatterChart className="w-8 h-8" />;
      case 'Share2': return <Share2 className="w-8 h-8" />;
      default: return <Activity className="w-8 h-8" />;
    }
  };

  return (
    <div className="w-full max-w-5xl mx-auto p-8 animate-fade-in-up">
       <h2 className="text-3xl font-bold mb-2 text-center text-slate-200 brand-font">
            <span className="text-cyan-400">02.</span> SELECT METHOD
        </h2>
        <p className="text-center text-slate-500 mb-12 font-mono">Choose an alchemical process for your data.</p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {ALGORITHMS.map((algo) => (
                <div 
                    key={algo.id}
                    onClick={() => onSelect(algo)}
                    className="group relative h-80 p-8 glass-panel rounded-xl cursor-pointer hover:bg-slate-800/50 transition-all duration-300 hover:-translate-y-2 border border-slate-800 hover:border-cyan-500/50 flex flex-col justify-between overflow-hidden"
                >
                    <div className="absolute top-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity">
                        <ArrowRight className="text-cyan-400" />
                    </div>
                    
                    <div>
                        <div className="mb-6 p-4 bg-slate-900/50 rounded-lg inline-block text-cyan-400 group-hover:text-cyan-300 group-hover:shadow-[0_0_15px_rgba(34,211,238,0.3)] transition-all">
                            {getIcon(algo.icon)}
                        </div>
                        <h3 className="text-xl font-bold mb-3 text-slate-200 group-hover:text-white">{algo.title}</h3>
                        <p className="text-sm text-slate-400 leading-relaxed font-mono">
                            {algo.description}
                        </p>
                    </div>

                    <div className="flex items-center justify-between border-t border-slate-800 pt-4 mt-4">
                         <span className="text-xs font-bold text-slate-600 uppercase tracking-wider">Complexity</span>
                         <span className={`text-xs font-bold px-2 py-1 rounded ${
                             algo.complexity === 'High' ? 'bg-red-500/20 text-red-400' : 
                             algo.complexity === 'Medium' ? 'bg-yellow-500/20 text-yellow-400' : 'bg-green-500/20 text-green-400'
                         }`}>
                             {algo.complexity}
                         </span>
                    </div>
                    
                    {/* Hover Glow Effect */}
                    <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-cyan-500/20 blur-2xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                </div>
            ))}
        </div>
    </div>
  );
};

export default AlgorithmSelector;