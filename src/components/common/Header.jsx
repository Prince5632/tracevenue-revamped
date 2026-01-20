import React, { useState,useEffect, useRef } from 'react'
import Button from './Button'
import { ArrowRight } from 'lucide-react';
import Input from './Input';
import { ChevronDown } from 'lucide-react';
import { SlidersHorizontal } from 'lucide-react';
import { useSetState } from 'react-use';

const Header = ({heading,subheading}) => {
    const [isOpen, setIsOpen] = useState(false);
    const [event, setEvent] = useState('Latest Enquiries');
    const inputRef=useRef(null);

    // to handle outside clicks 
     useEffect(() => {
            const handleClickOutside = (e) => {
                if (inputRef.current && !inputRef.current.contains(e.target)) {
                    setIsOpen(false);
                }
            };
    
            document.addEventListener('mousedown', handleClickOutside);
    
            return () => {
                document.removeEventListener('mousedown', handleClickOutside);
            };
        }, []);
    
  return (
   <>
   <div className='md:mt-16 lg:mt-4'>
    {/* heading,subheading,button */}
    <div className='grid grid-cols-1 lg:grid-cols-2 lg:gap-10 items-center'>
        <div>
            <h1 className='text-body font-bold text-2xl text-[#373d42]'>{heading}</h1>
            <p >{subheading}</p>
        </div>
        <div className='mt-2 lg:justify-self-end'>
            <Button variant="outline" children="Plan My Event"
            rightIcon={<ArrowRight />}/>
        </div>
    </div>

   <div className='w-full h-1 bg-gray-200 my-4'></div>

    {/* input fields */}

    <div className='grid grid-cols-1 lg:grid-cols-2 gap-4 mt-3'>
        <Input placeholder="Search enquiries"  leftIcon={ <SlidersHorizontal />}/>
        
        <div ref={inputRef} className='rounded-xl border border-gray-300 flex gap-5 items-center hover:border-orange-600 relative
        cursor-pointer h-12 justify-between p-4'>
            <div className='flex gap-2 items-center'>
                <div className='text-secondary font-semibold'>Sort by:</div>
                <div className='text-primary text-sm md:text-xl font-semibold'>{event}</div>
            </div>
                <button className="cursor-pointer ml-20" onClick={()=>{
                    setIsOpen(!isOpen)
                }}><ChevronDown /></button>

            {isOpen &&
            <div className='bg-white h-25 rounded-xl border border-gray-400 absolute left-40 md:left-80 lg:left-25 xl:left-30 top-10 p-2 mt-2 w-[60%] ml-10'>
                <div className='flex justify-between items-center'>
                    <button onClick={()=>{
                        setEvent('Latest Enquiries')
                    }} className='my-2 text-gray-600 font-semibold hover:text-orange-600 cursor-pointer'>Latest Enquiries</button>
                    
                      {event==='Latest Enquiries' && <img src="src\assets\images\tick.png"/> }  
                    
                </div>
                <div className='flex justify-between items-center'>
                    <button onClick={()=>{
                        setEvent('Nearest Event date')
                       
                       
                    }} className='text-gray-600 font-semibold hover:text-orange-600 cursor-pointer'>Nearest Event date</button>
                    {event==='Nearest Event date'  &&  <img src="src\assets\images\tick.png"/>}
                       
                    
                </div>
            </div>
            }
        </div>
        </div>
    </div>
    
   </>
   
  )
}

export default Header