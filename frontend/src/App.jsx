// import React, { useEffect, useState } from 'react';
// import { create } from 'zustand';
// import axios from 'axios';
// import useAuthStore from './store/authStore';


// const useStore = create((set) => ({
//   todos: [],
//   isAuthenticated: false,
//   username: '',
//   setTodos: (todos) => set({ todos }),
//   setAuth: (status, username) => set({ isAuthenticated: status, username }),
// }));

// const api = axios.create({
//   baseURL: 'http://localhost:5000',
//   withCredentials: true,
// });

// function App() {
//   const { isAuthenticated, username, setAuth, todos, setTodos } = useStore();
//   const {loginUser, logoutUser}  = useAuthStore()
//   const [form, setForm] = useState({ username: '', password: '', title: '' });

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const register = async () => {
//     await api.post('/register', { username: form.username, password: form.password });
//     login();
//   };

//   const login = async () => {
//     // const res = await api.post('/login', { username: form.username, password: form.password });
//     // if (res.data.isAuthenticated) {
//     //   setAuth(true, res.data.username);
//     //   fetchTodos();
//     // }

//     const data = {
//       username: form.username,
//       password: form.password
//     }

//     const res = await loginUser(data)
//     if (res.isAuthenticated) {
//       setAuth(res.isAuthenticated, res.username)
//       fetchTodos()
//     }
//   };

//   const logout = async () => {
//     // await api.post('/logout');
//     await logoutUser()
//     setAuth(false, '');
//     setTodos([]);
//   };

//   const fetchTodos = async () => {
//     const res = await api.get('/todos');
//     setTodos(res.data.todos);
//   };

//   const addTodo = async () => {
//     if (form.title) {
//       await api.post('/todos', { title: form.title });
//       fetchTodos();
//       setForm({ ...form, title: '' });
//     }
//   };

//   const deleteTodo = async (id) => {
//     await api.delete(`/todos/${id}`);
//     fetchTodos();
//   };

//   const updateTodo = async (id, title) => {
//     await api.put(`/todos/${id}`, { title });
//     fetchTodos();
//   };

//   return (
//     <div className="min-h-screen bg-gray-100 flex flex-col items-center p-4">
//       {!isAuthenticated ? (
//         <div className="bg-white p-6 rounded-xl shadow-md w-80">
//           <h2 className="text-xl font-bold mb-4">Login / Register</h2>
//           <input name="username" placeholder="Username" onChange={handleChange} className="w-full mb-2 p-2 border rounded" />
//           <input name="password" type="password" placeholder="Password" onChange={handleChange} className="w-full mb-2 p-2 border rounded" />
//           <button onClick={login} className="w-full bg-blue-500 text-white py-2 rounded mb-2">Login</button>
//           <button onClick={register} className="w-full bg-green-500 text-white py-2 rounded">Register</button>
//         </div>
//       ) : (
//         <div className="w-full max-w-md">
//           <div className="flex justify-between items-center mb-4">
//             <h1 className="text-2xl font-bold">Welcome, {username}</h1>
//             <button onClick={logout} className="bg-red-500 text-white px-4 py-2 rounded">Logout</button>
//           </div>
//           <div className="bg-white p-4 rounded-xl shadow-md">
//             <input name="title" value={form.title} onChange={handleChange} placeholder="New Task" className="w-full p-2 border rounded mb-2" />
//             <button onClick={addTodo} className="w-full bg-blue-500 text-white py-2 rounded">Add Task</button>
//             <ul className="mt-4">
//               {todos.map((todo) => (
//                 <li key={todo.id} className="flex justify-between items-center mb-2 p-2 border rounded">
//                   <input
//                     className="flex-1 p-1 border rounded mr-2"
//                     defaultValue={todo.title}
//                     onBlur={(e) => updateTodo(todo.id, e.target.value)}
//                   />
//                   <button onClick={() => deleteTodo(todo.id)} className="bg-red-500 text-white px-2 py-1 rounded">Delete</button>
//                 </li>
//               ))}
//             </ul>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// export default App;


import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from './components/Navbar'

function App() {
  return (
    <div>
      <Navbar />
      <Outlet />
    </div>
  )
}

export default App
