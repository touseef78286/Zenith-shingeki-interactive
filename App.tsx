
import React from 'react';
import HeroSection from './components/HeroSection';

const App: React.FC = () => {
  return (
    <main className="min-h-screen bg-[#0a0a0a] overflow-hidden">
      {/* We use a single high-fidelity section for the landing page hero */}
      <HeroSection />
      
      {/* Subtle overlay for film grain or vignette */}
      <div className="fixed inset-0 pointer-events-none z-[999] opacity-[0.03] bg-[url('https://www.transparenttextures.com/patterns/pinstriped-suit.png')]"></div>
    </main>
  );
};

export default App;
