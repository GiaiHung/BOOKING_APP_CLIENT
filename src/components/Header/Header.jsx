import React from 'react'
import { FaBed, FaPlane, FaCarSide, FaPlaceOfWorship, FaTaxi } from 'react-icons/fa'
import Booking from './Booking'

function Header({ type }) {
  return (
    <div className="relative bg-blue-700 py-4 text-2xl font-semibold text-white">
      <div className="mx-auto max-w-6xl px-6 md:px-0">
        <div className="flex flex-wrap items-center justify-between">
          <div className="headerItem headerActive">
            <FaBed />
            <span>Stays</span>
          </div>
          <div className="headerItem">
            <FaPlane />
            <span>Flights</span>
          </div>
          <div className="headerItem">
            <FaCarSide />
            <span>Cars</span>
          </div>
          <div className="headerItem">
            <FaPlaceOfWorship />
            <span>Attractions</span>
          </div>
          <div className="headerItem">
            <FaTaxi />
            <span>Public transportation</span>
          </div>
        </div>
        {type !== 'list' && (
          <>
            <div className="my-10 space-y-6">
              <h1 className="text-4xl font-bold">A lifetime of discounts? It's Genius.</h1>
              <p className="font-light">
                Get rewarded for your travels – unlock instant savings of 10% or more with a free
                Lamabooking account
              </p>
              <button className="headerBtn">Login / Register</button>
            </div>
            <Booking />
          </>
        )}
      </div>
    </div>
  )
}

export default Header
