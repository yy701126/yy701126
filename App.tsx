import React, { useState } from 'react';
import Background from './components/Background';
import Hero from './components/Hero';
import UploadZone from './components/UploadZone';
import AlgorithmSelector from './components/AlgorithmSelector';
import ExecutionConsole from './components/ExecutionConsole';
import ResultsGallery from './components/ResultsGallery';
import { AppPhase, Algorithm } from './types';

const App: React.FC = () => {
  const [phase, setPhase] = useState<AppPhase>(AppPhase.INTRO);
  const [selectedAlgo, setSelectedAlgo] = useState<Algorithm | null>(null);

  const startJourney = () => {
    setPhase(AppPhase.UPLOAD);
  };

  const handleUploadComplete = () => {
    setPhase(AppPhase.SELECT_ALGO);
  };

  const handleAlgoSelect = (algo: Algorithm) => {
    setSelectedAlgo(algo);
    setPhase(AppPhase.EXECUTING);
  };

  const handleExecutionComplete = () => {
    setPhase(AppPhase.RESULTS);
  };

  const resetApp = () => {
    setSelectedAlgo(null);
    setPhase(AppPhase.UPLOAD);
  };

  return (
    <div className="relative min-h-screen text-slate-100 selection:bg-cyan-500/30">
      <Background />
      
      {/* Header / Nav (Static) */}
      <nav className="fixed top-0 left-0 w-full z-50 px-8 py-6 flex justify-between items-center pointer-events-none">
        <div className="text-xl font-bold tracking-widest brand-font text-white/50">DATA.ALCH</div>
        <div className="text-xs font-mono text-cyan-500/50 border border-cyan-900/30 px-2 py-1 rounded">
          STATUS: {phase === AppPhase.EXECUTING ? 'COMPUTING' : 'ONLINE'}
        </div>
      </nav>

      {/* Main Content Area */}
      <main className="relative z-10 min-h-screen flex flex-col justify-center pt-20">
        {phase === AppPhase.INTRO && (
            <Hero onStart={startJourney} />
        )}

        {phase === AppPhase.UPLOAD && (
            <UploadZone onUploadComplete={handleUploadComplete} />
        )}

        {phase === AppPhase.SELECT_ALGO && (
            <AlgorithmSelector onSelect={handleAlgoSelect} />
        )}

        {phase === AppPhase.EXECUTING && (
            <ExecutionConsole onComplete={handleExecutionComplete} />
        )}

        {phase === AppPhase.RESULTS && selectedAlgo && (
            <ResultsGallery algorithm={selectedAlgo} onReset={resetApp} />
        )}
      </main>

      {/* Footer decoration */}
      <div className="fixed bottom-0 left-0 w-full p-4 text-center text-[10px] text-slate-700 font-mono pointer-events-none z-0">
        SYS.VER.2.0.4 // RUNTIME: REACT // ENGINE: FASTAPI_MOCK
      </div>
    </div>
  );
};

export default App;