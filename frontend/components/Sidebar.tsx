
import React from 'react';
import { Home, Users, LogIn, UserPlus, Key, X, ChevronRight, Settings, Info, ShieldCheck, Map } from 'lucide-react';
import { AppScreen } from '../types';
import { Logo } from '../App';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (screen: AppScreen) => void;
  role: 'user' | 'admin' | null;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose, onNavigate, role }) => {
  const menuItems = [
    { label: 'Início', icon: Home, screen: 'home' as AppScreen },
    { label: 'Destinos', icon: Map, screen: 'destinations' as AppScreen },
    { label: 'Acessar Conta', icon: LogIn, screen: 'login' as AppScreen },
    { label: 'Cadastrar', icon: UserPlus, screen: 'register' as AppScreen },
    { label: 'Área do Admin', icon: ShieldCheck, screen: 'admin-login' as AppScreen },
  ];

  if (role === 'admin') {
    menuItems.push({ label: 'Painel Admin', icon: Users, screen: 'admin' as AppScreen });
  }

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 transition-opacity" onClick={onClose} />
      )}
      <aside className={`fixed top-0 left-0 h-full w-72 bg-white z-[60] shadow-2xl transition-transform duration-300 transform ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="p-6 flex flex-col h-full">
          <div className="flex items-center justify-between mb-8">
            <Logo size="sm" />
            <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full text-gray-400">
              <X size={20} />
            </button>
          </div>
          <div className="space-y-1 overflow-y-auto flex-1 custom-scrollbar">
            {menuItems.map((item) => (
              <button
                key={item.label}
                onClick={() => onNavigate(item.screen)}
                className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-green-50 hover:text-green-700 transition-all text-gray-600 group"
              >
                <div className="flex items-center gap-3">
                  <item.icon size={20} className="group-hover:scale-110 transition-transform" />
                  <span className="font-medium">{item.label}</span>
                </div>
                <ChevronRight size={16} className="opacity-0 group-hover:opacity-100 transition-opacity" />
              </button>
            ))}
          </div>
          <div className="pt-6 mt-6 border-t border-gray-100 space-y-2">
            <button className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-gray-100 transition-all text-gray-500 text-sm">
              <Settings size={18} /><span>Configurações</span>
            </button>
            <button className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-gray-100 transition-all text-gray-500 text-sm">
              <Info size={18} /><span>Sobre C Turismo</span>
            </button>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
