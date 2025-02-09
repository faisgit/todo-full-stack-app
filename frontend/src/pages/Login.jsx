import React, { useState } from 'react'
import useAuthStore from '../store/authStore'
import { useNavigate } from 'react-router-dom'

function Login() {
    const {loginUser, isAuthenticated} = useAuthStore()
    const [username, setUsername] = useState(null)
    const [password, setPassword] = useState(null)
    const navigate = useNavigate()
  return (
    <div className='h-96 w-screen flex justify-center items-center'>
        <div className='h-auto w-96 shadow-2xl flex justify-center items-center flex-col border-2'>
             <form  className='' onSubmit={async (e) => {
                e.preventDefault()
                const data = {
                    username: username,
                    password: password
                }
                try {
                  loginUser(data)
                    navigate('/')
                    
                } catch (error) {
                    console.error(error)
                }
             }}>
                <input type="text" placeholder='username' onChange={(e) => setUsername(e.target.value)}/>
                <input type="text" placeholder='password'onChange={(e) => setPassword(e.target.value)} />
                <button>Login</button>
             </form>
        </div>
    </div>
  )
}

export default Login