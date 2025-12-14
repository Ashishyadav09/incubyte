export interface User {
  id: string;
  email: string;
  name: string;
  role: 'user' | 'admin';
  createdAt: string;
}

export interface Sweet {
  id: string;
  name: string;
  category: string;
  price: number;
  quantity: number;
  description: string;
  image: string;
  createdAt: string;
  updatedAt: string;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

export interface SweetsFilter {
  search: string;
  category: string;
  minPrice: number;
  maxPrice: number;
}

export type Category = 
  | 'All'
  | 'Chocolates'
  | 'Candies'
  | 'Gummies'
  | 'Lollipops'
  | 'Cookies'
  | 'Pastries';

export const CATEGORIES: Category[] = [
  'All',
  'Chocolates',
  'Candies',
  'Gummies',
  'Lollipops',
  'Cookies',
  'Pastries',
];
