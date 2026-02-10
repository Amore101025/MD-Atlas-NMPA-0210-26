import React, { useState, useEffect } from 'react';
import { GoogleGenAI } from "@google/genai";
import { marked } from 'marked';
import { Wand2, Send, Save, RefreshCw, Bot, PenLine, FileCode, Check, Copy, Highlighter } from 'lucide-react';
import { AI_MAGICS } from '../constants';
import { MagicFeature, PainterStyle, ChatMessage } from '../types';

interface AINoteKeeperProps {
  style: PainterStyle;
  lang: 'en' | 'zh';
}

export const AINoteKeeper: React.FC<AINoteKeeperProps> = ({ style, lang }) => {
  const [note, setNote] = useState<string>('');
  const [markdownOutput, setMarkdownOutput] = useState<string>('');
  const [isEditing, setIsEditing] = useState(true);
  const [model, setModel] = useState('gemini-3-flash-preview');
  const [isLoading, setIsLoading] = useState(false);
  const [chatInput, setChatInput] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [keywordInput, setKeywordInput] = useState('');
  const [keywordColor, setKeywordColor] = useState('coral');
  const [showKeywordInput, setShowKeywordInput] = useState(false);

  // Initialize Gemini
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

  // Auto-transform on first load/paste if needed, or just manual
  const handleTransform = async (textToProcess: string, customPrompt?: string) => {
    setIsLoading(true);
    try {
      const prompt = customPrompt || `
        Rewrite the following text into organized, clean Markdown. 
        Identify key medical device regulatory terms (NMPA, Order 739, Classification, etc.) 
        and wrap them in a span with color coral like this: <span style="color: coral">TERM</span>.
        
        Text:
        ${textToProcess}
      `;

      const response = await ai.models.generateContent({
        model: model,
        contents: prompt,
      });

      const result = response.text;
      if (result) {
        setMarkdownOutput(result);
        setIsEditing(false); // Switch to preview
      }
    } catch (error) {
      console.error("AI Error:", error);
      alert("AI processing failed. Please check API Key or try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleMagic = (magic: MagicFeature) => {
    if (magic.id === 'keywords') {
      setShowKeywordInput(true);
      return;
    }
    const prompt = magic.promptTemplate(note || markdownOutput);
    handleTransform(note || markdownOutput, prompt);
  };

  const handleKeywordMagic = () => {
    if (!keywordInput) return;
    const magic = AI_MAGICS.find(m => m.id === 'keywords');
    if (magic) {
      const prompt = magic.promptTemplate(note || markdownOutput, `${keywordInput} (color: ${keywordColor})`);
      handleTransform(note || markdownOutput, prompt);
      setShowKeywordInput(false);
    }
  };

  const handleChat = async () => {
    if (!chatInput.trim()) return;
    
    const newMessages = [...messages, { role: 'user', text: chatInput } as ChatMessage];
    setMessages(newMessages);
    setChatInput('');
    setIsLoading(true);

    try {
      // Contextual chat based on the note
      const systemContext = `You are a helpful NMPA Regulatory assistant. The user is asking about this note: \n\n"${markdownOutput || note}"\n\nAnswer concisely.`;
      
      const response = await ai.models.generateContent({
        model: model,
        contents: `${systemContext}\n\nUser Question: ${chatInput}`
      });
      
      const reply = response.text;
      if (reply) {
        setMessages([...newMessages, { role: 'model', text: reply }]);
      }
    } catch (e) {
      setMessages([...newMessages, { role: 'model', text: "Error connecting to AI." }]);
    } finally {
      setIsLoading(false);
    }
  };

  const renderMarkdown = (content: string) => {
    return { __html: marked.parse(content) };
  };

  return (
    <section id="ai-note-keeper" className="py-12 px-4 md:px-8">
       <div className="max-w-7xl mx-auto rounded-3xl overflow-hidden shadow-2xl border border-white/20 backdrop-blur-md" 
            style={{ backgroundColor: style.cardBg }}>
          
          <div className="p-6 border-b border-gray-200/50 flex flex-col md:flex-row justify-between items-center gap-4">
             <div className="flex items-center space-x-3">
               <Bot className="w-8 h-8" style={{ color: style.accentColor }} />
               <h2 className="text-2xl font-bold" style={{ color: style.textColor }}>
                 {lang === 'en' ? 'AI Note Keeper' : 'AI 智能筆記'}
               </h2>
             </div>

             <div className="flex items-center space-x-4">
                <select 
                  value={model} 
                  onChange={(e) => setModel(e.target.value)}
                  className="bg-white/50 border border-gray-300 rounded-lg px-3 py-1 text-sm focus:outline-none focus:ring-2"
                  style={{ color: style.textColor }}
                >
                  <option value="gemini-3-flash-preview">Gemini 3 Flash</option>
                  <option value="gemini-3-pro-preview">Gemini 3 Pro</option>
                </select>
                
                <button 
                  onClick={() => setIsEditing(!isEditing)}
                  className="p-2 rounded-full hover:bg-black/5 transition-colors"
                  title={isEditing ? "Preview" : "Edit"}
                >
                  {isEditing ? <FileCode className="w-5 h-5" /> : <PenLine className="w-5 h-5" />}
                </button>
             </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-0 min-h-[600px]">
            {/* Editor / Preview Area */}
            <div className="lg:col-span-2 border-r border-gray-200/50 flex flex-col relative">
               {isLoading && (
                 <div className="absolute inset-0 z-10 bg-white/50 backdrop-blur-sm flex items-center justify-center">
                    <div className="flex flex-col items-center">
                       <RefreshCw className="w-10 h-10 animate-spin text-nmpa-600" />
                       <span className="mt-2 font-semibold">AI working magic...</span>
                    </div>
                 </div>
               )}

               {isEditing ? (
                 <textarea
                   className="flex-grow w-full h-full p-6 bg-transparent resize-none focus:outline-none text-lg font-mono"
                   placeholder="Paste your raw notes here (txt, markdown)..."
                   value={note}
                   onChange={(e) => setNote(e.target.value)}
                   style={{ color: style.textColor }}
                 />
               ) : (
                 <div 
                   className="flex-grow w-full h-full p-6 prose prose-lg max-w-none overflow-y-auto"
                   dangerouslySetInnerHTML={renderMarkdown(markdownOutput)}
                   style={{ 
                     '--tw-prose-headings': style.textColor,
                     '--tw-prose-body': style.textColor,
                     '--tw-prose-bold': style.textColor,
                   } as React.CSSProperties}
                 />
               )}
               
               {/* Quick Toolbar */}
               <div className="p-3 border-t border-gray-200/50 bg-white/30 backdrop-blur flex flex-wrap gap-2 justify-center">
                  <button 
                    onClick={() => handleTransform(note)} 
                    className="flex items-center px-4 py-2 rounded-full bg-nmpa-600 text-white hover:bg-nmpa-700 transition-all shadow-md"
                  >
                    <Wand2 className="w-4 h-4 mr-2" /> Auto-Format
                  </button>

                  {AI_MAGICS.filter(m => m.id !== 'keywords').map(magic => (
                    <button
                      key={magic.id}
                      onClick={() => handleMagic(magic)}
                      className="flex items-center px-3 py-2 rounded-full bg-white/50 hover:bg-white text-sm font-medium transition-colors border border-gray-200/50"
                      style={{ color: style.textColor }}
                    >
                      {magic.icon} <span className="ml-1 hidden sm:inline">{magic.name}</span>
                    </button>
                  ))}
                  
                   <button
                      onClick={() => setShowKeywordInput(!showKeywordInput)}
                      className="flex items-center px-3 py-2 rounded-full bg-white/50 hover:bg-white text-sm font-medium transition-colors border border-gray-200/50"
                      style={{ color: style.textColor }}
                    >
                      <Highlighter className="w-4 h-4" /> <span className="ml-1 hidden sm:inline">Keywords</span>
                    </button>
               </div>
               
               {showKeywordInput && (
                 <div className="absolute bottom-16 left-0 right-0 p-4 bg-white/95 shadow-xl border-t border-gray-200 mx-4 rounded-xl flex items-center space-x-2 animate-fadeIn">
                    <input 
                      type="text" 
                      value={keywordInput}
                      onChange={(e) => setKeywordInput(e.target.value)}
                      placeholder="Enter keywords separated by comma..."
                      className="flex-grow p-2 border rounded-md"
                    />
                    <input 
                      type="color" 
                      value={keywordColor}
                      onChange={(e) => setKeywordColor(e.target.value)}
                      className="w-10 h-10 p-0 border-0 rounded-md cursor-pointer"
                    />
                    <button onClick={handleKeywordMagic} className="p-2 bg-nmpa-600 text-white rounded-md">
                      Go
                    </button>
                    <button onClick={() => setShowKeywordInput(false)} className="p-2 text-gray-500">
                      <Check className="w-4 h-4" />
                    </button>
                 </div>
               )}
            </div>

            {/* Chat / Prompt Area */}
            <div className="lg:col-span-1 bg-white/20 flex flex-col h-full border-l border-white/20">
               <div className="p-4 border-b border-gray-200/30 font-bold" style={{ color: style.textColor }}>
                 Chat & Prompt
               </div>
               <div className="flex-grow overflow-y-auto p-4 space-y-4">
                  {messages.length === 0 && (
                    <div className="text-center opacity-60 mt-10" style={{ color: style.textColor }}>
                      <Bot className="w-12 h-12 mx-auto mb-2 opacity-50" />
                      <p>Ask me to refine the note, translate sections, or add more details.</p>
                    </div>
                  )}
                  {messages.map((msg, idx) => (
                    <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                       <div className={`max-w-[85%] rounded-2xl p-3 text-sm ${
                         msg.role === 'user' 
                           ? 'bg-nmpa-600 text-white rounded-br-none' 
                           : 'bg-white text-gray-800 rounded-bl-none shadow-sm'
                       }`}>
                         {msg.text}
                       </div>
                    </div>
                  ))}
               </div>
               <div className="p-4 border-t border-gray-200/30 bg-white/30 backdrop-blur-md">
                  <div className="relative">
                    <input
                      type="text"
                      className="w-full pl-4 pr-10 py-3 rounded-xl border border-transparent focus:border-nmpa-400 focus:ring-2 focus:ring-nmpa-200 outline-none bg-white/80"
                      placeholder="Prompt the AI..."
                      value={chatInput}
                      onChange={(e) => setChatInput(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && handleChat()}
                    />
                    <button 
                      onClick={handleChat}
                      disabled={isLoading}
                      className="absolute right-2 top-2 p-1.5 bg-nmpa-600 text-white rounded-lg hover:bg-nmpa-700 disabled:opacity-50"
                    >
                      <Send className="w-4 h-4" />
                    </button>
                  </div>
               </div>
            </div>
          </div>
       </div>
    </section>
  );
};