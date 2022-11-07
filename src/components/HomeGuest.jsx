import React from 'react'
import useFetch from '../hooks/useFetch'
import Loading from './Helper/Loading'

function HomeGuest() {
  const {
    data: { hotels },
    loading,
    error,
  } = useFetch(`${import.meta.env.VITE_SERVER_URL}/hotels?featured=false&limits=4&min=99&max=999`)
  const {
    data,
  } = useFetch(`${import.meta.env.VITE_SERVER_URL}/users`)
  
  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div className="mx-4 max-w-6xl md:mx-0">
          <h1 className="mb-4 w-full text-start text-3xl font-semibold">Home guests love</h1>
          <div className="grid grid-cols-1 gap-3 md:grid-cols-4">
            {hotels?.map((hotel) => (
              <div className="h-fit w-full" key={hotel._id}>
                <img
                  src={hotel.photos[0]}
                  alt=""
                  className="h-[250px] w-full rounded-2xl object-cover md:h-[200px]"
                />
                <div className="space-y-3 mt-4">
                  <div>
                    <div className="flex w-full items-center justify-between">
                      <h2 className="text-2xl font-semibold">{hotel.title}</h2>
                      <p className="text-lg font-light capitalize text-gray-500">{hotel.city}</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold">Starting from ${hotel.cheapestPrice}</h3>
                    {Number(hotel.rating) > 5 && (
                      <div className="flex items-center gap-x-3 font-semibold">
                        <h4>
                          {Number(hotel.rating) >= 6 && Number(hotel.rating) <= 8
                            ? 'Normal'
                            : Number(hotel.rating) >= 8 && Number(hotel.rating) <= 9
                            ? 'Good'
                            : 'Excellent'}
                        </h4>
                        <h4 className="grid place-items-center rounded-lg bg-violet-700 px-2 py-1 text-white">
                          {Number(hotel.rating)}
                        </h4>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  )
}

export default HomeGuest
