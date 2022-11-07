import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { logout } from '../../redux/authSlice'
import { open } from '../../redux/sidebarSlice'
import { FaBars } from 'react-icons/fa'

function Navbar({ type }) {
  const { user } = useSelector((state) => state.auth)
  const dispatch = useDispatch()

  const handleLogout = () => {
    dispatch(logout())
  }

  return (
    <div className="bg-blue-700 py-2 font-semibold text-white">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 md:px-0">
        <Link to="/">
          <div className="text-2xl hover:text-white">TGH Booking</div>
        </Link>
        {user ? (
          <div className='flex gap-x-3 items-center'>
            <button className="text-2xl" onClick={handleLogout}>
              <img src={user.img} alt="" className='w-12 h-12 object-cover rounded-full'/>
            </button>
            {type === 'sidebar' && <FaBars
              className="cursor-pointer text-2xl text-white md:hidden block"
              onClick={() => dispatch(open())}
            />}
          </div>
        ) : (
          <div className="space-x-4">
            <Link to="/login">
              <button className="headerBtn">Log in</button>
            </Link>
            <Link to="/register">
              <button className="headerBtn">Register</button>
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}

export default Navbar
