import React from 'react'
import restaurant from "@assets/images/restaurant.png"
import wifi from "@assets/images/wifi.png"
import parking from "@assets/images/free-parking.png"
import reservation from "@assets/images/reservation.png"
import star from "@assets/images/star.png"
import location from "@assets/images/locationIcon.png"
import user from "@assets/images/user.png"
import direction from "@assets/images/direction.png"
import tick from "@assets/images/tick.png"

const Overview = ({ details = {}, isInvited = false, distance = "2.4 km" }) => {
    const {
        restaurantName = "Restaurant",
        rating = "4.5",
        streetAddress,
        district,
        state,
        capacity = {},
        cuisines = [],
        description = "Description not available",
        services = [],
        email = "N/A",
        phoneNumber = "N/A",
        active = true,
        bannerUrl,
        mediaUrl
    } = details;

    const displayCuisines = cuisines.length > 0 ? cuisines.slice(0, 2) : [];
    const guests = `${capacity.min || 100}-${capacity.max || 500} guests`;
    const fullAddress = streetAddress || `${district || ''}, ${state || ''}`;
    const mainImage = bannerUrl?.url || mediaUrl?.[0]?.url || restaurant;

    return <div className="mt-4">
        <div className='relative'>
            <img src={mainImage} alt={restaurantName} className='rounded-[20px] !h-[300px] sm:!h-[220px] md:!h-[260px] lg:!h-[225px] w-[100%] object-cover' />

            <div className='absolute top-[15px] right-[15px] flex gap-1 bg-[#FFFFFF] h-[28px] w-[64px] rounded-[500px] py-1 px-4 items-center justify-center'>
                <i className="fa-solid fa-star text-[14px] text-[#FCDA00]"></i>
                <span className='text-[14px] text-[#060606] font-semibold'>{rating}</span>
            </div>

            <div className='absolute inset-0 top-[120px] sm:top-[85px] md:top-[85px] lg:top-[85px] left-[12px] flex flex-col sm:!flex-row'>

                <div className='h-auto min-h-[128px] w-[300px] sm:w-[340px] bg-[#FFFFFF] rounded-[20px] border-[1px] border-[#D7D9DA] pb-3'>

                    <div className='flex justify-between px-[20px] pt-[15px]'>

                        <div className='flex flex-col gap-0.5 max-w-[70%]'>
                            <span className='text-[15px] text-[#060606] font-bold truncate' title={restaurantName}>{restaurantName}</span>

                            <div className='flex gap-2 items-start mt-1'>
                                <img src={location} alt="location" className='h-[15px] w-[15px] mt-0.5' />
                                <span className='text-[12px] text-[#85878C] font-semibold line-clamp-1' title={fullAddress}>{fullAddress}</span>
                            </div>

                            <div className='flex gap-2 items-center mt-1'>
                                <img src={user} alt="user" className='h-[15px] w-[15px]' />
                                <span className='text-[12px] text-[#85878C] font-semibold'>{guests}</span>
                            </div>

                        </div>

                        <div className='flex flex-col gap-3 shrink-0'>
                            <span className='text-[12px] text-[#85878C] font-semibold ml-10'>{distance}</span>

                            <div className='flex gap-1 items-center'>
                                <i className="fa-solid fa-location-arrow text-[13px] text-[#15B076]"></i>
                                <span className='text-[13px] text-[#15B076] font-semibold'>Directions</span>
                            </div>
                        </div>
                    </div>

                    {isInvited && (
                        <div className='flex justify-between min-w-[200px] sm:w-[320px] h-[35px] bg-[#FFF3EA] py-[15px] px-[20px] rounded-[15px] mx-[10px] mt-3 items-center'>
                            <span className='text-[13px] text-[#FF4000] font-semibold'>Invited</span>
                            <img src={tick} alt="tick" className='!h-[15px] !w-[15px]' />
                        </div>
                    )}
                </div>

                <div className='flex gap-1 ml-12 sm:ml-auto md:-ml-60 lg:ml-auto mr-3 mt-2 sm:mt-25 md:mt-35 lg:mt-25 flex-wrap justify-end'>
                    {displayCuisines.map((cuisine, idx) => (
                        <div key={idx} className='h-[27px] bg-[#FFFFFFE5] rounded-[20px] border border-[#D7D9DA] py-[1px] px-[12px] flex items-center shadow-sm'>
                            <span className='text-[14px] text-[#060606] font-semibold'>{cuisine}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
        {/* img section end */}

        <div className='mt-3'>
            <h1 className='text-[18px] text-[#060606] font-bold'>About</h1>
            <p className='text-[13px] text-[#85878C] leading-snug my-2'>
                {description}
            </p>

            {services?.length > 0 && (
                <>
                    <h1 className='text-[18px] text-[#060606] font-bold mt-4'>Facilities</h1>
                    <div className='flex flex-col sm:!flex-row md:!flex-row lg:!flex-row flex-wrap w-full gap-[5px] mt-2 mb-4'>
                        {services.map((service, idx) => (
                            <div key={idx} className='flex items-center border border-[#D7D9DA] rounded-[30px] py-[6px] px-[15px] gap-[10px]'>
                                <span className='text-[14px] text-[#060606] font-semibold'>{service}</span>
                            </div>
                        ))}
                    </div>
                </>
            )}

            <div className='space-y-2 mt-4'>
                <div className='flex gap-2'>
                    <span className='text-[14px] text-[#060606] font-bold min-w-[80px]'>Address:</span>
                    <span className='text-[13px] text-[#060606] font-semibold'>{fullAddress}</span>
                </div>

                <div className='flex gap-2'>
                    <span className='text-[14px] text-[#060606] font-bold min-w-[80px]'>Phone:</span>
                    <span className='text-[13px] text-[#060606] font-semibold'>{phoneNumber ? `+91 ${phoneNumber}` : "N/A"}</span>
                </div>

                <div className='flex gap-2'>
                    <span className='text-[14px] text-[#060606] font-bold min-w-[80px]'>E-Mail:</span>
                    <span className='text-[13px] text-[#060606] font-semibold break-all'>{email}</span>
                </div>

                <div className='flex gap-2'>
                    <span className='text-[14px] text-[#060606] font-bold min-w-[80px]'>Status:</span>
                    <span className='text-[13px] text-[#15B076] font-semibold'>{active ? "Active" : "Inactive"}</span>
                </div>
            </div>
        </div>
    </div>;
};

export default Overview;
