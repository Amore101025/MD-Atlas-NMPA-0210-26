import React, { useState } from 'react';
import { Palette, Shuffle } from 'lucide-react';
import { PainterStyle } from '../types';
import { PAINTER_STYLES, TRANSLATIONS } from '../constants';

interface StyleJackpotProps {
  onStyleSelect: (style: PainterStyle) => void;
  currentStyle: PainterStyle;
  lang: 'en' | 'zh';
}

export const StyleJackpot: React.FC<StyleJackpotProps> = ({ onStyleSelect, currentStyle, lang }) => {
  const [isSpinning, setIsSpinning] = useState(false);

  const handleJackpot = () => {
    setIsSpinning(true);
    let duration = 2000; // 2 seconds spin
    let interval = 100;
    let elapsed = 0;

    const spin = setInterval(() => {
      const randomStyle = PAINTER_STYLES[Math.floor(Math.random() * PAINTER_STYLES.length)];
      onStyleSelect(randomStyle);
      elapsed += interval;
      
      if (elapsed >= duration) {
        clearInterval(spin);
        setIsSpinning(false);
      }
    }, interval);
  };

  return (
    <div className="flex items-center space-x-4 bg-white/20 backdrop-blur-md p-2 rounded-full border border-white/30">
      <div className="hidden md:flex flex-col px-2">
        <span className="text-xs font-bold uppercase tracking-widest opacity-80" style={{ color: currentStyle.textColor }}>
          {TRANSLATIONS[lang].jackpot}
        </span>
        <span className="text-sm font-bold truncate max-w-[100px]" style={{ color: currentStyle.accentColor }}>
          {currentStyle.name}
        </span>
      </div>
      
      <button 
        onClick={handleJackpot}
        disabled={isSpinning}
        className={`relative p-3 rounded-full shadow-lg transition-transform transform active:scale-95 ${isSpinning ? 'animate-pulse' : 'hover:rotate-12'}`}
        style={{ 
          backgroundColor: currentStyle.accentColor, 
          color: currentStyle.id === 'default' ? '#fff' : currentStyle.textColor 
        }}
        title="Spin for a new style!"
      >
        {isSpinning ? <Shuffle className="w-5 h-5 animate-spin" /> : <Palette className="w-5 h-5" />}
      </button>
    </div>
  );
};