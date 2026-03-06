
import { Customer } from './types';

// Simulação de Banco de Dados SQLite usando LocalStorage com interface de persistência
// Em um ambiente real com Node.js, usaríamos 'sqlite3' ou 'better-sqlite3'
// Como este é um projeto frontend Vite, simularemos a camada de persistência

const DB_NAME = 'cturismo_sqlite_sim';

export const db = {
  // Inicializar "banco"
  init: () => {
    if (!localStorage.getItem(DB_NAME)) {
      const initial: Customer[] = [
        { id: '1', name: 'João Silva', email: 'joao@email.com', login: 'joaosilva', cpf: '123.456.789-00', cnpj: '', createdAt: '20/01/2024', status: 'Ativo', source: 'site' },
        { id: '2', name: 'Maria Souza', email: 'maria@empresa.com', login: 'mariasouza', cpf: '', cnpj: '12.345.678/0001-99', createdAt: '20/01/2024', status: 'Ativo', source: 'site' }
      ];
      localStorage.setItem(DB_NAME, JSON.stringify(initial));
    }
  },

  // Buscar todos os clientes
  getAllCustomers: (): Customer[] => {
    const data = localStorage.getItem(DB_NAME);
    return data ? JSON.parse(data) : [];
  },

  // Salvar/Atualizar lista completa
  saveAll: (customers: Customer[]) => {
    localStorage.setItem(DB_NAME, JSON.stringify(customers));
  },

  // Adicionar um cliente
  addCustomer: (customer: Customer) => {
    const customers = db.getAllCustomers();
    customers.push(customer);
    db.saveAll(customers);
  },

  // Deletar um cliente
  deleteCustomer: (id: string) => {
    const customers = db.getAllCustomers();
    const filtered = customers.filter(c => c.id !== id);
    db.saveAll(filtered);
  },

  // Atualizar um cliente
  updateCustomer: (updated: Customer) => {
    const customers = db.getAllCustomers();
    const index = customers.findIndex(c => c.id === updated.id);
    if (index !== -1) {
      customers[index] = updated;
      db.saveAll(customers);
    }
  }
};
