
import React, { useState } from 'react';
import { Navigation } from './components/Navigation';
import { Dashboard } from './components/Dashboard';
import { Academy } from './components/Academy';
import { AITutor } from './components/AITutor';
import { LandingPage } from './components/LandingPage';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userData, setUserData] = useState({ name: '', email: '', keyword: '' });

  const handleSignup = (name: string, email: string, keyword: string) => {
    setUserData({ name, email, keyword });
    setIsAuthenticated(true);
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard />;
      case 'academy':
        return <Academy />;
      default:
        return <Dashboard />;
    }
  };

  if (!isAuthenticated) {
    return <LandingPage onSignup={handleSignup} />;
  }

  return (
    <div className="min-h-screen bg-[#f8fafc]">
      <Navigation activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <main className="pt-20 pb-20">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <p className="text-slate-500 text-sm font-medium">
            Bienvenido de nuevo, <span className="text-blue-600 font-bold">{userData.name}</span>. 
            Hoy exploramos: <span className="bg-blue-50 px-2 py-0.5 rounded border border-blue-100 text-blue-700">{userData.keyword}</span>
          </p>
        </div>
        {renderContent()}
      </main>

      <AITutor />

      <footer className="border-t border-slate-200 py-10 bg-white">
        <div className="container mx-auto px-6 text-center">
          <p className="text-slate-400 text-xs font-bold uppercase tracking-widest">
            © 2024 EDUCATESOBREIA // Potenciado por Inteligencia Artificial
          </p>
        </div>
      </footer>
    </div>
  );
};

export default App;
