import React, { useState, useEffect, useRef } from 'react'
import { ArrowRight } from 'lucide-react';
import { ChevronDown } from 'lucide-react';
import { SlidersHorizontal } from 'lucide-react';
import { Button, Input } from '@/shared';
import { useNavigate } from 'react-router-dom';
import filters from "../../../../assets/dashboard/filters.png";
import tabler from "../../../../assets/dashboard/tabler_list-details.png";

const Header = ({ heading, subheading, sortBy, setSortBy }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [event, setEvent] = useState('Latest Enquiries');
    const inputRef = useRef(null);
    const navigate = useNavigate();

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
                        <h2 className='mt-2 text-secondary'>{subheading}</h2>
                    </div>
                    <div className='mt-2 lg:justify-self-end'>
                        <Button variant="outline" children="Plan My Event"
                            onClick={() => navigate("/")}
                            rightIcon={<ArrowRight />} />
                    </div>
                </div>

                <div className='w-full h-1 bg-gray-200 my-4'></div>

                {/* input fields */}

                <div className='grid grid-cols-1 lg:grid-cols-[55%_35%_5%] gap-4 mt-3'>
                    <Input placeholder="Search enquiries" leftIcon={<img src={tabler} alt="tabler" />} />

                    <div ref={inputRef} className='rounded-[30px] border border-[1px] border-[#D7D9DA] hover:border-orange-600
                        cursor-pointer h-[47px] py-[10px] px-4'>
                        <div className='flex justify-between'>
                            <div className='flex gap-2'>
                                <div className='text-[16px] text-[#85878C] font-semibold'>Sort by:</div>
                                <div className={`text-[16px] text-[#060606] font-semibold ${event === 'Latest Enquiries' ? "text-orange-600" : ""}`}>{event}</div>
                            </div>

                            <button className="cursor-pointer" onClick={() => {
                                    setIsOpen(!isOpen)
                                }}><ChevronDown className='h-[16px] w-[16px]'/>
                            </button>

                            

                            {/* {isOpen &&
                                <div className='bg-white h-25 rounded-xl border border-gray-400 absolute right-0 top-20 p-2 mt-2 w-[60%] ml-10'>
                                    <div className='flex justify-between items-center'>
                                        <button onClick={() => {
                                            setEvent('Latest Enquiries')
                                            setSortBy('latest')
                                        }} className='my-2 text-gray-600 font-semibold hover:text-orange-600 cursor-pointer'>Latest Enquiries</button>

                                        {event === 'Latest Enquiries' && <img src="src\assets\images\tick.png" />}

                                    </div>
                                    <div className='flex justify-between items-center'>Collapse commentComment on line R77Prince5632 commented on Jan 21, 2026 Prince5632on Jan 21, 2026OwnerMore actions

                                        it should look sameReactWrite a replyResolve comment
                                        <button onClick={() => {
                                            setEvent('Nearest Event date')
                                            setSortBy('nearest')
                                        }} className='text-gray-600 font-semibold hover:text-orange-600 cursor-pointer'>Nearest Event date</button>
                                        {event === 'Nearest Event date' && <img src="src\assets\images\tick.png" />}

                                    </div>

                                </div>
                            } */}

                            {isOpen &&
                                <div className='bg-white h-[100px] rounded-[20px] border border-[1px] border-[#D7D9DA] absolute right-37 top-70 w-60 px-4 py-auto'>
                                    <div className='flex justify-between items-center'>
                                        <button onClick={() => {
                                            setEvent('Latest Enquiries')
                                            setSortBy('latest')
                                        }} className='my-2 text-gray-600 font-semibold hover:text-orange-600 cursor-pointer'>Latest Enquiries</button>

                                        {/* {event === 'Latest Enquiries' && <img src="src\assets\images\tick.png" />} */}

                                    </div>
                                    <div className='flex justify-between items-center'>
                                        <button onClick={() => {
                                            setEvent('Nearest Event date')
                                            setSortBy('nearest')
                                        }} className='text-gray-600 font-semibold hover:text-orange-600 cursor-pointer'>Nearest Event date</button>
                                        {/* {event === 'Nearest Event date' && <img src="src\assets\images\tick.png" />} */}

                                    </div>

                                </div>
                            }

                        </div>
                    </div>

                    <div className='w-[64px] h-[47px] border border-[1px] border-[#D7D9DA] rounded-[30px] px-5 py-[10px]'>
                        <img src={filters} alt="filters" />
                    </div>
                </div>
            </div>

        </>

    )
}

export default Header