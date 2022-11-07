import React from 'react'
import useFetch from '../../hooks/useFetch'
import Loading from '../../components/Helper/Loading'
import { Link } from 'react-router-dom'
import { Button, Table } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import axios from 'axios'
import { toast } from 'react-hot-toast'
import setAuthToken from '../../utils/setAuthToken'

function Hotels() {
  const {
    data: { hotels },
    loading,
  } = useFetch(`${import.meta.env.VITE_SERVER_URL}/hotels`)
  const {
    user: { isAdmin, _id: currentUserId, accessToken },
  } = useSelector((state) => state.auth)

  const adminAuth = (id) => {
    if (isAdmin || id === currentUserId) return true
  }

  const handleDelete = async (id) => {
    setAuthToken(accessToken)
    const { data } = await axios.delete(`${import.meta.env.VITE_SERVER_URL}/hotels/${id}`)
    if (data.success) {
      toast.success(data.message)
    }
  }
  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div className="mx-auto h-screen w-[90vw] md:mr-6 md:w-3/4">
          <div className="flex items-center justify-between">
            <h1 className="my-4 text-3xl font-semibold text-gray-500">Add New Hotel</h1>
            {isAdmin && (
              <Link to="/admin/hotel/new">
                <Button variant="outline-primary">Add hotel</Button>
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
                <th>Rating</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {hotels?.map((hotel, index) => (
                <tr key={hotel._id}>
                  <td className="min-w-[50px]">{index + 1}</td>
                  <td className="min-w-[150px]">
                    <div className="flex items-center gap-2">{hotel.title}</div>
                  </td>
                  <td className="min-w-[200px]">{hotel.desc}</td>
                  <td className="min-w-[100px]">{hotel.cheapestPrice}</td>
                  <td className="min-w-[100px]">{hotel.rating}</td>
                  <td className="flex min-w-[150px] flex-col space-y-4">
                    <Button variant="outline-primary">View</Button>
                    {adminAuth(hotel._id) && (
                      <Button variant="outline-danger" onClick={() => handleDelete(hotel._id)}>
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

export default Hotels
