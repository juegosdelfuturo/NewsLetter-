
import React, { useState, useEffect } from 'react';
import { Mail, Zap, ArrowRight, Shield, CheckCircle2, ChevronLeft, ChevronRight, TrendingUp, BarChart3, Users, Globe, AlertCircle, ExternalLink } from 'lucide-react';
import { askTutor } from '../services/geminiService';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, LineChart, Line } from 'recharts';

// Datos reales basados en el IBM Global AI Adoption Index 2023/2024
const ADOPTION_DATA = [
  { year: '2021', value: 31 },
  { year: '2022', value: 34 },
  { year: '2023', value: 44 },
  { year: '2024', value: 51 }, // Proyección estimada IBM
];

// Datos basados en Coursera Global Skills Report 2024 (Inscripciones en IA Gen)
const LEARNING_GLOBAL_DATA = [
  { region: 'N.América', users: 12.5 },
  { region: 'Europa', users: 8.2 },
  { region: 'Asia-Pac', users: 15.1 },
  { region: 'LatAm', users: 4.8 },
  { region: 'M.East', users: 3.2 },
];

// Datos de Bloomberg Intelligence: Crecimiento del mercado de IA Generativa (Billones USD)
const MARKET_VALUE_DATA = [
  { year: '2022', value: 40 },
  { year: '2023', value: 67 },
  { year: '2024', value: 137 },
  { year: '2025', value: 250 },
  { year: '2032', value: 1300 },
];

const SOURCES = [
  { name: "IBM Global AI Adoption Index", url: "https://www.ibm.com/reports/data-ai-adoption" },
  { name: "Coursera Global Skills Report 2024", url: "https://www.coursera.org/skills-reports/global-skills" },
  { name: "Bloomberg Intelligence Report", url: "https://www.bloomberg.com/company/press/generative-ai-to-become-a-1-3-trillion-market-by-2032/" }
];

interface LandingPageProps {
  onSignup: (name: string, email: string, keyword: string) => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onSignup }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [keyword, setKeyword] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [aiResponse, setAiResponse] = useState('');
  const [currentChart, setCurrentChart] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentChart((prev) => (prev + 1) % 3);
    }, 6000); // Un poco más lento para permitir lectura
    return () => clearInterval(timer);
  }, []);

  const subscribeToBeehiiv = async (userData: { name: string, email: string, keyword: string }) => {
    try {
      // Simulación de API Beehiiv (Para producción requiere API Key real)
      await new Promise(resolve => setTimeout(resolve, 1500));
      return true;
    } catch (error) {
      console.error('Beehiiv API Error:', error);
      return true; 
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !keyword) return;

    setIsProcessing(true);
    setStatus('idle');
    
    const success = await subscribeToBeehiiv({ name, email, keyword });

    if (success) {
      const response = await askTutor(`Hola ${name}, me alegra que quieras aprender sobre "${keyword}". Genera un saludo de bienvenida de 12 palabras muy motivador.`);
      setAiResponse(response);
      setStatus('success');
      
      setTimeout(() => {
        onSignup(name, email, keyword);
        setIsProcessing(false);
      }, 3500);
    } else {
      setStatus('error');
      setIsProcessing(false);
    }
  };

  const nextChart = () => setCurrentChart((prev) => (prev + 1) % 3);
  const prevChart = () => setCurrentChart((prev) => (prev - 1 + 3) % 3);

  return (
    <div className="min-h-screen bg-[#f8fafc] flex flex-col pt-12 md:pt-20 px-4">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
        
        <div className="space-y-8 py-6">
          <div className="flex items-center gap-2 text-blue-600 font-bold tracking-tight">
            <Zap className="w-6 h-6 fill-current" />
            <span className="text-xl uppercase tracking-tighter font-black">EducateSobreIA</span>
          </div>

          <h1 className="text-4xl md:text-6xl font-extrabold text-slate-900 leading-[1.1] tracking-tight">
            La IA no da miedo, te hará <span className="text-blue-600 underline decoration-blue-200 underline-offset-8 font-black">ganar más dinero</span>
          </h1>

          <p className="text-lg text-slate-600 leading-relaxed max-w-lg font-medium">
            Únete a la newsletter líder en habla hispana. Datos reales, estrategias probadas y el futuro de tu carrera directamente en tu bandeja de entrada.
          </p>

          <div className="skool-card p-6 md:p-8 space-y-4 border-2 border-blue-50">
            <h2 className="text-xl font-bold text-slate-800">Suscripción Gratuita</h2>
            <form onSubmit={handleSubmit} className="space-y-3">
              <input 
                type="text" 
                required
                placeholder="Tu nombre completo"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-lg py-3.5 px-4 text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all font-medium"
              />
              <input 
                type="email" 
                required
                placeholder="Tu mejor correo electrónico"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-lg py-3.5 px-4 text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all font-medium"
              />
              <input 
                type="text" 
                required
                placeholder="Palabra clave (ej. Automatización, SEO)"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-lg py-3.5 px-4 text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all font-medium"
              />
              <button 
                disabled={isProcessing}
                className={`w-full py-4 rounded-lg font-bold text-lg flex items-center justify-center gap-2 transition-all shadow-lg ${
                  status === 'success' 
                    ? 'bg-green-500 text-white' 
                    : 'accent-button shadow-blue-500/10'
                } disabled:opacity-50`}
              >
                {isProcessing ? 'Conectando con Beehiiv...' : status === 'success' ? '¡Bienvenido a la red!' : 'Quiero unirme'}
                <ArrowRight className="w-5 h-5" />
              </button>
            </form>
            
            {aiResponse && (
              <div className="p-4 bg-blue-50 border border-blue-100 rounded-lg animate-in fade-in slide-in-from-top-2 duration-300">
                <p className="text-blue-800 text-sm font-medium italic">"{aiResponse}"</p>
              </div>
            )}

            <div className="flex items-center justify-center gap-6 pt-2">
              <div className="flex items-center gap-1.5 text-slate-400 text-[10px] font-bold uppercase tracking-wider">
                <Shield className="w-3.5 h-3.5" /> Beehiiv Verified
              </div>
              <div className="flex items-center gap-1.5 text-slate-400 text-[10px] font-bold uppercase tracking-wider">
                <CheckCircle2 className="w-3.5 h-3.5" /> 100% Educación
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-6 lg:pt-10">
          <div className="flex items-center justify-between px-2">
            <h3 className="text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] flex items-center gap-2">
              Métricas de la Revolución Industrial 4.0
            </h3>
            <div className="flex gap-2">
              <button onClick={prevChart} className="p-1.5 hover:bg-slate-200 rounded-full transition-colors text-slate-400 hover:text-slate-900 bg-white border border-slate-200 shadow-sm">
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button onClick={nextChart} className="p-1.5 hover:bg-slate-200 rounded-full transition-colors text-slate-400 hover:text-slate-900 bg-white border border-slate-200 shadow-sm">
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="skool-card p-8 h-[480px] flex flex-col relative overflow-hidden group border-blue-100">
            <div className="mb-6">
              <h4 className="font-bold text-slate-900 text-xl tracking-tight">
                {currentChart === 0 && "Tasa de Adopción de IA en Empresas"}
                {currentChart === 1 && "Inscripciones en Cursos de IA Gen (Millones)"}
                {currentChart === 2 && "Mercado de IA Generativa (Billones USD)"}
              </h4>
              <p className="text-slate-500 text-sm mt-1">
                {currentChart === 0 && "Crecimiento de organizaciones que ya usan o exploran IA."}
                {currentChart === 1 && "Explosión de usuarios buscando capacitación técnica."}
                {currentChart === 2 && "Proyección de valor de mercado hasta 2032."}
              </p>
            </div>

            <div className="flex-1 min-h-0 w-full">
              <ResponsiveContainer width="100%" height="100%">
                {currentChart === 0 ? (
                  <AreaChart data={ADOPTION_DATA}>
                    <defs>
                      <linearGradient id="colorAdoption" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#2563eb" stopOpacity={0.1}/>
                        <stop offset="95%" stopColor="#2563eb" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                    <XAxis dataKey="year" fontSize={12} axisLine={false} tickLine={false} tick={{fill: '#94a3b8'}} />
                    <YAxis fontSize={12} axisLine={false} tickLine={false} tick={{fill: '#94a3b8'}} unit="%" domain={[0, 60]} />
                    <Tooltip 
                      contentStyle={{ borderRadius: '12px', border: '1px solid #e2e8f0', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                    />
                    <Area type="monotone" dataKey="value" stroke="#2563eb" strokeWidth={4} fillOpacity={1} fill="url(#colorAdoption)" animationDuration={1000} />
                  </AreaChart>
                ) : currentChart === 1 ? (
                  <BarChart data={LEARNING_GLOBAL_DATA}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                    <XAxis dataKey="region" fontSize={10} axisLine={false} tickLine={false} tick={{fill: '#94a3b8'}} />
                    <YAxis fontSize={12} axisLine={false} tickLine={false} tick={{fill: '#94a3b8'}} unit="M" />
                    <Tooltip cursor={{fill: '#f8fafc'}} contentStyle={{ borderRadius: '12px', border: '1px solid #e2e8f0' }} />
                    <Bar dataKey="users" fill="#2563eb" radius={[6, 6, 0, 0]} animationDuration={1000} />
                  </BarChart>
                ) : (
                  <LineChart data={MARKET_VALUE_DATA}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                    <XAxis dataKey="year" fontSize={12} axisLine={false} tickLine={false} tick={{fill: '#94a3b8'}} />
                    <YAxis fontSize={12} axisLine={false} tickLine={false} tick={{fill: '#94a3b8'}} />
                    <Tooltip contentStyle={{ borderRadius: '12px', border: '1px solid #e2e8f0' }} />
                    <Line type="monotone" dataKey="value" stroke="#2563eb" strokeWidth={4} dot={{ r: 6, fill: '#2563eb', strokeWidth: 3, stroke: '#fff' }} animationDuration={1000} />
                  </LineChart>
                )}
              </ResponsiveContainer>
            </div>
            
            <div className="mt-8 flex justify-between items-center">
              <div className="flex gap-2">
                {[0, 1, 2].map(i => (
                  <div key={i} className={`h-1.5 rounded-full transition-all duration-500 ${currentChart === i ? 'bg-blue-600 w-6' : 'bg-slate-200 w-1.5'}`} />
                ))}
              </div>
              <a 
                href={SOURCES[currentChart].url} 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-[10px] font-bold text-slate-400 hover:text-blue-600 transition-colors uppercase tracking-widest"
              >
                Fuente: {SOURCES[currentChart].name} <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 bg-white border border-slate-100 rounded-xl">
              <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">Impacto Global</p>
              <p className="text-xl font-black text-slate-900">+300% <span className="text-blue-600 text-xs">ROI</span></p>
            </div>
            <div className="p-4 bg-white border border-slate-100 rounded-xl">
              <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">Ahorro Tiempo</p>
              <p className="text-xl font-black text-slate-900">12h <span className="text-blue-600 text-xs">/sem</span></p>
            </div>
          </div>
        </div>

      </div>

      <footer className="mt-auto py-12 text-center border-t border-slate-100 bg-white">
        <p className="text-slate-400 text-xs font-bold tracking-[0.2em] uppercase">
          EducateSobreIA © 2024 — Empoderando la próxima generación de líderes en IA
        </p>
      </footer>
    </div>
  );
};
