import React from 'react'
import useAuthStore from '../store/authStore'
import { useNavigate } from 'react-router-dom'

function Navbar() {
    const {isAuthenticated} = useAuthStore()
    const navigate = useNavigate()
  const navItems = [
    {
        name: 'Login',
        path: '/login',
        status: !isAuthenticated
    },
    {
        name: 'Register',
        path: '/register',
        status: !isAuthenticated
    },
    {
        name: 'Add',
        path: '/add-todo',
        status: isAuthenticated
    }
  ]
    return (
    
    <nav className='flex justify-between items-center bg-zinc-700 px-10 py-4 text-white'>
        <h1 className='font-bold text-2xl cursor-pointer'>
            <button className='cursor-pointer' onClick={() => navigate('/')}>Todo App</button>
        </h1>
        <ul className='flex  gap-5'>
            {navItems.map((items) => items.status ? (
                <li key={items.name}>
                    <button onClick={() => navigate(items.path)} className='cursor-pointer hover:underline'>{items.name}</button>
                </li>
            ) : null)}
        </ul>
    </nav>
  )
}

export default Navbar