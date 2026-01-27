import { Button } from '@/shared'
import React from 'react'
import { ArrowRight } from 'lucide-react'

const DashboardCard = () => {
  return (
    <div className="bg-linear-to-r from-[#f08e45] to-[#ee5763] rounded-2xl mt-4 p-6 grid grid-cols-1 md:grid-cols-[2fr_1fr] gap-4 items-center w-full">

      {/* Text Section */}
      <div className="md:text-left">
        <h1 className="font-bold text-2xl md:text-3xl text-white">
          Hi Prince! Ready to plan your next event?
        </h1>
        <h2 className="text-white font-semibold text-md mt-2">
          Quick actions to start planning or view your activity.
        </h2>
      </div>

      {/* Button Section */}
      <div className="flex justify-center items-center md:mt-10 md:justify-end">
        <Button 
          variant="outline" 
          rightIcon={<ArrowRight />}
          className="bg-white whitespace-nowrap"
        >
          Plan My Event
        </Button>
      </div>

    </div>
  )
}

export default DashboardCard
