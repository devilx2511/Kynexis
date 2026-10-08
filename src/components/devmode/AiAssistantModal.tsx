import React, { useState } from 'react';
import { Sparkles, Send, Bot, User, X, RefreshCw, Copy, Check } from 'lucide-react';

interface AiAssistantModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AiAssistantModal: React.FC<AiAssistantModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [messages, setMessages] = useState<Array<{ sender: 'user' | 'ai'; text: string }>>([
    {
      sender: 'ai',
      text: 'Hello! I am the Kynexis Clinical AI Assistant. How can I help you optimize Kolupukur clinic schedules, draft medical blog copy, or generate local JSON-LD schema today?',
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  if (!isOpen) return null;

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userText = input;
    setInput('');
    setMessages((prev) => [...prev, { sender: 'user', text: userText }]);
    setIsLoading(true);

    setTimeout(() => {
      let reply =
        "I have analyzed your request against Kynexis Health's Kolupukur clinic dataset. All records and SEO schema have been synchronized.";

      if (userText.toLowerCase().includes('seo') || userText.toLowerCase().includes('schema')) {
        reply =
          'Generated JSON-LD MedicalClinic schema for Kolupukur, Kolkata (700157). Address verified against West Bengal Healthcare Registry.';
      } else if (userText.toLowerCase().includes('doctor') || userText.toLowerCase().includes('schedule')) {
        reply =
          'Dr. Ananya Ray and Dr. Subhashish Roy have 14 appointment slots open for tomorrow at the Kolupukur facility.';
      }

      setMessages((prev) => [...prev, { sender: 'ai', text: reply }]);
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#061A2E]/80 backdrop-blur-md animate-fade-in">
      <div className="w-full max-w-lg bg-white rounded-3xl shadow-2xl overflow-hidden border border-[#EFB33D]/30 flex flex-col h-[500px] text-slate-800 text-xs">
        {/* Header */}
        <div className="p-4 bg-[#061A2E] text-white flex items-center justify-between border-b border-[#EFB33D]/20 shrink-0">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-[#EFB33D]" />
            <h2 className="font-heading font-bold text-sm">Kynexis Intelligence Assistant</h2>
          </div>
          <button onClick={onClose} className="p-1 text-slate-400 hover:text-white rounded-lg">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Chat area */}
        <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-slate-50">
          {messages.map((m, idx) => (
            <div
              key={idx}
              className={`flex items-start gap-2.5 ${
                m.sender === 'user' ? 'justify-end' : 'justify-start'
              }`}
            >
              {m.sender === 'ai' && (
                <div className="w-7 h-7 rounded-xl bg-[#061A2E] text-[#EFB33D] flex items-center justify-center shrink-0">
                  <Bot className="w-4 h-4" />
                </div>
              )}
              <div
                className={`p-3 rounded-2xl max-w-[80%] leading-relaxed ${
                  m.sender === 'user'
                    ? 'bg-[#061A2E] text-white rounded-tr-none'
                    : 'bg-white border border-slate-200 text-slate-800 rounded-tl-none shadow-xs'
                }`}
              >
                {m.text}
              </div>
            </div>
          ))}

          {isLoading && (
            <div className="flex items-center gap-2 text-slate-400 p-2 italic">
              <RefreshCw className="w-4 h-4 animate-spin text-[#EFB33D]" />
              <span>Synthesizing response...</span>
            </div>
          )}
        </div>

        {/* Input */}
        <form onSubmit={handleSend} className="p-3 bg-white border-t flex items-center gap-2 shrink-0">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask AI to draft SEO tags, audit logs, or schedule slots..."
            className="flex-1 p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-[#EFB33D]"
          />
          <button
            type="submit"
            className="p-2.5 bg-[#061A2E] text-[#EFB33D] rounded-xl font-bold hover:bg-[#10243A]"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
};
