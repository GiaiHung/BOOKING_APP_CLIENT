import { format } from 'date-fns'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { saveUrl } from '../../redux/locationSlice'

function SearchBox({ reFetch }) {
  const location = useSelector((state) => state.location)
  const [datePicker, setDatePicker] = useState(location.datePicker)
  const [destination, setDestination] = useState(location.destination)
  const [options, setOptions] = useState(location.options)
  const [openDate, setOpenDate] = useState(false)
  const [min, setMin] = useState(location.min)
  const [max, setMax] = useState(location.max)

  const dispatch = useDispatch()
  const startDate = new Date(datePicker[0].startDate)
  const endDate = new Date(datePicker[0].endDate)

  const handleUpdateOptions = (e) => {
    setOptions((prev) => {
      return {
        ...prev,
        [e.target.name]: Number(e.target.value),
      }
    })
  }

  const handleSearch = () => {
    dispatch(
      saveUrl({
        datePicker,
        destination,
        options,
        min: Number(min),
        max: Number(max),
      })
    )
    reFetch()
  }

  return (
    <div className="relative top-0 col-span-1 h-fit w-full space-y-3 bg-[#febb02] p-4 md:sticky md:top-5">
      <h1 className="text-4xl font-semibold text-gray-700">Search</h1>
      <div className="flex flex-col gap-4">
        <h2 className="text-2xl font-semibold">Destination</h2>
        <input
          className="h-[40px] max-w-[300px] p-2 outline-none"
          value={destination}
          onChange={(e) => setDestination(e.target.value)}
        />
      </div>
      <div className="flex flex-col gap-4">
        <h2 className="text-2xl font-semibold">Check-in date</h2>
        <span className="max-w-[300px] bg-white p-2" onClick={() => setOpenDate(!openDate)}>
          {`${format(startDate, 'MM/dd/yyyy')}`} to{' '}
          {`${format(endDate, 'MM/dd/yyyy')}`}
        </span>
        {openDate && (
          <DateRange
            editableDateInputs={true}
            onChange={(item) => setDatePicker([item.selection])}
            minDate={new Date()}
            ranges={datePicker}
          />
        )}
      </div>
      <div className="flex flex-col">
        <h2 className="text-2xl font-semibold">Options</h2>
        <div className="lsOptions">
          <div className="lsOptionItem">
            <span className="lsOptionText">
              Min price <small>per night</small>
            </span>
            <input
              type="number"
              onChange={(e) => setMin(e.target.value)}
              className="lsOptionInput"
              value={min}
              min={0}
            />
          </div>
          <div className="lsOptionItem">
            <span className="lsOptionText">
              Max price <small>per night</small>
            </span>
            <input
              type="number"
              onChange={(e) => setMax(e.target.value)}
              className="lsOptionInput"
              value={max}
              min={10}
            />
          </div>
          <div className="lsOptionItem">
            <span className="lsOptionText">Adult</span>
            <input
              type="number"
              min={1}
              className="lsOptionInput"
              placeholder={options.adult}
              name="adult"
              onChange={handleUpdateOptions}
            />
          </div>
          <div className="lsOptionItem">
            <span className="lsOptionText">Children</span>
            <input
              type="number"
              min={0}
              className="lsOptionInput"
              placeholder={options.children}
              name="children"
              onChange={handleUpdateOptions}
            />
          </div>
          <div className="lsOptionItem">
            <span className="lsOptionText">Room</span>
            <input
              type="number"
              min={1}
              className="lsOptionInput"
              placeholder={options.room}
              name="room"
              onChange={handleUpdateOptions}
            />
          </div>
        </div>
      </div>
      <button
        className="flex w-full justify-center bg-blue-500 py-2 font-semibold text-white"
        onClick={handleSearch}
      >
        Search
      </button>
    </div>
  )
}

export default SearchBox
