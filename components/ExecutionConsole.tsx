import React, { useEffect, useRef, useState } from 'react';
import { MOCK_LOGS } from '../constants';
import { Loader2 } from 'lucide-react';

interface ExecutionConsoleProps {
  onComplete: () => void;
}

const ExecutionConsole: React.FC<ExecutionConsoleProps> = ({ onComplete }) => {
  const [logs, setLogs] = useState<string[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let currentIndex = 0;
    const interval = setInterval(() => {
      if (currentIndex >= MOCK_LOGS.length) {
        clearInterval(interval);
        setTimeout(onComplete, 1000);
        return;
      }

      setLogs(prev => [...prev, `[${new Date().toLocaleTimeString().split(' ')[0]}] ${MOCK_LOGS[currentIndex]}`]);
      setProgress(((currentIndex + 1) / MOCK_LOGS.length) * 100);
      currentIndex++;
    }, 150 + Math.random() * 200); // Random delay for realism

    return () => clearInterval(interval);
  }, [onComplete]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [logs]);

  return (
    <div className="w-full max-w-4xl mx-auto p-4 animate-fade-in-up">
        <h2 className="text-2xl font-bold mb-4 text-center text-slate-200 brand-font flex items-center justify-center gap-2">
            <Loader2 className="animate-spin text-cyan-400" /> SYSTEM EXECUTING
        </h2>

        <div className="w-full h-1 bg-slate-800 rounded-full mb-6 overflow-hidden">
            <div 
                className="h-full bg-cyan-500 shadow-[0_0_10px_rgba(34,211,238,0.8)] transition-all duration-300" 
                style={{ width: `${progress}%` }} 
            />
        </div>

        <div 
            className="w-full h-[500px] bg-black/90 rounded-lg border border-slate-700 p-6 font-mono text-sm overflow-hidden shadow-2xl relative"
        >
             {/* CRT Screen Scanline effect */}
             <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] z-10 pointer-events-none bg-[length:100%_4px,6px_100%] pointer-events-none" />
             
             <div 
                ref={scrollRef}
                className="h-full overflow-y-auto space-y-1 relative z-0 pr-2 pb-10 custom-scrollbar"
             >
                {logs.map((log, i) => (
                    <div key={i} className="text-green-500/90 break-words">
                        <span className="text-slate-600 mr-2">$</span>
                        {log}
                    </div>
                ))}
                <div className="animate-pulse text-green-400">_</div>
             </div>
        </div>
    </div>
  );
};

export default ExecutionConsole;