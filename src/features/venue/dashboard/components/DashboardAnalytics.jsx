import { GradientText } from '@/shared'
import React from 'react'

const DashboardAnalytics = ({src,title,count}) => {
  return (
    <div className="mt-3 w-full border border-black rounded-2xl h-25 relative bg-[url('/src/assets/dashboard/card-bg.svg')] bg-cover bg-center overflow-hidden rounded-4xl">
          <div className="absolute inset-0 bg-white/70 rounded-2xl m-4">
          <img src={src} className='w-5'/>
          </div>

          {/* Content */}
          <div className="flex justify-between items-center mx-4 h-full relative my-4 z-10">
            <div className="font-bold text-gray-800">{title}</div>
            <GradientText children={count} className='text-2xl font-bold'/>
          </div>
          
        </div>
  )
}

export default DashboardAnalytics