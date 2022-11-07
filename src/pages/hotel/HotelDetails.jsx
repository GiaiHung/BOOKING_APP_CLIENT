import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'

import { MdLocationPin } from 'react-icons/md'
import { AiFillCloseCircle } from 'react-icons/ai'
import { BsFillArrowLeftCircleFill, BsFillArrowRightCircleFill } from 'react-icons/bs'

import useFetch from '../../hooks/useFetch'
import Loading from '../../components/Helper/Loading'
import dayDifference from '../../components/Helper/dayDifference'
import Reserve from '../../components/Reserve/Reserve'

function HotelDetails() {
  const { user } = useSelector((state) => state.auth)
  const location = useLocation()
  const hotelId = location.pathname.split('/')[2]
  const {
    data: { hotel },
    loading,
    error,
  } = useFetch(`${import.meta.env.VITE_SERVER_URL}${location.pathname}`)

  const [currentIndex, setCurrentIndex] = useState(0)
  const [open, setOpen] = useState(false)
  const [openRoomReserve, setOpenRoomReserve] = useState(false)

  const { datePicker, options } = useSelector((state) => state.location)
  const dateBetween = dayDifference(datePicker[0].endDate, datePicker[0].startDate)

  const navigate = useNavigate()

  const handleOpenCarousel = (i) => {
    setCurrentIndex(i)
    setOpen(true)
  }

  const handleSlide = (direction) => {
    if (direction === 'left') {
      currentIndex === 0
        ? setCurrentIndex(hotel?.photos.length - 1)
        : setCurrentIndex(currentIndex - 1)
    } else {
      currentIndex === hotel?.photos.length - 1
        ? setCurrentIndex(0)
        : setCurrentIndex(currentIndex + 1)
    }
  }

  const handleReserve = async () => {
    if (user) {
      setOpenRoomReserve(true)
    } else {
      navigate('/login')
    }
  }

  return (
    <>
      {/* Slider */}
      {open && (
        <div className="fixed top-0 left-0 z-50 flex h-screen w-screen items-center bg-[rgba(0,0,0,0.6)]">
          <AiFillCloseCircle className="arrow top-8 right-8 z-50" onClick={() => setOpen(false)} />
          <BsFillArrowLeftCircleFill
            className="arrow left-8 z-50"
            onClick={() => handleSlide('left')}
          />
          <div className="mx-auto flex h-[80vh] w-4/5 items-center justify-center">
            <img src={hotel?.photos[currentIndex]} alt="" className="h-full w-full object-cover" />
          </div>
          <BsFillArrowRightCircleFill
            className="arrow right-8 z-50"
            onClick={() => handleSlide('right')}
          />
        </div>
      )}
      {openRoomReserve && <Reserve hotelId={hotelId} setOpenRoomReserve={setOpenRoomReserve} />}
      {loading ? (
        <Loading />
      ) : (
        <div className="mx-auto mt-6 max-w-6xl space-y-6 px-4 md:px-0">
          <div className="flex flex-col items-start justify-between gap-3 md:flex-row">
            <div className="space-y-3">
              <h2 className="text-3xl font-bold capitalize">{hotel?.title}</h2>
              <div className="flex items-center gap-2">
                <MdLocationPin className="text-2xl" />
                <p className="text-sm text-gray-500">{hotel?.address}</p>
              </div>
              <h2 className="text-lg font-semibold text-purple-500">
                Excelent location -{hotel?.distance}m from center
              </h2>
              <h4 className="text-md italic">
                Book a stay over from ${hotel?.cheapestPrice} at this property and get a free
                airport taxi
              </h4>
            </div>
            <button
              className="mx-auto rounded-md bg-purple-500 px-2 py-1 text-2xl font-bold text-white md:m-0"
              onClick={handleReserve}
            >
              Reserve or book now!
            </button>
          </div>
          {/* Image Grid */}
          <div className="mt-4 grid grid-cols-1 gap-2 md:grid-cols-3">
            {hotel?.photos.map((image, i) => (
              <img
                src={image}
                alt=""
                className="h-[250px] w-full object-cover"
                onClick={() => handleOpenCarousel(i)}
                key={i}
              />
            ))}
          </div>

          {/* Description */}
          <div className="flex flex-col justify-between gap-4 md:flex-row">
            <div className="grow space-y-4">
              <h2 className="text-3xl font-bold">
                Stay in the heart of <span className="capitalize">{hotel?.city}</span>
              </h2>
              <p className="text-lg text-gray-600">{hotel?.desc}</p>
            </div>
            <div className="min-w-[300px] space-y-6 bg-blue-200 p-4">
              <h2 className="text-xl font-bold text-red-700">
                Perfect for a {dateBetween}-nights stay!
              </h2>
              <p>
                Located in the real heart of Krakow, this property has an excellent location score
                of {hotel?.rating}!
              </p>
              <p>
                <span className="text-2xl font-bold">
                  {dateBetween * hotel?.cheapestPrice * options.room}$
                </span>{' '}
                <span>{`(${dateBetween} nights)`}</span>
              </p>
              <button
                className="w-full rounded-md bg-purple-500 px-2 py-1 text-2xl font-bold text-white"
                onClick={handleReserve}
              >
                Reserve or book now!
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default HotelDetails
