
import React, { useState, useEffect } from 'react';
import { Zap, ArrowRight, AlertCircle, Loader2, Sparkles, Globe, ChevronLeft, ChevronRight } from 'lucide-react';
import { askTutor } from '../services/geminiService';
import { supabase } from '../services/supabaseClient';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';

const ADOPTION_DATA = [
  { name: '2021', value: 31 },
  { name: '2022', value: 34 },
  { name: '2023', value: 44 },
  { name: '2024', value: 56 },
];

const MARKET_VALUE_DATA = [
  { name: '22', value: 40 },
  { name: '23', value: 67 },
  { name: '24', value: 137 },
  { name: '25', value: 250 },
];

const EFFICIENCY_DATA = [
  { name: 'Manual', value: 100 },
  { name: 'Híbrido', value: 45 },
  { name: 'IA Core', value: 12 },
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
  
  // Carrusel State
  const [chartIndex, setChartIndex] = useState(0);
  const charts = [
    { title: 'Adopción Global', subtitle: '% de empresas integrando IA', data: ADOPTION_DATA, type: 'area', color: '#2563eb' },
    { title: 'Mercado Proyectado', subtitle: 'Valor en Billones USD', data: MARKET_VALUE_DATA, type: 'area', color: '#06b6d4' },
    { title: 'Costes Operativos', subtitle: 'Reducción de tiempo por tarea', data: EFFICIENCY_DATA, type: 'bar', color: '#6366f1' },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setChartIndex((prev) => (prev + 1) % charts.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

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

      const response = await askTutor(`Hola ${name}, te envío las plantillas de IA sobre "${keyword}". Salúdalo de forma épica y breve.`);
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

  const activeChart = charts[chartIndex];

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
            <h2 className="text-2xl font-black text-slate-900 tracking-tight uppercase">RECIBE TU PLANTILLA</h2>
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
                className={`w-full py-5 rounded-2xl font-black text-xl flex items-center justify-center gap-3 transition-all shadow-xl uppercase ${
                  status === 'success' ? 'bg-green-500 text-white' : 'bg-slate-900 text-white hover:bg-black hover:scale-[1.02]'
                } disabled:opacity-50`}
              >
                {isProcessing ? <Loader2 className="w-6 h-6 animate-spin" /> : status === 'success' ? '¡LISTO!' : 'RECIBE LAS PLANTILLAS'}
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
            </div>
          </div>
        </div>

        {/* Carrusel de Gráficos */}
        <div className="space-y-8 lg:pt-14 relative group w-full">
          <div className="bg-white p-8 h-[500px] flex flex-col rounded-[2.5rem] border border-slate-100 shadow-xl relative overflow-hidden">
            <div className="flex justify-between items-start mb-8">
              <div>
                <h4 className="font-black text-slate-900 text-2xl tracking-tighter">{activeChart.title}</h4>
                <p className="text-slate-400 text-sm font-medium mt-1">{activeChart.subtitle}</p>
              </div>
              <div className="flex gap-1.5">
                {charts.map((_, i) => (
                  <button 
                    key={i} 
                    onClick={() => setChartIndex(i)}
                    className={`w-2 h-2 rounded-full transition-all ${chartIndex === i ? 'w-6 bg-blue-600' : 'bg-slate-200'}`}
                  />
                ))}
              </div>
            </div>

            <div className="flex-1 min-h-0 w-full animate-in fade-in zoom-in-95 duration-500">
              <ResponsiveContainer width="100%" height="100%">
                {activeChart.type === 'area' ? (
                  <AreaChart data={activeChart.data}>
                    <defs>
                      <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor={activeChart.color} stopOpacity={0.2}/>
                        <stop offset="95%" stopColor={activeChart.color} stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                    <XAxis dataKey="name" fontSize={12} axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontWeight: 'bold'}} />
                    <YAxis fontSize={12} axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontWeight: 'bold'}} />
                    <Tooltip contentStyle={{ borderRadius: '20px', border: 'none', boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)' }} />
                    <Area type="monotone" dataKey="value" stroke={activeChart.color} strokeWidth={5} fillOpacity={1} fill="url(#colorValue)" />
                  </AreaChart>
                ) : (
                  <BarChart data={activeChart.data}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                    <XAxis dataKey="name" fontSize={12} axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontWeight: 'bold'}} />
                    <YAxis fontSize={12} axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontWeight: 'bold'}} />
                    <Tooltip cursor={{fill: '#f8fafc'}} contentStyle={{ borderRadius: '20px', border: 'none', boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)' }} />
                    <Bar dataKey="value" fill={activeChart.color} radius={[10, 10, 0, 0]} />
                  </BarChart>
                )}
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
