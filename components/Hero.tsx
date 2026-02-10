import React from 'react';
import { Activity, ShieldCheck, Globe, FileText } from 'lucide-react';

export const Hero: React.FC = () => {
  return (
    <div className="relative text-white overflow-hidden py-10">
      {/* We removed the hardcoded bg-nmpa-800 to let the Painter style show through, adding a dark gradient for text readability */}
      <div className="absolute inset-0 bg-gradient-to-br from-black/60 to-transparent pointer-events-none"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-16 md:pt-20 md:pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="z-10">
            <div className="inline-flex items-center space-x-2 bg-white/10 rounded-full px-4 py-1.5 mb-6 backdrop-blur-md border border-white/20 shadow-lg">
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>
              <span className="text-sm font-medium text-white uppercase tracking-wider">Based on Order No. 739</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight mb-6 drop-shadow-lg text-white">
              Factsheet for <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-blue-200">
                Manufacturers
              </span>
              <br /> of Medical Devices
            </h1>
            
            <p className="text-lg md:text-xl text-gray-100 max-w-2xl leading-relaxed drop-shadow-md">
              Navigating China's NMPA regulations. Key changes, responsibilities, and strategic requirements for entering the Chinese market.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <a href="#overview" className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-nmpa-900 bg-white hover:bg-gray-100 transition-colors duration-200 shadow-lg">
                Start Overview
              </a>
              <a href="#questions" className="inline-flex items-center justify-center px-6 py-3 border border-white/50 text-base font-medium rounded-md text-white hover:bg-white/20 transition-colors duration-200 backdrop-blur-sm shadow-lg">
                20 Checklist Questions
              </a>
            </div>
          </div>

          <div className="relative hidden lg:block z-10">
             <div className="grid grid-cols-2 gap-4">
                <div className="bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/20 transform translate-y-8 hover:bg-white/20 transition-colors cursor-pointer shadow-xl">
                  <FileText className="w-10 h-10 text-cyan-300 mb-4" />
                  <h3 className="text-xl font-bold mb-2 text-white">Order 739</h3>
                  <p className="text-sm text-gray-200">The supreme regulation governing medical device supervision.</p>
                </div>
                <div className="bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/20 hover:bg-white/20 transition-colors cursor-pointer shadow-xl">
                  <ShieldCheck className="w-10 h-10 text-cyan-300 mb-4" />
                  <h3 className="text-xl font-bold mb-2 text-white">MAH System</h3>
                  <p className="text-sm text-gray-200">Marketing Authorization Holder assumes full lifecycle responsibility.</p>
                </div>
                <div className="bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/20 transform translate-y-8 hover:bg-white/20 transition-colors cursor-pointer shadow-xl">
                  <Activity className="w-10 h-10 text-cyan-300 mb-4" />
                  <h3 className="text-xl font-bold mb-2 text-white">Clinical</h3>
                  <p className="text-sm text-gray-200">Exemptions and acceptance of overseas clinical data.</p>
                </div>
                <div className="bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/20 hover:bg-white/20 transition-colors cursor-pointer shadow-xl">
                  <Globe className="w-10 h-10 text-cyan-300 mb-4" />
                  <h3 className="text-xl font-bold mb-2 text-white">Legal Agent</h3>
                  <p className="text-sm text-gray-200">Mandatory local representation for foreign entities.</p>
                </div>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};