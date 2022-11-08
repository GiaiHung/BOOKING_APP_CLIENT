import React from 'react'
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import 'tippy.js/animations/perspective.css'
import TippyContent from './TippyContent'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { open } from '../../redux/sidebarSlice'
import { FaBars } from 'react-icons/fa'

function Navbar({ type }) {
  const { user } = useSelector((state) => state.auth)

  return (
    <div className="bg-blue-700 py-2 font-semibold text-white">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 md:px-0">
        <Link to="/">
          <div className="text-2xl hover:text-white">TGH Booking</div>
        </Link>
        {user ? (
          <div className='relative flex gap-x-3 items-center'>
            <Tippy trigger='mouseenter click' animation='perspective' interactive={true} content={<TippyContent />}>
              <button className="text-2xl">
                <img src={user.img} alt="" className='w-12 h-12 object-cover rounded-full'/>
              </button>
            </Tippy>
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
