import React, { useState } from "react";
import useAuthStore from "../store/authStore";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import Input from "../components/Input";
import Button from "../components/Button";
function Login() {
  const { register, handleSubmit } = useForm();
  const { loginUser } = useAuthStore();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const res = await loginUser(data);
      if (res.isAuthenticated) {
        navigate("/");
      } else {
        console.error("Login failed");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="h-screen flex justify-center items-center">
      <div className=" w-80 flex flex-col justify-center items-center gap-3 py-10 rounded-xl shadow-xl">
        <h1 className="font-bold text-xl">Login To Your Account</h1>
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
          <Button type="submit">Login</Button>
        </form>
      </div>
    </div>
  );
}

export default Login;
