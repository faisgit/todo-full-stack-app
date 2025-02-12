import React from 'react'
import Input from '../components/Input'
import Button from '../components/Button'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom';
import useAuthStore from '../store/authStore';
function Register() {
   const { register, handleSubmit } = useForm();
   const navigate = useNavigate()
   const {registerUser} = useAuthStore()
   const onSubmit = async (data) =>{
    try {
      const res = await registerUser(data);
      if(res){
        navigate('/login')
      }
      else{
        console.error("Registeration Failed")
      }
    } catch (error) {
      console.error(error);
    }
   }
  return (
    <div className="h-screen flex justify-center items-center">
    <div className=" w-80 flex flex-col justify-center items-center gap-3 py-10 rounded-xl shadow-xl">
      <h1 className="font-bold text-xl">Create Your New Account</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3">
        <Input
          type="text"
          placeholder="Enter Your Username"
          label="Username"
          {...register("username", {
            required: true,
          })}
        />
        <Input
          type="password"
          placeholder="Enter Your Password"
          label="Password"
          {...register("password", {
            required: true,
          })}
        />
        <Button type="submit">Register</Button>
      </form>
    </div>
  </div>
  )
}

export default Register