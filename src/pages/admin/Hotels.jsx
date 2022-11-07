import React from 'react'
import useFetch from '../../hooks/useFetch'
import Loading from '../../components/Helper/Loading'
import { Link } from 'react-router-dom'
import { Button, Table } from 'react-bootstrap'
import { useSelector } from 'react-redux'

function Hotels() {
  const {
    data: { hotels },
    loading,
  } = useFetch(`${import.meta.env.VITE_SERVER_URL}/hotels`)
  const {
    user: { isAdmin, _id: currentUserId },
  } = useSelector((state) => state.auth)

  const adminAuth = (id) => {
    if (isAdmin || id === currentUserId) return true
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
                  <td className="min-w-[150px] space-y-4 flex flex-col">
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
