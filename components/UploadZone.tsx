import React, { useState, useCallback } from 'react';
import { UploadCloud, FileSpreadsheet, CheckCircle } from 'lucide-react';

interface UploadZoneProps {
  onUploadComplete: () => void;
}

const UploadZone: React.FC<UploadZoneProps> = ({ onUploadComplete }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [scanning, setScanning] = useState(false);

  const handleDragEnter = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  }, []);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const processFile = useCallback((file: File) => {
    setFile(file);
    setScanning(true);
    // Simulate scanning delay
    setTimeout(() => {
      setScanning(false);
      setTimeout(onUploadComplete, 800);
    }, 2000);
  }, [onUploadComplete]);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
        processFile(e.dataTransfer.files[0]);
    }
  }, [processFile]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      processFile(e.target.files[0]);
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto p-8 animate-fade-in-up">
        <h2 className="text-3xl font-bold mb-8 text-center text-slate-200 brand-font">
            <span className="text-cyan-400">01.</span> INGEST DATA
        </h2>
        
        <div
            className={`
                relative h-96 rounded-xl border-2 border-dashed transition-all duration-500 flex flex-col items-center justify-center cursor-pointer overflow-hidden glass-panel
                ${isDragging ? 'border-cyan-400 scale-[1.02] shadow-[0_0_30px_rgba(34,211,238,0.2)]' : 'border-slate-700 hover:border-slate-500'}
                ${scanning ? 'border-solid border-violet-500' : ''}
            `}
            onDragEnter={handleDragEnter}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={() => document.getElementById('fileInput')?.click()}
        >
            <input 
                type="file" 
                id="fileInput" 
                className="hidden" 
                onChange={handleInputChange} 
                accept=".csv,.json,.parquet"
            />

            {/* Scanning Line Animation */}
            {scanning && (
                <div className="absolute inset-0 z-0 bg-violet-500/5 animate-pulse">
                    <div className="absolute top-0 left-0 w-full h-1 bg-violet-400 shadow-[0_0_15px_rgba(167,139,250,0.8)] animate-[scan_2s_ease-in-out_infinite]" 
                         style={{ animation: 'scan 1.5s linear infinite' }} />
                </div>
            )}

            <div className="z-10 text-center space-y-4">
                {scanning ? (
                    <>
                        <FileSpreadsheet className="w-20 h-20 mx-auto text-violet-400 animate-bounce" />
                        <div className="text-xl font-mono text-violet-300">SCANNING STRUCTURE...</div>
                        <div className="text-xs text-slate-400">Detecting Types: INT64, FLOAT, DATETIME</div>
                    </>
                ) : file ? (
                    <>
                         <CheckCircle className="w-20 h-20 mx-auto text-green-400" />
                         <div className="text-xl font-bold text-green-400">UPLOAD COMPLETE</div>
                         <div className="text-slate-400">{file.name}</div>
                    </>
                ) : (
                    <>
                        <UploadCloud className={`w-24 h-24 mx-auto mb-4 transition-colors ${isDragging ? 'text-cyan-400' : 'text-slate-500'}`} />
                        <p className="text-xl font-semibold text-slate-300">
                            Drag & Drop Data Source
                        </p>
                        <p className="text-sm text-slate-500">
                            Supported: CSV, JSON, PARQUET
                        </p>
                    </>
                )}
            </div>
            
            <style>{`
                @keyframes scan {
                    0% { top: 0%; opacity: 0; }
                    10% { opacity: 1; }
                    90% { opacity: 1; }
                    100% { top: 100%; opacity: 0; }
                }
            `}</style>
        </div>
    </div>
  );
};

export default UploadZone;