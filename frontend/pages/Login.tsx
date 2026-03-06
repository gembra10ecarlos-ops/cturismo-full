
import React, { useState } from 'react';
import { AppScreen } from '../types';
import { Logo } from '../App';
import { Mail, Lock, LogIn, ChevronLeft } from 'lucide-react';

interface LoginProps {
  onNavigate: (s: AppScreen) => void;
  onLogin: () => void;
}

const Login: React.FC<LoginProps> = ({ onNavigate, onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      onLogin();
      onNavigate('admin');
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center p-4">
      <button 
        onClick={() => onNavigate('home')}
        className="self-start flex items-center gap-2 text-slate-500 hover:text-green-600 transition-colors mb-8"
      >
        <ChevronLeft size={20} /> Voltar para o início
      </button>

      <div className="w-full max-w-md bg-white p-8 md:p-12 rounded-[2.5rem] shadow-xl shadow-slate-200/60 border border-slate-100 animate-slideUp">
        <div className="flex flex-col items-center gap-6 mb-10">
          <Logo size="md" />
          <div className="text-center">
            <h2 className="text-3xl font-bold text-slate-800">Bem-vindo de volta</h2>
            <p className="text-slate-400 mt-2">Acesse sua conta C Turismo</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700 ml-1">Email ou Login</label>
            <div className="relative group">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-green-500 transition-colors" size={20} />
              <input 
                type="text" 
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition-all"
                placeholder="seu@email.com"
              />
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between items-center px-1">
              <label className="text-sm font-semibold text-slate-700">Senha</label>
              <button 
                type="button"
                onClick={() => onNavigate('reset-password')}
                className="text-xs font-semibold text-green-600 hover:underline"
              >
                Esqueceu a senha?
              </button>
            </div>
            <div className="relative group">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-green-500 transition-colors" size={20} />
              <input 
                type="password" 
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition-all"
                placeholder="••••••••"
              />
            </div>
          </div>

          <button 
            type="submit"
            disabled={loading}
            className="w-full py-4 bg-green-600 text-white rounded-2xl font-bold shadow-lg shadow-green-100 hover:bg-green-700 transition-all flex items-center justify-center gap-2 group disabled:opacity-70"
          >
            {loading ? (
              <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
            ) : (
              <>
                Entrar <LogIn size={20} className="group-hover:translate-x-1 transition-transform" />
              </>
            )}
          </button>
        </form>

        <div className="mt-10 pt-8 border-t border-slate-50 text-center">
          <p className="text-slate-500 text-sm">
            Não tem uma conta?{' '}
            <button 
              onClick={() => onNavigate('register')}
              className="text-green-600 font-bold hover:underline"
            >
              Crie agora
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
