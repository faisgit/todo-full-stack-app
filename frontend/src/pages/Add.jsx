import React, { useState } from 'react'
import { api } from '../api/api';
import { useNavigate } from 'react-router-dom';
import Input from '../components/Input';
import Button from '../components/Button';
import { useForm } from 'react-hook-form';
function Add() {
  const { register, handleSubmit } = useForm();
  const [title, setTitle] = useState()
  const navigate = useNavigate()
  const onSubmit = async (data) => {
    try {
      const res = await api.post('/todos', data);
      if(res.data.message == 'Task created successfully'){
        navigate('/')
      }
      console.log(res)
    } catch (error) {
      console.error(error);
    }
  }
  return (
    // <div className='h-96 w-screen flex justify-center items-center'>
    //   <div className='h-auto w-96 shadow-2xl flex justify-center items-center flex-col border-2'>
    //     <form
    //       className=''
    //       onSubmit={async (e) => {
    //         e.preventDefault();
    //         const data = {
    //           title: title,
    //         };
    //         try {
    //           const res = await api.post('/todos', data);
    //           if(res.data.message == 'Task created successfully'){
    //             navigate('/')
    //           }
    //          console.log(res)
    //         } catch (error) {
    //           console.error(error);
    //         }
    //       }}
    //     >
    //       <input
    //         type='text'
    //         placeholder='Todos'
    //         onChange={(e) => setTitle(e.target.value)}
    //       />
    //       <button type='submit'>Login</button>
    //     </form>
    //   </div>
    // </div>

    <div className="h-screen flex justify-center items-center">
    <div className=" w-80 flex flex-col justify-center items-center gap-3 py-10 rounded-xl shadow-xl">
      <h1 className="font-bold text-xl">Add a Todo</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3">
        <Input
          type="text"
          placeholder="Enter Your Todo Title"
          label="Title"
          {...register("title", {
            required: true,
          })}
        />
        <Button type="submit">Add</Button>
      </form>
    </div>
  </div>
  )
}

export default Add