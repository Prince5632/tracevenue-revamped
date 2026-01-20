import React, { useState,useEffect } from 'react'
import { MapPin } from 'lucide-react';
import GradientText from './GradientText';
import Button from './Button';
import Card from './Card';



const EnquiryCard = () => {
    
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
            <h2 className='text-gray-700 text-md lg:text-xl font-medium tracking-tighter'>Looking venue for birthday party for 80 people on 18 january,2025</h2>

            <div className='flex gap-2 my-2 items-center '>
                <MapPin className='w-3 text-primary'/>
                <p>SAS nagar, mohali</p>
            </div>


            <div className='border border-gray-200 rounded-xl grid grid-cols-1 sm:grid-cols-3 '>
                {/* person budget */}
                <div className='border-r-2  border-gray-200 flex flex-col justify-center items-center'>
                    <GradientText className='font-semibold'>Per Person budget</GradientText>
                    <GradientText className='text-xl font-semibold italic'>₹1,000-₹1,200</GradientText>
                </div>
                {/* guests */}
                <div className='border-r-2 p-4 border-gray-200 flex justify-center items-center flex-col'>
                   <GradientText className='font-semibold'>60-80</GradientText>
                    <p className='text-secondary font-semibold'>No. of guests</p>
                </div> 
                <div className='flex p-4 justify-between items-center'>
                    <div>
                        <GradientText className='font-semibold'>18th january</GradientText>
                    </div>

                   <div className='flex flex-col items-center'>
                        <div className='w-3 h-3 bg-[#15b076] rounded-full'></div>
                        <div className='h-5 bg-green-300 w-0.5'></div>
                        <div className='w-3 h-3 bg-[#15b076] rounded-full'></div>
                   </div>

                   <div>
                    <p>6:30</p>
                    <p>10:30</p>
                   </div>

                   <div>

                   </div>
                </div>               
            </div>

            <div className='grid grid-cols-1 lg:grid-cols-3 mt-5 gap-4'>
                <h2 className='text-success text-md'>Awaiting Quotations</h2>
                <h2 className='italic text-purple-700'>1 week ago</h2>
               <Button className="rounded-xl text-sm" variant="primary" children="View Enquiry"/>
            </div>

        </div>
    </div>
  )
}

export default EnquiryCard