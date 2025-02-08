import { create } from 'zustand';

const todoStore = create((set) => ({
  todos: [],
  loading: false,
  error: null,

  fetchTodos: async () => {
    set({ loading: true, error: null });
    try {
      const response = await fetch('/todos', {
        credentials: 'include',
      });
      const data = await response.json();
      if (response.ok) {
        set({ todos: data.todos, loading: false });
      }
    } catch (error) {
      set({ error: 'Failed to fetch todos', loading: false });
    }
  },

  addTodo: async (title) => {
    try {
      await fetch('/todos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title }),
        credentials: 'include',
      });
      todoStore.getState().fetchTodos();
    } catch (error) {
      set({ error: 'Failed to add todo' });
    }
  },

  updateTodo: async (id, title) => {
    try {
      await fetch(`/todos/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title }),
        credentials: 'include',
      });
      todoStore.getState().fetchTodos();
    } catch (error) {
      set({ error: 'Failed to update todo' });
    }
  },

  deleteTodo: async (id) => {
    try {
      await fetch(`/todos/${id}`, {
        method: 'DELETE',
        credentials: 'include',
      });
      todoStore.getState().fetchTodos();
    } catch (error) {
      set({ error: 'Failed to delete todo' });
    }
  },
}));

export default todoStore;