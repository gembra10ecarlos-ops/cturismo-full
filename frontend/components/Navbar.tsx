
import React from 'react';
import { Menu, User, Bell, ShieldCheck } from 'lucide-react';
import { Logo } from '../App';

interface NavbarProps {
  onMenuClick: () => void;
  onLogoClick: () => void;
  role: 'user' | 'admin' | null;
}

const Navbar: React.FC<NavbarProps> = ({ onMenuClick, onLogoClick, role }) => {
  return (
    <nav className="sticky top-0 z-40 w-full bg-white/80 backdrop-blur-md border-b border-gray-100 shadow-sm px-4 md:px-8 py-3 flex items-center justify-between">
      <div className="flex items-center gap-4">
        <button onClick={onMenuClick} className="p-2 hover:bg-gray-100 rounded-lg transition-colors text-gray-600 lg:hidden">
          <Menu size={24} />
        </button>
        <button onClick={onMenuClick} className="hidden lg:flex p-2 hover:bg-gray-100 rounded-lg transition-colors text-gray-600 items-center gap-2">
          <Menu size={24} /><span className="text-sm font-medium">Menu</span>
        </button>
        <div onClick={onLogoClick} className="cursor-pointer"><Logo size="sm" /></div>
      </div>
      <div className="flex items-center gap-3">
        <button className="p-2 hover:bg-gray-100 rounded-full text-gray-500 transition-all"><Bell size={20} /></button>
        <div className="h-8 w-[1px] bg-gray-200 mx-1"></div>
        <button className="flex items-center gap-2 pl-2 pr-1 py-1 hover:bg-gray-100 rounded-full transition-all group">
          <span className="text-sm font-medium text-gray-700 group-hover:text-green-600 hidden sm:inline">
            {role === 'admin' ? 'Administrador' : 'Visitante'}
          </span>
          <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold border ${role === 'admin' ? 'bg-slate-900 text-green-500 border-slate-800' : 'bg-green-100 text-green-600 border-green-200'}`}>
            {role === 'admin' ? <ShieldCheck size={18} /> : <User size={18} />}
          </div>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
