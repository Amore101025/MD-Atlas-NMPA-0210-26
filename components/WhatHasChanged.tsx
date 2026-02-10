import React from 'react';
import { Section } from './Section';
import { KEY_CHANGES } from '../constants';

export const WhatHasChanged: React.FC = () => {
  return (
    <Section id="changes" title="What has changed? (Order 739)" className="bg-white">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="prose prose-lg text-gray-600">
          <p>
            The new <strong>Regulation on the Supervision and Administration of Medical Devices (Order No. 739)</strong> replaces the previous Order No. 650. It aims to encourage innovation, streamline approval processes, and significantly increase penalties for non-compliance.
          </p>
          <p className="mt-4">
            Similar to the EU MDR's goal of a robust regulatory framework, Order 739 emphasizes a lifecycle approach to safety, shifting focus from pre-market approval to both pre-market rigorousness and post-market vigilance.
          </p>
          <div className="mt-6 bg-yellow-50 border-l-4 border-yellow-400 p-4">
             <h4 className="font-bold text-yellow-800">Act now!</h4>
             <p className="text-sm text-yellow-700 mt-1">
               Although transitional periods were brief, manufacturers must now be fully compliant with the new monitoring and reporting obligations.
             </p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6">
          {KEY_CHANGES.map((change, index) => (
            <div key={index} className="flex items-start space-x-4 p-4 rounded-xl bg-slate-50 border border-slate-100 hover:shadow-md transition-shadow">
              <div className="flex-shrink-0 p-3 bg-nmpa-600 rounded-lg shadow-sm">
                {change.icon}
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-900">{change.title}</h3>
                <p className="mt-1 text-sm text-gray-600 leading-relaxed">
                  {change.text}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
};