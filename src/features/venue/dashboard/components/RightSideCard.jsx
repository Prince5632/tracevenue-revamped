import { X } from 'lucide-react'
import React, { useState } from 'react'
import restaurant from "../../../../assets/images/restaurant.png"
import circleArrow from "../../../../assets/images/circle-arrow.png"
import wifi from "../../../../assets/images/wifi.png"
import parking from "../../../../assets/images/free-parking.png"
import reservation from "../../../../assets/images/reservation.png"
import star from "../../../../assets/images/star.png"
import location from "../../../../assets/images/locationIcon.png"
import user from "../../../../assets/images/user.png"
import direction from "../../../../assets/images/direction.png"
import tick from "../../../../assets/images/tick.png"

const RightSideCard = () => {
    
  return (
    <> 
       <div className='w-screen !h-auto fixed inset-0 z-50 bg-black/40'></div>
        <div className=' w-full md:w-[55%] !h-screen bg-[#FFFFFF] fixed z-60 top-0 right-0 px-[30px] pt-[15px] overflow-y-auto '>
            
            <div className='flex justify-between'>
                <div className='flex gap-4'>
                    <div className='pt-1 '>
                       <img src={circleArrow} alt="circleArrow" className='h-[30px] w-[30px] min-h-[20px] min-w-[20px]'/>
                    </div>
                    <div className='flex flex-col'>
                       <h2 className='font-bold text-[#060606] text-[20px]'>Moti Mahal Delux</h2>
                       <p className='!text-[#85878C] !text-[12px] leading-tight'>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's.</p>
                    </div>
                </div>

                <div className=''>
                    <X size={20} className='text-[#060606]' />
                </div>
            </div>

            <div className='flex gap-8 mt-4 pl-[15px]'>
                <span className='text-[#060606] text-[16px] font-semibold'>Overview</span>
                <span className='text-[#5C5F62] text-[16px] font-semibold'>Gallery</span>
                <span className='text-[#5C5F62] text-[16px] font-semibold'>Map</span>
            </div>

            <div className='w-full h-[4px] bg-[#F0F0F4] rounded-[5px] mt-1 mb-3'>
                <div className='w-[15%] h-[4px] bg-[#FF4000] rounded-[3px] '/>
            </div>
            
            {/* image section start*/}
            <div className='relative'>
                <img src={restaurant} alt="restaurant" className='rounded-[20px] !h-[300px] sm:!h-[220px] md:!h-[260px] lg:!h-[225px] w-[100%]' />
                
                <div className='absolute top-[15px] !right-[15px] flex gap-1 bg-[#FFFFFF] !h-[28px] w-[64px] rounded-[500px] py-1 px-2'>
                    <img src={star} alt="star" className='!h-[20px] !w-[20px]'/>
                    <span className='text-[14px] text-[#060606] font-semibold'>4.8</span>
                </div>

                <div className='absolute inset-0 top-[120px] sm:top-[85px] md:top-[85px] lg:top-[85px] left-[12px] flex flex-col sm:!flex-row'>
                
                    <div className=' h-[128px] w-[300px] sm:w-[340px] bg-[#FFFFFF] rounded-[20px] border-[1px] border-[#D7D9DA]'>
                    
                        <div className='flex justify-between px-[20px] pt-[15px]'>
                        
                            <div className='flex flex-col gap-0.5'>
                            
                                <span className='text-[15px] text-[#060606] font-bold'>Moti Mahal Delux</span>
                            
                                <div className='flex gap-2 items-center'>
                                   <img src={location} alt="location" className='!h-[15px] !w-[15px]' />
                                   <span className='text-[12px] text-[#85878C] font-semibold'>Sector 7, Chandigarh</span>
                                </div>
                            
                                <div className='flex gap-2 items-center'>
                                   <img src={user} alt="user" className='!h-[15px] !w-[15px]'  />
                                   <span className='text-[12px] text-[#85878C] font-semibold'>200-500 guests</span>
                                </div>
                            
                            </div>

                            <div className='flex flex-col gap-3'>

                                <span className='text-[12px] text-[#85878C] font-semibold ml-10'>2.4 km</span>

                                <div className='flex gap-1 items-center'>
                                   <img src={direction} alt="direction" className='!h-[15px] !w-[15px]'  />
                                   <span className='text-[13px] text-[#15B076] font-semibold'>Directions</span>
                                </div>
                            </div>
                        </div>

                        <div className='flex justify-between min-w-[200px] sm:w-[320px] h-[35px] bg-[#FFF3EA] py-[15px] px-[20px] rounded-[15px] mx-[10px] mt-2 items-center'>
                            <span className='text-[13px] text-[#FF4000] font-semibold'>Invited</span>
                            <img src={tick} alt="tick" className='!h-[15px] !w-[15px]' />
                        </div>

                    </div>

                    <div className='flex gap-1 ml-12 sm:ml-auto md:-ml-60 lg:ml-auto mr-3 mt-2 sm:mt-25 md:mt-35 lg:mt-25'>
                        
                        <div className='w-[101px] h-[27px] bg-[#FFFFFFE5] rounded-[20px] border-1 border-[#D7D9DA] py-[1px] px-[12px]'>
                            <span className='text-[14px] text-[#060606] font-semibold'>Continental</span>
                        </div>

                        <div className='w-[101px] h-[27px] bg-[#FFFFFFE5] rounded-[20px] border-1 border-[#D7D9DA] py-[1px] px-4'>
                            <span className='text-[14px] text-[#060606] font-semibold'>Fast Food</span>
                        </div>
                    </div>
                </div>
            </div>
            {/* img section end */}

            <div className='mt-3'>
                <h1 className='text-[18px] text-[#060606] font-bold'>About</h1>
                <p className='!text-[12px] text-[#85878C] leading-tight !my-1'>Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
                    Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, 
                    when an unknown printer took a galley of type and scrambled it to make a type specimen book. 
                    It has survived not only five centuries, but also the leap into electronic typesetting, 
                    remaining essentially unchanged.
                </p>
                
                <h1 className='text-[18px] text-[#060606] font-bold !mt-2'>Facilities</h1>
                
                <div className='flex flex-col sm:!flex-row md:!flex-row lg:!flex-row flex-wrap w-full gap-[5px] mt-1 mb-4'>
                    <div className='flex border-1 border-[#D7D9DA] rounded-[30px] py-[6px] px-[15px] gap-[10px]'>
                        <img src={wifi} alt="wifi" className='!h-[20px] !w-[20px]' />
                        <span className='text-[14px] text-[#060606] font-semibold'>Free Wifi</span>
                    </div>
                    <div className='flex border-1 border-[#D7D9DA] rounded-[30px] py-[6px] px-[15px] gap-[10px]'>
                        <img src={parking} alt="parking" className='!h-[20px] !w-[20px]'/>
                        <span className='text-[14px] text-[#060606] font-semibold'>Free Parking</span>
                    </div>
                    <div className='flex border-1 border-[#D7D9DA] rounded-[30px] py-[6px] px-[15px] gap-[10px]'>
                        <img src={reservation} alt="reservation" className='!h-[20px] !w-[20px]' />
                        <span className='text-[14px] text-[#060606] font-semibold'>Reservation</span>
                    </div>
                </div>

                <div className=''>
                    <div className='flex'>
                        <span className='!text-[14px] text-[#060606] font-bold'>Address:</span>
                        <span className='!text-[12px] text-[#060606] font-semibold'> 2nd Floor, Mann Bhawan, SCO 958, Mataur, Sector 70, Sahibzada Ajit Singh Nagar, mohali, Punjab</span>
                    </div>

                    <div className='flex'>
                        <span className='!text-[14px] text-[#060606] font-bold'>Phone:</span>
                        <span className='!text-[12px] text-[#060606] font-semibold'> +91 97797 93377</span>
                    </div>

                    <div className='flex'>
                        <span className='!text-[14px] text-[#060606] font-bold'>E-Mail:</span>
                        <span className='!text-[12px] text-[#060606] font-semibold'> abs@yopmail.com</span>
                    </div>

                    <div className='flex'>
                        <span className='!text-[14px] text-[#060606] font-bold'>Status:</span>
                        <span className='!text-[12px] text-[#15B076] font-semibold'> Active</span>
                    </div>

                </div>
            </div>

        </div>
    </>
  )
}

export default RightSideCard