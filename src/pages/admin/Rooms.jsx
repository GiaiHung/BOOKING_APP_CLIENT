import React from 'react'
import { Link } from 'react-router-dom'
import { Button, Table } from 'react-bootstrap'
import { useSelector } from 'react-redux'

import useFetch from '../../hooks/useFetch'
import Loading from '../../components/Helper/Loading'
import axios from 'axios'
import setAuthToken from '../../utils/setAuthToken'
import { toast } from 'react-hot-toast'

function Rooms() {
  const {
    data: { rooms },
    loading,
  } = useFetch(`${import.meta.env.VITE_SERVER_URL}/rooms`)
  const {
    user: { isAdmin, _id: currentUserId, accessToken },
  } = useSelector((state) => state.auth)

  const adminAuth = (id) => {
    if (isAdmin || id === currentUserId) return true
  }

  const handleDelete = async (hotelId, roomId) => {
    try {
      setAuthToken(accessToken)
      const { data } = await axios.delete(
        `${import.meta.env.VITE_SERVER_URL}/rooms/${hotelId}/${roomId}`
      )
      if (data.success) {
        toast.success(data.message)
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div className="mx-auto h-screen w-[90vw] md:mr-6 md:w-3/4">
          <div className="flex items-center justify-between">
            <h1 className="my-4 text-3xl font-semibold text-gray-500">Add New Room</h1>
            {isAdmin && (
              <Link to="/admin/room/new">
                <Button variant="outline-primary">Add Room</Button>
              </Link>
            )}
          </div>
          <Table bordered responsive="md">
            <thead>
              <tr>
                <th>#</th>
                <th>Title</th>
                <th>Description</th>
                <th>Price</th>
                <th>Max people</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {rooms?.map((room, index) => (
                <tr key={room._id}>
                  <td className="min-w-[50px]">{index + 1}</td>
                  <td className="min-w-[150px]">
                    <div className="flex items-center gap-2">{room.title}</div>
                  </td>
                  <td className="min-w-[200px]">{room.description}</td>
                  <td className="min-w-[100px]">{room.price}</td>
                  <td className="min-w-[100px]">{room.maxPeople}</td>
                  <td className="flex min-w-[150px] flex-col space-y-4">
                    <Button variant="outline-primary">View</Button>
                    {adminAuth(room._id) && (
                      <Button
                        variant="outline-danger"
                        onClick={() => handleDelete(room.hotelId, room._id)}
                      >
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

export default Rooms
