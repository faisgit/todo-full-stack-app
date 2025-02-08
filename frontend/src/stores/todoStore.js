import { useState } from 'react';

const useTodoStore = () => {
  const [todos, setTodos] = useState([]);

  const fetchTodos = async () => {
    try {
      const response = await fetch('http://127.0.0.1:5000/todos', {
        method: 'GET',
        credentials: 'include', // Include credentials in the request
      });
      const data = await response.json();
      setTodos(data);
    } catch (error) {
      console.error('Failed to fetch todos:', error);
    }
  };

  const addTodo = async (title) => {
    try {
      const response = await fetch('http://127.0.0.1:5000/todos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include', // Include credentials in the request
        body: JSON.stringify({ title }),
      });
      const newTodo = await response.json();
      setTodos((prevTodos) => [...prevTodos, newTodo]);
    } catch (error) {
      console.error('Failed to add todo:', error);
    }
  };

  const updateTodo = async (id, title) => {
    try {
      const response = await fetch(`http://127.0.0.1:5000/todos/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include', // Include credentials in the request
        body: JSON.stringify({ title }),
      });
      const updatedTodo = await response.json();
      setTodos((prevTodos) =>
        prevTodos.map((todo) => (todo.id === id ? updatedTodo : todo))
      );
    } catch (error) {
      console.error('Failed to update todo:', error);
    }
  };

  const deleteTodo = async (id) => {
    try {
      await fetch(`http://127.0.0.1:5000/todos/${id}`, {
        method: 'DELETE',
        credentials: 'include', // Include credentials in the request
      });
      setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
    } catch (error) {
      console.error('Failed to delete todo:', error);
    }
  };

  return {
    todos,
    fetchTodos,
    addTodo,
    updateTodo,
    deleteTodo,
  };
};

export default useTodoStore;