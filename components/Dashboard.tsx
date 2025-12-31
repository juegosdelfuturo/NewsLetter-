
import React, { useState, useEffect } from 'react';
import { Brain, Trophy, MessageSquare, Plus, Loader2, Globe, Zap, Sparkles } from 'lucide-react';
import { supabase } from '../services/supabaseClient';

interface Post {
  id: string;
  author: string;
  author_img: string;
  title: string;
  content: string;
  likes: number;
  comments: number;
  created_at: string;
}

export const Dashboard: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      const { data, error } = await supabase
        .from('posts')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        setPosts([
          {
            id: '1',
            author: 'Nexus Lead',
            author_img: 'https://i.pravatar.cc/150?u=nexus',
            title: 'Bienvenido al Centro de Control',
            content: 'Has sincronizado con éxito. Explora los últimos avances en la red neural.',
            likes: 42,
            comments: 12,
            created_at: new Date().toISOString()
          }
        ]);
      } else {
        setPosts(data as Post[]);
      }
      setLoading(false);
    };
    fetchPosts();
  }, []);

  return (
    <div className="max-w-6xl mx-auto py-8 px-4 grid grid-cols-1 lg:grid-cols-3 gap-8">
      
      {/* Feed Principal */}
      <div className="lg:col-span-2 space-y-6">
        <div className="bg-white p-5 rounded-3xl border border-slate-100 shadow-sm flex gap-4 items-center group">
          <img src="https://i.pravatar.cc/100?u=me" className="w-12 h-12 rounded-2xl object-cover" alt="Me" />
          <div className="flex-1 bg-slate-50 border border-slate-100 rounded-2xl p-4 text-slate-400 text-sm cursor-text hover:bg-slate-100 transition-all font-medium">
            Comparte un nuevo hallazgo...
          </div>
          <button className="bg-blue-600 text-white p-4 rounded-2xl shadow-lg shadow-blue-200 hover:scale-105 transition-all">
            <Plus className="w-6 h-6" />
          </button>
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 gap-4">
            <Loader2 className="w-12 h-12 text-blue-600 animate-spin" />
            <p className="text-slate-400 font-black text-xs uppercase tracking-[0.3em]">Sincronizando...</p>
          </div>
        ) : (
          posts.map(post => (
            <div key={post.id} className="bg-white rounded-[2.5rem] border border-slate-100 shadow-xl shadow-slate-200/20 overflow-hidden hover:border-blue-200 transition-all duration-500 group">
              <div className="p-6 border-b border-slate-50 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <img src={post.author_img || 'https://i.pravatar.cc/100'} className="w-12 h-12 rounded-2xl border border-slate-100 shadow-sm" alt="User" />
                  <div>
                    <p className="font-black text-slate-900 text-base">{post.author}</p>
                    <p className="text-[10px] text-slate-400 uppercase font-black tracking-widest flex items-center gap-1.5">
                      <Globe className="w-3 h-3" /> Transmisión Verificada
                    </p>
                  </div>
                </div>
                <div className="bg-blue-50 text-blue-600 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-tighter">
                  Nivel 4
                </div>
              </div>
              <div className="p-8 space-y-4">
                <h3 className="text-2xl font-black text-slate-900 leading-tight group-hover:text-blue-600 transition-colors">
                  {post.title}
                </h3>
                <p className="text-slate-600 text-base leading-relaxed font-medium">
                  {post.content}
                </p>
              </div>
              <div className="p-4 bg-slate-50/50 border-t border-slate-50 flex gap-6 px-8 items-center">
                <button className="flex items-center gap-2 text-slate-400 text-xs font-black uppercase tracking-widest hover:text-blue-600 transition-colors">
                  <Trophy className="w-4 h-4" /> {post.likes} Energía
                </button>
                <button className="flex items-center gap-2 text-slate-400 text-xs font-black uppercase tracking-widest hover:text-blue-600 transition-colors">
                  <MessageSquare className="w-4 h-4" /> {post.comments} Ecos
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Sidebar */}
      <div className="space-y-6">
        <div className="bg-slate-900 p-8 rounded-[2.5rem] text-white shadow-2xl shadow-blue-900/20 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-10">
            <Zap className="w-20 h-20 text-blue-400" />
          </div>
          <h2 className="text-xl font-black mb-8 flex items-center gap-3 tracking-tighter uppercase">
            <div className="bg-blue-600 p-2 rounded-xl">
              <Brain className="w-5 h-5" />
            </div>
            Neural Status
          </h2>
          <div className="space-y-8">
            <div className="space-y-3">
              <div className="flex justify-between text-[11px] font-black uppercase tracking-widest text-slate-400">
                <span>Maestría</span>
                <span className="text-blue-400">85%</span>
              </div>
              <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-blue-600 to-cyan-400 w-[85%] rounded-full shadow-[0_0_15px_rgba(37,99,235,0.6)]" />
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4 pt-6 border-t border-slate-800">
              <div className="text-center">
                <p className="text-3xl font-black text-white tracking-tighter">1,240</p>
                <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Puntos</p>
              </div>
              <div className="text-center border-l border-slate-800">
                <p className="text-3xl font-black text-white tracking-tighter">#12</p>
                <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Global</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-xl">
          <h3 className="text-xs font-black text-slate-400 mb-6 uppercase tracking-[0.3em]">Misiones Activas</h3>
          <div className="space-y-3">
            {[
              'Explora Nexus Core',
              'Interactúa con la Comunidad',
              'Sincroniza tus Datos'
            ].map((task, i) => (
              <div key={i} className="flex items-center gap-4 p-4 rounded-2xl border border-slate-50 text-xs font-black text-slate-700 hover:bg-slate-50 hover:border-blue-100 cursor-pointer transition-all group">
                <div className="w-5 h-5 rounded-lg border-2 border-slate-200 group-hover:border-blue-500 group-hover:bg-blue-50 transition-all flex items-center justify-center">
                  <div className="w-1.5 h-1.5 bg-blue-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                {task.toUpperCase()}
              </div>
            ))}
          </div>
        </div>
      </div>

    </div>
  );
};
