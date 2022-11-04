import React, { useState } from 'react'
import { FaBed, FaCalendarAlt } from 'react-icons/fa'
import { ImMan } from 'react-icons/im'
import { DateRange } from 'react-date-range'
import { format } from 'date-fns'
import 'react-date-range/dist/styles.css' // main css file
import 'react-date-range/dist/theme/default.css' // theme css file
import BookingOptions from './BookingOptions'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { saveUrl } from '../../redux/locationSlice'

function Booking() {
  const [datePicker, setDatePicker] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: 'selection',
    },
  ])
  const [options, setOptions] = useState({
    adult: 1,
    children: 0,
    room: 1,
  })
  const [openOptions, setOpenOptions] = useState(false)
  const [destination, setDestination] = useState('')
  const [openDatePicker, setOpenDatePicker] = useState(false)

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const handleSearch = () => {
    dispatch(
      saveUrl({
        destination,
        datePicker,
        options,
        min: 100,
        max: 999,
      })
    )
    navigate('/hotels')
  }

  return (
    <div className="relative bottom-0 mx-auto flex h-fit w-full max-w-6xl items-center justify-center rounded-2xl border-2 border-yellow-500 bg-white px-4 py-2 text-xl text-gray-500 md:absolute md:bottom-[-32px]">
      <div className="flex w-full flex-col items-start justify-between space-y-4 md:flex-row md:items-center md:space-y-0">
        <div className="bookingItem">
          <FaBed />
          <input
            placeholder="Where are you going"
            className="outline-none"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
          />
        </div>
        <div className="bookingItem">
          <FaCalendarAlt />
          <span onClick={() => setOpenDatePicker(!openDatePicker)}>
            {`${format(datePicker[0].startDate, 'MM/dd/yyyy')}`} to{' '}
            {`${format(datePicker[0].endDate, 'MM/dd/yyyy')}`}
          </span>
          {openDatePicker && (
            <DateRange
              editableDateInputs={true}
              onChange={(item) => setDatePicker([item.selection])}
              moveRangeOnFirstSelection={false}
              ranges={datePicker}
              className="absolute left-[-10px] top-[200px] z-10 md:top-[64px] md:left-[300px]"
            />
          )}
          ;
        </div>
        <div className="bookingItem">
          <ImMan />
          <span
            onClick={() => setOpenOptions(!openOptions)}
          >{`${options.adult} adult ${options.children} children ${options.room} room`}</span>
          {openOptions && <BookingOptions options={options} setOptions={setOptions} />}
        </div>
        <div
          className="mx-auto w-full cursor-pointer rounded-lg bg-blue-500 px-3 py-2 text-center font-semibold text-white duration-150 ease-in hover:bg-blue-600 md:mx-0 md:w-fit"
          onClick={handleSearch}
        >
          <button>Search</button>
        </div>
      </div>
    </div>
  )
}

export default Booking
