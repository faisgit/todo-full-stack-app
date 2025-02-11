import React from 'react'
import useAuthStore from '../../store/authStore'
import { useNavigate } from 'react-router-dom'

function LogoutBtn() {
    const {logoutUser} = useAuthStore()
    const navigate = useNavigate('/')
  return (
    <button className=' cursor-pointer hover:underline' onClick={async () => {
        try {
          const response = await logoutUser()
          if (Boolean(response.isAuthenticated) == false) {
            navigate('/login')
          }  
        } catch (error) {
            console.error(error)
        }
    }}>Logout</button>
  )
}

export default LogoutBtn