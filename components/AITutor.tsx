
import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, X, Sparkles } from 'lucide-react';
import { askTutor } from '../services/geminiService';

export const AITutor: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ role: 'user' | 'bot'; text: string }[]>([
    { role: 'bot', text: 'Soy Nexus. Tu conexión con la vanguardia de la IA. ¿Qué quieres descifrar hoy?' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const handleSend = async () => {
    if (!input.trim()) return;
    const userMsg = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setIsLoading(true);

    const response = await askTutor(userMsg);
    setMessages(prev => [...prev, { role: 'bot', text: response }]);
    setIsLoading(false);
  };

  return (
    <div className="fixed bottom-6 right-6 z-[100]">
      {!isOpen ? (
        <button
          onClick={() => setIsOpen(true)}
          className="w-16 h-16 bg-cyan-500 rounded-full flex items-center justify-center shadow-[0_0_25px_rgba(34,211,238,0.6)] animate-bounce hover:scale-110 transition-transform"
        >
          <Bot className="w-8 h-8 text-black" />
        </button>
      ) : (
        <div className="w-80 md:w-96 h-[500px] glass rounded-2xl flex flex-col overflow-hidden border border-cyan-500/30 shadow-2xl">
          <div className="p-4 bg-cyan-950/50 border-b border-cyan-500/30 flex justify-between items-center">
            <div className="flex items-center gap-3">
              <Sparkles className="w-5 h-5 text-cyan-400" />
              <span className="font-orbitron font-bold text-cyan-400 uppercase tracking-widest">NEXUS CORE</span>
            </div>
            <button onClick={() => setIsOpen(false)} className="text-slate-400 hover:text-white">
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] p-3 rounded-2xl text-sm ${
                  m.role === 'user' 
                    ? 'bg-cyan-600/20 text-cyan-100 border border-cyan-500/20' 
                    : 'bg-slate-800/80 text-slate-200 border border-slate-700/50'
                }`}>
                  {m.text}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-slate-800/80 p-3 rounded-2xl border border-slate-700/50">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-cyan-500 rounded-full animate-pulse" />
                    <div className="w-2 h-2 bg-cyan-500 rounded-full animate-pulse delay-75" />
                    <div className="w-2 h-2 bg-cyan-500 rounded-full animate-pulse delay-150" />
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <div className="p-4 border-t border-cyan-500/20 bg-black/40">
            <div className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Pregunta a la IA..."
                className="flex-1 bg-slate-900 border border-slate-700 rounded-xl px-4 py-2 text-sm text-cyan-100 focus:outline-none focus:border-cyan-500"
              />
              <button
                onClick={handleSend}
                className="p-2 bg-cyan-500 rounded-xl hover:bg-cyan-400 transition-colors"
              >
                <Send className="w-5 h-5 text-black" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
