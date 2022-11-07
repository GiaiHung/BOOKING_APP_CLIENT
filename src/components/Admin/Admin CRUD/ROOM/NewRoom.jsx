import './newRoom.scss'
import React, { useState } from 'react'
import Navbar from '../../../Header/Navbar'
import Sidebar from '../../Sidebar'
import { roomInputs } from '../../../../assets/constants/formSource'
import useFetch from '../../../../hooks/useFetch'
import axios from 'axios'
import setAuthToken from '../../../../utils/setAuthToken'
import { useSelector } from 'react-redux'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'

function NewRoom() {
  const [info, setInfo] = useState({})
  const [rooms, setRooms] = useState([])
  const [hotelId,setHotelId] = useState('')

  const {user: {accessToken}} = useSelector(state => state.auth)

  const navigate = useNavigate()

  const {
    data: { hotels },
    loading,
  } = useFetch(`${import.meta.env.VITE_SERVER_URL}/hotels`)

  const handleChange = (e) => {
    setInfo((prev) => ({ ...prev, [e.target.id]: e.target.value }))
  }

  const handleCreateRoom = async (e) => {
    e.preventDefault()

    try {
      const roomNumbers = rooms.split(',').map(roomNumber => ({number: roomNumber}))
      const newRoom = {
        ...info,
        hotelId,
        roomNumbers
      }
      setAuthToken(accessToken)
      const {data} = await axios.post(`${import.meta.env.VITE_SERVER_URL}/rooms/${hotelId}`, newRoom)
      if(data.success) {
        navigate('/admin/rooms')
        toast.success(data.message)
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      <Navbar type="sidebar" />
      <div className="new">
        <Sidebar />
        <div className="newContainer">
          <div className="top">
            <h1>Add new room</h1>
          </div>
          <div className="bottom flex-col space-y-6 md:flex-row md:space-y-0">
            <div className="right">
              <form>
                {roomInputs.map((input) => (
                  <div className="formInput" key={input.id}>
                    <label>{input.label}</label>
                    <input
                      onChange={handleChange}
                      type={input.type}
                      placeholder={input.placeholder}
                      id={input.id}
                    />
                  </div>
                ))}

                <div className="formInput">
                  <label>Rooms</label>
                  <textarea
                    onChange={(e) => setRooms(e.target.value)}
                    placeholder="give comma between room numbers."
                  />
                </div>

                <div className="formInput">
                  <label>Choose a hotel</label>
                  <select id="hotelId" onChange={(e) => setHotelId(e.target.value)}>
                    {loading
                      ? 'loading'
                      : hotels &&
                        hotels.map((hotel) => (
                          <option key={hotel._id} value={hotel._id}>
                            {hotel.name}
                          </option>
                        ))}
                  </select>
                </div>

                <button onClick={handleCreateRoom}>Send</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default NewRoom
