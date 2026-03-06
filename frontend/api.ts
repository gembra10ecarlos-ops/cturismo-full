
import { Customer } from './types';
const API_URL = (import.meta as any)?.env?.VITE_API_URL || 'http://localhost:8000';

export const api = {
  async getCustomers(): Promise<Customer[]> {
    const response = await fetch(`${API_URL}/clientes`);
    if (!response.ok) throw new Error('Erro ao buscar clientes');
    const data = await response.json();
    return data.map((c: any) => ({
      id: c.id.toString(),
      name: c.nome,
      email: c.email,
      login: c.email.split('@')[0], // Simulação de login baseado no email
      cpf: '', // Campos não presentes no backend Python atual
      cnpj: '',
      createdAt: new Date(c.criado_em).toLocaleDateString(),
      status: c.status === 'ativo' ? 'Ativo' : 'Inativo',
      source: c.origem === 'site' ? 'site' : 'import'
    }));
  },

  async createCustomer(customer: any): Promise<Customer> {
    const response = await fetch(`${API_URL}/clientes`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        nome: customer.name,
        email: customer.email,
        origem: customer.source || 'site',
        status: customer.status?.toLowerCase() || 'ativo',
        selecionado_viagem: false
      }),
    });
    if (!response.ok) throw new Error('Erro ao criar cliente');
    return response.json();
  },

  async updateCustomer(id: string, customer: any): Promise<void> {
    await fetch(`${API_URL}/clientes/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        nome: customer.name,
        email: customer.email,
        status: customer.status?.toLowerCase(),
        origem: customer.source
      }),
    });
  },

  async deleteCustomer(id: string): Promise<void> {
    await fetch(`${API_URL}/clientes/${id}`, {
      method: 'DELETE',
    });
  }
};
