import React from 'react'
import useFetch from '../../hooks/useFetch'
import { propertyList } from '../../assets/constants/propertyList'
import PropertyItem from './PropertyItem'
import Loading from '../Helper/Loading'

function PropertyList() {
  const {
    data: count,
    loading,
    error,
  } = useFetch(`${import.meta.env.VITE_SERVER_URL}/hotels/countByType`)
  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div className="mx-0 max-w-6xl md:mx-auto">
          <h1 className="mb-4 w-full text-start text-3xl font-semibold ml-4">Browse by property</h1>
          <div className="grid grid-cols-1 gap-3 md:grid-cols-5 px-4 md:px-0">
            {propertyList.map((property, index) => (
              <PropertyItem property={property} count={count} index={index} key={index} />
            ))}
          </div>
        </div>
      )}
    </>
  )
}

export default PropertyList
