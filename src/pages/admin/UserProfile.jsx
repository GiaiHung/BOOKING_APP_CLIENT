import React from 'react'
import { useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import Sidebar from '../../components/Admin/Sidebar'
import Navbar from '../../components/Header/Navbar'
import Loading from '../../components/Helper/Loading'
import useFetch from '../../hooks/useFetch'
import setAuthToken from '../../utils/setAuthToken'
import { HiMail } from 'react-icons/hi'
import { BsTelephoneFill } from 'react-icons/bs'
import { MdLocationPin } from 'react-icons/md'
import { Button } from 'react-bootstrap'

function UserProfile() {
  const params = useParams()
  const {
    user: { accessToken },
  } = useSelector((state) => state.auth)
  setAuthToken(accessToken)
  const {
    data: { user },
    loading,
    error,
  } = useFetch(`${import.meta.env.VITE_SERVER_URL}/users/${params.id}`)

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <>
          <Navbar type="sidebar" />
          <div className="flex gap-x-6">
            <Sidebar />
            <div className="mx-auto mt-4 max-w-6xl">
              <div className="flex flex-col items-center gap-3">
                <img
                  src={user?.img}
                  alt=""
                  className="h-48 w-48 rounded-full object-cover md:h-32 md:w-32"
                />
                <div className="flex items-center gap-x-2">
                  <h1 className="text-center text-3xl font-semibold">{user?.username}</h1>
                  <span
                    className={`${
                      user?.isAdmin
                        ? 'border-green-500 text-green-500'
                        : 'border-blue-500 text-blue-500'
                    } rounded-full border-2 px-2 py-1`}
                  >
                    {user?.isAdmin ? 'Admin' : 'User'}
                  </span>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center gap-x-4">
                    <div className="flex items-center gap-x-2">
                      <HiMail />
                      <span className="font-semibold">Email: </span>
                    </div>
                    <div className="text-lg text-blue-500">{user?.email}</div>
                  </div>
                  <div className="flex items-center gap-x-4">
                    <div className="flex items-center gap-x-2">
                      <BsTelephoneFill />
                      <span className="font-semibold">Phone: </span>
                    </div>
                    <div className="text-lg text-blue-500">{user?.phone}</div>
                  </div>
                  <div className="flex items-center gap-x-4">
                    <div className="flex items-center gap-x-2">
                      <MdLocationPin />
                      <span className="font-semibold">Address: </span>
                    </div>
                    <div className="text-lg text-blue-500">
                      {user?.city} {', '} {user?.country}
                    </div>
                  </div>
                </div>
                <Link to={`/admin/user/edit/${user?._id}`}>
                  <Button variant="outline-primary">Edit Profile</Button>
                </Link>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  )
}

export default UserProfile
