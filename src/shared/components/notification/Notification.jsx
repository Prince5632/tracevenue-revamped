import React from 'react'

const Notification = () => {
  return (
    <div className='border border-gray-200 rounded-[6px] p-2 shadow-lg  bg-white'>
     <div className="flex justify-between items-center">
        <p className='font-bold !text-[14px] !text-black'>Proposal Received</p>
        <p className='!text-[10px]'>1h ago</p>
     </div>
     <p className='!text-[12px]'>ABS has sent you a package regarding your Birthday Party event <a href="#"  className='!text-blue-600 !underline'>Looking venue for Birthday Party for 120 people on 2026-02-19.</a></p>
    </div>
  )
}

export default Notification
