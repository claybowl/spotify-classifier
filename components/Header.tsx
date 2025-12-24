
import React, { useEffect, useState } from 'react';

const Header: React.FC = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({
        x: (e.clientX - window.innerWidth / 2) * 0.01,
        y: (e.clientY - window.innerHeight / 2) * 0.01,
      });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <header className="mb-16 md:mb-24 relative">
      <span className="font-mono uppercase tracking-[0.4em] text-[0.7rem] text-terracotta mb-4 block animate-reveal" style={{ animationDelay: '0.1s' }}>
        Neural Audio Intelligence v2.0
      </span>
      <h1 
        className="font-black text-[clamp(2.5rem,8vw,6rem)] leading-[0.9] tracking-tight uppercase text-sand animate-reveal"
        style={{ 
          animationDelay: '0.3s',
          textShadow: `${mousePos.x * -1}px ${mousePos.y * -1}px 0px rgba(214, 104, 71, 0.15)`
        }}
      >
        Taste<br />Classifier
      </h1>
      <div className="h-[1px] bg-sand opacity-10 w-full my-8 animate-line" style={{ animationDelay: '0.5s' }}></div>
    </header>
  );
};

export default Header;
