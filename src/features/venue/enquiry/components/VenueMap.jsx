import React, { useState, useRef, useEffect, useMemo } from 'react';
import { Map } from '@shared/components/ui';
import { LoadScript } from '@react-google-maps/api';

const VenueMap = ({ onTabClick, click, setClick }) => {
    const initialLat = 30.7333;
    const initialLng = 76.7794;
    const initialRadius = 5;
    const [center, setCenter] = useState({
        lat: initialLat,
        lng: initialLng,
    });
    const [locationData, setLocationData] = useState({
        address: '',
        state: '',
        pincode: '',
        lat: '',
        lng: ''
    });
    // Refs
    const navRef = useRef(null);
    const placesServiceRef = useRef(null);
    const geocoderRef = useRef(null);
    const placeDetailsServiceRef = useRef(null);
    const libraries = useMemo(() => ["geometry", "places"], []);

    const [range, setRange] = useState(initialRadius);

    const handleClick = () => {
        setClick(true);
        setRange(20);
        setCenter({ lat: initialLat, lng: initialLng });
        //upstream call
        onTabClick({
            range: 20,
            center: { lat: initialLat, lng: initialLng },
            type: "map"
        });
    }
    useEffect(() => {
        const firstButton = navRef.current?.querySelector('button');
        if (firstButton) {
            setIndicator({
                left: firstButton.offsetLeft,
                width: firstButton.offsetWidth,
            });
        }
    }, []);

    const getAddressFromLngLat = (lat, lng) => {
        const geocoder = new window.google.maps.Geocoder();

        geocoder.geocode({ location: { lat, lng } },
            (results, status) => {
                if (status === 'OK' && results[0]) {
                    let state = "";
                    let pincode = "";
                    let city = "";
                    console.log("Formatted Address: ", results[0].formatted_address);

                    results[0].address_components.forEach((item) => {
                        if (item.types.includes("postal_code")) {
                            pincode = item.long_name;
                            console.log("pincode", item.long_name);
                        }
                        if (item.types.includes("administrative_area_level_1")) {
                            state = item.long_name;
                            console.log("State: ", item.long_name);
                        }
                        if (item.types.includes("locality")) {
                            city = item.long_name;
                            console.log("City: ", item.long_name);
                        }
                    });
                    setLocationData({
                        address: results[0].formatted_address,
                        state,
                        pincode,
                        city,
                        lat,
                        lng,
                    });
                }
            }
        );
    };

    useEffect(() => {
        if (!window.google) return;
        getAddressFromLngLat(center.lat, center.lng);
    }, [click]);
    return <>
        <div onClick={handleClick} className="w-full bg-white my-4 rounded-[30px] border border-[#D7D9DA] mb-6">
            <LoadScript
                googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}
                libraries={libraries}
                onLoad={() => {
                    placesServiceRef.current = new window.google.maps.places.AutocompleteService();
                    placeDetailsServiceRef.current = new window.google.maps.places.PlacesService(document.createElement("div"));
                    geocoderRef.current = new window.google.maps.Geocoder();
                }}
            >
                <Map
                    center={center}
                    radius={range * 1000} // Convert km to meters
                    zoom={11}
                    setCenter={setCenter}
                    onLocationSelector={getAddressFromLngLat}
                />
            </LoadScript>
        </div>
        <div>
            <p className="!text-[16px] !font-bold !text-[#060606] !mb-2">
                Street Address:
                <span className='text-[16px] text-[#060606] font-semibold ml-2'>
                    {locationData.address || 'Sensation Software Solution, phase-7,'}
                </span>
            </p>
            <p className="!text-[16px] !font-bold !text-[#060606] !mb-2">
                State:
                <span className='text-[16px] text-[#060606] font-semibold ml-2'>
                    {locationData.state || 'Chandigarh'}
                </span>
            </p>
            <p className="!text-[16px] !font-bold !text-[#060606] !mb-2">
                Pincode:
                <span className='text-[16px] text-[#060606] font-semibold ml-2'>
                    {locationData.pincode || '175089'}
                </span>
            </p>
            <p className="!text-[16px] !font-bold !text-[#060606] !mb-2">
                Coordinates:
                <span className='text-[16px] text-[#573BB6] font-semibold ml-2'>
                    {locationData.lat || '56.7853'}, {locationData.lng || '78.9987'}
                </span>
            </p>
        </div>
        <div className='flex gap-2'>
            <div className='h-[22px] w-[22px] rounded-[11px] bg-[#15B076] flex justify-center items-center border border-[#15b076]'>
                <i className="fa-solid fa-location-arrow text-[11px] text-[#ffffff]"></i>
            </div>
            <a href='#' className='!text-[16px] !font-semibold !text-[#15b076] !underline'>Directions</a>
        </div>
    </>
};

export default VenueMap;
