import React, { useState, useRef, useEffect, useMemo } from 'react';
import { Map } from '@shared/components/ui';
import { LoadScript } from '@react-google-maps/api';


function VenueLocationMap() {
    let [click, setClick] = useState(false);
    let [indicator, setIndicator] = useState({
        left: 0,
        width: 0
    });
    const initialLat = 30.7333;
    const initialLng = 76.7794;
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

    const initialRadius = 20;
    const [range, setRange] = useState(initialRadius);

    const handleClick = () => {
        setClick(true);
        setRange(20);
        setCenter({ lat: initialLat, lng: initialLng })
    }

    const handleNavClick = (e) => {
        const button = e.currentTarget;

        setIndicator({
            left: button.offsetLeft,
            width: button.offsetWidth,
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
    
    return <>
        <button onClick={handleClick} className="bg-gray-600 text-white py-2 px-4 rounded-full cursor-pointer ">Venue Map</button>

        {
            click ?
                <div className="w-screen h-screen bg-[#00000030] fixed z-50 top-0 bottom-0 left-0 right-0 flex justify-end">
                    <div className="h-full w-1/2 bg-white p-[20px]">
                        <div className="flex gap-2">
                            <div>
                                <h2 className="text-[#060606] text-[24px] font-bold">Moti Mahal Delux</h2>
                                <p className="text-[#85878C] text-[14px] font-semibold">Lorem ipsum dolor sit amet consectetur adipisicing elit. Expedita voluptates corrupti magni non, recusandae rem?</p>
                            </div>
                            <div className="h-[24px] w-[24px] "><i className="fa-solid fa-xmark text-[12px] font-semibold"></i></div>
                        </div>
                        <div className="h-[40px] border-[#F0F0F4] flex justify-start items-center mt-2 " ref={navRef}>
                            <button id="overview" onClick={handleNavClick} className="px-2 ml-1 text-[16px] font-semibold text-[#5C5F62] text-center cursor-pointer ">Overview</button>
                            <button id="gallery" onClick={handleNavClick} className="px-2 ml-1 text-[16px] font-semibold text-[#5C5F62] text-center cursor-pointer ">Gallery</button>
                            <button id="map" onClick={handleNavClick} className="px-2 ml-1 text-[16px] font-semibold text-[#5C5F62] text-center cursor-pointer ">Map</button>
                        </div>
                        <div className="relative">
                            <div className="h-[4px] w-full bg-[#F0F0F4] rounded-[5px] relative">
                                <div className="h-full w-[80px] bg-[#FF4000] rounded-[5px] absolute transition-all duration-300" style={{
                                    width: indicator.width,
                                    transform: `translateX(${indicator.left})`,
                                }} ></div>
                            </div>
                        </div>
                        <div className="w-full bg-white my-4 rounded-[30px] border border-[#D7D9DA] ">
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
                                    onLocationSelector={getAddressFromLngLat}
                                // Add marker functionality to Map component if not already present
                                // Assuming Map component handles the marker logic via props
                                />
                            </LoadScript>
                        </div>
                        <div>
                            <p className="!text-[16px] !font-bold !text-[#060606]">Street Address:{locationData.address}</p>
                            <p className="!text-[16px] !font-bold !text-[#060606]">State: {locationData.state}</p>
                            <p className="!text-[16px] !font-bold !text-[#060606]">Pincode:{locationData.pincode}</p>
                            <p className="!text-[16px] !font-bold !text-[#060606]">Coordinates:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{locationData.lat}, {locationData.lng}</p>
                        </div>
                    </div>
                </div>
                : ""
        }
    </>
}
export default VenueLocationMap;