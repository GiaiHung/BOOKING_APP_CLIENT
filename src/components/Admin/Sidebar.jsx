import React from 'react'
import { MdDashboard, MdOutlineSensorDoor } from 'react-icons/md'
import { AiOutlineUser } from 'react-icons/ai'
import { FaHotel, FaTimes } from 'react-icons/fa'
import { SlLogout } from 'react-icons/sl'
import { useDispatch, useSelector } from 'react-redux'
import { close } from '../../redux/sidebarSlice'
import { logout } from '../../redux/authSlice'
import { Link } from 'react-router-dom'

function Sidebar() {
  const { isOpen } = useSelector((state) => state.sidebar)
  const dispatch = useDispatch()
  return (
    <div
      className={`fixed h-screen w-full -translate-x-full space-y-4 border-gray-300 bg-white px-3 pt-4 opacity-0 duration-300 ease-in md:relative md:w-fit md:min-w-[300px] md:translate-x-0 md:border-r ${
        isOpen && '!translate-x-0 !opacity-100'
      } md:!opacity-100`}
    >
      <FaTimes
        className="absolute right-4 top-4 block cursor-pointer text-2xl text-gray-500 duration-200 ease-in hover:text-red-500 md:hidden"
        onClick={() => dispatch(close())}
      />
      <div>
        <h1 className="text-lg font-semibold text-gray-500">MAIN</h1>
        <Link to="/admin" onClick={() => dispatch(close())}>
          <p className="ml-2 flex cursor-pointer items-center gap-2 text-2xl">
            <MdDashboard className="text-blue-700" />
            <span className="text-lg text-gray-500">Dashboard</span>
          </p>
        </Link>
      </div>
      <div className="space-y-2">
        <h1 className="text-lg font-semibold text-gray-500">LISTS</h1>
        <Link to="/admin" onClick={() => dispatch(close())}>
          <p className="ml-2 flex cursor-pointer items-center gap-2 text-2xl">
            <AiOutlineUser className="text-blue-700" />
            <span className="text-lg text-gray-500">Users</span>
          </p>
        </Link>
        <Link to="/admin/hotels" onClick={() => dispatch(close())}>
          <p className="ml-2 flex cursor-pointer items-center gap-2 text-2xl">
            <FaHotel className="text-blue-700" />
            <span className="text-lg text-gray-500">Hotels</span>
          </p>
        </Link>
        <Link to="/admin/rooms" onClick={() => dispatch(close())}>
          <p className="ml-2 flex cursor-pointer items-center gap-2 text-2xl">
            <MdOutlineSensorDoor className="text-blue-700" />
            <span className="text-lg text-gray-500">Rooms</span>
          </p>
        </Link>
      </div>
      <div>
        <h1 className="text-lg font-semibold text-gray-500">USER</h1>
        <p
          className="ml-2 flex cursor-pointer items-center gap-2 text-2xl"
          onClick={() => dispatch(logout())}
        >
          <SlLogout className="text-blue-700" />
          <span className="text-lg text-gray-500">Logout</span>
        </p>
      </div>
    </div>
  )
}

export default Sidebar
