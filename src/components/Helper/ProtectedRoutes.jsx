import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'

function ProtectedRoutes() {
  const { user } = useSelector((state) => state.auth)
  return user ? <Outlet /> : <Navigate to="/" />
}

export default ProtectedRoutes
