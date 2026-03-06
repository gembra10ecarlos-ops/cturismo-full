
import React, { useState } from 'react';
import { AppScreen } from '../types';
import { Logo } from '../App';
import { Lock, ShieldCheck, ChevronLeft, LogIn } from 'lucide-react';

interface AdminLoginProps {
  onNavigate: (s: AppScreen) => void;
  onLogin: () => void;
}

const AdminLogin: React.FC<AdminLoginProps> = ({ onNavigate, onLogin }) => {
  const [user, setUser] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulação de login administrativo
    if (user === 'admin' && password === 'admin123') {
      onLogin();
      onNavigate('admin');
    } else {
      setError('Credenciais administrativas inválidas.');
    }
  };

  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center p-4">
      <button 
        onClick={() => onNavigate('home')}
        className="self-start flex items-center gap-2 text-slate-500 hover:text-green-600 transition-colors mb-8"
      >
        <ChevronLeft size={20} /> Voltar para o início
      </button>

      <div className="w-full max-w-md bg-slate-900 p-8 md:p-12 rounded-[2.5rem] shadow-2xl border border-slate-800 animate-slideUp text-white">
        <div className="flex flex-col items-center gap-6 mb-10">
          <div className="bg-green-500/20 p-4 rounded-full">
            <ShieldCheck size={48} className="text-green-500" />
          </div>
          <div className="text-center">
            <h2 className="text-3xl font-bold">Acesso Restrito</h2>
            <p className="text-slate-400 mt-2">Painel de Controle C Turismo</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <div className="bg-red-500/10 border border-red-500/50 text-red-500 p-3 rounded-xl text-sm text-center">
              {error}
            </div>
          )}
          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-300 ml-1">Usuário Admin</label>
            <div className="relative group">
              <ShieldCheck className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-green-500 transition-colors" size={20} />
              <input 
                type="text" 
                required
                value={user}
                onChange={(e) => setUser(e.target.value)}
                className="w-full pl-12 pr-4 py-4 bg-slate-800 border border-slate-700 rounded-2xl focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition-all text-white"
                placeholder="admin"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-300 ml-1">Senha Mestra</label>
            <div className="relative group">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-green-500 transition-colors" size={20} />
              <input 
                type="password" 
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-12 pr-4 py-4 bg-slate-800 border border-slate-700 rounded-2xl focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition-all text-white"
                placeholder="••••••••"
              />
            </div>
          </div>

          <button 
            type="submit"
            className="w-full py-4 bg-green-600 text-white rounded-2xl font-bold shadow-lg shadow-green-900/20 hover:bg-green-700 transition-all flex items-center justify-center gap-2 group"
          >
            Acessar Painel <LogIn size={20} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
