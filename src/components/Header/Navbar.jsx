import React from 'react'
import { Link } from 'react-router-dom'

function Navbar() {
  return (
    <div className="bg-blue-700 py-4 font-semibold text-white">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 md:px-0">
        <Link className="decoration-none" to='/'>
          <div className="text-2xl">TGH Booking</div>
        </Link>
        <div className="space-x-4">
          <button className="headerBtn">Log in</button>
          <button className="headerBtn">Register</button>
        </div>
      </div>
    </div>
  )
}

export default Navbar
