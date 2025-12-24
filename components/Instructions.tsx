
import React from 'react';

const Instructions: React.FC = () => {
  return (
    <section className="mb-12 animate-reveal" style={{ animationDelay: '0.6s' }}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 border-l border-sand border-opacity-10 pl-8">
        <div>
          <h2 className="font-mono text-xs uppercase tracking-[0.3em] text-terracotta mb-4">Input Protocol</h2>
          <p className="text-sm opacity-70 leading-relaxed max-w-md">
            Upload your Spotify <strong>StreamingHistory.json</strong>. This file contains the raw sequence of your listening habits, allowing our model to map your musical identity.
          </p>
        </div>
        <div>
          <h2 className="font-mono text-xs uppercase tracking-[0.3em] text-terracotta mb-4">The Analysis</h2>
          <p className="text-sm opacity-70 leading-relaxed max-w-md">
            Gemini 3 processes the rhythmic, harmonic, and cultural context of your artists to build a high-fidelity representation of your aesthetic profile.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Instructions;
