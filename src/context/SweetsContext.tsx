import React, { createContext, useContext, useState, useCallback } from 'react';
import { Sweet, SweetsFilter } from '@/types';
import { mockSweets } from '@/lib/mock-data';

interface SweetsContextType {
  sweets: Sweet[];
  filter: SweetsFilter;
  filteredSweets: Sweet[];
  isLoading: boolean;
  setFilter: (filter: Partial<SweetsFilter>) => void;
  addSweet: (sweet: Omit<Sweet, 'id' | 'createdAt' | 'updatedAt'>) => void;
  updateSweet: (id: string, sweet: Partial<Sweet>) => void;
  deleteSweet: (id: string) => void;
  purchaseSweet: (id: string, quantity: number) => void;
  restockSweet: (id: string, quantity: number) => void;
}

const SweetsContext = createContext<SweetsContextType | undefined>(undefined);

const defaultFilter: SweetsFilter = {
  search: '',
  category: 'All',
  minPrice: 0,
  maxPrice: 100,
};

export function SweetsProvider({ children }: { children: React.ReactNode }) {
  const [sweets, setSweets] = useState<Sweet[]>(mockSweets);
  const [filter, setFilterState] = useState<SweetsFilter>(defaultFilter);
  const [isLoading, setIsLoading] = useState(false);

  const filteredSweets = sweets.filter(sweet => {
    const matchesSearch = sweet.name.toLowerCase().includes(filter.search.toLowerCase()) ||
                         sweet.description.toLowerCase().includes(filter.search.toLowerCase());
    const matchesCategory = filter.category === 'All' || sweet.category === filter.category;
    const matchesPrice = sweet.price >= filter.minPrice && sweet.price <= filter.maxPrice;
    
    return matchesSearch && matchesCategory && matchesPrice;
  });

  const setFilter = useCallback((newFilter: Partial<SweetsFilter>) => {
    setFilterState(prev => ({ ...prev, ...newFilter }));
  }, []);

  const addSweet = useCallback((sweetData: Omit<Sweet, 'id' | 'createdAt' | 'updatedAt'>) => {
    const newSweet: Sweet = {
      ...sweetData,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    setSweets(prev => [...prev, newSweet]);
  }, []);

  const updateSweet = useCallback((id: string, sweetData: Partial<Sweet>) => {
    setSweets(prev => prev.map(sweet => 
      sweet.id === id 
        ? { ...sweet, ...sweetData, updatedAt: new Date().toISOString() }
        : sweet
    ));
  }, []);

  const deleteSweet = useCallback((id: string) => {
    setSweets(prev => prev.filter(sweet => sweet.id !== id));
  }, []);

  const purchaseSweet = useCallback((id: string, quantity: number) => {
    setSweets(prev => prev.map(sweet => 
      sweet.id === id && sweet.quantity >= quantity
        ? { ...sweet, quantity: sweet.quantity - quantity, updatedAt: new Date().toISOString() }
        : sweet
    ));
  }, []);

  const restockSweet = useCallback((id: string, quantity: number) => {
    setSweets(prev => prev.map(sweet => 
      sweet.id === id
        ? { ...sweet, quantity: sweet.quantity + quantity, updatedAt: new Date().toISOString() }
        : sweet
    ));
  }, []);

  return (
    <SweetsContext.Provider value={{
      sweets,
      filter,
      filteredSweets,
      isLoading,
      setFilter,
      addSweet,
      updateSweet,
      deleteSweet,
      purchaseSweet,
      restockSweet,
    }}>
      {children}
    </SweetsContext.Provider>
  );
}

export function useSweets() {
  const context = useContext(SweetsContext);
  if (context === undefined) {
    throw new Error('useSweets must be used within a SweetsProvider');
  }
  return context;
}
