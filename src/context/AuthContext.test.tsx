import { describe, it, expect, vi } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { AuthProvider, useAuth } from './AuthContext';

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <AuthProvider>{children}</AuthProvider>
);

describe('AuthContext', () => {
  describe('initial state', () => {
    it('should have no user initially', () => {
      const { result } = renderHook(() => useAuth(), { wrapper });
      
      expect(result.current.user).toBeNull();
      expect(result.current.isAuthenticated).toBe(false);
      expect(result.current.token).toBeNull();
    });
  });

  describe('login', () => {
    it('should authenticate user with valid credentials', async () => {
      const { result } = renderHook(() => useAuth(), { wrapper });
      
      await act(async () => {
        await result.current.login('test@example.com', 'password123');
      });

      expect(result.current.isAuthenticated).toBe(true);
      expect(result.current.user).not.toBeNull();
      expect(result.current.user?.email).toBe('test@example.com');
      expect(result.current.user?.role).toBe('user');
    });

    it('should assign admin role when email contains "admin"', async () => {
      const { result } = renderHook(() => useAuth(), { wrapper });
      
      await act(async () => {
        await result.current.login('admin@example.com', 'password123');
      });

      expect(result.current.user?.role).toBe('admin');
    });

    it('should throw error with empty credentials', async () => {
      const { result } = renderHook(() => useAuth(), { wrapper });
      
      await expect(
        act(async () => {
          await result.current.login('', '');
        })
      ).rejects.toThrow('Invalid credentials');
    });

    it('should set isLoading during login process', async () => {
      const { result } = renderHook(() => useAuth(), { wrapper });
      
      const loginPromise = act(async () => {
        await result.current.login('test@example.com', 'password123');
      });

      // isLoading should be true during login
      expect(result.current.isLoading).toBe(true);
      
      await loginPromise;
      
      expect(result.current.isLoading).toBe(false);
    });
  });

  describe('register', () => {
    it('should register new user successfully', async () => {
      const { result } = renderHook(() => useAuth(), { wrapper });
      
      await act(async () => {
        await result.current.register('new@example.com', 'password123', 'New User');
      });

      expect(result.current.isAuthenticated).toBe(true);
      expect(result.current.user?.email).toBe('new@example.com');
      expect(result.current.user?.name).toBe('New User');
      expect(result.current.user?.role).toBe('user');
    });

    it('should throw error with missing fields', async () => {
      const { result } = renderHook(() => useAuth(), { wrapper });
      
      await expect(
        act(async () => {
          await result.current.register('', '', '');
        })
      ).rejects.toThrow('Registration failed');
    });
  });

  describe('logout', () => {
    it('should clear user session on logout', async () => {
      const { result } = renderHook(() => useAuth(), { wrapper });
      
      // First login
      await act(async () => {
        await result.current.login('test@example.com', 'password123');
      });

      expect(result.current.isAuthenticated).toBe(true);

      // Then logout
      act(() => {
        result.current.logout();
      });

      expect(result.current.isAuthenticated).toBe(false);
      expect(result.current.user).toBeNull();
      expect(result.current.token).toBeNull();
    });
  });
});
