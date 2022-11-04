import React from 'react'

function BookingOptions({ options, setOptions }) {
  const handleOptionOperation = (option, operation) => {
    setOptions((prev) => {
      return {
        ...prev,
        [option]: operation === 'inc' ? options[option] + 1 : options[option] - 1,
      }
    })
  }
  return (
    <div className="absolute left-[-10px] top-[200px] md:top-[64px] md:left-[700px] z-10">
      <div className="min-w-[250px] space-y-2 rounded-2xl border border-gray-500 bg-white p-4 shadow-lg">
        <div className="flex items-center justify-between">
          <p>Adult</p>
          <div className="flex items-center space-x-3">
            <button
              className="bookingOptionsOperationBtn"
              onClick={() => handleOptionOperation('adult', 'desc')}
              disabled={options.adult <= 0}
            >
              -
            </button>
            <span>{options.adult}</span>
            <button
              className="bookingOptionsOperationBtn"
              onClick={() => handleOptionOperation('adult', 'inc')}
            >
              +
            </button>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <p>Children</p>
          <div className="flex items-center space-x-3">
            <button
              className="bookingOptionsOperationBtn"
              onClick={() => handleOptionOperation('children', 'desc')}
              disabled={options.children <= 0}
            >
              -
            </button>
            <span>{options.children}</span>
            <button
              className="bookingOptionsOperationBtn"
              onClick={() => handleOptionOperation('children', 'inc')}
            >
              +
            </button>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <p>Room</p>
          <div className="flex items-center space-x-3">
            <button
              className="bookingOptionsOperationBtn"
              onClick={() => handleOptionOperation('room', 'desc')}
              disabled={options.room <= 0}
            >
              -
            </button>
            <span>{options.room}</span>
            <button
              className="bookingOptionsOperationBtn"
              onClick={() => handleOptionOperation('room', 'inc')}
            >
              +
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BookingOptions
