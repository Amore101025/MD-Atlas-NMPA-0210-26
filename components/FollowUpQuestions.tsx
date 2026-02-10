import React from 'react';
import { Section } from './Section';
import { FOLLOW_UP_QUESTIONS } from '../constants';

export const FollowUpQuestions: React.FC = () => {
  return (
    <Section id="questions" title="20 Comprehensive Follow-up Questions" className="bg-white">
      <div className="mb-8">
        <p className="text-gray-600 text-lg">
          To ensure full compliance with NMPA Order 739 and smooth market access, manufacturers should diligently answer the following questions.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {FOLLOW_UP_QUESTIONS.map((q) => (
          <div key={q.id} className="group relative bg-slate-50 rounded-lg p-6 border border-slate-200 hover:border-nmpa-300 transition-all duration-300 hover:shadow-md">
            <div className="absolute top-0 right-0 -mt-2 -mr-2 w-8 h-8 bg-white border border-nmpa-200 rounded-full flex items-center justify-center text-sm font-bold text-nmpa-600 shadow-sm group-hover:bg-nmpa-600 group-hover:text-white transition-colors">
              {q.id}
            </div>
            <span className="inline-block px-2 py-1 mb-3 text-xs font-semibold tracking-wide text-nmpa-700 bg-nmpa-100 rounded-md">
              {q.category}
            </span>
            <p className="text-gray-800 font-medium leading-relaxed">
              {q.question}
            </p>
          </div>
        ))}
      </div>
      
      <div className="mt-12 p-6 bg-nmpa-900 rounded-2xl text-white text-center">
        <h3 className="text-xl font-bold mb-2">Ready to proceed?</h3>
        <p className="text-nmpa-200 mb-6">Preparation is key. Ensure your regulatory team has addressed each point above.</p>
        <button className="bg-white text-nmpa-900 px-8 py-3 rounded-full font-bold hover:bg-gray-100 transition-colors">
          Download Checklist PDF
        </button>
      </div>
    </Section>
  );
};