import React, { useState, useEffect, useRef } from 'react'
import { ArrowRight, Settings2 } from 'lucide-react';
import { ChevronDown } from 'lucide-react';
import { Button, Input } from '@/shared';
import { useNavigate } from 'react-router-dom';
import filters from "../../../../assets/dashboard/filter.svg";
import tabler from "../../../../assets/dashboard/tabler_list-details.svg";
import tick from "../../../../assets/images/tick.png";
import { BsCheckLg } from "react-icons/bs";

const ContractHeader = ({ heading }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [event, setEvent] = useState('Latest Contracts');
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

    // Format heading text
    const formatHeading = (text) => {
        if (!text) return 'Contracts';
        return text.charAt(0).toUpperCase() + text.slice(1);
    };

    return (
        <>
            <div className='md:mt-16 lg:mt-4'>
                {/* heading and subheading */}
                <div className='mb-6'>
                    <h1 className='text-body font-bold text-3xl text-[#000000] capitalize mb-2'>
                        {formatHeading(heading)} Contracts
                    </h1>
                    <h2 className='text-[#6B7280] text-base font-normal'>
                        Manage all your {heading?.toLowerCase()} contracts here.
                    </h2>
                </div>

                <div className='relative h-[1px] my-6'>
                    <div className='absolute h-[1px] bg-[#E5E7EB] left-0 right-0'></div>
                </div>
            </div>
        </>
    )
}

export default ContractHeader
