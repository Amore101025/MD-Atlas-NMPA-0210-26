import React, { useState } from 'react';
import { Section } from './Section';
import { RISK_CLASSES } from '../constants';
import { TabType } from '../types';
import { CheckCircle2, ArrowRight } from 'lucide-react';

export const InPractice: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabType>(TabType.STEP1);

  const renderTabContent = () => {
    switch (activeTab) {
      case TabType.STEP1:
        return (
          <div className="space-y-4 animate-fadeIn">
            <h3 className="text-xl font-bold text-nmpa-800">1. Determine Classification</h3>
            <p className="text-gray-600">Check the Medical Device Classification Catalog. This determines if you need a Filing (Class I) or Registration (Class II/III).</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
              {RISK_CLASSES.map((rc) => (
                <div key={rc.class} className="p-4 border border-gray-200 rounded-lg bg-gray-50 hover:border-nmpa-400 hover:bg-white transition-all">
                  <span className={`inline-block px-2 py-1 text-xs font-bold rounded mb-2 ${rc.class === 'Class III' ? 'bg-red-100 text-red-800' : rc.class === 'Class II' ? 'bg-orange-100 text-orange-800' : 'bg-green-100 text-green-800'}`}>
                    {rc.class} - {rc.riskLevel}
                  </span>
                  <p className="text-sm font-medium text-gray-900 mb-1">{rc.management}</p>
                  <p className="text-xs text-gray-500">{rc.examples}</p>
                </div>
              ))}
            </div>
          </div>
        );
      case TabType.STEP2:
        return (
          <div className="space-y-4 animate-fadeIn">
             <h3 className="text-xl font-bold text-nmpa-800">2. Type Testing (PTR)</h3>
             <p className="text-gray-600">Develop the Product Technical Requirement (PTR). This is a crucial document acting as the testing standard.</p>
             <ul className="list-disc pl-5 space-y-2 text-gray-600">
               <li>Samples must be sent to an NMPA-accredited testing center in China.</li>
               <li><strong>New:</strong> Self-testing reports are now accepted under strict conditions (ISO 17025 lab), but local testing remains the most common and lowest-risk path for foreign entities.</li>
             </ul>
          </div>
        );
      case TabType.STEP3:
        return (
          <div className="space-y-4 animate-fadeIn">
            <h3 className="text-xl font-bold text-nmpa-800">3. Clinical Evaluation</h3>
            <p className="text-gray-600">Determine if your device is on the <strong>Clinical Trial Exemption List</strong>.</p>
            <div className="flex flex-col space-y-3">
              <div className="flex items-center p-3 bg-green-50 border border-green-100 rounded-md">
                 <CheckCircle2 className="w-5 h-5 text-green-600 mr-3" />
                 <span className="text-sm text-gray-700"><strong>Exempt:</strong> Submit a simpler Clinical Evaluation Report (CER) comparing to predicate devices.</span>
              </div>
              <div className="flex items-center p-3 bg-blue-50 border border-blue-100 rounded-md">
                 <CheckCircle2 className="w-5 h-5 text-blue-600 mr-3" />
                 <span className="text-sm text-gray-700"><strong>Not Exempt:</strong> Use Overseas Clinical Data (if equivalent) OR conduct a Local Clinical Trial in China.</span>
              </div>
            </div>
          </div>
        );
      case TabType.STEP4:
        return (
           <div className="space-y-4 animate-fadeIn">
            <h3 className="text-xl font-bold text-nmpa-800">4. Dossier Submission</h3>
            <p className="text-gray-600">Prepare the submission dossier (RPS format). Documents must be translated into Simplified Chinese.</p>
            <p className="text-gray-600 text-sm">Key documents include: PTR, Test Reports, CER, IFU, Labels, QMS files, and Home Country Approval (e.g., CE Mark or FDA 510k).</p>
          </div>
        );
      case TabType.STEP5:
        return (
           <div className="space-y-4 animate-fadeIn">
            <h3 className="text-xl font-bold text-nmpa-800">5. Technical Review & Approval</h3>
            <p className="text-gray-600">The CMDE (Center for Medical Device Evaluation) reviews the technical file. They may issue a deficiency letter requiring supplementary information (giving you 1 year to respond).</p>
            <p className="text-gray-600">Once approved, you receive the NMPA Certificate (valid for 5 years).</p>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <Section id="practice" title="What does this mean in practice?" className="bg-slate-50">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Left Column: Explainer */}
        <div className="lg:col-span-1 space-y-8">
          <div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">Legal Agent (China Rep)</h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              Foreign manufacturers <strong>must</strong> appoint a local Legal Agent based in China. This agent coordinates the registration and, crucially, assists with adverse event reporting and product recalls.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">Electronic Submission</h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              NMPA has moved to an eRPS (Electronic Regulated Product Submission) system. Hard copies are becoming obsolete. A CA key (digital certificate) is required.
            </p>
          </div>
           <div className="p-6 bg-white rounded-xl shadow-sm border border-gray-200">
             <h4 className="font-bold text-nmpa-700 mb-2">Need to know:</h4>
             <ul className="space-y-2 text-sm text-gray-600">
               <li className="flex items-start"><span className="mr-2 text-nmpa-500">•</span> Home Country Approval is mandatory for imported devices.</li>
               <li className="flex items-start"><span className="mr-2 text-nmpa-500">•</span> Certificates are valid for 5 years.</li>
               <li className="flex items-start"><span className="mr-2 text-nmpa-500">•</span> Renewal must start 6 months before expiration.</li>
             </ul>
           </div>
        </div>

        {/* Right Column: Interactive Process */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
            <div className="bg-gray-100 border-b border-gray-200 overflow-x-auto">
              <div className="flex">
                {Object.values(TabType).map((tab) => (
                   <button
                     key={tab}
                     onClick={() => setActiveTab(tab)}
                     className={`px-6 py-4 text-sm font-medium whitespace-nowrap focus:outline-none transition-colors ${
                       activeTab === tab 
                         ? 'bg-white text-nmpa-600 border-b-2 border-nmpa-600' 
                         : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                     }`}
                   >
                     {tab}
                   </button>
                ))}
              </div>
            </div>
            <div className="p-8 min-h-[300px]">
              {renderTabContent()}
              <div className="mt-8 flex justify-end">
                 <button className="text-sm text-nmpa-600 font-semibold hover:text-nmpa-800 flex items-center">
                   Learn more about this step <ArrowRight className="w-4 h-4 ml-1" />
                 </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
};