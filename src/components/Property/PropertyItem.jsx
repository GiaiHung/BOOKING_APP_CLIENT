import React from 'react'

function PropertyItem({ property, index, count }) {
  return (
    <div className="h-fit">
      <img src={property.img} alt="" className="w-full h-[180px] rounded-2xl object-cover" />
      <div className='flex gap-2 items-center justify-center text-2xl mt-2'>
        <h2>{count[index]?.count}</h2>
        <p>{property.name}</p>
      </div>
    </div>
  )
}

export default PropertyItem
