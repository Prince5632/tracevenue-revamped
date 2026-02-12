import { CirclePlus, X } from 'lucide-react'
import React, { useState } from 'react'
import { PiForkKnifeFill } from "react-icons/pi";
import { BsGrid3X3GapFill } from "react-icons/bs";
import { FaGift } from "react-icons/fa";

const TableHeader = () => {
    const [addPackage, setAddPackage] = useState(false)
    const [criteriaCard, setCriteriaCard] = useState(false)
    return (
        <>
            <thead className='mt-2 rounded-2xl'>
                <tr className='border border-transparent rounded-2xl'>
                    <th className="w-1/4 bg-linear-to-r from-(--color-card-gradient-end) to-(--color-card-gradient-start)  text-center p-3.5 whitespace-nowrap font-semibold">
                        Comparison Criteria</th>
                    <th className="w-1/4 bg-linear-to-r from-(--color-card-gradient-end) to-(--color-card-gradient-start) text-center p-3.5 whitespace-nowrap font-semibold">My Requirements</th>
                    <th className="w-1/4 text-center p-3.5 whitespace-nowrap bg-linear-to-r from-(--color-card-gradient-end) to-(--color-card-gradient-start)">
                        <div className=''>
                            {!addPackage ? ( 
                                <div className='flex flex-col items-center justify-center cursor-pointer'>
                                    <CirclePlus className='text-primary-light' size={20} />
                                    <p className='text-secondary font-normal'>Add Package</p>
                                </div>
                            ) : (
                                <div className='flex flex-col items-center justify-center cursor-pointer'>
                                    <h1 className='"w-1/4 text-black'>Gold Package</h1>
                                    <span className='underline font-medium text-[12px]'  onClick={()=>setCriteriaCard(true)}>See Criteria</span>
                                </div>
                            )}
                            
                        </div>
                    </th>

                    <th className="w-1/4  text-center p-3.5 whitespace-nowrap bg-linear-to-r from-(--color-card-gradient-end) to-(--color-card-gradient-start)">
                        <div className='flex flex-col items-center justify-center cursor-pointer' onClick={()=>setAddPackage(true)}>
                            <CirclePlus className='text-primary-light' size={20}/>
                            <p className='text-secondary font-normal'>Add Package</p>
                        </div>
                    </th>
                </tr>
            </thead>


            {/* Matching Criteria Card */}
            {criteriaCard && (
                <div className='fixed inset-0 bg-black/40 !z-70'  onClick={() => setCriteriaCard(false)}></div>
            )}

            {criteriaCard && (
                
                <div className="fixed inset-0 z-80 flex justify-center items-start pt-20 px-4 -top-9">
                    <div className="w-110 h-auto max-w-xl bg-white rounded-xl p-6 max-h-[90vh] overflow-auto">    
                        
                        <div className='flex'>
                            <h1 className='text-[#333] font-bold flex-1 text-center'>Matching Criteria</h1>
                            <X size={20} className='cursor-pointer text-[#666]' onClick={() => setCriteriaCard(false)}/>
                        </div>

                        <div className='w-full h-auto bg-[#fff5f2] border border-[1px] border-dashed border-[#e2e8f0] mt-4 p-5'>
                            <div className='h-full w-full mt-1 grid grid-cols-1 sm:grid-cols-[80%_20%] gap-4 sm:gap-0'>
                                <div className='flex-1 flex-wrap'>
                                    <span className='uppercase text-[#ff4000] font-semibold !text-[12px]'>Alcohol Package</span>
                                    <h1 className='text-[#1a1a1a] font-bold text-[20px]'>Gold Package</h1>
                                    <p className='text-[#1a1a1a] text-md'>ABS</p>
                                </div>
                                <div className='flex sm:flex-col justify-center items-center leading-tight bg-[#f0fdf4] w-auto h-12 sm:h-15 border border-[1px] border-[#dcfce7] rounded-[8px] '>
                                    <span className='text-[#10b981] font-extrabold !text-[20px]'>0%</span>
                                    <span className='uppercase text-[#15803d] text-[10px] font-bold'>Match</span>
                                </div>
                            </div>
                        </div>

                        <div className='w-full px-5 py-6'>
                            <div className='w-full h-full'>
                                <div className='flex gap-15'>
                                    <div>
                                        <span className='uppercase text-[#888] text-[14px] font-bold'>price per guest</span>
                                        <h1 className='text-[#222] text-[18px] font-bold'>2500</h1>
                                    </div>
                                    <div>
                                        <span className='uppercase text-[#888] text-[14px] font-bold'>guest capacity</span>
                                        <h1 className='text-[#222] text-[18px] font-bold'>20 - 40</h1>
                                    </div>
                                </div>

                                <div className='w-full h-auto p-4 mt-10 bg-[#f8f9fa] border border-[1px] border-dashed border-[#e0e0e0] rounded-[8px]'>
                                    
                                    <div className='w-full h-auto grid grid-cols-1 sm:grid-cols-[35%_35%_30%] gap-4 sm:gap-0'>
                                        <div className='flex gap-2 items-center'>
                                            <PiForkKnifeFill size={18} className='text-[#777]'/>
                                            <div className='leading-none'>
                                                <span className='text-[#333] text-[16px] font-bold'>5</span><br/>
                                                <span className='text-[#777] text-[12px] font-semibold'>Cuisines</span>
                                            </div>
                                            <div className='w-[1px] h-[24px] bg-[#ccc] ml-4 hidden sm:block' />
                                        </div>
                                        <div className='flex gap-2 items-center ml:0 sm:ml-3'>
                                            <BsGrid3X3GapFill size={18} className='text-[#777]' />
                                            <div className='leading-none'>
                                                <span className='text-[#333] text-[16px] font-bold'>28</span><br/>
                                                <span className='text-[#777] text-[12px] font-semibold'>Items</span>
                                            </div>
                                            <div className='w-[1px] h-[24px] bg-[#ccc] ml-4 hidden sm:block' />
                                        </div>
                                        <div className='flex gap-2 items-center ml:0 sm:ml-1'>
                                            <FaGift size={18} className='text-[#777]' />
                                            <div className='leading-none'>
                                                <span className='text-[#333] text-[16px] font-bold'>1</span><br/>
                                                <span className='text-[#777] text-[12px] font-semibold'>Services</span>
                                            </div>
                                        </div>
                                    </div>

                                </div>

                                <div className='w-full pt-6'>
                                    <button className='w-full bg-[linear-gradient(135deg,#fdeaed,#fff3ea)] shadow-[0_6px_16px_#3d281726] -translate-y-[2px]
                                        border border-[1px] border-solid border-[#ff4000] transition-all duration-300 ease-in-out cursor-pointer
                                        text-[#ff4000] !font-bold py-3 rounded-full'>Send Contract</button>
                                </div>

                                <div className='w-full text-center py-6'>
                                    <p className='underline' onClick={() => 
                                        {
                                          setAddPackage(false)
                                          setCriteriaCard(false)
                                        }
                                    }>Remove from compare</p>
                                </div>
                            </div>
                        </div>
                    </div>
          
                </div>
      )}
        </>
    )
}

export default TableHeader