import React from 'react'

function FeaturedItems({ featuredList, property, index }) {
  return (
    <div className="relative z-0 h-[250px] overflow-hidden rounded-2xl">
      <img src={featuredList.img} className="h-full w-full object-cover" alt="image" />
      <div className="absolute top-0 left-0 bottom-0 right-0 bg-[rgba(0,0,0,0.2)]"></div>
      <div className="absolute bottom-10 left-4 space-y-4 font-bold text-white">
        <h2 className="text-4xl">{featuredList.name}</h2>
        <p className="text-2xl">{property[index]} properties</p>
      </div>
    </div>
  )
}

export default FeaturedItems
