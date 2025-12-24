
import React from 'react';
import { AnalysisResult } from '../types';

interface AnalysisPanelProps {
  result: AnalysisResult | null;
  isAnalyzing: boolean;
}

const AnalysisPanel: React.FC<AnalysisPanelProps> = ({ result, isAnalyzing }) => {
  return (
    <div className="flex flex-col h-full">
      <div className="flex-grow">
        <h2 className="font-mono text-[0.65rem] uppercase tracking-[0.3em] text-terracotta mb-6">Profile Classification</h2>
        <div className={`transition-all duration-700 ${isAnalyzing ? 'opacity-30 blur-sm' : 'opacity-100'}`}>
          <div className="text-4xl md:text-5xl font-black uppercase text-sand tracking-tighter mb-6 leading-none">
            {result?.classification || "Neutral Signal"}
          </div>
          
          <div className="space-y-4 mb-8">
            <p className="text-sm leading-relaxed opacity-80 text-sand italic border-l-2 border-terracotta pl-4">
              {result?.summary || "Awaiting data input to generate comprehensive behavioral analysis and acoustic profile."}
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            {(result?.vibeKeywords || ["Awaiting", "Input", "Data"]).map((tag, idx) => (
              <span key={idx} className="bg-slate-800 border border-sand border-opacity-10 px-3 py-1 text-[0.6rem] font-mono uppercase tracking-widest text-sand opacity-60">
                #{tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalysisPanel;
