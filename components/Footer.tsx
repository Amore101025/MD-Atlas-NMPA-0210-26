import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-900 text-slate-400 py-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center">
        <div className="mb-4 md:mb-0">
          <p className="text-sm">
            © {new Date().getFullYear()} NMPA Regulatory Guide.
          </p>
          <p className="text-xs mt-1 text-slate-500">
            Disclaimer: This page is for informational purposes only and does not constitute legal advice. Refer to official NMPA documentation.
          </p>
        </div>
        <div className="flex space-x-6">
           <a href="#" className="hover:text-white transition-colors">NMPA Official Site</a>
           <a href="#" className="hover:text-white transition-colors">CMDE</a>
           <a href="#" className="hover:text-white transition-colors">Contact Support</a>
        </div>
      </div>
    </footer>
  );
};