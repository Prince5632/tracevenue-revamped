import React from 'react'
import { Card, GradientText } from '@/shared';
import { useNavigate } from 'react-router-dom';
import birthdayCake from "../../../../assets/dashboard/birthdayCake.png";
import LocationPin from "../../../../assets/images/LocationPin.png";
import Header from './Header';
import { IconRenderer } from '../pages/Icons';



const EnquiryCard = ({ data}) => {

    const formatDate = (dateString) => {
        if (!dateString) return '';
        return new Date(dateString)
            .toLocaleDateString('en-GB', {
                day: '2-digit',
                month: 'short',
            })
            .replace(' ', ' ');
    };

    const timeAgo =((dateString)=>{
        const now = new Date();
        const past = new Date(dateString);
        console.log(new Date(dateString));
        const diffInSeconds = Math.floor((now - past) / 1000);

        const minutes = Math.floor(diffInSeconds / 60);
        const hours = Math.floor(diffInSeconds / 3600);
        const days = Math.floor(diffInSeconds / 86400);
        const weeks = Math.floor(diffInSeconds / 604800);
        const months = Math.floor(diffInSeconds / 2592000);
        const years = Math.floor(diffInSeconds / 31536000);

        if (diffInSeconds < 60) return "Just now";
        if (minutes < 60) return `${minutes} minute${minutes > 1 ? "s" : ""} ago`;
        if (hours < 24) return `${hours} hour${hours > 1 ? "s" : ""} ago`;
        if (days < 7) return `${days} day${days > 1 ? "s" : ""} ago`;
        if (weeks < 4) return `${weeks} week${weeks > 1 ? "s" : ""} ago`;
        if (months < 12) return `${months} month${months > 1 ? "s" : ""} ago`;

        return `${years} year${years > 1 ? "s" : ""} ago`;
    }
 )
    console.log("In Enquiry Card..", data);
    const navigate = useNavigate();

    const {minPeople,maxPeople } = data?.peopleRange

    const {min, max} = data?.budget

    const {min: personMin, max: personMax} = data?.perPersonBudget

    const { short_name = "", long_name = "" } = data?.selectedCities?.[0]?.locality || {}

    const [dateObj] = data?.eventDate;
    const [date, time] = dateObj ? Object.entries(dateObj)[0] : [];

    const { createdAt } = data || "";

    const { eventName = "", className = "" } = data?.eventType || {}

    function dayName(dateString) {
        if (!dateString) return "";

        const date = new Date(dateString);

        if (isNaN(date.getTime())) return "";

        return date.toLocaleDateString("en-IN", {
            weekday: "long",
        });
    }

    function formatTo12Hour(time24) {
        if(!time24) return "";
        const [hours, minutes] = time24.split(":");
        if(!hours || !minutes) return "";
        const date = new Date();
        date.setHours(hours, minutes);

        return date.toLocaleTimeString("en-IN", {
            hour: "numeric",
            minute: "2-digit",
            hour12: true,
        });
    }
    function formatTimeRange(range) {
        if(!range) return "";
        const [start, end] = range.split(" - ");
        if(!start || !end) return "";
        return range && `${formatTo12Hour(start)} ${formatTo12Hour(end)}`;
    }
    return (
        <>
        <div className='rounded-[30px] my-6 p-[12px] !h-auto lg:h-[221px] lg:w-full border border-[1px] border-[#D7D9DA] grid grid-cols-1 lg:grid-cols-[0.5fr_2fr]' onClick={() => navigate("/enquiry-detail-layout")}>
            {/* image */}
            <div className='p-4 lg:w-55'>
                <Card variant="bordered" className="lg:h-44 rounded-[30px] !m-0 relative -top-2 -left-2">
                    <Card.Header>
                        <GradientText className='text-xl font-extrabold leading-none relative -top-1'>{eventName}</GradientText>
                    </Card.Header>
                    <Card.Footer className='flex justify-end items-end mt-3 border-none'>
                        <IconRenderer className={className}/>
                    </Card.Footer>
                </Card>
            </div>

 
            {/* content */}
            <div className='cursor-pointer p-4 lg:p-0 lg:pr-[10px]'>
                <h2 className='text-[#060606] font-bold text-md lg:text-[20px] lg:mt-0 '>{data?.name}</h2>

                <div className='flex gap-2 items-center '>
                    <img src={LocationPin} alt="LocationPin" className='w-[13px] h-[17px]' />
                    <span className='text-[#060606] font-semibold text-[16px]'>{short_name}</span>
                </div>


                <div className='border border-[#D7D9DA] rounded-[20px] bg-[#FFFFFF] px-2 !h-auto !w-auto my-4'>
                    <div className='grid grid-cols-1 lg:grid-cols-[58%_42%]'>
                        <div>
                            <div className='grid grid-cols-[58%_42%]'>

                                <div className='flex'>
                                    {/* person budget */}
                                    <div className='flex flex-col !py-3 sm:items-center md:items-center lg:items-start lg:!px-2 leading-tight w-[90%] shrink-0 break-words'>
                                        <GradientText className='font-bold italic text-[14px] capitalize '>{data?.budgetType} Budget</GradientText>
                                        <GradientText className='text-[20px] font-extrabold italic break-all w-full md:text-center lg:text-start'>
                                            {data?.budgetType == 'perPerson' ? `₹${personMin}-₹${personMax}` : `₹${min}-₹${max}`}

                                        </GradientText>
                                    </div>
                                    <div className='h-full lg:h-[40px] border  border-[#D7D9DA] relative lg:top-4' />
                                </div>

                                <div className='flex'>
                                    {/* guests */}
                                    <div className='flex flex-col py-3 sm:items-center md:items-center lg:items-start leading-tight w-[90%] shrink-0 break-words'>
                                        <GradientText className='font-extrabold text-[20px] break-all'>{minPeople}-{maxPeople}</GradientText>
                                        <span className='text-secondary font-semibold text-[14px] '>Number of Guests</span>
                                    </div>
                                    <div className='h-[40px] border  border-[#D7D9DA] relative top-4 hidden lg:block' />
                                </div>

                            </div>
                            <div className='lg:hidden w-full border border-[#D7D9DA]' />
                        </div>

                        <div className='grid grid-cols-2 '>
                            {/* date and time */}
                            <div className='flex flex-col flex-wrap !py-3  leading-tight sm:items-center md:items-center pr-5'>
                                <GradientText className='font-bold text-[20px]'>{date && dayName(date)}</GradientText>
                                <GradientText className='font-extrabold text-[20px]'>{date && formatDate(date)}</GradientText>
                            </div>

                            <div className='flex !py-3 gap-2 pl:6 flex-nowrap shrink-0 '>
                                <div className='flex flex-col items-center shrink-0 md:pl-15 lg:pl-0'>
                                    <div className='w-[10px] h-[10px] bg-[#15B076] rounded-full'></div>
                                    <div className='h-[27px] w-[4px] bg-[#B1F4D8] rounded-[30px]'></div>
                                    <div className='w-[10px] h-[10px] bg-[#15B076] rounded-full'></div>
                                </div>

                                <div className='flex flex-col text-secondary font-bold sm:pl-4 '>
                                    <span>
                                        {time && formatTimeRange(time)}
                                    </span>
                                </div>
                            </div>
                        </div>

                    </div>


                </div>

                <div className='flex justify-between mb-2'>
                    <h2 className='text-[#15B076] font-semibold text-[16px]'>Awaiting Quotations</h2>
                    <h2 className='font-semibold italic text-[#573BB6] text-[14px]'>{createdAt && timeAgo(createdAt)}</h2>

                </div>

            </div>
        </div>
        </>
    )
}

export default EnquiryCard