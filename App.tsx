
import React, { useState, useEffect } from 'react';
import { Navigation } from './components/Navigation';
import { Dashboard } from './components/Dashboard';
import { Academy } from './components/Academy';
import { AITutor } from './components/AITutor';
import { LandingPage } from './components/LandingPage';
import { supabase } from './services/supabaseClient';
import { Zap } from 'lucide-react';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState({ name: '', email: '', keyword: '' });

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        setIsAuthenticated(true);
        setUserData({
          name: session.user.user_metadata?.full_name || session.user.email,
          email: session.user.email || '',
          keyword: session.user.user_metadata?.keyword || 'IA General'
        });
      }
      setLoading(false);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session) {
        setIsAuthenticated(true);
        setUserData({
          name: session.user.user_metadata?.full_name || session.user.email,
          email: session.user.email || '',
          keyword: session.user.user_metadata?.keyword || 'IA General'
        });
      } else {
        setIsAuthenticated(false);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleSignup = (name: string, email: string, keyword: string) => {
    setUserData({ name, email, keyword });
    setIsAuthenticated(true);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#f8fafc] gap-4">
        <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin shadow-lg shadow-blue-200"></div>
        <p className="text-blue-600 font-black text-[10px] uppercase tracking-[0.4em]">Iniciando Núcleo...</p>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <LandingPage onSignup={handleSignup} />;
  }

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-900">
      <Navigation activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <main className="pt-24 pb-20">
        <div className="max-w-7xl mx-auto px-6 mb-8">
          <div className="glass inline-flex items-center gap-4 px-6 py-3 rounded-2xl border border-white shadow-sm">
            <div className="w-2 h-2 bg-blue-600 rounded-full animate-pulse shadow-[0_0_8px_rgba(37,99,235,1)]" />
            <p className="text-xs font-black uppercase tracking-widest text-slate-500">
              Operador: <span className="text-blue-600">{userData.name}</span> 
              <span className="mx-4 text-slate-200">|</span> 
              Sintonía: <span className="text-cyan-600">{userData.keyword}</span>
            </p>
          </div>
        </div>
        
        {activeTab === 'dashboard' ? <Dashboard /> : <Academy />}
      </main>

      <AITutor />

      <footer className="border-t border-slate-100 py-16 bg-white/50 backdrop-blur-sm">
        <div className="container mx-auto px-6 text-center">
          <p className="text-slate-400 text-[9px] font-black uppercase tracking-[0.5em]">
            EDUCATESOBREIA // TRANSMISIÓN FINALIZADA // 2024
          </p>
        </div>
      </footer>
    </div>
  );
};

export default App;
