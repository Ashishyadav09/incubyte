import { describe, it, expect } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { SweetsProvider, useSweets } from './SweetsContext';

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <SweetsProvider>{children}</SweetsProvider>
);

describe('SweetsContext', () => {
  describe('initial state', () => {
    it('should have mock sweets initially', () => {
      const { result } = renderHook(() => useSweets(), { wrapper });
      
      expect(result.current.sweets.length).toBeGreaterThan(0);
      expect(result.current.isLoading).toBe(false);
    });

    it('should have default filter values', () => {
      const { result } = renderHook(() => useSweets(), { wrapper });
      
      expect(result.current.filter.search).toBe('');
      expect(result.current.filter.category).toBe('All');
      expect(result.current.filter.minPrice).toBe(0);
      expect(result.current.filter.maxPrice).toBe(100);
    });
  });

  describe('filtering', () => {
    it('should filter sweets by search term', () => {
      const { result } = renderHook(() => useSweets(), { wrapper });
      
      const initialCount = result.current.filteredSweets.length;
      
      act(() => {
        result.current.setFilter({ search: 'chocolate' });
      });

      expect(result.current.filteredSweets.length).toBeLessThanOrEqual(initialCount);
      result.current.filteredSweets.forEach(sweet => {
        expect(
          sweet.name.toLowerCase().includes('chocolate') ||
          sweet.description.toLowerCase().includes('chocolate')
        ).toBe(true);
      });
    });

    it('should filter sweets by category', () => {
      const { result } = renderHook(() => useSweets(), { wrapper });
      
      act(() => {
        result.current.setFilter({ category: 'Chocolates' });
      });

      result.current.filteredSweets.forEach(sweet => {
        expect(sweet.category).toBe('Chocolates');
      });
    });

    it('should show all sweets when category is "All"', () => {
      const { result } = renderHook(() => useSweets(), { wrapper });
      
      act(() => {
        result.current.setFilter({ category: 'All' });
      });

      expect(result.current.filteredSweets.length).toBe(result.current.sweets.length);
    });
  });

  describe('addSweet', () => {
    it('should add a new sweet to the list', () => {
      const { result } = renderHook(() => useSweets(), { wrapper });
      
      const initialCount = result.current.sweets.length;
      
      act(() => {
        result.current.addSweet({
          name: 'Test Sweet',
          description: 'A test sweet',
          price: 5.99,
          quantity: 100,
          category: 'Candies',
          image: '',
        });
      });

      expect(result.current.sweets.length).toBe(initialCount + 1);
      
      const newSweet = result.current.sweets.find(s => s.name === 'Test Sweet');
      expect(newSweet).toBeDefined();
      expect(newSweet?.price).toBe(5.99);
      expect(newSweet?.quantity).toBe(100);
    });
  });

  describe('updateSweet', () => {
    it('should update an existing sweet', () => {
      const { result } = renderHook(() => useSweets(), { wrapper });
      
      const sweetToUpdate = result.current.sweets[0];
      const newPrice = 99.99;
      
      act(() => {
        result.current.updateSweet(sweetToUpdate.id, { price: newPrice });
      });

      const updatedSweet = result.current.sweets.find(s => s.id === sweetToUpdate.id);
      expect(updatedSweet?.price).toBe(newPrice);
    });

    it('should update the updatedAt timestamp', () => {
      const { result } = renderHook(() => useSweets(), { wrapper });
      
      const sweetToUpdate = result.current.sweets[0];
      const originalUpdatedAt = sweetToUpdate.updatedAt;
      
      act(() => {
        result.current.updateSweet(sweetToUpdate.id, { name: 'Updated Name' });
      });

      const updatedSweet = result.current.sweets.find(s => s.id === sweetToUpdate.id);
      expect(updatedSweet?.updatedAt).not.toBe(originalUpdatedAt);
    });
  });

  describe('deleteSweet', () => {
    it('should remove a sweet from the list', () => {
      const { result } = renderHook(() => useSweets(), { wrapper });
      
      const initialCount = result.current.sweets.length;
      const sweetToDelete = result.current.sweets[0];
      
      act(() => {
        result.current.deleteSweet(sweetToDelete.id);
      });

      expect(result.current.sweets.length).toBe(initialCount - 1);
      expect(result.current.sweets.find(s => s.id === sweetToDelete.id)).toBeUndefined();
    });
  });

  describe('purchaseSweet', () => {
    it('should decrease sweet quantity when purchased', () => {
      const { result } = renderHook(() => useSweets(), { wrapper });
      
      const sweetToPurchase = result.current.sweets.find(s => s.quantity > 0)!;
      const initialQuantity = sweetToPurchase.quantity;
      
      act(() => {
        result.current.purchaseSweet(sweetToPurchase.id, 1);
      });

      const updatedSweet = result.current.sweets.find(s => s.id === sweetToPurchase.id);
      expect(updatedSweet?.quantity).toBe(initialQuantity - 1);
    });

    it('should not decrease quantity below zero', () => {
      const { result } = renderHook(() => useSweets(), { wrapper });
      
      const sweetToPurchase = result.current.sweets[0];
      
      act(() => {
        result.current.purchaseSweet(sweetToPurchase.id, sweetToPurchase.quantity + 10);
      });

      const updatedSweet = result.current.sweets.find(s => s.id === sweetToPurchase.id);
      expect(updatedSweet?.quantity).toBe(sweetToPurchase.quantity);
    });
  });

  describe('restockSweet', () => {
    it('should increase sweet quantity when restocked', () => {
      const { result } = renderHook(() => useSweets(), { wrapper });
      
      const sweetToRestock = result.current.sweets[0];
      const initialQuantity = sweetToRestock.quantity;
      
      act(() => {
        result.current.restockSweet(sweetToRestock.id, 10);
      });

      const updatedSweet = result.current.sweets.find(s => s.id === sweetToRestock.id);
      expect(updatedSweet?.quantity).toBe(initialQuantity + 10);
    });
  });
});
