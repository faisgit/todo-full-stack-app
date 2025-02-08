import { create } from 'zustand';

const authStore = create((set) => ({
  user: null,
  isAuthenticated: false,
  error: null,

  login: async (username, password) => {
    try {
      const response = await fetch('/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
        credentials: 'include',
      });
      
      const data = await response.json();
      if (response.ok) {
        set({ isAuthenticated: true, user: { username }, error: null });
        return true;
      }
      set({ error: data.message });
      return false;
    } catch (error) {
      set({ error: 'Login failed' });
      return false;
    }
  },

  register: async (username, password) => {
    try {
      const response = await fetch('/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
        credentials: 'include',
      });

      if (response.ok) {
        return true;
      }
      const errorData = await response.json();
      set({ error: errorData.message });
      return false;
    } catch (error) {
      set({ error: 'Registration failed' });
      return false;
    }
  },

  logout: async () => {
    await fetch('/logout', {
      method: 'POST',
      credentials: 'include',
    });
    set({ user: null, isAuthenticated: false });
  },

  checkAuth: async () => {
    try {
      const response = await fetch('/todos', {
        credentials: 'include',
      });
      set({ isAuthenticated: response.ok });
      return response.ok;
    } catch (error) {
      set({ isAuthenticated: false });
      return false;
    }
  },
}));

export default authStore;