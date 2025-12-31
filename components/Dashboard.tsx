
import React from 'react';
import { Brain, Trophy, MessageSquare, Plus } from 'lucide-react';

export const Dashboard: React.FC = () => {
  return (
    <div className="max-w-6xl mx-auto py-8 px-4 grid grid-cols-1 lg:grid-cols-3 gap-8">
      
      {/* Feed Principal / Comunidad */}
      <div className="lg:col-span-2 space-y-6">
        <div className="skool-card p-4 flex gap-4 items-center">
          <img src="https://picsum.photos/100/100" className="w-10 h-10 rounded-full" alt="Me" />
          <div className="flex-1 bg-slate-50 border border-slate-200 rounded-lg p-3 text-slate-400 text-sm cursor-text hover:bg-slate-100 transition-colors">
            Escribe algo para la comunidad...
          </div>
          <button className="accent-button p-2 rounded-lg">
            <Plus className="w-5 h-5" />
          </button>
        </div>

        {[1, 2, 3].map(i => (
          <div key={i} className="skool-card overflow-hidden">
            <div className="p-5 border-b border-slate-100 flex items-center gap-3">
              <img src={`https://i.pravatar.cc/150?img=${i+10}`} className="w-10 h-10 rounded-full" alt="User" />
              <div>
                <p className="font-bold text-slate-900 text-sm">Agente Neural {i}</p>
                <p className="text-xs text-slate-400 uppercase font-semibold">Hace 2 horas</p>
              </div>
            </div>
            <div className="p-5 space-y-4">
              <h3 className="text-lg font-bold text-slate-900 leading-tight">
                He descubierto un nuevo prompt para automatizar el SEO en segundos
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Estaba probando Gemini 3 y los resultados son increíbles. Aquí les comparto el workflow completo que usé para este proyecto...
              </p>
            </div>
            <div className="p-4 bg-slate-50 border-t border-slate-100 flex gap-6 px-6">
              <button className="flex items-center gap-2 text-slate-500 text-xs font-bold hover:text-blue-600 transition-colors">
                <Trophy className="w-4 h-4" /> 12 Likes
              </button>
              <button className="flex items-center gap-2 text-slate-500 text-xs font-bold hover:text-blue-600 transition-colors">
                <MessageSquare className="w-4 h-4" /> 5 Comentarios
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Sidebar de Progreso */}
      <div className="space-y-6">
        <div className="skool-card p-6">
          <h2 className="text-lg font-extrabold text-slate-900 mb-6 flex items-center gap-2">
            <Brain className="w-5 h-5 text-blue-600" />
            TU MAESTRÍA
          </h2>
          <div className="space-y-6">
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-bold uppercase text-slate-400">
                <span>Nivel 4: Iniciado</span>
                <span>85%</span>
              </div>
              <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full bg-blue-600 w-[85%] rounded-full" />
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-slate-100">
              <div className="text-center">
                <p className="text-2xl font-black text-slate-900 tracking-tighter">1,240</p>
                <p className="text-[10px] font-bold text-slate-400 uppercase">Puntos</p>
              </div>
              <div className="text-center border-l border-slate-100">
                <p className="text-2xl font-black text-slate-900 tracking-tighter">#12</p>
                <p className="text-[10px] font-bold text-slate-400 uppercase">Ranking</p>
              </div>
            </div>
          </div>
        </div>

        <div className="skool-card p-6">
          <h3 className="text-sm font-bold text-slate-900 mb-4 uppercase tracking-widest">Retos del día</h3>
          <div className="space-y-3">
            {[
              'Completa el curso de Prompts',
              'Publica un aporte útil',
              'Comenta en 2 posts'
            ].map((task, i) => (
              <div key={i} className="flex items-center gap-3 p-3 rounded-lg border border-slate-100 text-xs font-medium text-slate-700 hover:bg-slate-50 cursor-pointer transition-colors">
                <div className="w-4 h-4 rounded-full border-2 border-slate-300" />
                {task}
              </div>
            ))}
          </div>
        </div>
      </div>

    </div>
  );
};
