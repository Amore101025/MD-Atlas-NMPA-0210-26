import React, { useState, useEffect } from 'react';
import { Hero } from './components/Hero';
import { WhatHasChanged } from './components/WhatHasChanged';
import { InPractice } from './components/InPractice';
import { FollowUpQuestions } from './components/FollowUpQuestions';
import { Footer } from './components/Footer';
import { StyleJackpot } from './components/StyleJackpot';
import { AINoteKeeper } from './components/AINoteKeeper';
import { Menu, X, Moon, Sun, Languages } from 'lucide-react';
import { PainterStyle, ThemeMode, Language } from './types';
import { PAINTER_STYLES, TRANSLATIONS } from './constants';

const App: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  
  // Theme State
  const [themeMode, setThemeMode] = useState<ThemeMode>('light');
  const [language, setLanguage] = useState<Language>('en');
  const [painterStyle, setPainterStyle] = useState<PainterStyle>(PAINTER_STYLES[0]);

  const t = TRANSLATIONS[language];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Update body class for dark mode
  useEffect(() => {
    if (themeMode === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [themeMode]);

  const navLinks = [
    { name: t.nav.overview, href: '#overview' },
    { name: t.nav.changes, href: '#changes' },
    { name: t.nav.practice, href: '#practice' },
    { name: t.nav.checklist, href: '#questions' },
    { name: t.nav.noteKeeper, href: '#ai-note-keeper' },
  ];

  return (
    <div 
      className={`min-h-screen flex flex-col font-sans transition-all duration-700 ease-in-out`}
      style={{ 
        background: painterStyle.background,
        color: painterStyle.textColor,
        fontFamily: painterStyle.font || 'inherit'
      }}
    >
      {/* Dynamic Background Overlay for readability if needed */}
      <div className="fixed inset-0 pointer-events-none z-0 mix-blend-overlay opacity-20 bg-noise"></div>

      {/* Sticky Navigation */}
      <nav 
        className={`fixed w-full z-50 transition-all duration-300 border-b border-transparent ${
          scrolled ? 'backdrop-blur-md shadow-md py-2 border-white/20' : 'bg-transparent py-4'
        }`}
        style={{ 
          backgroundColor: scrolled ? painterStyle.cardBg : 'transparent',
          color: painterStyle.textColor 
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <span className="text-2xl font-bold tracking-tighter drop-shadow-sm">
              Reg<span style={{ color: painterStyle.accentColor }}>China</span>
            </span>
            <div className="hidden md:block h-6 w-px bg-current opacity-30 mx-4"></div>
            {/* Desktop Jackpot */}
            <div className="hidden lg:block">
              <StyleJackpot onStyleSelect={setPainterStyle} currentStyle={painterStyle} lang={language} />
            </div>
          </div>
          
          <div className="flex items-center space-x-6">
             {/* Desktop Nav */}
            <div className="hidden md:flex space-x-6">
              {navLinks.map((link) => (
                <a 
                  key={link.name} 
                  href={link.href} 
                  className="text-sm font-medium hover:opacity-70 transition-opacity"
                  style={{ color: painterStyle.textColor }}
                >
                  {link.name}
                </a>
              ))}
            </div>

            {/* Controls */}
            <div className="flex items-center space-x-3">
               <button 
                 onClick={() => setLanguage(l => l === 'en' ? 'zh' : 'en')}
                 className="p-2 rounded-full hover:bg-black/10 transition-colors"
                 title="Switch Language"
               >
                 <Languages className="w-5 h-5" />
               </button>
               <button 
                 onClick={() => setThemeMode(m => m === 'light' ? 'dark' : 'light')}
                 className="p-2 rounded-full hover:bg-black/10 transition-colors"
               >
                 {themeMode === 'light' ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
               </button>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
                {isMenuOpen ? <X /> : <Menu />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Nav Dropdown */}
        {isMenuOpen && (
          <div 
             className="md:hidden shadow-xl absolute w-full top-full left-0 border-t border-white/20 backdrop-blur-xl"
             style={{ backgroundColor: painterStyle.cardBg }}
          >
            <div className="px-4 pt-2 pb-6 space-y-1">
              <div className="py-2 flex justify-center">
                 <StyleJackpot onStyleSelect={setPainterStyle} currentStyle={painterStyle} lang={language} />
              </div>
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsMenuOpen(false)}
                  className="block px-3 py-3 rounded-md text-base font-medium hover:bg-black/5"
                  style={{ color: painterStyle.textColor }}
                >
                  {link.name}
                </a>
              ))}
            </div>
          </div>
        )}
      </nav>

      <main className="flex-grow z-10 relative">
        <div id="overview" className="relative">
           {/* Modify Hero to accept style props via context or prop drilling if needed, but for now we rely on CSS inheritance or wrapper */}
           <div className="pt-20">
             <Hero />
           </div>
        </div>
        
        {/* We wrap existing components in container divs that apply the cardBg style to blend them with the painter theme */}
        <div style={{ backgroundColor: painterStyle.cardBg }} className="backdrop-blur-sm transition-colors duration-700">
          <WhatHasChanged />
        </div>
        
        <div style={{ backgroundColor: 'rgba(255,255,255,0.3)' }} className="backdrop-blur-md transition-colors duration-700">
           <InPractice />
        </div>

        <AINoteKeeper style={painterStyle} lang={language} />

        <div style={{ backgroundColor: painterStyle.cardBg }} className="backdrop-blur-sm transition-colors duration-700">
          <FollowUpQuestions />
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default App;