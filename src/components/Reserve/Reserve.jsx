import React, { useState } from 'react'
import { toast } from 'react-hot-toast'
import axios from 'axios'
import { FaTimes } from 'react-icons/fa'
import { useSelector } from 'react-redux'
import useFetch from '../../hooks/useFetch'
import getDatesInRange from '../Helper/getDatesInRange'
import Loading from '../Helper/Loading'
import { useNavigate } from 'react-router-dom'

function Reserve({ hotelId, setOpenRoomReserve }) {
  const {
    data: { list },
    loading,
    error,
  } = useFetch(`${import.meta.env.VITE_SERVER_URL}/hotels/hotel/rooms/${hotelId}`)
  const { startDate, endDate } = useSelector((state) => state.location.datePicker[0])
  const [selectedRooms, setSelectedRooms] = useState([])

  const handleSelect = (e) => {
    const checked = e.target.checked
    const value = e.target.value
    setSelectedRooms(
      checked ? [...selectedRooms, value] : selectedRooms.filter((room) => room !== value)
    )
  }

  const datesRange = getDatesInRange(startDate, endDate)
  const navigate = useNavigate()

  const handleReserve = async () => {
    try {
      await Promise.all(
        selectedRooms.map((room) => {
          const { data } = axios.put(
            `${import.meta.env.VITE_SERVER_URL}/rooms/availability/${room}`,
            {
              dates: datesRange,
            }
          )
          return data
        })
      )
      toast.success('Your room is reserved successfully!')
      setOpenRoomReserve(false)
      // navigate('/')
    } catch (error) {
      return toast.error(error.response.data.message)
    }
  }

  const isAvailable = (roomNumber) => {
    const isFound = roomNumber.unavailableDates.some((date) =>
      datesRange.includes(new Date(date).getTime())
    )
    return !isFound
  }

  return (
    <div className="fixed top-0 left-0 bottom-0 right-0 z-10 bg-gray-500 bg-[rgba(0,0,0,0.4)] md:flex md:items-center md:justify-center">
      {loading ? (
        <Loading />
      ) : (
        <div className="relative h-full w-full max-w-[450px] bg-white p-6 md:h-fit md:w-fit">
          <FaTimes
            className="absolute right-4 top-4 cursor-pointer text-4xl text-gray-500 hover:text-red-500"
            onClick={() => setOpenRoomReserve(false)}
          />
          <h1 className="font-semibol text-2xl">Select you room:</h1>
          {list?.map((room, index) => (
            <div key={index}>
              <h2 className="font-semibold">{room.title}</h2>
              <p>{room.description}</p>
              <p>
                Max people: <strong>{room.maxPeople}</strong>
              </p>
              {room.roomNumbers.map((roomNumber) => (
                <div key={roomNumber._id} className="space-x-2 text-black">
                  <input
                    type="checkbox"
                    value={roomNumber._id}
                    onChange={handleSelect}
                    className="rounded-lg border border-gray-500 outline-none"
                    disabled={!isAvailable(roomNumber)}
                  />
                  <label className={`${!isAvailable(roomNumber) && 'text-gray-500'}`}>
                    {roomNumber.number}
                  </label>
                </div>
              ))}
            </div>
          ))}
          <button
            className="mt-4 w-full rounded-md bg-blue-500 py-2 text-2xl font-bold text-white duration-150 ease-in hover:bg-blue-600"
            onClick={handleReserve}
          >
            Reserve Now
          </button>
        </div>
      )}
    </div>
  )
}

export default Reserve
