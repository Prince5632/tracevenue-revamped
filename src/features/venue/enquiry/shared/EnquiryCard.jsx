import React, { useState, useEffect } from 'react'
import { MapPin } from 'lucide-react';
import { Button, Card, GradientText } from '@/shared';
import { useNavigate } from 'react-router-dom';
import birthdayCake from "../../../../assets/dashboard/birthdayCake.png";
import LocationPin from "../../../../assets/images/LocationPin.png";

const EnquiryCard = ({ looking, event, date, day, guest, amount, location, pricingType, enquiryRaised, startTime, endTime, minGuest, maxGuest }) => {
    const navigate = useNavigate()
    return (
        <div className='rounded-[30px] my-6 p-[12px] !h-auto lg:h-[221px] lg:w-full border border-[1px] border-[#D7D9DA] grid grid-cols-1 lg:grid-cols-[0.5fr_2fr]'>
            {/* image */}
            <div className='p-4 lg:w-55 !h-[180px]'>
                <Card variant="bordered" className="lg:h-44 rounded-[30px] !m-0 relative -top-2 -left-2">
                    <Card.Header>
                        <GradientText className='text-xl font-extrabold leading-none relative -top-1'>Birthday <br />party</GradientText>
                    </Card.Header>
                    <Card.Body className='flex justify-end relative -top-4 -right-3'>
                        <img src={birthdayCake} alt="birthdayCake" />
                    </Card.Body>
                </Card>
            </div>

            {/* content */}
            <div className='cursor-pointer p-4 lg:p-0 lg:pr-[10px]'>
                <h2 className='text-[#060606] font-bold text-md lg:text-[20px] mt-8 lg:mt-0'>Looking {looking} for {event} for {maxGuest - minGuest} people on {date}</h2>

                <div className='flex gap-2 items-center '>
                    <img src={LocationPin} alt="LocationPin" className='w-[13px] h-[17px]' />
                    <span className='text-[#060606] font-semibold text-[16px]'>{location}</span>
                </div>


                <div className='border border-[1px] border-[#D7D9DA] rounded-[20px] bg-[#FFFFFF] px-2 !h-auto !w-auto my-4'>
                    <div className='grid grid-cols-1 lg:grid-cols-[58%_42%]'>
                        <div>
                            <div className='grid grid-cols-[58%_42%]'>
                                <div className='flex'>
                                    {/* person budget */}
                                    <div className='flex flex-col !py-3 sm:items-center md:items-center lg:items-start lg:!px-2 leading-tight w-[90%] shrink-0 break-words'>
                                        <GradientText className='font-bold italic text-[14px] capitalize '>{pricingType}</GradientText>
                                        <GradientText className='text-[20px] font-bold italic break-all'>{amount}</GradientText>
                                    </div>
                                    <div className='h-full lg:h-[40px] border border-[1px] border-[#D7D9DA] relative lg:top-4' />
                                </div>

                                <div className='flex'>
                                    {/* guests */}
                                    <div className='flex flex-col !py-3 sm:items-center md:items-center lg:items-start leading-tight w-[90%] shrink-0 break-words'>
                                        <GradientText className='font-bold text-[20px] break-all'>{minGuest}-{maxGuest}</GradientText>
                                        <span className='text-secondary font-semibold text-[14px] break-words'>Number of guest</span>
                                    </div>
                                    <div className=' h-[40px] border border-[1px] border-[#D7D9DA] relative top-4 hidden lg:block' />
                                </div>
                            </div>
                            <div className='lg:hidden w-full border border-[1px] border-[#D7D9DA]' />
                        </div>

                        <div className='grid grid-cols-2 '>
                            {/* date and time */}
                            <div className='flex flex-col flex-wrap !py-3 pl-4 leading-tight sm:items-center md:items-center'>
                                <GradientText className='font-bold text-[14px]'>{day}</GradientText>
                                <GradientText className='font-bold text-[20px]'>{date}</GradientText>
                            </div>

                            <div className='flex !py-3 px-2 gap-2 flex-nowrap shrink-0 '>
                                <div className='flex flex-col items-center shrink-0 md:pl-15 lg:pl-0'>
                                    <div className='w-[10px] h-[10px] bg-[#15B076] rounded-full'></div>
                                    <div className='h-[27px] w-[4px] bg-[#B1F4D8] rounded-[30px]'></div>
                                    <div className='w-[10px] h-[10px] bg-[#15B076] rounded-full'></div>
                                </div>

                                <div className='flex flex-col text-secondary font-bold whitespace-nowrap'>
                                   <span>
                                     {startTime}
                                    </span>
                                    <span>{endTime}</span>
                                </div>
                            </div>
                        </div>

                    </div>

                    
                </div>

                <div className='flex justify-between mb-2'>
                    <h2 className='text-[#15B076] font-semibold text-[16px]'>Awaiting Quotations</h2>
                    <h2 className='font-semibold italic text-[#573BB6] text-[14px]'>{enquiryRaised}</h2>
                    
                </div>

            </div>
        </div>
    )
}

export default EnquiryCard