
import React, { useRef } from 'react';

interface UploadZoneProps {
  onFileSelect: (file: File) => void;
  isAnalyzing: boolean;
}

const UploadZone: React.FC<UploadZoneProps> = ({ onFileSelect, isAnalyzing }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    if (!isAnalyzing) {
      fileInputRef.current?.click();
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onFileSelect(file);
    }
  };

  return (
    <div 
      onClick={handleClick}
      className={`bg-slate-800 border border-sand border-opacity-10 p-10 md:p-12 relative overflow-hidden transition-all duration-500 cursor-pointer group 
        ${isAnalyzing ? 'opacity-50 cursor-wait' : 'hover:border-terracotta hover:-translate-y-1'}`}
    >
      <div className="absolute top-0 right-0 p-4 font-mono text-[0.6rem] opacity-20 uppercase tracking-widest">
        Buffer: 1024KB
      </div>
      
      <span className="font-mono text-xl mb-6 block text-sand tracking-tight">
        {isAnalyzing ? 'Processing Audio Data...' : 'Import Data Stream'}
      </span>
      
      <p className="mb-10 opacity-60 text-sm leading-relaxed max-w-[380px]">
        Drop your streaming history artifacts here. Our neural engine will isolate the primary motifs and latent variables that define your taste.
      </p>

      <div className="flex gap-1 h-12 items-end mb-8">
        {[...Array(12)].map((_, i) => (
          <div 
            key={i} 
            className={`w-full bg-terracotta opacity-20 transition-all duration-300 ${isAnalyzing ? 'animate-bounce' : 'group-hover:opacity-60'}`}
            style={{ 
              height: `${[40, 70, 30, 90, 50, 80, 20, 60, 45, 85, 35, 75][i]}%`,
              animationDelay: `${i * 0.05}s`
            }}
          ></div>
        ))}
      </div>

      <div className="font-mono text-[0.65rem] opacity-40 uppercase tracking-[0.2em]">
        Formats: JSON, CSV
      </div>

      <input 
        type="file" 
        ref={fileInputRef} 
        className="hidden" 
        accept=".json,.csv"
        onChange={handleChange}
      />
    </div>
  );
};

export default UploadZone;
