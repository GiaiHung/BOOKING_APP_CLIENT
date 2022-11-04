import React from 'react'
import { AiOutlineLoading3Quarters } from 'react-icons/ai'

function Loading() {
  return (
    <div className="flex h-[10vh] animate-spin items-center justify-center">
      <AiOutlineLoading3Quarters className="text-5xl text-gray-500" />
    </div>
  )
}

export default Loading
