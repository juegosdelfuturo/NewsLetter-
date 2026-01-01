
import React, { useState } from 'react';
import { Zap, ArrowRight, Loader2, CheckCircle2, AlertCircle } from 'lucide-react';
import { supabase } from '../services/supabaseClient';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const ADOPTION_DATA = [
  { name: '2021', value: 31 },
  { name: '2022', value: 34 },
  { name: '2023', value: 46 },
  { name: '2024', value: 58 },
];

export const LandingPage: React.FC = () => {
  const [formData, setFormData] = useState({ name: '', email: '', keyword: '' });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    
    try {
      const { error } = await supabase.from('leads').insert([
        { 
          full_name: formData.name, 
          email: formData.email, 
          keyword: formData.keyword 
        }
      ]);

      if (error) throw error;
      setStatus('success');
    } catch (err: any) {
      console.error(err);
      setErrorMsg(err.message === 'duplicate key value violates unique constraint "leads_email_key"' 
        ? 'Este correo ya está registrado.' 
        : 'Error al conectar con el servidor.');
      setStatus('error');
    }
  };

  return (
    <div className="min-h-screen relative flex items-center justify-center py-12 px-6">
      {/* Background Elements */}
      <div className="bg-blur bg-blue-200 top-[-10%] right-[-10%]" />
      <div className="bg-blur bg-indigo-200 bottom-[-10%] left-[-10%]" />

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center w-full">
        
        {/* Left Side: Content and Form */}
        <div className="space-y-10">
          <div className="flex items-center gap-3">
            <div className="bg-[#2563eb] p-2 rounded-xl shadow-lg shadow-blue-200">
              <Zap className="w-6 h-6 text-white fill-current" />
            </div>
            <span className="text-2xl font-black tracking-tighter uppercase text-[#0f172a]">
              EDUCATE<span className="text-[#2563eb]">SOBREIA</span>
            </span>
          </div>

          <div className="space-y-6">
            <h1 className="text-6xl md:text-8xl font-black text-[#0f172a] leading-[0.9] tracking-tighter">
              Domina la IA, <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#2563eb] to-[#6366f1]">protege tu futuro</span>
            </h1>
            <p className="text-xl text-slate-500 max-w-lg font-medium leading-relaxed">
              La newsletter técnica para mentes que no se conforman. Datos crudos, casos de éxito y estrategias de monetización.
            </p>
          </div>

          {/* Form Card */}
          <div className="bg-white p-10 rounded-[2.5rem] shadow-2xl shadow-slate-200/60 border border-slate-50 relative overflow-hidden min-h-[460px] flex flex-col justify-center transition-all duration-700">
            {status === 'success' ? (
              <div className="text-center space-y-6 animate-in fade-in zoom-in duration-500">
                <div className="flex justify-center">
                  <div className="bg-green-100 p-6 rounded-full inline-block">
                    <CheckCircle2 className="w-16 h-16 text-green-600" />
                  </div>
                </div>
                <div className="space-y-2">
                  <h2 className="text-4xl font-black text-slate-900 uppercase tracking-tight">Email enviado</h2>
                  <p className="text-slate-500 text-lg font-bold">mira tu correo con las plantillas</p>
                </div>
                <div className="flex justify-center gap-2 pt-4">
                  <div className="w-2 h-2 rounded-full bg-green-500" />
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Suscripción activa</span>
                </div>
              </div>
            ) : (
              <>
                <h3 className="text-2xl font-black text-slate-900 mb-8 uppercase tracking-tight">RECIBE TU PLANTILLA</h3>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <input 
                    required type="text" placeholder="Tu nombre completo"
                    className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-5 px-6 font-bold text-slate-900 focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all"
                    value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})}
                  />
                  <input 
                    required type="email" placeholder="Tu mejor correo electrónico"
                    className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-5 px-6 font-bold text-slate-900 focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all"
                    value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})}
                  />
                  <input 
                    required type="text" placeholder="¿Qué quieres aprender? (ej. SEO, Chatbots)"
                    className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-5 px-6 font-bold text-slate-900 focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all"
                    value={formData.keyword} onChange={e => setFormData({...formData, keyword: e.target.value})}
                  />
                  <button 
                    disabled={status === 'loading'}
                    className="w-full py-5 rounded-2xl bg-[#0f172a] text-white hover:bg-black font-black text-xl flex items-center justify-center gap-3 transition-all shadow-xl hover:scale-[1.01] uppercase tracking-tighter disabled:opacity-50"
                  >
                    {status === 'loading' ? <Loader2 className="w-6 h-6 animate-spin" /> : 'RECIBE LAS PLANTILLAS'}
                    {status !== 'loading' && <ArrowRight className="w-6 h-6" />}
                  </button>
                </form>
                {status === 'error' && (
                  <div className="mt-4 p-4 bg-red-50 text-red-600 rounded-2xl flex items-center gap-3 text-sm font-bold uppercase tracking-tight">
                    <AlertCircle className="w-5 h-5" /> {errorMsg}
                  </div>
                )}
                <div className="flex items-center justify-center mt-6 gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">SUPABASE SECURED</span>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Right Side: Charts Card */}
        <div className="relative lg:block">
          <div className="bg-white p-12 rounded-[3.5rem] shadow-2xl shadow-slate-200/50 border border-slate-50 h-[600px] flex flex-col">
            <div className="mb-10 flex justify-between items-start">
              <div>
                <h4 className="text-3xl font-black text-slate-900 tracking-tighter leading-none mb-2">Adopción Global</h4>
                <p className="text-slate-400 font-bold text-sm tracking-tight">% de empresas integrando IA</p>
              </div>
              <div className="flex gap-2">
                <div className="w-8 h-2 bg-blue-600 rounded-full" />
                <div className="w-2 h-2 bg-slate-200 rounded-full" />
                <div className="w-2 h-2 bg-slate-200 rounded-full" />
              </div>
            </div>

            <div className="flex-1 w-full min-h-0">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={ADOPTION_DATA}>
                  <defs>
                    <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#2563eb" stopOpacity={0.2}/>
                      <stop offset="95%" stopColor="#2563eb" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis dataKey="name" fontSize={12} axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontWeight: '900'}} />
                  <YAxis fontSize={12} axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontWeight: '900'}} />
                  <Tooltip contentStyle={{ borderRadius: '20px', border: 'none', boxShadow: '0 20px 25px -5px rgba(0,0,0,0.1)', fontWeight: 'bold' }} />
                  <Area type="monotone" dataKey="value" stroke="#2563eb" strokeWidth={5} fillOpacity={1} fill="url(#colorValue)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            <div className="mt-12 grid grid-cols-2 gap-6">
              <div className="bg-[#2563eb] p-8 rounded-[2.5rem] text-white shadow-xl shadow-blue-500/30">
                <p className="text-[10px] font-black uppercase opacity-60 mb-1 tracking-widest">CRECIMIENTO</p>
                <p className="text-4xl font-black tracking-tighter">x3.2</p>
              </div>
              <div className="bg-[#0f172a] p-8 rounded-[2.5rem] text-white shadow-xl shadow-slate-900/30">
                <p className="text-[10px] font-black uppercase opacity-60 mb-1 tracking-widest">EFICIENCIA</p>
                <p className="text-4xl font-black tracking-tighter">+65%</p>
              </div>
            </div>
          </div>
        </div>

      </div>

      <footer className="absolute bottom-8 left-0 right-0 text-center">
        <p className="text-slate-400 text-[9px] font-black tracking-[0.6em] uppercase opacity-50">
          © 2024 — EDUCATESOBREIA — LA NUEVA ERA DE LA INFORMACIÓN
        </p>
      </footer>
    </div>
  );
};
