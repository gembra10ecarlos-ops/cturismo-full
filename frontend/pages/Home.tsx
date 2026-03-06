
import React from 'react';
import { AppScreen } from '../types';
import { Compass, Map, Heart, ArrowRight } from 'lucide-react';
import { Logo } from '../App';

interface HomeProps {
  onNavigate: (s: AppScreen) => void;
}

const Home: React.FC<HomeProps> = ({ onNavigate }) => {
  return (
    <div className="animate-fadeIn space-y-12 pb-12">
      <section className="text-center space-y-6 pt-8 md:pt-12">
        <div className="flex justify-center mb-4"><Logo size="lg" /></div>
        <h1 className="text-4xl md:text-6xl font-extrabold text-slate-900 tracking-tight">
          Bem-vindo à <span className="text-green-600">C Turismo</span>
        </h1>
        <p className="text-lg md:text-xl text-slate-500 max-w-2xl mx-auto leading-relaxed">
          Descubra os destinos mais paradisíacos do Brasil com quem entende de felicidade e liberdade.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <button onClick={() => onNavigate('login')} className="px-8 py-4 bg-green-600 text-white rounded-2xl font-bold shadow-lg shadow-green-200 hover:bg-green-700 hover:-translate-y-1 transition-all flex items-center gap-2">
            Começar Agora <ArrowRight size={20} />
          </button>
          <button onClick={() => onNavigate('register')} className="px-8 py-4 bg-white text-slate-700 border border-slate-200 rounded-2xl font-bold hover:bg-slate-50 transition-all">
            Criar Cadastro
          </button>
        </div>
      </section>

      <section className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        <div className="p-8 bg-white rounded-3xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
          <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center mb-6"><Compass size={24} /></div>
          <h4 className="text-xl font-bold mb-3 text-slate-800">Guia Completo</h4>
          <p className="text-slate-500">Roteiros detalhados para cada perfil de viajante, do aventureiro ao relaxado.</p>
        </div>
        <div className="p-8 bg-white rounded-3xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
          <div className="w-12 h-12 bg-green-100 text-green-600 rounded-2xl flex items-center justify-center mb-6"><Map size={24} /></div>
          <h4 className="text-xl font-bold mb-3 text-slate-800">Mapa de Experiências</h4>
          <p className="text-slate-500">Localize praias, restaurantes e pousadas parceiras com facilidade.</p>
        </div>
        <div className="p-8 bg-white rounded-3xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
          <div className="w-12 h-12 bg-red-100 text-red-600 rounded-2xl flex items-center justify-center mb-6"><Heart size={24} /></div>
          <h4 className="text-xl font-bold mb-3 text-slate-800">Atendimento 24h</h4>
          <p className="text-slate-500">Nossa equipe está sempre pronta para garantir que sua única preocupação seja o sol.</p>
        </div>
      </section>
    </div>
  );
};

export default Home;
