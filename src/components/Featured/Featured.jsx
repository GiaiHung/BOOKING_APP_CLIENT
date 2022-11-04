import React from 'react'

import useFetch from '../../hooks/useFetch'
import Loading from '../Helper/Loading'
import { featuredLists } from '../../assets/constants/featuredList'
import FeaturedItems from './FeaturedItems'

function Featured() {
  const {
    data: property,
    loading,
    error,
  } = useFetch(`${import.meta.env.VITE_SERVER_URL}/hotels/countByCity?cities=Berlin,moscow,london`)
  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <>
          <div className="mx-auto grid max-w-6xl grid-cols-1 gap-4 md:mx-0 md:grid-cols-3">
            {featuredLists.map((featuredList, index) => (
              <FeaturedItems
                featuredList={featuredList}
                property={property}
                index={index}
                key={index}
              />
            ))}
          </div>
        </>
      )}
    </>
  )
}

export default Featured
