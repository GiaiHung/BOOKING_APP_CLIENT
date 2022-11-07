import './newHotel.scss'
import React, { useState } from 'react'
import Sidebar from '../../Sidebar'
import Navbar from '../../../Header/Navbar'
import { MdOutlineDriveFolderUpload } from 'react-icons/md'
import { hotelInputs } from '../../../../assets/constants/formSource'
import useFetch from '../../../../hooks/useFetch'
import { toast } from 'react-hot-toast'
import axios from 'axios'
import setAuthToken from '../../../../utils/setAuthToken'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

function NewHotel() {
  const [files, setFiles] = useState('')
  const [info, setInfo] = useState({})
  const [selectedRooms, setSelectedRooms] = useState([])

  const {user: {accessToken}} = useSelector(state => state.auth)
  const navigate = useNavigate()

  const {
    data: { rooms },
    loading,
  } = useFetch(`${import.meta.env.VITE_SERVER_URL}/rooms`)

  const handleChange = (e) => {
    setInfo((prev) => ({ ...prev, [e.target.id]: e.target.value }))
  }

  const handleSelect = (e) => {
    const currentRooms = Array.from(e.target.selectedOptions, (option) => option.value)
    setSelectedRooms(currentRooms)
  }

  const handleCreateHotel = async (e) => {
    e.preventDefault()

    try {
      const list = await Promise.all(
        Object.values(files).map(async (file) => {
          const data = new FormData()
          data.append('file', file)
          data.append('upload_preset', 'register')

          const uploadRes = await axios.post(
            'https://api.cloudinary.com/v1_1/dgj7h6a5k/image/upload',
            data
          )
          const { url } = uploadRes.data
          return url
        })
      )
      const newHotel = {
        ...info,
        rooms: selectedRooms,
        photos: list,
      }

      setAuthToken(accessToken)
      const { data } = await axios.post(`${import.meta.env.VITE_SERVER_URL}/hotels`, newHotel)
      if (data.success) toast.success('New hotel created successfully')
      navigate('/admin/hotels')
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
            <h1>Add new hotel</h1>
          </div>
          <div className="bottom flex-col space-y-6 md:flex-row md:space-y-0">
            <div className="left mx-auto md:mx-0">
              <img
                src={
                  files
                    ? URL.createObjectURL(files[0])
                    : 'https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg'
                }
                alt=""
              />
            </div>
            <div className="right">
              <form>
                <div className="formInput w-full md:w-3/4">
                  <label htmlFor="file">
                    Image:{' '}
                    <span className="text-2xl">
                      <MdOutlineDriveFolderUpload />
                    </span>
                  </label>
                  <input
                    type="file"
                    id="file"
                    multiple
                    onChange={(e) => setFiles(e.target.files)}
                    style={{ display: 'none' }}
                  />
                </div>

                {hotelInputs.map((input) => (
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
                  <label>Featured</label>
                  <select id="featured" onChange={handleChange}>
                    <option value={false}>No</option>
                    <option value={true}>Yes</option>
                  </select>
                </div>

                <div className="selectRooms">
                  <label>Rooms</label>
                  <select id="rooms" multiple onChange={handleSelect}>
                    {loading
                      ? 'Loading...'
                      : rooms &&
                        rooms.map((room) => (
                          <option key={room._id} value={room._id}>
                            {room.title}
                          </option>
                        ))}
                  </select>
                </div>

                <button onClick={handleCreateHotel}>Send</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default NewHotel
