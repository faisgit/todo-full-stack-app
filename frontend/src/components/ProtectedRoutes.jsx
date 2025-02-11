import React from 'react'
import useAuthStore from '../store/authStore'
import { Navigate } from 'react-router-dom'
function ProtectedRoutes({ children }) {
  const { isAuthenticated } = useAuthStore()
  return isAuthenticated ? children : <Navigate to="/login" />
}

export default ProtectedRoutes