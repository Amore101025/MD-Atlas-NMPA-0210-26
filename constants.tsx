import { Question, RiskClass, TabType, PainterStyle, MagicFeature } from './types';
import React from 'react';
import { ShieldCheck, FileText, Activity, Globe, Scale, Microscope, Building2, AlertTriangle, Wand2, Highlighter, ListChecks, HelpCircle, FileInput, Expand } from 'lucide-react';

// --- TRANSLATIONS ---
export const TRANSLATIONS = {
  en: {
    nav: { overview: "Overview", changes: "Changes", practice: "In Practice", checklist: "Checklist", noteKeeper: "AI Notes" },
    hero: { basedOn: "Based on Order No. 739", title: "Factsheet for Manufacturers", subtitle: "of Medical Devices", desc: "Navigating China's NMPA regulations. Key changes, responsibilities, and strategic requirements.", start: "Start Overview", check: "20 Checklist Questions" },
    titles: { changes: "What has changed?", practice: "What does this mean in practice?", questions: "20 Follow-up Questions", aiNotes: "AI Note Keeper" },
    jackpot: "Style Jackpot"
  },
  zh: {
    nav: { overview: "概覽", changes: "法規變更", practice: "實務操作", checklist: "檢查清單", noteKeeper: "AI 筆記" },
    hero: { basedOn: "基於第739號令", title: "醫療器械製造商", subtitle: "監管實務概覽", desc: "解讀中國 NMPA 法規。關鍵變更、職責以及進入中國市場的戰略要求。", start: "開始瀏覽", check: "20個關鍵問題" },
    titles: { changes: "法規有什麼變更？", practice: "實務上意味著什麼？", questions: "20個後續問題", aiNotes: "AI 智能筆記" },
    jackpot: "風格大獎"
  }
};

// --- PAINTER STYLES (20) ---
export const PAINTER_STYLES: PainterStyle[] = [
  { id: 'default', name: 'Clean Medical', background: 'linear-gradient(to bottom right, #f0f9ff, #e0f2fe)', accentColor: '#0ea5e9', textColor: '#0f172a', cardBg: 'rgba(255, 255, 255, 0.8)' },
  { id: 'vangogh', name: 'Van Gogh', background: 'linear-gradient(120deg, #1a237e 0%, #283593 50%, #fdd835 100%)', accentColor: '#fdd835', textColor: '#ffffff', cardBg: 'rgba(26, 35, 126, 0.7)' },
  { id: 'monet', name: 'Monet', background: 'linear-gradient(to right, #a8e063, #56ab2f)', accentColor: '#e040fb', textColor: '#1a202c', cardBg: 'rgba(255, 255, 255, 0.6)' },
  { id: 'picasso', name: 'Picasso', background: 'conic-gradient(at top left, #f44336, #2196f3, #ffeb3b)', accentColor: '#000000', textColor: '#000000', cardBg: 'rgba(255, 255, 255, 0.85)' },
  { id: 'dali', name: 'Dali', background: 'linear-gradient(to bottom, #ff9800, #795548)', accentColor: '#00bcd4', textColor: '#3e2723', cardBg: 'rgba(255, 243, 224, 0.8)' },
  { id: 'davinci', name: 'Da Vinci', background: 'url("https://www.transparenttextures.com/patterns/aged-paper.png"), #d7ccc8', accentColor: '#5d4037', textColor: '#3e2723', cardBg: 'rgba(255, 255, 255, 0.5)' },
  { id: 'mondrian', name: 'Mondrian', background: 'linear-gradient(90deg, #fff 0%, #fff 90%, #f00 90%, #f00 100%)', accentColor: '#0000ff', textColor: '#000000', cardBg: 'rgba(255, 255, 255, 0.95)' },
  { id: 'klimt', name: 'Klimt', background: 'radial-gradient(circle, #ffd700, #b8860b)', accentColor: '#000000', textColor: '#222', cardBg: 'rgba(255, 255, 255, 0.7)' },
  { id: 'warhol', name: 'Warhol', background: 'linear-gradient(45deg, #ff00ff, #00ffff)', accentColor: '#ffff00', textColor: '#000000', cardBg: 'rgba(255, 255, 255, 0.8)' },
  { id: 'hokusai', name: 'Hokusai', background: 'linear-gradient(to bottom, #e3f2fd, #1565c0)', accentColor: '#d32f2f', textColor: '#0d47a1', cardBg: 'rgba(255, 255, 255, 0.7)' },
  { id: 'kahlo', name: 'Kahlo', background: 'linear-gradient(to right, #e91e63, #4caf50)', accentColor: '#ffeb3b', textColor: '#ffffff', cardBg: 'rgba(0, 0, 0, 0.6)' },
  { id: 'matisse', name: 'Matisse', background: 'linear-gradient(135deg, #ff5722 25%, #2196f3 25%, #2196f3 50%, #ff5722 50%, #ff5722 75%, #2196f3 75%, #2196f3 100%)', accentColor: '#4caf50', textColor: '#ffffff', cardBg: 'rgba(0,0,0,0.7)' },
  { id: 'rembrandt', name: 'Rembrandt', background: 'radial-gradient(circle at 50% 50%, #ffa000, #212121)', accentColor: '#ffecb3', textColor: '#ffffff', cardBg: 'rgba(0, 0, 0, 0.6)' },
  { id: 'vermeer', name: 'Vermeer', background: 'linear-gradient(to right, #263238, #607d8b)', accentColor: '#ffc107', textColor: '#eceff1', cardBg: 'rgba(38, 50, 56, 0.8)' },
  { id: 'munch', name: 'Munch', background: 'linear-gradient(to bottom, #ff5722, #1a237e)', accentColor: '#ffffff', textColor: '#ffffff', cardBg: 'rgba(0, 0, 0, 0.5)' },
  { id: 'okeeffe', name: 'O\'Keeffe', background: 'radial-gradient(circle, #f8bbd0, #ec407a)', accentColor: '#880e4f', textColor: '#4a148c', cardBg: 'rgba(255, 255, 255, 0.6)' },
  { id: 'pollock', name: 'Pollock', background: 'repeating-linear-gradient(45deg, #000 0, #000 1px, #fff 0, #fff 50%)', accentColor: '#ff0000', textColor: '#000000', cardBg: 'rgba(255, 255, 255, 0.9)' },
  { id: 'rothko', name: 'Rothko', background: 'linear-gradient(to bottom, #b71c1c 50%, #212121 50%)', accentColor: '#ffffff', textColor: '#ffffff', cardBg: 'rgba(0,0,0, 0.4)' },
  { id: 'kandinsky', name: 'Kandinsky', background: 'linear-gradient(120deg, #673ab7, #e91e63, #ffeb3b)', accentColor: '#000000', textColor: '#ffffff', cardBg: 'rgba(0, 0, 0, 0.5)' },
  { id: 'renoir', name: 'Renoir', background: 'linear-gradient(to right, #f3e5f5, #e1bee7)', accentColor: '#8e24aa', textColor: '#4a148c', cardBg: 'rgba(255, 255, 255, 0.5)' },
  { id: 'basquiat', name: 'Basquiat', background: 'linear-gradient(to bottom right, #000000, #3e3e3e)', accentColor: '#ffeb3b', textColor: '#ffffff', cardBg: 'rgba(30, 30, 30, 0.8)' }
];

export const FOLLOW_UP_QUESTIONS: Question[] = [
  // Strategy & Scope
  { id: 1, category: "Strategy", question: "Does our device fall under the definition of a Medical Device according to Order 739, or is it a drug-device combination product?" },
  { id: 2, category: "Strategy", question: "Have we identified the correct NMPA Product Code and Regulation Number from the latest classification catalog?" },
  { id: 3, category: "Strategy", question: "Is our device considered an 'Innovative Medical Device' eligible for the Green Channel priority review?" },
  { id: 4, category: "Strategy", question: "What is the exact validity period of the NMPA certificate for our class of device, and when should renewal begin?" },
  
  // Local Representation
  { id: 5, category: "Legal Agent", question: "Have we appointed a compliant Legal Agent in China, and does the agreement clearly define liability sharing?" },
  { id: 6, category: "Legal Agent", question: "Is our Legal Agent capable of handling post-market surveillance and adverse event reporting effectively?" },
  
  // Technical & Testing
  { id: 7, category: "Technical", question: "Do we have a valid Product Technical Requirement (PTR) document that meets Chinese national/industry standards?" },
  { id: 8, category: "Technical", question: "Are we required to perform type testing in a local NMPA-accredited laboratory, or can we submit self-test reports?" },
  { id: 9, category: "Technical", question: "If submitting self-test reports, is our lab ISO 17025 accredited and do the reports meet NMPA data integrity requirements?" },
  
  // Clinical
  { id: 10, category: "Clinical", question: "Is our device listed in the 'Exempt from Clinical Evaluation' catalog?" },
  { id: 11, category: "Clinical", question: "If not exempt, can we use Clinical Evaluation Report (CER) based on overseas data and predicate devices?" },
  { id: 12, category: "Clinical", question: "If a local clinical trial is mandated, have we secured a GCP-compliant site and ethics committee approval in China?" },
  { id: 13, category: "Clinical", question: "Do we have sufficient clinical evidence specifically for the Chinese population (race-specific differences)?" },
  
  // Quality & Manufacturing
  { id: 14, category: "QMS", question: "Is our overseas Quality Management System (QMS) ready for a potential overseas inspection by NMPA?" },
  { id: 15, category: "QMS", question: "Does our manufacturing process comply with China GMP (Good Manufacturing Practice) requirements?" },
  
  // Post-Market & UDI
  { id: 16, category: "Post-Market", question: "Have we implemented the Unique Device Identification (UDI) system on our labels and packaging for China?" },
  { id: 17, category: "Post-Market", question: "Is our UDI data uploaded to the Chinese UDI Database (CUDID) before the device is placed on the market?" },
  { id: 18, category: "Post-Market", question: "Do we have a robust system to translate and report Serious Adverse Events (SAE) to NMPA within the required 24/72-hour windows?" },
  { id: 19, category: "Post-Market", question: "Have we prepared the Periodic Risk Evaluation Report (PRER) as required annually for Class II/III devices?" },
  
  // Commercial
  { id: 20, category: "Commercial", question: "Does the Chinese label and Instructions for Use (IFU) strictly match the approved NMPA registration content?" },
];

export const RISK_CLASSES: RiskClass[] = [
  {
    class: "Class I",
    riskLevel: "Low Risk",
    description: "Devices with low risk where safety and effectiveness can be ensured through routine administration.",
    management: "Filing System (Notification)",
    examples: "Surgical instruments (reusable), bandages, manual beds."
  },
  {
    class: "Class II",
    riskLevel: "Medium Risk",
    description: "Devices with moderate risk that require strict control and administration to ensure safety and effectiveness.",
    management: "Registration (Provincial NMPA)",
    examples: "ECG machines, X-ray films, infusion pumps."
  },
  {
    class: "Class III",
    riskLevel: "High Risk",
    description: "Devices with high risk, often implanted into the human body or used for life support, requiring strict control.",
    management: "Registration (National NMPA - Beijing)",
    examples: "Pacemakers, invasive catheters, artificial joints."
  }
];

export const KEY_CHANGES = [
  {
    icon: <Building2 className="w-8 h-8 text-white" />,
    title: "MAH System Nationwide",
    text: "The Marketing Authorization Holder (MAH) system separates manufacturing from registration, allowing flexibility but increasing the authorization holder's responsibility for the entire product lifecycle."
  },
  {
    icon: <Microscope className="w-8 h-8 text-white" />,
    title: "Clinical Evaluation Reform",
    text: "A broader range of devices are now exempt from clinical trials. NMPA accepts overseas clinical data if it meets specific ethical and regulatory standards, reducing redundancy."
  },
  {
    icon: <Scale className="w-8 h-8 text-white" />,
    title: "Legal Liability Increased",
    text: "Order 739 introduces severe penalties for non-compliance, including lifetime bans for key individuals involved in serious violations. 'Person Responsible' roles are critical."
  },
  {
    icon: <AlertTriangle className="w-8 h-8 text-white" />,
    title: "Post-Market Surveillance",
    text: "Enhanced requirements for adverse event monitoring, re-evaluation, and a complete traceability system via UDI (Unique Device Identification)."
  }
];

export const AI_MAGICS: MagicFeature[] = [
  {
    id: 'keywords',
    name: 'AI Keywords',
    icon: <Highlighter className="w-4 h-4" />,
    promptTemplate: (text, extra) => `Identify the following specific keywords in the text: ${extra}. Wrap these exact keywords with <span style="color: ${extra && extra.includes('#') ? extra.split(' ')[0] : 'coral'}"> ... </span>. Return the full text in markdown.`
  },
  {
    id: 'summarize',
    name: 'Summarize',
    icon: <FileText className="w-4 h-4" />,
    promptTemplate: (text) => `Summarize the following text into a concise bulleted list in markdown, highlighting key findings in <span style="color: coral">coral</span>:\n\n${text}`
  },
  {
    id: 'simplify',
    name: 'Simplify (ELI5)',
    icon: <Wand2 className="w-4 h-4" />,
    promptTemplate: (text) => `Explain the following text in simple terms suitable for a non-expert. Use markdown formatting and highlight important concepts in <span style="color: coral">coral</span>:\n\n${text}`
  },
  {
    id: 'action',
    name: 'Action Items',
    icon: <ListChecks className="w-4 h-4" />,
    promptTemplate: (text) => `Extract a checklist of mandatory action items from the text. Format as a markdown task list:\n\n${text}`
  },
  {
    id: 'expand',
    name: 'Expand',
    icon: <Expand className="w-4 h-4" />,
    promptTemplate: (text) => `Expand on the following text, adding relevant regulatory context and details based on China NMPA Order 739. Format in markdown:\n\n${text}`
  },
  {
    id: 'quiz',
    name: 'Quiz Me',
    icon: <HelpCircle className="w-4 h-4" />,
    promptTemplate: (text) => `Create 3 multiple-choice questions based on this text to test understanding. Include the answer key at the bottom. Format in markdown:\n\n${text}`
  }
];