import React, { useState, useEffect } from 'react';
import { ChevronRight } from 'lucide-react';

interface HeroProps {
  onStart: () => void;
}

const Hero: React.FC<HeroProps> = ({ onStart }) => {
  const [text, setText] = useState('');
  const fullText = "I make data speak. Turning raw numbers into golden insights.";

  useEffect(() => {
    let index = 0;
    const timer = setInterval(() => {
      setText(fullText.slice(0, index));
      index++;
      if (index > fullText.length) {
        clearInterval(timer);
      }
    }, 50);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center px-4 relative z-10">
      <div className="mb-6 relative">
        <h1 className="text-6xl md:text-8xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-violet-400 to-cyan-400 animate-pulse">
          DATA ALCHEMIST
        </h1>
        <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 to-violet-600 rounded-lg blur opacity-20 group-hover:opacity-40 transition duration-1000 group-hover:duration-200"></div>
      </div>
      
      <p className="text-xl md:text-2xl font-mono text-slate-400 h-16 max-w-2xl mx-auto">
        {text}
        <span className="animate-blink text-cyan-400">|</span>
      </p>

      <button
        onClick={onStart}
        className="mt-12 group relative px-8 py-4 bg-transparent overflow-hidden rounded-none border border-cyan-500/50 hover:border-cyan-400 transition-all duration-300"
      >
        <div className="absolute inset-0 w-0 bg-cyan-500/10 transition-all duration-[250ms] ease-out group-hover:w-full opacity-0 group-hover:opacity-100"></div>
        <span className="relative flex items-center gap-2 text-cyan-400 font-bold tracking-widest uppercase">
          Enter The Lab <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </span>
      </button>
    </div>
  );
};

export default Hero;