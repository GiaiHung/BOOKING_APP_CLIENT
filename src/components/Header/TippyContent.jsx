import React from 'react'
import { AiOutlineUser } from 'react-icons/ai'
import {FaUserSecret} from 'react-icons/fa'
import {BiLogOut} from 'react-icons/bi'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { logout } from '../../redux/authSlice'

function Tippy() {
  const {
    user: { _id },
  } = useSelector((state) => state.auth)

  const dispatch = useDispatch()
  return (
    <div className='mt-2'>
      <Link to={`/admin/userProfile/${_id}`}>
        <button className="tippyCustom">
          <AiOutlineUser />
          <span>User profile</span>
        </button>
      </Link>
      <Link to="/admin">
        <button className="tippyCustom">
          <FaUserSecret />
          <span>Admin page</span>
        </button>
      </Link>
      <button
        className="tippyCustom"
        onClick={() => dispatch(logout())}
      >
        <BiLogOut />
        <span>Logout</span>
      </button>
    </div>
  )
}

export default Tippy
