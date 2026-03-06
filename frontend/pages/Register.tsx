
import React, { useState } from 'react';
import { AppScreen, Customer } from '../types';
import { Logo } from '../App';
import { User, Mail, Shield, UserCheck, ChevronLeft, CreditCard, Building } from 'lucide-react';

interface RegisterProps {
  onNavigate: (s: AppScreen) => void;
  onRegister: (data: Omit<Customer, 'id' | 'createdAt' | 'status'>) => void;
}

const Register: React.FC<RegisterProps> = ({ onNavigate, onRegister }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    login: '',
    password: '',
    cpf: '',
    cnpj: '',
    type: 'PF' as 'PF' | 'PJ'
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (formData.type === 'PF' && !formData.cpf) {
      alert('Por favor, preencha o CPF');
      return;
    }
    if (formData.type === 'PJ' && !formData.cnpj) {
      alert('Por favor, preencha o CNPJ');
      return;
    }

    onRegister({
      name: formData.name,
      email: formData.email,
      login: formData.login,
      cpf: formData.type === 'PF' ? formData.cpf : '',
      cnpj: formData.type === 'PJ' ? formData.cnpj : ''
    });
  };

  return (
    <div className="max-w-4xl mx-auto py-8">
      <button 
        onClick={() => onNavigate('home')}
        className="flex items-center gap-2 text-slate-500 hover:text-green-600 transition-colors mb-8"
      >
        <ChevronLeft size={20} /> Voltar para o início
      </button>

      <div className="bg-white rounded-[2.5rem] shadow-xl shadow-slate-100 border border-slate-100 overflow-hidden flex flex-col md:flex-row">
        {/* Left Side: Info */}
        <div className="md:w-1/3 bg-green-600 p-8 md:p-12 text-white flex flex-col justify-between">
          <div>
            <div className="bg-white/20 w-fit p-3 rounded-2xl mb-8">
              <UserCheck size={32} />
            </div>
            <h2 className="text-3xl font-bold mb-4">Crie sua Conta</h2>
            <p className="text-green-50 opacity-90 leading-relaxed">
              Junte-se à nossa comunidade de viajantes e tenha acesso a ofertas exclusivas.
            </p>
          </div>
          
          <div className="space-y-4 mt-12">
            <div className="flex items-center gap-3">
              <div className="w-1 h-1 rounded-full bg-white"></div>
              <span className="text-sm">Cadastro rápido e seguro</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-1 h-1 rounded-full bg-white"></div>
              <span className="text-sm">Suporte especializado</span>
            </div>
          </div>
        </div>

        {/* Right Side: Form */}
        <div className="md:w-2/3 p-8 md:p-12">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700">Nome Completo</label>
                <div className="relative group">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-green-500 transition-colors" size={18} />
                  <input 
                    type="text" 
                    required
                    className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500/10 focus:border-green-500 transition-all"
                    placeholder="Ex: João Silva"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700">Email</label>
                <div className="relative group">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-green-500 transition-colors" size={18} />
                  <input 
                    type="email" 
                    required
                    className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500/10 focus:border-green-500 transition-all"
                    placeholder="joao@email.com"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                  />
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700">Login de Usuário</label>
                <div className="relative group">
                  <Shield className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-green-500 transition-colors" size={18} />
                  <input 
                    type="text" 
                    required
                    className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500/10 focus:border-green-500 transition-all"
                    placeholder="joao_viagens"
                    value={formData.login}
                    onChange={(e) => setFormData({...formData, login: e.target.value})}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700">Senha</label>
                <div className="relative group">
                  <UserCheck className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-green-500 transition-colors" size={18} />
                  <input 
                    type="password" 
                    required
                    className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500/10 focus:border-green-500 transition-all"
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={(e) => setFormData({...formData, password: e.target.value})}
                  />
                </div>
              </div>
            </div>

            <div className="space-y-4 pt-4">
              <div className="flex gap-4">
                <button 
                  type="button"
                  onClick={() => setFormData({...formData, type: 'PF'})}
                  className={`flex-1 py-3 rounded-xl border flex items-center justify-center gap-2 font-semibold transition-all ${formData.type === 'PF' ? 'bg-green-50 border-green-200 text-green-700 shadow-sm' : 'bg-slate-50 border-slate-100 text-slate-500 hover:bg-slate-100'}`}
                >
                  <CreditCard size={18} /> Pessoa Física
                </button>
                <button 
                  type="button"
                  onClick={() => setFormData({...formData, type: 'PJ'})}
                  className={`flex-1 py-3 rounded-xl border flex items-center justify-center gap-2 font-semibold transition-all ${formData.type === 'PJ' ? 'bg-green-50 border-green-200 text-green-700 shadow-sm' : 'bg-slate-50 border-slate-100 text-slate-500 hover:bg-slate-100'}`}
                >
                  <Building size={18} /> Pessoa Jurídica
                </button>
              </div>

              {formData.type === 'PF' ? (
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-700">CPF</label>
                  <input 
                    type="text" 
                    required={formData.type === 'PF'}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500/10 focus:border-green-500 transition-all"
                    placeholder="000.000.000-00"
                    value={formData.cpf}
                    onChange={(e) => setFormData({...formData, cpf: e.target.value})}
                  />
                </div>
              ) : (
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-700">CNPJ</label>
                  <input 
                    type="text" 
                    required={formData.type === 'PJ'}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500/10 focus:border-green-500 transition-all"
                    placeholder="00.000.000/0000-00"
                    value={formData.cnpj}
                    onChange={(e) => setFormData({...formData, cnpj: e.target.value})}
                  />
                </div>
              )}
            </div>

            <button 
              type="submit"
              className="w-full py-4 bg-green-600 text-white rounded-2xl font-bold shadow-lg shadow-green-100 hover:bg-green-700 transition-all transform hover:-translate-y-1"
            >
              Finalizar Cadastro
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
