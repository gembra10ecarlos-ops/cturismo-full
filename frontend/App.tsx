
import React, { useState, useEffect } from 'react';
import { AppScreen, Customer, UserAuth, BeachDestination } from './types';
import Home from './pages/Home';
import Login from './pages/Login';
import AdminLogin from './pages/AdminLogin';
import Register from './pages/Register';
import Admin from './pages/Admin';
import Destinations from './pages/Destinations';
import DestinationDetail from './pages/DestinationDetail';
import ResetPassword from './pages/ResetPassword';
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';
import { api } from './api';

export const Logo: React.FC<{ size?: 'sm' | 'md' | 'lg' }> = ({ size = 'md' }) => {
  const sizes = { sm: 'h-8', md: 'h-12', lg: 'h-24' };
  return (
    <div className={`flex items-center select-none ${sizes[size]} group cursor-pointer`}>
      <svg viewBox="-20 -20 440 240" preserveAspectRatio="xMidYMid meet" className="h-full w-auto overflow-visible block">
        <path d="M120 150 C 60 150, 40 100, 60 50 C 80 10, 140 10, 160 50" fill="none" stroke="#008940" strokeWidth="20" strokeLinecap="round" />
        <path d="M140 30 L 160 10 M 140 30 L 120 10 M 140 30 L 150 5" stroke="#008940" strokeWidth="8" strokeLinecap="round" />
        <circle cx="180" cy="70" r="30" fill="#FFC107" />
        <g stroke="#FF9800" strokeWidth="4">
          <line x1="180" y1="30" x2="180" y2="10" /><line x1="180" y1="110" x2="180" y2="130" />
          <line x1="220" y1="70" x2="240" y2="70" /><line x1="140" y1="70" x2="120" y2="70" />
          <line x1="210" y1="40" x2="225" y2="25" /><line x1="150" y1="100" x2="135" y2="115" />
        </g>
        <path d="M100 160 Q 150 120, 200 160 T 300 160" fill="none" stroke="#00A8E1" strokeWidth="15" strokeLinecap="round" />
        <text x="40" y="140" fontFamily="Arial Black, sans-serif" fontSize="70" fill="#008940">C Turismo</text>
      </svg>
    </div>
  );
};

const App: React.FC = () => {
  const [screen, setScreen] = useState<AppScreen>('home');
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [selectedDestination, setSelectedDestination] = useState<BeachDestination | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [auth, setAuth] = useState<UserAuth>({ isAuthenticated: false, role: null });

  const loadCustomers = async () => {
    try {
      const data = await api.getCustomers();
      setCustomers(data);
    } catch (error) {
      console.error('Erro ao carregar clientes:', error);
      alert('Não foi possível conectar ao servidor. Verifique se o backend está rodando na porta 8000.');
    }
  };

  useEffect(() => {
    loadCustomers();
  }, []);

  const handleAddCustomer = async (newCustomer: Omit<Customer, 'id' | 'createdAt' | 'status' | 'source'>) => {
    try {
      await api.createCustomer({ ...newCustomer, source: 'site' });
      await loadCustomers();
      setScreen('home');
    } catch (error) {
      alert('Erro ao cadastrar cliente');
    }
  };

  const handleUpdateCustomer = async (updatedCustomer: Customer) => {
    try {
      await api.updateCustomer(updatedCustomer.id, updatedCustomer);
      await loadCustomers();
    } catch (error) {
      alert('Erro ao atualizar cliente');
    }
  };

  const handleDeleteCustomer = async (id: string) => {
    try {
      await api.deleteCustomer(id);
      await loadCustomers();
    } catch (error) {
      alert('Erro ao deletar cliente');
    }
  };

  const handleBulkAdd = async (newCustomers: Omit<Customer, 'id' | 'createdAt' | 'status' | 'source'>[]) => {
    try {
      for (const c of newCustomers) {
        await api.createCustomer({ ...c, source: 'import' });
      }
      await loadCustomers();
    } catch (error) {
      alert('Erro na importação em massa');
    }
  };

  const handleSelectDestination = (d: BeachDestination) => {
    setSelectedDestination(d);
    setScreen('destination-detail');
  };

  const renderScreen = () => {
    switch (screen) {
      case 'home': return <Home onNavigate={setScreen} />;
      case 'login': return <Login onNavigate={setScreen} onLogin={() => setAuth({ isAuthenticated: true, role: 'user' })} />;
      case 'admin-login': return <AdminLogin onNavigate={setScreen} onLogin={() => setAuth({ isAuthenticated: true, role: 'admin' })} />;
      case 'register': return <Register onNavigate={setScreen} onRegister={handleAddCustomer} />;
      case 'reset-password': return <ResetPassword onNavigate={setScreen} />;
      case 'destinations': return <Destinations onNavigate={setScreen} onSelectDestination={handleSelectDestination} />;
      case 'destination-detail': 
        return selectedDestination ? <DestinationDetail destination={selectedDestination} onNavigate={setScreen} /> : <Destinations onNavigate={setScreen} onSelectDestination={handleSelectDestination} />;
      case 'admin': 
        return auth.role === 'admin' ? (
          <Admin 
            customers={customers} 
            onNavigate={setScreen} 
            onDeleteCustomer={handleDeleteCustomer}
            onUpdateCustomer={handleUpdateCustomer}
            onBulkAdd={handleBulkAdd}
          />
        ) : <AdminLogin onNavigate={setScreen} onLogin={() => setAuth({ isAuthenticated: true, role: 'admin' })} />;
      default: return <Home onNavigate={setScreen} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col relative bg-slate-50">
      <Sidebar 
        isOpen={isSidebarOpen} 
        onClose={() => setIsSidebarOpen(false)} 
        onNavigate={(s) => { setScreen(s); setIsSidebarOpen(false); }}
        role={auth.role}
      />
      <Navbar 
        onMenuClick={() => setIsSidebarOpen(true)} 
        onLogoClick={() => setScreen('home')}
        role={auth.role}
      />
      <main className="flex-1 w-full max-w-7xl mx-auto p-4 md:p-6 transition-all duration-300">
        {renderScreen()}
      </main>
      <footer className="py-6 border-t bg-white mt-auto">
        <div className="max-w-7xl mx-auto px-4 flex flex-col items-center gap-2">
          <div className="flex items-center gap-2">
            <Logo size="sm" />
            <span className="font-bold text-gray-700">C Turismo © 2024</span>
          </div>
          <p className="text-xs text-gray-400">Sua melhor jornada começa aqui.</p>
        </div>
      </footer>
    </div>
  );
};

export default App;
