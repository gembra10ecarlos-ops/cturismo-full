
import React, { useState } from 'react';
import { AppScreen } from '../types';
import { Logo } from '../App';
import { Mail, ArrowRight, ChevronLeft, CheckCircle } from 'lucide-react';

interface ResetPasswordProps {
  onNavigate: (s: AppScreen) => void;
}

const ResetPassword: React.FC<ResetPasswordProps> = ({ onNavigate }) => {
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center p-4">
      <button 
        onClick={() => onNavigate('login')}
        className="self-start flex items-center gap-2 text-slate-500 hover:text-green-600 transition-colors mb-8"
      >
        <ChevronLeft size={20} /> Voltar para o Login
      </button>

      <div className="w-full max-w-md bg-white p-8 md:p-12 rounded-[2.5rem] shadow-xl shadow-slate-100 border border-slate-100 animate-slideUp">
        <div className="flex flex-col items-center gap-6 mb-8 text-center">
          <Logo size="md" />
          {!sent ? (
            <>
              <h2 className="text-3xl font-bold text-slate-800">Recuperar Senha</h2>
              <p className="text-slate-400">Insira seu email para receber um link de redefinição.</p>
            </>
          ) : (
            <div className="flex flex-col items-center gap-4 py-4">
              <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center shadow-inner">
                <CheckCircle size={40} />
              </div>
              <h2 className="text-3xl font-bold text-slate-800">Email Enviado!</h2>
              <p className="text-slate-400">Verifique sua caixa de entrada para continuar.</p>
            </div>
          )}
        </div>

        {!sent ? (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700 ml-1">Email Cadastrado</label>
              <div className="relative group">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-green-500 transition-colors" size={20} />
                <input 
                  type="email" 
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition-all"
                  placeholder="seu@email.com"
                />
              </div>
            </div>

            <button 
              type="submit"
              className="w-full py-4 bg-green-600 text-white rounded-2xl font-bold shadow-lg shadow-green-100 hover:bg-green-700 transition-all flex items-center justify-center gap-2 group"
            >
              Enviar Link <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </form>
        ) : (
          <button 
            onClick={() => onNavigate('login')}
            className="w-full py-4 bg-slate-100 text-slate-700 rounded-2xl font-bold hover:bg-slate-200 transition-all"
          >
            Voltar ao Login
          </button>
        )}
      </div>
    </div>
  );
};

export default ResetPassword;
