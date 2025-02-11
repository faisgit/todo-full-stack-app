import React, { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { api } from '../api/api'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { set } from 'react-hook-form'
import Input from '../components/Input'
import Button from '../components/Button'
function Update() {
  const { id } = useParams()
  const [todo, setTodo] = useState()
  const {register, handleSubmit, setValue} = useForm({
    defaultValues: {
      title: todo?.title
    }
  })
  const navigate = useNavigate()
  useEffect(() => {
    api.get(`/todos/${id}`)
    const fetchTodo = async () => {
      const response = await api.get(`/todos/${id}`)
      setTodo(response.data.todo)
    }
    fetchTodo()
  },[])

  useEffect(() => {
    if(todo){
      setValue('title', todo.title)
    }
  },[todo, setValue])
  console.log(todo)


  const onSubmit = async (data) => {
    try {
      const res = await api.put(`/todos/${id}`, data)
      if(res.data.message == 'Task updated successfully'){
        navigate('/')
      }
    } catch (error) {
      console.error(error)
    }
  }
  return (
    <div className="h-screen flex justify-center items-center">
    <div className=" w-80 flex flex-col justify-center items-center gap-3 py-10 rounded-xl shadow-xl">
      <h1 className="font-bold text-xl">Update Your Todo</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3">
        <Input
          type="text"
          placeholder="Enter Todo Title"
          label="Title"
          {...register("title", {
            required: true,
          })}
        />
        <Button type="submit">Update</Button>
      </form>
    </div>
  </div>
  )
}

export default Update