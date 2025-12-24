
import React, { useState, useEffect } from 'react';
import GrainOverlay from './components/GrainOverlay';
import Header from './components/Header';
import Instructions from './components/Instructions';
import UploadZone from './components/UploadZone';
import AnalysisPanel from './components/AnalysisPanel';
import Visualizations from './components/Visualizations';
import { analyzeMusicTaste } from './services/geminiService';
import { AnalysisResult, TrackData } from './types';

const App: React.FC = () => {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [mouseOffset, setMouseOffset] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMouseOffset({
        x: (e.clientX - window.innerWidth / 2) * 0.005,
        y: (e.clientY - window.innerHeight / 2) * 0.005,
      });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const handleFileSelect = async (file: File) => {
    setIsAnalyzing(true);
    setResult(null);
    try {
      const text = await file.text();
      let tracks: TrackData[] = [];

      if (file.name.endsWith('.json')) {
        try {
          const parsed = JSON.parse(text);
          tracks = Array.isArray(parsed) ? parsed : (parsed.items || []);
        } catch (e) {
          throw new Error("Invalid JSON structure.");
        }
      } else if (file.name.endsWith('.csv')) {
        const lines = text.split('\n');
        tracks = lines.slice(1).map(line => {
          const parts = line.split(',');
          return { artistName: parts[0], trackName: parts[1] };
        });
      }

      if (tracks.length === 0) {
        throw new Error("No track data found in the file.");
      }

      const analysis = await analyzeMusicTaste(tracks);
      setResult(analysis);
    } catch (error: any) {
      alert(error.message || "Signal processing failed. Check your input format.");
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="min-h-screen relative selection:bg-terracotta selection:text-white">
      <GrainOverlay />
      
      <div 
        className="strata-bg" 
        style={{ transform: `translate(${mouseOffset.x}px, ${mouseOffset.y}px) scale(1.05)` }}
      ></div>

      <main className="container mx-auto max-w-[1100px] px-8 py-12 md:py-24">
        <Header />

        <Instructions />

        <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-12 lg:gap-20 items-stretch">
          <UploadZone onFileSelect={handleFileSelect} isAnalyzing={isAnalyzing} />
          <AnalysisPanel result={result} isAnalyzing={isAnalyzing} />
        </div>

        <Visualizations result={result} isAnalyzing={isAnalyzing} />

        <footer className="mt-32 pb-12 border-t border-sand border-opacity-5 pt-8 flex justify-between items-center text-[0.6rem] font-mono uppercase tracking-[0.2em] opacity-30">
          <span>&copy; 2025 Taste Classifier</span>
          <span>Powered by Gemini 3 Neural Processing</span>
        </footer>
      </main>
    </div>
  );
};

export default App;
