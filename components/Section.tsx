import React from 'react';
import { SectionProps } from '../types';

export const Section: React.FC<SectionProps> = ({ id, title, children, className = "" }) => {
  return (
    <section id={id} className={`py-12 md:py-16 ${className} bg-transparent`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-10 border-l-4 border-current pl-4 opacity-90">
          <h2 className="text-3xl font-bold tracking-tight opacity-100">{title}</h2>
        </div>
        {children}
      </div>
    </section>
  );
};