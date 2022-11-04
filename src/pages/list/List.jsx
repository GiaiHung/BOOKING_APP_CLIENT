import React from 'react'
import { useLocation } from 'react-router-dom'
import { format, set } from 'date-fns'
import { useState } from 'react'
import { DateRange } from 'react-date-range'

import Navbar from '../../components/Header/Navbar'
import Header from '../../components/Header/Header'
import './list.css'
import SearchItem from '../../components/SearchItem'
import SearchBox from '../../components/Search/SearchBox'
import useFetch from '../../hooks/useFetch'
import Loading from '../../components/Helper/Loading'
import { useSelector } from 'react-redux'

function List() {
  const { destination, datePicker, options, min, max } = useSelector((state) => state.location)
  const {
    data: { hotels },
    loading,
    error,
    reFetch,
  } = useFetch(
    `${
      import.meta.env.VITE_SERVER_URL
    }/hotels?city=${destination.toLowerCase()}&min=${min}&max=${max}`
  )

  return (
    <>
      <Navbar />
      <Header type="list" />
      {loading ? (
        <Loading />
      ) : (
        <div className="mx-auto mt-10 grid max-w-6xl grid-cols-1 justify-center px-6 md:grid-cols-4 md:gap-6 md:px-0">
          <SearchBox reFetch={reFetch} />
          <div className="col-span-3 space-y-4">
            {hotels?.map((hotel) => (
              <SearchItem hotel={hotel} key={hotel._id} />
            ))}
          </div>
        </div>
      )}
    </>
  )
}

export default List
