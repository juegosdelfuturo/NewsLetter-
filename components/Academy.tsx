
import React, { useState } from 'react';
import { Search, ChevronRight, PlayCircle, BookOpen, Star, Sparkles, BrainCircuit } from 'lucide-react';
import { Lesson } from '../types';

const LESSONS: Lesson[] = [
  {
    id: '1',
    title: 'Fundamentos de LLMs',
    description: 'Aprende cómo funcionan los Large Language Models desde su arquitectura Transformer.',
    difficulty: 'Principiante',
    category: 'NLP',
    content: '# Los Cimientos de la IA Moderna\n...',
    icon: <PlayCircle className="text-cyan-400" />
  },
  {
    id: '2',
    title: 'Generación de Imágenes con Difusión',
    description: 'Técnicas avanzadas para modelos como Stable Diffusion y Midjourney.',
    difficulty: 'Intermedio',
    category: 'Creatividad',
    content: '...',
    icon: <Sparkles className="text-purple-400" />
  },
  {
    id: '3',
    title: 'Prompt Engineering Maestro',
    description: 'Domina el arte de comunicarte con máquinas para obtener resultados óptimos.',
    difficulty: 'Avanzado',
    category: 'Habilidades',
    content: '...',
    icon: <BookOpen className="text-blue-400" />
  }
];

export const Academy: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('Todos');

  return (
    <div className="space-y-8 pb-20">
      <div className="flex flex-col md:flex-row justify-between items-center gap-6">
        <div>
          <h1 className="text-3xl font-orbitron font-bold text-white mb-2">ACADEMIA NEURAL</h1>
          <p className="text-slate-400">Expande tu conocimiento en la frontera tecnológica</p>
        </div>
        
        <div className="relative w-full md:w-96">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 w-5 h-5" />
          <input 
            type="text" 
            placeholder="Buscar tecnología, modelo o concepto..."
            className="w-full bg-slate-900 border border-slate-800 rounded-2xl py-3 pl-12 pr-4 text-slate-200 focus:outline-none focus:border-cyan-500/50 transition-colors"
          />
        </div>
      </div>

      {/* Categories */}
      <div className="flex gap-4 overflow-x-auto pb-4 no-scrollbar">
        {['Todos', 'NLP', 'Creatividad', 'Visión', 'Ética', 'Código'].map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-6 py-2 rounded-full border text-sm font-bold transition-all ${
              selectedCategory === cat 
                ? 'bg-cyan-500 border-cyan-400 text-black shadow-[0_0_15px_rgba(34,211,238,0.4)]' 
                : 'border-slate-800 text-slate-400 hover:border-cyan-500/30'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Lesson Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
        {LESSONS.map((lesson) => (
          <div 
            key={lesson.id} 
            className="group glass p-8 rounded-3xl border border-slate-800 hover:border-cyan-500/30 transition-all duration-500 relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 p-6 opacity-5 transition-opacity group-hover:opacity-20">
              {lesson.icon}
            </div>
            
            <div className="flex gap-2 mb-4">
              <span className="text-[10px] font-black uppercase px-2 py-1 bg-slate-900 border border-slate-800 text-cyan-400 rounded-md">
                {lesson.category}
              </span>
              <span className="text-[10px] font-black uppercase px-2 py-1 bg-slate-900 border border-slate-800 text-amber-400 rounded-md">
                {lesson.difficulty}
              </span>
            </div>

            <h3 className="text-xl font-orbitron font-bold text-white mb-3 group-hover:text-cyan-400 transition-colors">
              {lesson.title}
            </h3>
            <p className="text-slate-400 text-sm leading-relaxed mb-6">
              {lesson.description}
            </p>

            <div className="flex justify-between items-center">
              <div className="flex -space-x-2">
                {[1, 2, 3].map(i => (
                  <img key={i} src={`https://picsum.photos/30/30?random=${i}`} className="w-8 h-8 rounded-full border-2 border-slate-900" alt="Student" />
                ))}
                <div className="w-8 h-8 rounded-full border-2 border-slate-900 bg-slate-800 flex items-center justify-center text-[10px] font-bold text-slate-500">
                  +12k
                </div>
              </div>
              <button className="flex items-center gap-2 text-cyan-400 text-sm font-bold uppercase tracking-widest hover:translate-x-1 transition-transform">
                Iniciar Misión <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Featured Banner */}
      <div className="glass p-12 rounded-[2.5rem] relative overflow-hidden bg-gradient-to-br from-cyan-950/20 via-slate-900/50 to-blue-950/20 border border-cyan-500/10">
        <div className="absolute top-0 right-0 w-1/3 h-full opacity-10 pointer-events-none">
          <BrainCircuit className="w-full h-full text-cyan-400" />
        </div>
        <div className="relative z-10 max-w-2xl">
          <div className="flex items-center gap-3 mb-4 text-amber-400">
            <Star className="w-6 h-6 fill-current" />
            <span className="font-black uppercase tracking-[0.3em] text-sm">Clase Maestra</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-orbitron font-black text-white mb-6 leading-tight">
            DEEP REINFORCEMENT LEARNING: EL SIGUIENTE NIVEL
          </h2>
          <p className="text-slate-300 text-lg mb-8 leading-relaxed">
            Aprende cómo las máquinas aprenden por sí mismas en entornos competitivos. Una inmersión profunda con expertos de Silicon Valley.
          </p>
          <button className="px-10 py-4 bg-cyan-500 text-black font-black uppercase tracking-widest rounded-2xl hover:bg-cyan-400 shadow-[0_0_25px_rgba(34,211,238,0.4)] transition-all">
            Reservar Asiento Neural
          </button>
        </div>
      </div>
    </div>
  );
};
