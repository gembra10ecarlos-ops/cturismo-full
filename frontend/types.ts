
export interface Customer {
  id: string;
  name: string;
  email: string;
  login: string;
  cpf: string;
  cnpj: string;
  createdAt: string;
  status: 'Ativo' | 'Inativo';
  source?: 'site' | 'import';
}

export type AppScreen = 'home' | 'login' | 'admin-login' | 'register' | 'reset-password' | 'admin' | 'destinations' | 'destination-detail';

export interface BeachDestination {
  id: number;
  title: string;
  description: string;
  fullDescription?: string;
  imageUrl: string;
  location?: string;
  price?: string;
}

export interface UserAuth {
  isAuthenticated: boolean;
  role: 'user' | 'admin' | null;
}
