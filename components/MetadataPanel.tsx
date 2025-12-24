
import React from 'react';
import { AnalysisResult } from '../types';

interface MetadataPanelProps {
  result: AnalysisResult | null;
  isAnalyzing: boolean;
}

const MetadataPanel: React.FC<MetadataPanelProps> = ({ result, isAnalyzing }) => {
  const rows = [
    { label: 'Analysis Depth', value: result?.depth || '---- Meters' },
    { label: 'Engine', value: result?.engine || '----' },
    { label: 'Temporal Drift', value: result?.temporalDrift || '----ms' },
    { label: 'Mineral Density', value: result?.mineralDensity || '----%' },
  ];

  return (
    <div className="font-mono">
      {rows.map((row, idx) => (
        <div key={idx} className="flex justify-between py-4 border-b border-[rgba(232,213,181,0.15)] text-[0.85rem]">
          <span className="text-[rgba(232,213,181,0.5)] uppercase">{row.label}</span>
          <span className="text-sand">{row.value}</span>
        </div>
      ))}

      <div 
        className="mt-10 bg-terracotta text-slate-900 p-8 transition-all duration-700"
        style={{ clipPath: 'polygon(0 0, 100% 0, 95% 100%, 0% 100%)' }}
      >
        <h3 className="text-[0.7rem] uppercase tracking-widest mb-2 font-bold">Classification Result</h3>
        <div className={`font-sans font-black text-3xl md:text-4xl uppercase transition-opacity duration-300 ${isAnalyzing ? 'opacity-30' : 'opacity-100'}`}>
          {isAnalyzing ? 'Analyzing...' : (result?.classification || 'Organic Sludge')}
        </div>
      </div>

      <div className="mt-8 text-[0.8rem] md:text-[0.85rem] leading-relaxed opacity-80 text-sand italic">
        {result?.description || 'Awaiting initial core sample for tectonic stratification analysis. Please deposit music history data.'}
      </div>
    </div>
  );
};

export default MetadataPanel;
