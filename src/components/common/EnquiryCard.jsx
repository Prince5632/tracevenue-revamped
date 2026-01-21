import React, { useState,useEffect } from 'react'
import { MapPin } from 'lucide-react';
import GradientText from './GradientText';
import Button from './Button';
import Card from './Card';

const EnquiryCard = ({looking,event,date,day,guest,amount,location,pricingType,enquiryRaised,startTime,endTime,minGuest,maxGuest}) => {
    
  return (
    <div className='rounded-2xl my-6 border border-gray-300 grid grid-cols-1 lg:grid-cols-[0.5fr_2fr]'>
        {/* image */}
        <div className='p-4 lg:w-55 lg:mt-4'>
        <Card variant="bordered" className="lg:h-40">
            <Card.Header>
                <GradientText className='text-xl font-extrabold'>Birthday party</GradientText>
            </Card.Header>
            <Card.Body className='flex justify-end '>
                <img src="src/assets/eventtype-images/birthday-party.svg" alt="birthday" className='w-20'/>
            </Card.Body>
        </Card>
        </div>

        {/* content */}
        <div className='cursor-pointer p-4 flex-1'>
            <h2 className='text-[#212529] font-bold text-md lg:text-xl mt-2'>Looking {looking} for {event} for {maxGuest-minGuest} people on {date}</h2>

            <div className='flex gap-2 my-2 items-center '>
                <MapPin className='w-3 text-primary'/>
                <span className='text-secondary font-semibold text-xl'>{location}</span>
            </div>


            <div className='border border-gray-200 rounded-2xl grid grid-cols-1 lg:grid-cols-[2fr_1fr]'>
               <div className='flex justify-around'>
                {/* person budget */}
                <div className='border-gray-200 flex flex-col justify-center items-center'>
                    <GradientText className='font-semibold text-lg capitalize'>{pricingType}</GradientText>
                    <GradientText className='text-xl font-bold italic'>{amount}</GradientText>
                </div>
                {/* guests */}
                <div className='border-gray-200 flex justify-center items-center flex-col'>
                   <GradientText className='font-bold text-2xl'>{minGuest}-{maxGuest}</GradientText>
                    <span className='text-secondary font-semibold text-xl'>No. of guests</span>
           

                </div>

               </div>
                
                <div className='flex p-4 justify-center gap-4 lg:justify-between items-center'>
                    <div className='flex flex-col'>
                        <GradientText className='font-bold text-xl'>{day}</GradientText>
                        <GradientText className='font-bold text-xl'>{date}</GradientText>
                    </div>

                   <div className='flex flex-col items-center'>
                        <div className='w-3 h-3 bg-[#15b076] rounded-full'></div>
                        <div className='h-5 bg-green-300 w-0.5'></div>
                        <div className='w-3 h-3 bg-[#15b076] rounded-full'></div>
                   </div>

                   <div className='flex flex-col text-secondary font-bold'>
                    <span>
                       {startTime}
                    </span>
                    <span>{endTime}</span>
                   </div>

                   <div>

                   </div>
                </div>               
            </div>

            <div className='grid grid-cols-1 lg:grid-cols-3 mt-5 gap-4'>
                <h2 className='text-success font-semibold text-xl'>Awaiting Quotations</h2>
                <h2 className='italic text-[#573bb6] text-xl'>{enquiryRaised}</h2>
               <Button className="rounded-xl font-bold" variant="primary" children="View Enquiry"/>
            </div>

        </div>
    </div>
  )
}

export default EnquiryCard