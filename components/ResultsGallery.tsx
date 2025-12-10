import React from 'react';
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  AreaChart, Area, ScatterChart, Scatter, ZAxis
} from 'recharts';
import { Algorithm, AlgorithmType } from '../types';
import { PREDICTION_DATA, CLUSTERING_DATA } from '../constants';
import { RefreshCcw, Download } from 'lucide-react';

interface ResultsGalleryProps {
  algorithm: Algorithm;
  onReset: () => void;
}

const ResultsGallery: React.FC<ResultsGalleryProps> = ({ algorithm, onReset }) => {
  
  const renderChart = () => {
    switch(algorithm.id) {
        case AlgorithmType.PREDICTION:
        case AlgorithmType.NETWORK: // Reusing Prediction chart for demo simplicity
            return (
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={PREDICTION_DATA} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                        <defs>
                            <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#22d3ee" stopOpacity={0.8}/>
                                <stop offset="95%" stopColor="#22d3ee" stopOpacity={0}/>
                            </linearGradient>
                            <linearGradient id="colorValue2" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.8}/>
                                <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0}/>
                            </linearGradient>
                        </defs>
                        <XAxis dataKey="name" stroke="#475569" />
                        <YAxis stroke="#475569" />
                        <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                        <Tooltip 
                            contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #334155', borderRadius: '8px' }}
                            itemStyle={{ color: '#e2e8f0' }}
                        />
                        <Area type="monotone" dataKey="value" stroke="#22d3ee" fillOpacity={1} fill="url(#colorValue)" strokeWidth={3} />
                        <Area type="monotone" dataKey="value2" stroke="#8b5cf6" fillOpacity={1} fill="url(#colorValue2)" strokeWidth={3} strokeDasharray="5 5" />
                    </AreaChart>
                </ResponsiveContainer>
            );
        case AlgorithmType.CLUSTERING:
            return (
                <ResponsiveContainer width="100%" height="100%">
                    <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
                        <CartesianGrid stroke="#1e293b" />
                        <XAxis type="number" dataKey="x" name="X" stroke="#475569" />
                        <YAxis type="number" dataKey="y" name="Y" stroke="#475569" />
                        <ZAxis type="number" dataKey="z" range={[60, 400]} />
                        <Tooltip cursor={{ strokeDasharray: '3 3' }} contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #334155' }} />
                        <Scatter name="A" data={CLUSTERING_DATA.filter(d => d.cluster === 0)} fill="#22d3ee" />
                        <Scatter name="B" data={CLUSTERING_DATA.filter(d => d.cluster === 1)} fill="#8b5cf6" />
                        <Scatter name="C" data={CLUSTERING_DATA.filter(d => d.cluster === 2)} fill="#f43f5e" />
                    </ScatterChart>
                </ResponsiveContainer>
            );
        default:
            return null;
    }
  };

  return (
    <div className="w-full max-w-7xl mx-auto p-4 animate-fade-in-up pb-20">
        <div className="flex justify-between items-center mb-8">
            <div>
                <h2 className="text-3xl font-bold text-slate-200 brand-font">ANALYSIS COMPLETE</h2>
                <p className="text-cyan-400 font-mono text-sm mt-1">MODEL: {algorithm.title.toUpperCase()}</p>
            </div>
            <div className="flex gap-4">
                <button onClick={onReset} className="flex items-center gap-2 px-4 py-2 text-sm font-bold text-slate-400 hover:text-white border border-slate-700 hover:border-slate-500 rounded transition-colors">
                    <RefreshCcw className="w-4 h-4" /> NEW EXPERIMENT
                </button>
                <button className="flex items-center gap-2 px-6 py-2 text-sm font-bold bg-cyan-600 hover:bg-cyan-500 text-white rounded shadow-[0_0_15px_rgba(8,145,178,0.5)] transition-all">
                    <Download className="w-4 h-4" /> EXPORT REPORT
                </button>
            </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Main Chart Area */}
            <div className="lg:col-span-3 h-[500px] glass-panel rounded-xl p-4 border-t-4 border-cyan-400">
                <h3 className="text-slate-400 font-mono text-xs mb-4 uppercase tracking-widest">Main Projection Visualizer</h3>
                {renderChart()}
            </div>

            {/* KPI Cards */}
            <div className="space-y-6">
                <div className="glass-panel p-6 rounded-xl border-l-4 border-violet-500">
                    <div className="text-slate-500 text-xs font-mono uppercase mb-2">Confidence Score</div>
                    <div className="text-4xl font-bold text-white">98.4<span className="text-lg text-violet-400">%</span></div>
                </div>
                
                <div className="glass-panel p-6 rounded-xl border-l-4 border-cyan-500">
                    <div className="text-slate-500 text-xs font-mono uppercase mb-2">Processing Time</div>
                    <div className="text-4xl font-bold text-white">1.2<span className="text-lg text-cyan-400">s</span></div>
                </div>

                <div className="glass-panel p-6 rounded-xl border-l-4 border-pink-500">
                    <div className="text-slate-500 text-xs font-mono uppercase mb-2">Anomalies Detected</div>
                    <div className="text-4xl font-bold text-white">3</div>
                </div>
            </div>
        </div>

        {/* Mock Report Section */}
        <div className="mt-8 glass-panel p-8 rounded-xl">
             <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                 <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                 Automated Insight Generation
             </h3>
             <p className="text-slate-400 font-mono leading-relaxed">
                 The analysis indicates a strong positive correlation between variable sets A and B. 
                 The predictive model suggests a <span className="text-cyan-400">15% increase</span> in the target metric over the next quarter. 
                 Clustering reveals three distinct user archetypes with minimal overlap. Recommended action: 
                 Optimize resource allocation for Cluster 2 (High Value/Low Engagement).
             </p>
        </div>
    </div>
  );
};

export default ResultsGallery;