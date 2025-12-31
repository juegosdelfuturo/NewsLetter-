
import React, { useState, useEffect } from 'react';
import { Zap, ArrowRight, CheckCircle2, ChevronLeft, ChevronRight, AlertCircle, ExternalLink, Loader2, Sparkles, Globe } from 'lucide-react';
import { askTutor } from '../services/geminiService';
import { supabase } from '../services/supabaseClient';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, LineChart, Line } from 'recharts';

const ADOPTION_DATA = [
  { year: '2021', value: 31 },
  { year: '2022', value: 34 },
  { year: '2023', value: 44 },
  { year: '2024', value: 51 },
];

const MARKET_VALUE_DATA = [
  { year: '2022', value: 40 },
  { year: '2023', value: 67 },
  { year: '2024', value: 137 },
  { year: '2025', value: 250 },
  { year: '2032', value: 1300 },
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
  const [errorMessage, setErrorMessage] = useState('');
  const [aiResponse, setAiResponse] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !keyword) return;

    setIsProcessing(true);
    setStatus('idle');
    setErrorMessage('');

    try {
      // Guardar en la tabla 'leads'
      const { error: dbError } = await supabase.from('leads').insert([
        { full_name: name, email, keyword }
      ]);

      if (dbError && dbError.code === '23505') {
        throw new Error('Esta identidad ya está registrada en nuestra red.');
      } else if (dbError) {
        throw dbError;
      }

      const response = await askTutor(`Hola ${name}, me alegra que quieras aprender sobre "${keyword}". Genera un saludo muy motivador y futurista de 12 palabras.`);
      setAiResponse(response);
      setStatus('success');
      
      setTimeout(() => {
        onSignup(name, email, keyword);
        setIsProcessing(false);
      }, 3500);
    } catch (err: any) {
      console.error('Error:', err);
      setStatus('error');
      setErrorMessage(err.message || 'Error de conexión con el núcleo.');
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] flex flex-col pt-12 md:pt-20 px-4 relative overflow-hidden">
      {/* Elementos decorativos de fondo */}
      <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-100/50 blur-[120px] rounded-full -z-10" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-cyan-100/50 blur-[120px] rounded-full -z-10" />

      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
        
        <div className="space-y-8 py-6 relative">
          <div className="flex items-center gap-2 text-blue-600 font-bold tracking-tight">
            <div className="bg-blue-600 p-1.5 rounded-lg shadow-lg shadow-blue-200">
              <Zap className="w-5 h-5 text-white fill-current" />
            </div>
            <span className="text-xl uppercase tracking-tighter font-black text-slate-900">EducateSobreIA</span>
          </div>

          <h1 className="text-5xl md:text-7xl font-extrabold text-slate-900 leading-[1.05] tracking-tight">
            Domina la IA, <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500 font-black">protege tu futuro</span>
          </h1>

          <p className="text-xl text-slate-500 leading-relaxed max-w-lg font-medium">
            La newsletter técnica para mentes que no se conforman. Datos crudos, casos de éxito y estrategias de monetización.
          </p>

          <div className="bg-white/70 backdrop-blur-xl p-6 md:p-10 space-y-6 rounded-[2rem] border border-white shadow-2xl shadow-blue-500/5">
            <h2 className="text-2xl font-black text-slate-900 tracking-tight">Registro de Operador</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-4">
                <input 
                  type="text" required placeholder="Tu nombre completo"
                  value={name} onChange={(e) => setName(e.target.value)}
                  className="w-full bg-white border border-slate-200 rounded-2xl py-4 px-5 text-slate-900 focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all font-semibold"
                />
                <input 
                  type="email" required placeholder="Tu mejor correo electrónico"
                  value={email} onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-white border border-slate-200 rounded-2xl py-4 px-5 text-slate-900 focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all font-semibold"
                />
                <input 
                  type="text" required placeholder="¿Qué quieres aprender? (ej. SEO, Chatbots)"
                  value={keyword} onChange={(e) => setKeyword(e.target.value)}
                  className="w-full bg-white border border-slate-200 rounded-2xl py-4 px-5 text-slate-900 focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all font-semibold"
                />
              </div>

              <button 
                disabled={isProcessing}
                className={`w-full py-5 rounded-2xl font-black text-xl flex items-center justify-center gap-3 transition-all shadow-xl ${
                  status === 'success' ? 'bg-green-500 text-white' : 'bg-slate-900 text-white hover:bg-black hover:scale-[1.02]'
                } disabled:opacity-50`}
              >
                {isProcessing ? <Loader2 className="w-6 h-6 animate-spin" /> : status === 'success' ? '¡Conexión Establecida!' : 'Obtener Acceso Gratuito'}
                {!isProcessing && status !== 'success' && <ArrowRight className="w-6 h-6" />}
              </button>
            </form>
            
            {aiResponse && (
              <div className="p-5 bg-blue-50 border border-blue-100 rounded-2xl animate-in fade-in slide-in-from-bottom-2 duration-500">
                <p className="text-blue-900 text-sm font-bold italic text-center leading-relaxed">
                  <span className="text-blue-500 not-italic mr-1">Nexus:</span> "{aiResponse}"
                </p>
              </div>
            )}

            {status === 'error' && (
              <div className="p-4 bg-red-50 border border-red-100 rounded-2xl flex items-center gap-3 text-red-600 text-xs font-black uppercase tracking-wider">
                <AlertCircle className="w-5 h-5 flex-shrink-0" /> {errorMessage}
              </div>
            )}

            <div className="flex items-center justify-center gap-8 pt-2">
              <div className="flex items-center gap-2 text-slate-400 text-[10px] font-black uppercase tracking-[0.2em]">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" /> Supabase Secured
              </div>
              <div className="flex items-center gap-2 text-slate-400 text-[10px] font-black uppercase tracking-[0.2em]">
                <CheckCircle2 className="w-4 h-4 text-blue-500" /> Human Verified
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-8 lg:pt-14 relative">
          <div className="bg-white p-8 h-[500px] flex flex-col rounded-[2.5rem] border border-slate-100 shadow-xl relative overflow-hidden group">
            <div className="mb-8">
              <h4 className="font-black text-slate-900 text-2xl tracking-tighter">Proyección de Mercado IA</h4>
              <p className="text-slate-400 text-sm font-medium mt-1">Valor proyectado de la economía generativa (Billones USD).</p>
            </div>

            <div className="flex-1 min-h-0 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={MARKET_VALUE_DATA}>
                  <defs>
                    <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#2563eb" stopOpacity={0.2}/>
                      <stop offset="95%" stopColor="#2563eb" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis dataKey="year" fontSize={12} axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontWeight: 'bold'}} />
                  <YAxis fontSize={12} axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontWeight: 'bold'}} unit="B" />
                  <Tooltip contentStyle={{ borderRadius: '20px', border: 'none', boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)' }} />
                  <Area type="monotone" dataKey="value" stroke="#2563eb" strokeWidth={5} fillOpacity={1} fill="url(#colorValue)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
            
            <div className="mt-8 grid grid-cols-2 gap-4">
              <div className="p-5 bg-blue-600 rounded-3xl text-white">
                <p className="text-[10px] font-black uppercase opacity-70 mb-1">Crecimiento</p>
                <p className="text-2xl font-black">x3.2</p>
              </div>
              <div className="p-5 bg-slate-900 rounded-3xl text-white">
                <p className="text-[10px] font-black uppercase opacity-70 mb-1">Eficiencia</p>
                <p className="text-2xl font-black">+65%</p>
              </div>
            </div>
          </div>
        </div>

      </div>

      <footer className="mt-20 py-16 text-center border-t border-slate-100 bg-white/50 backdrop-blur-sm">
        <p className="text-slate-400 text-[11px] font-black tracking-[0.3em] uppercase">
          © 2024 — LA REVOLUCIÓN COMIENZA AQUÍ. IMPULSADO POR SUPABASE.
        </p>
      </footer>
    </div>
  );
};
