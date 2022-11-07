import React from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from '../../components/Admin/Sidebar'
import Navbar from '../../components/Header/Navbar'

function Admin() {
  return (
    <>
      <Navbar type="sidebar" />
      <div className="flex gap-x-6">
        <Sidebar />
        <Outlet />
      </div>
    </>
  )
}

export default Admin
