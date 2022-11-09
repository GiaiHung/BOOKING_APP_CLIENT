import React, { useEffect, useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import Table from 'react-bootstrap/Table'
import useFetch from '../../hooks/useFetch'
import setAuthToken from '../../utils/setAuthToken'
import { useSelector } from 'react-redux'
import Loading from '../../components/Helper/Loading'
import { Button } from 'react-bootstrap'
import { toast } from 'react-hot-toast'
import axios from 'axios'
import { Link } from 'react-router-dom'

function Users() {
  const [list, setList] = useState([])
  const { user } = useSelector((state) => state.auth)
  const currentUserId = user._id
  const isAdmin = user.isAdmin
  setAuthToken(user.accessToken)
  const { data, loading, error } = useFetch(`${import.meta.env.VITE_SERVER_URL}/users`)

  useEffect(() => {
    setList(data.users)
  }, [data])

  const adminAuth = (id) => {
    if (isAdmin || id === currentUserId) return true
  }

  const handleDelete = async (id) => {
    try {
      const { data } = await axios.delete(`${import.meta.env.VITE_SERVER_URL}/users/${id}`)
      toast.success(data.message)
    } catch (error) {
      return toast.error(error.response.data.message)
    }
    setList(list.filter((user) => user._id !== id))
  }
  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div className="mx-auto h-screen w-[90vw] md:mr-6 md:w-3/4">
          <div className="flex items-center justify-between">
            <h1 className="my-4 text-3xl font-semibold text-gray-500">Add New User</h1>
            {isAdmin && (
              <Link to="/register">
                <Button variant="outline-primary">Add user</Button>
              </Link>
            )}
          </div>
          <Table bordered responsive="md">
            <thead>
              <tr>
                <th>#</th>
                <th>User</th>
                <th>Email</th>
                <th>Country</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {list?.map((user, index) => (
                <tr key={user._id}>
                  <td className="min-w-[50px]">{index + 1}</td>
                  <td className="min-w-[250px]">
                    <div className="flex items-center gap-2">
                      <img
                        className="h-12 w-12 rounded-full object-cover"
                        src={user.img || 'https://i.ibb.co/MBtjqXQ/no-avatar.gif'}
                        alt={user.username}
                      />
                      {user.username}
                    </div>
                  </td>
                  <td className="min-w-[150px]">{user.email}</td>
                  <td className="min-w-[100px]">{user.country}</td>
                  <td className="min-w-[200px] space-x-4">
                    <Link to={`/admin/userProfile/${user._id}`}>
                      <Button variant="outline-primary">View</Button>
                    </Link>
                    {adminAuth(user._id) && (
                      <Button variant="outline-danger" onClick={() => handleDelete(user._id)}>
                        Delete
                      </Button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      )}
    </>
  )
}

export default Users
