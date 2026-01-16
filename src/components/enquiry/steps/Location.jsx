import React, { useState } from 'react';
import { MapPin } from 'lucide-react';
import { GradientText, Input } from '../../common';
import { Search } from 'lucide-react';
import Map from '../../common/Map';

const Location = () => {

    const [location, setLocation] = useState('');
    const [center, setCenter] = useState(null)
    const [range, setRange] = useState(20)

    const handleLocation = (lat, lng) => {
        setCenter({ lat, lng });

        const geocoder = new window.google.maps.Geocoder();
        geocoder.geocode(
            { location: { lat, lng } },
            (results, status) => {
                if (status === "OK" && results[0]) {
                    setLocation(results[0].formatted_address);
                }
            }
        )
    }

    return (
        <>
            <div>
                {/* input */}
                <Input type="text" placeholder="Enter Your Location" onChange={(e) => { setLocation(e.target.value) }} required={true} value={location} leftIcon={<MapPin />} rightIcon={<Search />} className='mt-0' />

                {/* Map Section*/}
                <div className='h-80 rounded-2xl mt-4 p-4 relative z-9'>

                    {/* radius */}
                    <div
                        className="
                                bg-white
                                border-2 border-gray-300
                                rounded-3xl
                                absolute top-0 left-8 z-90
                                flex items-center justify-between
                                px-5
                                h-[48px]
                                w-[220px]
                            "
                    >
                        {/* Text */}
                        <div className="flex flex-col justify-center leading-[1.05]">
                            <span className="text-xs font-semibold">
                                <GradientText>Within</GradientText>
                            </span>
                            <span className="text-md font-extrabold">
                                <GradientText>{range} km</GradientText>
                            </span>
                        </div>

                        {/* Slider */}
                        <input
                            type="range"
                            className="
                                w-[120px]
                                appearance-none
                                bg-transparent

                                [&::-webkit-slider-runnable-track]:h-4
                                [&::-webkit-slider-runnable-track]:bg-gray-200
                                [&::-webkit-slider-runnable-track]:rounded-full

                                [&::-moz-range-track]:h-4
                                [&::-moz-range-track]:bg-gray-200
                                [&::-moz-range-track]:rounded-full

                                [&::-webkit-slider-thumb]:appearance-none
                                [&::-webkit-slider-thumb]:h-6
                                [&::-webkit-slider-thumb]:w-6
                                [&::-webkit-slider-thumb]:rounded-full
                                [&::-webkit-slider-thumb]:bg-orange-500
                                [&::-webkit-slider-thumb]:-mt-1

                                [&::-moz-range-thumb]:h-4
                                [&::-moz-range-thumb]:w-4
                                [&::-moz-range-thumb]:rounded-full
                                [&::-moz-range-thumb]:bg-orange-500
                            "
                            value={range}
                            onChange={(e) => setRange(Number(e.target.value))}
                        />

                    </div>

                      {/* map */}
                    <div className='bg-blue-600'>
                        <Map center={center} radius={center * 1000} handleLocation={handleLocation} />
                    </div>
                </div>



            </div>



        </>
    );
};

export default Location;
