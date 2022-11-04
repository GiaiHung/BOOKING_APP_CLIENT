import React from 'react'
import { Link } from 'react-router-dom'

function SearchItem({ hotel }) {
  const { _id, photos, title, desc, rating, cheapestPrice, distance } = hotel
  return (
    <div className="mt-8 grid grid-cols-1 rounded-md border-2 border-[rgba(0,0,0,0.2)] p-3 md:mt-0 md:grid-cols-4 md:space-x-6">
      <div className="col-span-1">
        <img src={photos[0]} className="h-[200px] w-full rounded-md object-cover" alt="" />
      </div>
      <div className="col-span-2 mt-4 space-y-3">
        <h2 className="text-3xl font-bold text-purple-600">{title}</h2>
        <p className="bg-green-500 px-1 py-2 text-2xl font-semibold text-white">
          Free airport taxi
        </p>
        <p>Studio Apartment with Air conditioning</p>
        <p>{distance}m from center</p>
        <p className="font-medium text-gray-700">{desc}</p>
        <p className="font-semibold">Free cancellation </p>
        <p className="text-gray-500">You can cancel later, so lock in this great price today!</p>
      </div>
      <div className="col-span-1 flex flex-col justify-between">
        <div className="flex items-center justify-between">
          {Number(rating) > 5 && (
            <div className="flex items-center gap-x-3 font-semibold">
              <h4>
                {Number(rating) >= 6 && Number(rating) <= 8
                  ? 'Normal'
                  : Number(rating) >= 8 && Number(rating) <= 9
                  ? 'Good'
                  : 'Excellent'}
              </h4>
              <h4 className="grid place-items-center rounded-lg bg-violet-700 px-2 py-1 text-white">
                {Number(rating)}
              </h4>
            </div>
          )}
        </div>
        <div className="space-y-2">
          <h2 className="text-2xl font-bold">${cheapestPrice}</h2>
          <p className="text-sm text-gray-500">Inclues tax and fees</p>
          <Link to={`/hotels/${_id}`}>
            <button className="mx-auto w-full bg-blue-500 p-2 font-bold text-white">
              See availability
            </button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default SearchItem
