import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import authStore from '../stores/authStore';
import todoStore from '../stores/todoStore';

const TodoList = () => {
  const navigate = useNavigate();
  const { todos, fetchTodos, addTodo, updateTodo, deleteTodo } = todoStore();
  const { logout, isAuthenticated } = authStore();
  const [newTodo, setNewTodo] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState('');

  useEffect(() => {
    if (!isAuthenticated) navigate('/login');
    fetchTodos();
  }, []);

  const handleAddTodo = async (e) => {
    e.preventDefault();
    if (newTodo.trim()) {
      await addTodo(newTodo.trim());
      setNewTodo('');
    }
  };

  return (
    <div className="todo-container">
      <header>
        <h1>Todo List</h1>
        <button onClick={logout}>Logout</button>
      </header>

      <form onSubmit={handleAddTodo}>
        <input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="Add new todo"
        />
        <button type="submit">Add</button>
      </form>

      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            {editingId === todo.id ? (
              <form onSubmit={async (e) => {
                e.preventDefault();
                await updateTodo(todo.id, editText);
                setEditingId(null);
              }}>
                <input
                  type="text"
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                />
                <button type="submit">Save</button>
                <button type="button" onClick={() => setEditingId(null)}>
                  Cancel
                </button>
              </form>
            ) : (
              <>
                <span>{todo.title}</span>
                <div>
                  <button onClick={() => {
                    setEditingId(todo.id);
                    setEditText(todo.title);
                  }}>
                    Edit
                  </button>
                  <button onClick={() => deleteTodo(todo.id)}>
                    Delete
                  </button>
                </div>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;