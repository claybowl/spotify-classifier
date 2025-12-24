
import React, { useRef } from 'react';

interface CoreSampleProps {
  onFileSelect: (file: File) => void;
  isAnalyzing: boolean;
}

const CoreSample: React.FC<CoreSampleProps> = ({ onFileSelect, isAnalyzing }) => {
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
      className={`bg-slate-800 border border-[rgba(232,213,181,0.15)] p-10 md:p-14 relative overflow-hidden transition-all duration-500 cursor-pointer group 
        ${isAnalyzing ? 'opacity-50 cursor-wait' : 'hover:border-ochre hover:-translate-y-1'}`}
    >
      <div className="absolute top-0 left-0 w-1 h-full bg-terracotta"></div>
      
      <span className="font-mono text-xl mb-8 block text-sand">
        {isAnalyzing ? 'Drilling Core Sample...' : 'Extract Core Sample'}
      </span>
      
      <p className="mb-10 opacity-70 max-w-[400px] text-sm leading-relaxed">
        Deposit audio features or dataset shards here to perform deep shale classification. 
        Our model drills through temporal layers to find the bedrock of your aesthetic identity.
      </p>

      <div className="flex flex-col gap-3">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="h-2 bg-shale w-full rounded-sm relative overflow-hidden">
            <div 
              className={`absolute left-0 top-0 h-full bg-ochre transition-all duration-1000 ease-out 
                ${isAnalyzing ? 'w-full animate-pulse' : 'w-0 group-hover:w-[var(--w)]'}`}
              style={{ 
                '--w': `${[80, 45, 95, 30, 70, 55][i]}%`,
                transitionDelay: `${i * 0.1}s` 
              } as React.CSSProperties}
            ></div>
          </div>
        ))}
      </div>

      <div className="mt-10 font-mono text-[0.7rem] opacity-50 uppercase tracking-widest">
        SUPPORTED_FORMATS: [.JSON, .CSV]
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

export default CoreSample;
