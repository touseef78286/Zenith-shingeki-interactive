
import React, { useState, useRef } from 'react';
import { MousePosition } from '../types';
import { JAPANESE_TEXT, WingsOfFreedom } from '../constants';
import InfoBox from './InfoBox';

const HeroSection: React.FC = () => {
  const [mousePos, setMousePos] = useState<MousePosition>({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      setMousePos({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
    }
  };

  const topImage = "https://images.unsplash.com/photo-1542273917363-3b1817f69a2d?auto=format&fit=crop&q=80&w=2000"; 
  const bottomImage = "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&q=80&w=2000";

  const fireColors = ['#ef4444', '#f97316', '#facc15', '#fb923c', '#dc2626'];

  return (
    <div 
      ref={containerRef}
      className="relative w-full h-screen overflow-hidden bg-black cursor-none"
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <style>{`
        @keyframes rise {
          0% { transform: translateY(0) scale(var(--scale-start)) rotate(0deg); opacity: 0; }
          10% { opacity: 0.9; }
          50% { transform: translateY(-40vh) translateX(var(--jitter)) scale(var(--scale-mid)) rotate(180deg); }
          100% { transform: translateY(-90vh) translateX(0) scale(0) rotate(360deg); opacity: 0; }
        }
        @keyframes rim-flicker {
          0%, 100% { transform: scale(1); opacity: 0.6; }
          50% { transform: scale(1.05); opacity: 1; }
        }
        .fire-particle {
          animation: rise var(--duration) ease-in infinite;
          animation-delay: var(--delay);
        }
        .reveal-mask {
          clip-path: circle(${isHovering ? '100px' : '0px'} at ${mousePos.x}px ${mousePos.y}px);
          transition: clip-path 0.15s cubic-bezier(0.19, 1, 0.22, 1);
        }
        .fire-rim {
          position: absolute;
          width: 220px;
          height: 220px;
          border-radius: 50%;
          background: radial-gradient(circle, transparent 90px, rgba(239, 68, 68, 0.3) 105px, rgba(249, 115, 22, 0.1) 115px, transparent 130px);
          filter: blur(8px);
          pointer-events: none;
          z-index: 3;
          animation: rim-flicker 0.15s infinite;
          transform: translate(-50%, -50%);
          left: ${mousePos.x}px;
          top: ${mousePos.y}px;
          opacity: ${isHovering ? 1 : 0};
          transition: opacity 0.3s ease;
        }
      `}</style>

      {/* 1. Base Layer: Human Layer (Background) */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ 
          backgroundImage: `linear-gradient(rgba(0,0,0,0.1), rgba(0,0,0,0.3)), url(${topImage})`,
          zIndex: 1
        }}
      >
        <div className="absolute inset-0 bg-black/10 backdrop-blur-[0.2px]"></div>
      </div>

      {/* 2. Revealed Layer: Titan Layer */}
      <div 
        className="absolute inset-0 bg-cover bg-center reveal-mask"
        style={{ 
          backgroundImage: `linear-gradient(rgba(100,0,0,0.4), rgba(0,0,0,0.9)), url(${bottomImage})`,
          zIndex: 2,
          filter: isHovering ? 'contrast(1.25) brightness(1.1) saturate(1.35)' : 'none'
        }}
      >
        {/* Fire Particles within the reveal zone */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {isHovering && [...Array(30)].map((_, i) => {
            const size = 1.2 + Math.random() * 3;
            const color = fireColors[Math.floor(Math.random() * fireColors.length)];
            return (
              <div 
                key={`fire-${i}`}
                className="fire-particle absolute rounded-sm"
                style={{
                  '--duration': `${1.2 + Math.random() * 1.8}s`,
                  '--delay': `${-Math.random() * 5}s`,
                  '--scale-start': 1,
                  '--scale-mid': 1.3,
                  '--jitter': `${Math.random() * 40 - 20}px`,
                  backgroundColor: color,
                  boxShadow: `0 0 8px ${color}`,
                  width: `${size}px`,
                  height: `${size}px`,
                  left: `calc(${mousePos.x}px + ${Math.random() * 180 - 90}px)`,
                  top: `calc(${mousePos.y}px + ${80 + Math.random() * 70}px)`,
                } as React.CSSProperties}
              />
            );
          })}
        </div>
      </div>

      {/* 3. Refined Fire Rim Glow */}
      <div className="fire-rim"></div>

      {/* 4. UI Layer */}
      <div className="absolute inset-0 z-10 pointer-events-none">
        
        {/* Branding Title */}
        <div className="absolute left-10 top-10 flex items-center gap-6">
            <div className="bg-black/95 px-8 py-3 border-l-8 border-red-700 shadow-2xl">
               <span className="text-white text-4xl font-black italic tracking-tighter uppercase select-none">Attack on Titan</span>
            </div>
            <div className="japanese-vertical text-white/40 text-[11px] tracking-widest leading-none">
              進撃の巨人
            </div>
        </div>

        {/* Center-Left Content */}
        <div className="absolute left-16 top-1/2 -translate-y-1/2 space-y-12">
           <div className="animate-float opacity-80">
             <WingsOfFreedom />
           </div>
           <div className="space-y-4">
              <div className="text-white text-6xl font-black tracking-tight drop-shadow-[0_4px_10px_rgba(0,0,0,0.8)]">立体機動装</div>
              <div className="text-white text-6xl font-black tracking-tight drop-shadow-[0_4px_10px_rgba(0,0,0,0.8)]">置の機構</div>
              <div className="w-40 h-1.5 bg-red-600/60 rounded-full mt-4"></div>
           </div>
        </div>

        {/* Bottom Left Status */}
        <div className="absolute bottom-12 left-12">
           <div className="bg-black/40 border border-white/10 px-3 py-0.5 inline-block mb-3 backdrop-blur-sm">
              <span className="text-white/40 text-[9px] font-mono tracking-[0.5em] uppercase">Intelligence Sector 4 // Status: Normal</span>
           </div>
           <div className="text-white text-7xl font-black tracking-tighter uppercase drop-shadow-2xl select-none">
             {JAPANESE_TEXT.eren}
           </div>
        </div>

        {/* Vertical Motto */}
        <div className="absolute right-12 top-1/2 -translate-y-1/2 japanese-vertical text-white/5 text-2xl font-black tracking-[1.5em] select-none">
          {JAPANESE_TEXT.motto}
        </div>
      </div>

      {/* Interactive InfoBox */}
      <div className="pointer-events-auto">
        <InfoBox />
      </div>

      {/* Aesthetic Navigation */}
      <nav className="absolute top-10 left-1/2 -translate-x-1/2 z-50 flex gap-12 pointer-events-auto">
         {['The Walls', 'Intelligence', 'History', 'Archives'].map(item => (
           <a 
             key={item} 
             href="#" 
             className="text-white/30 hover:text-white uppercase text-[10px] tracking-[0.4em] font-black transition-all duration-300 hover:scale-110"
           >
             {item}
           </a>
         ))}
      </nav>
      
      {/* Heavy Cinematic Vignette */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,transparent_25%,rgba(0,0,0,0.85)_100%)] z-[5]"></div>

      {/* Subtle Dust Particles */}
      <div className="absolute inset-0 pointer-events-none opacity-20 z-[6]">
          {[...Array(20)].map((_, i) => (
            <div 
              key={i}
              className="absolute bg-white/40 rounded-full blur-[1.5px] animate-pulse"
              style={{
                width: Math.random() * 2.5 + 'px',
                height: Math.random() * 2.5 + 'px',
                top: Math.random() * 100 + '%',
                left: Math.random() * 100 + '%',
                animationDuration: 3 + Math.random() * 5 + 's',
                animationDelay: Math.random() * 8 + 's'
              }}
            />
          ))}
      </div>
    </div>
  );
};

export default HeroSection;
