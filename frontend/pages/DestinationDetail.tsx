
import React from 'react';
import { AppScreen, BeachDestination } from '../types';
import { ChevronLeft, MapPin, Star, Calendar, Users, ShieldCheck, ArrowRight } from 'lucide-react';

interface DestinationDetailProps {
  destination: BeachDestination;
  onNavigate: (s: AppScreen) => void;
}

const DestinationDetail: React.FC<DestinationDetailProps> = ({ destination, onNavigate }) => {
  return (
    <div className="space-y-8 pb-12 animate-fadeIn">
      <button 
        onClick={() => onNavigate('destinations')}
        className="flex items-center gap-2 text-slate-500 hover:text-green-600 transition-colors"
      >
        <ChevronLeft size={20} /> Voltar para destinos
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Imagem e Galeria */}
        <div className="space-y-4">
          <div className="h-[500px] rounded-[3rem] overflow-hidden shadow-2xl">
            <img 
              src={destination.imageUrl} 
              alt={destination.title} 
              className="w-full h-full object-cover"
            />
          </div>
          <div className="grid grid-cols-3 gap-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-32 rounded-3xl bg-slate-200 overflow-hidden opacity-60 hover:opacity-100 transition-opacity cursor-pointer">
                <img src={destination.imageUrl} className="w-full h-full object-cover" alt="Galeria" />
              </div>
            ))}
          </div>
        </div>

        {/* Informações e Reserva */}
        <div className="space-y-8">
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-green-600 font-bold text-sm uppercase tracking-widest">
              <MapPin size={18} /> {destination.location || 'Brasil'}
            </div>
            <h1 className="text-5xl font-extrabold text-slate-900">{destination.title}</h1>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1 text-orange-500 font-bold">
                <Star size={20} fill="currentColor" /> 4.9 (120 avaliações)
              </div>
              <div className="h-4 w-[1px] bg-slate-200"></div>
              <div className="text-slate-500 font-medium">Destino Premium</div>
            </div>
          </div>

          <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm space-y-6">
            <h3 className="text-xl font-bold text-slate-800">Sobre este destino</h3>
            <p className="text-slate-500 leading-relaxed text-lg">
              {destination.fullDescription || destination.description}
            </p>
            <div className="grid grid-cols-2 gap-6 pt-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center">
                  <Calendar size={20} />
                </div>
                <div>
                  <p className="text-xs text-slate-400 font-bold uppercase">Duração</p>
                  <p className="text-sm font-bold text-slate-700">7 Dias / 6 Noites</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-green-50 text-green-600 rounded-xl flex items-center justify-center">
                  <Users size={20} />
                </div>
                <div>
                  <p className="text-xs text-slate-400 font-bold uppercase">Grupo</p>
                  <p className="text-sm font-bold text-slate-700">Máx. 12 pessoas</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-slate-900 p-8 rounded-[2.5rem] text-white flex items-center justify-between">
            <div>
              <p className="text-slate-400 text-sm font-bold uppercase">A partir de</p>
              <p className="text-3xl font-bold text-green-500">{destination.price || 'R$ 2.490'}</p>
            </div>
            <button className="px-8 py-4 bg-green-600 hover:bg-green-700 rounded-2xl font-bold transition-all flex items-center gap-2">
              Reservar Agora <ArrowRight size={20} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DestinationDetail;
