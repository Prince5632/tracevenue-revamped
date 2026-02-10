import React from 'react'

const GreenLine = ({type}) => {
  return (
      <div className="flex items-center gap-2">

      {type === "Time" ? (
        // HALF DAY DESIGN
        <div className="flex items-center gap-2 h-14">
          <div className="relative flex flex-col items-center">
            <div className="w-[3px] h-10 bg-[#B1F4D8]"></div>

            <div className="absolute top-0 w-[10px] h-[10px] rounded-full bg-[#15B076]"></div>

            <div className="absolute bottom-0 w-[10px] h-[10px] rounded-full bg-[#15B076]"></div>
          </div>
        </div>
      ) : (
        // FULL DAY DESIGN
        <div className="flex items-center gap-2 x-3 py-1 rounded-lg h-14">
          <div className="w-[10px] h-[10px] rounded-full bg-[#15B076]"></div>
          <span className="text-[#85878C] font-semibold  text-[16px] w-[59px]">Full Day</span>
        </div>
      )}

    </div>
  )
}

export default GreenLine
