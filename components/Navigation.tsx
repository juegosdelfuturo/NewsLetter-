
import React from 'react';
import { LayoutDashboard, GraduationCap, Code2, Users2, Zap } from 'lucide-react';

interface NavigationProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export const Navigation: React.FC<NavigationProps> = ({ activeTab, setActiveTab }) => {
  const tabs = [
    { id: 'dashboard', label: 'Comunidad', icon: <Users2 className="w-5 h-5" /> },
    { id: 'academy', label: 'Cursos', icon: <GraduationCap className="w-5 h-5" /> },
    { id: 'sandbox', label: 'Laboratorio', icon: <Code2 className="w-5 h-5" /> },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-slate-200 px-6 h-16 flex justify-between items-center shadow-sm">
      <div className="flex items-center gap-2 cursor-pointer" onClick={() => setActiveTab('dashboard')}>
        <Zap className="w-6 h-6 text-blue-600 fill-current" />
        <span className="text-xl font-extrabold text-slate-900 tracking-tighter">EDUCATESOBREIA</span>
      </div>

      <div className="flex h-full">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 px-6 h-full text-sm font-bold transition-all relative ${
              activeTab === tab.id ? 'text-blue-600' : 'text-slate-500 hover:text-slate-900'
            }`}
          >
            {tab.icon}
            {tab.label}
            {activeTab === tab.id && (
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-blue-600 rounded-t-full" />
            )}
          </button>
        ))}
      </div>

      <div className="flex items-center gap-3">
        <div className="hidden sm:flex flex-col items-end">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Nivel 4</span>
          <span className="text-xs font-bold text-slate-900">1,240 pts</span>
        </div>
        <img src="https://picsum.photos/100/100" alt="Profile" className="w-9 h-9 rounded-full border border-slate-200" />
      </div>
    </nav>
  );
};
