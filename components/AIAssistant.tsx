
import React, { useState, useRef, useEffect } from 'react';
import { getAgriculturalAdvice } from '../services/geminiService';
import { Message } from '../types';

const AIAssistant: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: '¡Hola! Soy ganIA, tu Mayordomo Digital. ¿Cómo va la granja hoy? Puedo ayudarte a calcular costos, revisar la salud de tus animales o diagnosticar problemas en tus cultivos.' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  const handleSend = async (isImage: boolean = false) => {
    const textToSend = isImage ? "He subido una foto de una hoja con manchas amarillas, ¿qué puede ser?" : input.trim();
    if (!textToSend || isLoading) return;

    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: textToSend }]);
    setIsLoading(true);

    const aiResponse = await getAgriculturalAdvice(textToSend, isImage);

    setMessages(prev => [...prev, { role: 'assistant', content: aiResponse }]);
    setIsLoading(false);
  };

  return (
    <div className="fixed bottom-8 right-8 z-[100]">
      {isOpen ? (
        <div className="bg-white w-[380px] sm:w-[420px] h-[600px] rounded-[2.5rem] shadow-[0_32px_64px_-16px_rgba(5,150,105,0.2)] border border-emerald-100 flex flex-col overflow-hidden animate-in zoom-in-95 duration-300">
          <div className="bg-emerald-600 p-6 flex justify-between items-center text-white">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center font-black text-2xl">g</div>
              <div>
                <div className="font-black text-lg">Mayordomo Digital</div>
                <div className="text-[10px] uppercase tracking-widest font-bold opacity-70 flex items-center gap-1.5">
                  <span className="w-2 h-2 bg-lime-400 rounded-full animate-pulse"></span>
                  Experto en Línea
                </div>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="hover:bg-white/10 p-2 rounded-xl transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-6 bg-gray-50/50">
            {messages.map((m, idx) => (
              <div key={idx} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] p-4 rounded-3xl text-sm font-medium leading-relaxed ${m.role === 'user'
                  ? 'bg-emerald-600 text-white rounded-tr-none shadow-lg shadow-emerald-100'
                  : 'bg-white border border-gray-100 text-gray-700 rounded-tl-none shadow-sm'
                  }`}>
                  {m.content}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-white border border-gray-100 p-4 rounded-3xl rounded-tl-none shadow-sm flex gap-1.5">
                  <span className="w-2 h-2 bg-emerald-400 rounded-full animate-bounce"></span>
                  <span className="w-2 h-2 bg-emerald-400 rounded-full animate-bounce delay-100"></span>
                  <span className="w-2 h-2 bg-emerald-400 rounded-full animate-bounce delay-200"></span>
                </div>
              </div>
            )}
          </div>

          <div className="p-6 bg-white border-t border-gray-50 space-y-4">
            <div className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Pregúntale a ganIA..."
                className="flex-1 bg-gray-50 border-none rounded-2xl px-5 py-4 text-sm font-semibold focus:ring-2 focus:ring-emerald-500 transition-all outline-none"
              />
              <button
                onClick={() => handleSend()}
                disabled={isLoading || !input.trim()}
                className="bg-emerald-600 text-white p-4 rounded-2xl hover:bg-emerald-700 disabled:opacity-50 transition-all shadow-lg shadow-emerald-100"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                </svg>
              </button>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => handleSend(true)}
                className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl border-2 border-emerald-50 text-emerald-600 font-bold text-xs hover:bg-emerald-50 transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                Diagnóstico Visual
              </button>
              <button className="px-4 py-3 rounded-xl border-2 border-emerald-50 text-emerald-600 hover:bg-emerald-50 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-20a3 3 0 013 3v10a3 3 0 01-3 33 3 0 01-3-3V5a3 3 0 013-3z" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      ) : (
        <button
          onClick={() => setIsOpen(true)}
          className="hidden bg-emerald-600 text-white h-20 w-20 rounded-[2rem] shadow-2xl hover:bg-emerald-700 hover:scale-110 transition-all flex items-center justify-center group relative"
        >
          <div className="absolute -top-2 -right-2 bg-lime-400 text-emerald-900 text-[10px] font-black px-2 py-1 rounded-full border-2 border-white">IA</div>
          <div className="w-10 h-10 bg-white/20 rounded-2xl flex items-center justify-center font-black text-2xl">g</div>
        </button>
      )}
    </div>
  );
};

export default AIAssistant;
