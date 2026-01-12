import { setActivePinia, createPinia } from 'pinia';
import { useAuthStore } from '../authStore';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import axios from 'axios';
import router from '../../router';

// 1. Mock external dependencies
vi.mock('axios');
vi.mock('../../router'); // We don't want to actually change pages during tests

describe('Auth Store', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
    localStorage.clear();
    vi.clearAllMocks();
  });

  it('login sets token and user in localStorage', async () => {
    const store = useAuthStore();
    
    // Mock Server Response
    const mockResponse = { 
        data: { 
            token: 'fake-jwt-token', 
            user: { email: 'test@example.com' } 
        } 
    };
    (axios.post as any).mockResolvedValue(mockResponse);

    // Action
    await store.login('test@example.com', 'password123');

    // Assertions
    expect(store.token).toBe('fake-jwt-token');
    expect(store.isAuthenticated).toBe(true);
    expect(localStorage.getItem('token')).toBe('fake-jwt-token');
    expect(router.push).toHaveBeenCalledWith('/'); // Check if it redirected
  });

  it('logout clears everything', () => {
    const store = useAuthStore();
    
    // Setup initial state
    store.token = 'old-token';
    localStorage.setItem('token', 'old-token');

    // Action
    store.logout();

    // Assertions
    expect(store.token).toBe('');
    expect(store.isAuthenticated).toBe(false);
    expect(localStorage.getItem('token')).toBeNull();
    expect(router.push).toHaveBeenCalledWith('/login');
  });
});