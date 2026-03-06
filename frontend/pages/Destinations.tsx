
import React from 'react';
import { AppScreen, BeachDestination } from '../types';
import { ChevronLeft, MapPin, Star, CalendarCheck } from 'lucide-react';

export const BEACHES: BeachDestination[] = [
  {
    id: 1,
    title: "Porto de Galinhas, PE",
    description: "Piscinas naturais de águas cristalinas e vida marinha exuberante.",
    fullDescription: "Porto de Galinhas é um dos destinos mais famosos do Nordeste brasileiro. Suas piscinas naturais, formadas por arrecifes de corais, permitem observar peixes coloridos em águas mornas e transparentes. O passeio de jangada é obrigatório para quem visita a região.",
    imageUrl: "",
    location: "Ipojuca, Pernambuco",
    price: "R$ 1.850"
  },
  {
    id: 2,
    title: "Fernando de Noronha, PE",
    description: "Um santuário ecológico com as praias mais bonitas do mundo.",
    fullDescription: "Noronha é um arquipélago vulcânico situado a cerca de 350 quilômetros da costa nordeste do Brasil. É famoso por suas praias subdesenvolvidas e por atividades como mergulho e snorkeling. Tartarugas marinhas, raias, golfinhos e tubarões de recife vivem nas águas quentes e cristalinas.",
    imageUrl: "",
    location: "Fernando de Noronha, Pernambuco",
    price: "R$ 4.200"
  },
  {
    id: 3,
    title: "Arraial do Cabo, RJ",
    description: "Conhecido como o 'Caribe Brasileiro' por suas águas azul-turquesa.",
    fullDescription: "Arraial do Cabo combina o charme de uma vila de pescadores com praias de areia branca e mar azul-turquesa. É um dos melhores pontos de mergulho do país devido à ressurgência, que traz águas profundas e ricas em nutrientes para a superfície.",
    imageUrl: "",
    location: "Arraial do Cabo, Rio de Janeiro",
    price: "R$ 1.200"
  },
  {
    id: 4,
    title: "Jericoacoara, CE",
    description: "Redes na água e um pôr do sol inesquecível em dunas brancas.",
    fullDescription: "Jeri é um lugar único, onde as ruas são de areia e não há iluminação pública. A Lagoa do Paraíso, com suas redes dentro d'água, é o cartão postal da vila. O pôr do sol na duna é um ritual diário para moradores e turistas.",
    imageUrl: "",
    location: "Jijoca de Jericoacoara, Ceará",
    price: "R$ 2.100"
  }
];

interface DestinationsProps {
  onNavigate: (s: AppScreen) => void;
  onSelectDestination: (d: BeachDestination) => void;
}

const Destinations: React.FC<DestinationsProps> = ({ onNavigate, onSelectDestination }) => {
  return (
    <div className="space-y-8 pb-12 animate-fadeIn">
      <button 
        onClick={() => onNavigate('home')}
        className="flex items-center gap-2 text-slate-500 hover:text-green-600 transition-colors"
      >
        <ChevronLeft size={20} /> Voltar para o início
      </button>

      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-slate-900">Nossos Destinos</h1>
        <p className="text-slate-500 max-w-2xl mx-auto">Explore as melhores praias e roteiros que selecionamos para sua próxima viagem.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {BEACHES.map((beach) => (
          <div key={beach.id} className="bg-white rounded-[2.5rem] overflow-hidden shadow-sm border border-slate-100 group hover:shadow-xl transition-all duration-500">
            <div className="p-8 space-y-4">
              <div className="flex items-center gap-2 text-green-600 font-semibold text-sm uppercase tracking-wider">
                <MapPin size={16} /> {beach.location || beach.title.split(',')[1].trim()}
              </div>
              <div className="flex justify-between items-start">
                <h3 className="text-2xl font-bold text-slate-800">{beach.title}</h3>
                <div className="bg-orange-50 text-orange-500 px-3 py-1 rounded-full flex items-center gap-1 font-bold text-sm">
                  <Star size={14} fill="currentColor" /> 4.9
                </div>
              </div>
              <p className="text-slate-500 leading-relaxed">{beach.description}</p>
              <div className="pt-4 border-t border-slate-50 flex justify-between items-center mb-4">
                <span className="text-slate-400 text-sm">A partir de</span>
                <span className="text-xl font-bold text-green-600">{beach.price}</span>
              </div>
              <button 
                onClick={() => alert(`Reserva iniciada para: ${beach.title}`)}
                className="w-full py-4 bg-green-600 text-white rounded-2xl font-bold hover:bg-green-700 hover:-translate-y-1 transition-all flex items-center justify-center gap-2 shadow-lg shadow-green-100"
              >
                <CalendarCheck size={20} /> Reservar Agora
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Destinations;
