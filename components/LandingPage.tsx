
import React, { useState, useEffect } from 'react';
import { Zap, ArrowRight, AlertCircle, Loader2, CheckCircle2 } from 'lucide-react';
import { supabase } from '../services/supabaseClient';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';

const ADOPTION_DATA = [
  { name: '2021', value: 30 },
  { name: '2022', value: 35 },
  { name: '2023', value: 45 },
  { name: '2024', value: 58 },
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

export const LandingPage: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [keyword, setKeyword] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  
  const [chartIndex, setChartIndex] = useState(0);
  const charts = [
    { title: 'Adopción Global', subtitle: '% de empresas integrando IA', data: ADOPTION_DATA, type: 'area', color: '#2563eb' },
    { title: 'Mercado Proyectado', subtitle: 'Valor en Billones USD', data: MARKET_VALUE_DATA, type: 'area', color: '#06b6d4' },
    { title: 'Eficiencia Operativa', subtitle: 'Tiempo por tarea (Horas)', data: EFFICIENCY_DATA, type: 'bar', color: '#6366f1' },
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
      const { error: dbError } = await supabase.from('leads').insert([
        { full_name: name, email, keyword }
      ]);

      if (dbError && dbError.code === '23505') {
        throw new Error('Este correo ya está registrado en nuestro sistema.');
      } else if (dbError) {
        throw dbError;
      }

      setStatus('success');
    } catch (err: any) {
      console.error('Error:', err);
      setStatus('error');
      setErrorMessage(err.message || 'Error al procesar la solicitud.');
    } finally {
      setIsProcessing(false);
    }
  };

  const activeChart = charts[chartIndex];

  return (
    <div className="min-h-screen bg-[#f8fafc] flex flex-col pt-12 md:pt-24 px-6 relative overflow-hidden">
      {/* Luces de fondo decorativas */}
      <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] bg-blue-100/40 blur-[130px] rounded-full -z-10" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] bg-indigo-100/40 blur-[130px] rounded-full -z-10" />

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
        
        {/* Lado Izquierdo: Hero + Formulario */}
        <div className="space-y-12">
          <div className="flex items-center gap-3">
            <div className="bg-blue-600 p-2 rounded-xl shadow-lg shadow-blue-200">
              <Zap className="w-6 h-6 text-white fill-current" />
            </div>
            <span className="text-2xl font-black text-slate-900 tracking-tighter uppercase">EDUCATE<span className="text-blue-600">SOBREIA</span></span>
          </div>

          <div className="space-y-6">
            <h1 className="text-6xl md:text-8xl font-black text-slate-900 leading-[0.9] tracking-tighter">
              Domina la IA, <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-500">protege tu futuro</span>
            </h1>
            <p className="text-xl text-slate-500 leading-relaxed max-w-xl font-medium">
              La newsletter técnica para mentes que no se conforman. Datos crudos, casos de éxito y estrategias de monetización.
            </p>
          </div>

          <div className="bg-white p-8 md:p-12 rounded-[3rem] border border-slate-100 shadow-2xl shadow-slate-200/50 space-y-8 relative overflow-hidden transition-all duration-500 min-h-[480px] flex flex-col justify-center">
            {status === 'success' ? (
              <div className="text-center py-10 space-y-6 animate-in fade-in zoom-in duration-500">
                <div className="flex justify-center">
                  <div className="bg-green-100 p-8 rounded-full inline-block shadow-lg shadow-green-100/50">
                    <CheckCircle2 className="w-16 h-16 text-green-600" />
                  </div>
                </div>
                <div className="space-y-3">
                  <h2 className="text-4xl font-black text-slate-900 uppercase tracking-tight">Email enviado</h2>
                  <p className="text-slate-500 text-lg font-bold">mira tu correo con las plantillas</p>
                </div>
                <div className="pt-4">
                  <span className="text-slate-400 text-[10px] font-black uppercase tracking-[0.3em]">Acceso concedido</span>
                </div>
              </div>
            ) : (
              <>
                <h2 className="text-2xl font-black text-slate-900 tracking-tight uppercase">RECIBE TU PLANTILLA</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-4">
                    <input 
                      type="text" required placeholder="Tu nombre completo"
                      value={name} onChange={(e) => setName(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-5 px-6 text-slate-900 focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all font-bold"
                    />
                    <input 
                      type="email" required placeholder="Tu mejor correo electrónico"
                      value={email} onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-5 px-6 text-slate-900 focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all font-bold"
                    />
                    <input 
                      type="text" required placeholder="¿Qué quieres aprender? (ej. SEO, Chatbots)"
                      value={keyword} onChange={(e) => setKeyword(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-5 px-6 text-slate-900 focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all font-bold"
                    />
                  </div>

                  <button 
                    disabled={isProcessing}
                    className="w-full py-5 rounded-2xl bg-[#0f172a] text-white hover:bg-black font-black text-xl flex items-center justify-center gap-3 transition-all shadow-xl hover:scale-[1.01] uppercase tracking-tighter disabled:opacity-50"
                  >
                    {isProcessing ? <Loader2 className="w-6 h-6 animate-spin" /> : 'RECIBE LAS PLANTILLAS'}
                    {!isProcessing && <ArrowRight className="w-6 h-6" />}
                  </button>
                </form>

                {status === 'error' && (
                  <div className="p-4 bg-red-50 border border-red-100 rounded-2xl flex items-center gap-3 text-red-600 text-xs font-black uppercase tracking-widest">
                    <AlertCircle className="w-5 h-5 flex-shrink-0" /> {errorMessage}
                  </div>
                )}
                
                <div className="flex items-center justify-center pt-2">
                  <div className="flex items-center gap-2 text-slate-400 text-[10px] font-black uppercase tracking-[0.2em]">
                    <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" /> SUPABASE SECURED
                  </div>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Lado Derecho: Gráficos de Datos */}
        <div className="relative">
          <div className="bg-white p-10 h-[580px] flex flex-col rounded-[3.5rem] border border-slate-100 shadow-2xl shadow-slate-200/40 relative overflow-hidden group">
            
            <div className="flex justify-between items-start mb-10">
              <div>
                <h4 className="font-black text-slate-900 text-3xl tracking-tighter leading-none mb-2">{activeChart.title}</h4>
                <p className="text-slate-400 text-sm font-medium">{activeChart.subtitle}</p>
              </div>
              <div className="flex gap-2">
                {charts.map((_, i) => (
                  <button 
                    key={i} 
                    onClick={() => setChartIndex(i)}
                    className={`w-2 h-2 rounded-full transition-all ${chartIndex === i ? 'w-6 bg-blue-600' : 'bg-slate-200'}`}
                  />
                ))}
              </div>
            </div>

            <div className="flex-1 min-h-0 w-full animate-in fade-in slide-in-from-right-4 duration-700">
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
                    <Tooltip contentStyle={{ borderRadius: '24px', border: 'none', boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)', fontWeight: 'bold' }} />
                    <Area type="monotone" dataKey="value" stroke={activeChart.color} strokeWidth={6} fillOpacity={1} fill="url(#colorValue)" />
                  </AreaChart>
                ) : (
                  <BarChart data={activeChart.data}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                    <XAxis dataKey="name" fontSize={12} axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontWeight: 'bold'}} />
                    <YAxis fontSize={12} axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontWeight: 'bold'}} />
                    <Tooltip cursor={{fill: '#f8fafc'}} contentStyle={{ borderRadius: '24px', border: 'none', boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)', fontWeight: 'bold' }} />
                    <Bar dataKey="value" fill={activeChart.color} radius={[12, 12, 0, 0]} />
                  </BarChart>
                )}
              </ResponsiveContainer>
            </div>
            
            <div className="mt-10 grid grid-cols-2 gap-6">
              <div className="p-7 bg-blue-600 rounded-[2rem] text-white shadow-xl shadow-blue-600/20">
                <p className="text-[10px] font-black uppercase opacity-60 mb-1">Crecimiento</p>
                <p className="text-3xl font-black tracking-tighter">x3.2</p>
              </div>
              <div className="p-7 bg-[#0f172a] rounded-[2rem] text-white shadow-xl shadow-slate-900/20">
                <p className="text-[10px] font-black uppercase opacity-60 mb-1">Eficiencia</p>
                <p className="text-3xl font-black tracking-tighter">+65%</p>
              </div>
            </div>
          </div>
        </div>

      </div>

      <footer className="mt-24 py-16 text-center border-t border-slate-100 bg-white/40 backdrop-blur-md">
        <p className="text-slate-400 text-[10px] font-black tracking-[0.5em] uppercase">
          © 2024 — EDUCATESOBREIA — LA NUEVA ERA DE LA INFORMACIÓN
        </p>
      </footer>
    </div>
  );
};
