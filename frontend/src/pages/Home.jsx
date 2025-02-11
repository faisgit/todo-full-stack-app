import React, { useEffect, useState } from 'react'
import { api } from '../api/api'
import { useNavigate } from 'react-router-dom'
function Home() {
  const [todos, setTodos] = useState([])
  const navigate = useNavigate()
  useEffect(() => {
    const fetchTodos = async () => {
      const response = await api.get('/todos')
      setTodos(response.data.todos)
    }
    fetchTodos()
  },[])
  console.log(todos)
  let count  = 0

  const deleteTodo = async (id) => {
    try {
      const response = await api.delete(`/todos/${id}`)
      if (response) {
        window.location.reload()
      }
    } catch (error) {
      console.error(error)
    }
  }
  return (
    <div className='flex justify-center'>
      <div className='h-screen w-auto shadow-2xl'>
        {todos.length > 0 ? todos.map((todo) => {
          count += 1
          return (
            <div className=' flex gap-7 justify-between items-center mt-10 px-2 py-3 rounded-xl shadow-2xl border-[1px] border-solid border-gray-300  mx-10 '>
            <div className='flex gap-1'>
            <p>{count}.</p>
            <p>{todo.title}</p>
            </div>
            <div className='flex gap-3'>
              <button className='cursor-pointer border-2 border-solid border-green-400 px-3 text-sm font-bold py-1 rounded-xl hover:bg-green-400 hover:text-white duration-700' onClick={()  => navigate(`/update-todo/${todo.id}`)}>Update</button>
              <button className='cursor-pointer border-2 border-solid border-red-400 px-3 text-sm font-bold py-1 rounded-xl hover:bg-red-400 hover:text-white duration-700' onClick={() => deleteTodo(todo.id)}>Delete</button>
            </div>
          </div>
          )
        }) : (
          <h1>No Todos</h1>
        )}
      </div>
    </div>
  )
}

export default Home