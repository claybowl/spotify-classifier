
import React from 'react';
import { AnalysisResult } from '../types';

interface VisualizationsProps {
  result: AnalysisResult | null;
  isAnalyzing: boolean;
}

const Visualizations: React.FC<VisualizationsProps> = ({ result, isAnalyzing }) => {
  if (!result && !isAnalyzing) return null;

  return (
    <section className={`mt-24 space-y-16 transition-all duration-1000 ${isAnalyzing ? 'opacity-20 pointer-events-none' : 'opacity-100'}`}>
      <div className="h-[1px] bg-sand opacity-5 w-full"></div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
        {/* Genre Breakdown */}
        <div>
          <h3 className="font-mono text-[0.65rem] uppercase tracking-[0.3em] text-terracotta mb-8">Genre Distribution</h3>
          <div className="space-y-6">
            {(result?.genres || []).map((genre, idx) => (
              <div key={idx} className="group">
                <div className="flex justify-between text-[0.7rem] font-mono uppercase mb-2 opacity-60">
                  <span>{genre.name}</span>
                  <span>{genre.percentage}%</span>
                </div>
                <div className="h-1 bg-slate-800 w-full rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-sand transition-all duration-[1.5s] ease-out"
                    style={{ width: `${genre.percentage}%`, transitionDelay: `${idx * 0.1}s` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Mood Matrix */}
        <div>
          <h3 className="font-mono text-[0.65rem] uppercase tracking-[0.3em] text-terracotta mb-8">Emotional Signal</h3>
          <div className="grid grid-cols-2 gap-4">
            {(result?.moods || []).map((mood, idx) => (
              <div key={idx} className="bg-slate-800 p-6 border border-sand border-opacity-5 relative overflow-hidden group">
                <div className="relative z-10">
                  <span className="block font-mono text-[0.6rem] uppercase opacity-40 mb-1">{mood.label}</span>
                  <span className="text-2xl font-black text-sand">{mood.value}%</span>
                </div>
                <div 
                  className="absolute bottom-0 left-0 h-1 bg-terracotta opacity-40 transition-all duration-[2s]"
                  style={{ width: `${mood.value}%` }}
                ></div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Advanced Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-8">
        <div className="border border-sand border-opacity-10 p-8 text-center flex flex-col items-center">
          <span className="font-mono text-[0.65rem] uppercase tracking-widest opacity-40 mb-4">Complexity Quotient</span>
          <div className="text-6xl font-black text-terracotta leading-none mb-2">{result?.complexityScore || 0}</div>
          <p className="text-[0.6rem] font-mono uppercase opacity-30 tracking-tighter">Harmonic & Structural Diversity Index</p>
        </div>
        <div className="border border-sand border-opacity-10 p-8 text-center flex flex-col items-center">
          <span className="font-mono text-[0.65rem] uppercase tracking-widest opacity-40 mb-4">Uniqueness Threshold</span>
          <div className="text-6xl font-black text-sand leading-none mb-2">{result?.uniquenessScore || 0}</div>
          <p className="text-[0.6rem] font-mono uppercase opacity-30 tracking-tighter">Market Rarity vs. Mainstream Centroid</p>
        </div>
      </div>
    </section>
  );
};

export default Visualizations;
