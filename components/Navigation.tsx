
import React from 'react';
import { LayoutDashboard, GraduationCap, Code2, Users2, Zap } from 'lucide-react';

interface NavigationProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export const Navigation: React.FC<NavigationProps> = ({ activeTab, setActiveTab }) => {
  const tabs = [
    { id: 'dashboard', label: 'COMUNIDAD', icon: <Users2 className="w-4 h-4" /> },
    { id: 'academy', label: 'ACADEMIA', icon: <GraduationCap className="w-4 h-4" /> },
    { id: 'sandbox', label: 'LABORATORIO', icon: <Code2 className="w-4 h-4" /> },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-100 px-6 h-16 flex justify-between items-center shadow-sm">
      <div className="flex items-center gap-3 cursor-pointer group" onClick={() => setActiveTab('dashboard')}>
        <div className="bg-blue-600 p-1.5 rounded-lg shadow-lg shadow-blue-200 transition-transform group-hover:scale-110">
          <Zap className="w-5 h-5 text-white fill-current" />
        </div>
        <span className="text-xl font-black text-slate-900 tracking-tighter uppercase">EDUCATE<span className="text-blue-600">SOBREIA</span></span>
      </div>

      <div className="flex h-full">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 px-6 h-full text-[10px] font-black tracking-[0.2em] transition-all relative uppercase ${
              activeTab === tab.id ? 'text-blue-600' : 'text-slate-400 hover:text-slate-600'
            }`}
          >
            {tab.icon}
            {tab.label}
            {activeTab === tab.id && (
              <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-blue-600" />
            )}
          </button>
        ))}
      </div>

      <div className="flex items-center gap-4">
        <div className="hidden sm:flex flex-col items-end">
          <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Estado</span>
          <span className="text-xs font-bold text-green-500 flex items-center gap-1">
            <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" /> ONLINE
          </span>
        </div>
        <img src="https://i.pravatar.cc/100?u=nexus" alt="Profile" className="w-9 h-9 rounded-xl border border-slate-100 shadow-sm" />
      </div>
    </nav>
  );
};
