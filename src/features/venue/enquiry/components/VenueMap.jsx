import React, { useState, useRef, useEffect, useMemo } from 'react';
import { Map } from '@shared/components/ui';
import { LoadScript } from '@react-google-maps/api';

const VenueMap = ({ details }) => {
    // ── Safe destructure of geo and fallback addresses
    const geo = details?.geo_location?.coordinates || [];
    const lng = geo[0] || details?.location?.lg || 76.8436041;
    const lat = geo[1] || details?.location?.lt || 30.6953385;

    const initialRadius = 5;
    const [center, setCenter] = useState({ lat, lng });
    const [locationData, setLocationData] = useState({
        address: details?.streetAddress,
        state: details?.state,
        pincode: details?.district,
        lat: lat,
        lng: lng
    });
    const [range, setRange] = useState(initialRadius);

    const libraries = useMemo(() => ["geometry", "places"], []);

    const getAddressFromLngLat = (lat, lng) => {
        if (!window.google?.maps?.Geocoder) return;
        const geocoder = new window.google.maps.Geocoder();

        geocoder.geocode({ location: { lat, lng } },
            (results, status) => {
                if (status === 'OK' && results[0]) {
                    let state = "";
                    let pincode = "";
                    let city = "";

                    results[0].address_components.forEach((item) => {
                        if (item.types.includes("postal_code")) pincode = item.long_name;
                        if (item.types.includes("administrative_area_level_1")) state = item.long_name;
                        if (item.types.includes("locality")) city = item.long_name;
                    });
                    setLocationData(prev => ({
                        ...prev,
                        address: results[0].formatted_address,
                        state: state || prev.state,
                        pincode: pincode || prev.pincode,
                        city: city || prev.city,
                        lat,
                        lng,
                    }));
                }
            }
        );
    };

    return <>
        <div className="w-full h-[400px] bg-white my-4 rounded-[30px] border border-[#D7D9DA] mb-6 overflow-hidden">
            <LoadScript
                googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}
                libraries={libraries}
            >
                <Map
                    center={center}
                    radius={range * 1000} // Convert km to meters
                    zoom={15} // Higher zoom since it's a specific venue
                    setCenter={setCenter}
                    onLocationSelector={getAddressFromLngLat}
                />
            </LoadScript>
        </div>
        <div className="space-y-3 p-2">
            <div className="flex gap-2">
                <span className="text-[14px] text-[#060606] font-bold min-w-[100px]">Street Address:</span>
                <span className='text-[14px] text-[#060606] font-semibold'>
                    {locationData.address || details?.streetAddress || 'N/A'}
                </span>
            </div>

            <div className="flex gap-2">
                <span className="text-[14px] text-[#060606] font-bold min-w-[100px]">State:</span>
                <span className='text-[14px] text-[#060606] font-semibold'>
                    {locationData.state || details?.state || 'N/A'}
                </span>
            </div>

            <div className="flex gap-2">
                <span className="text-[14px] text-[#060606] font-bold min-w-[100px]">District/City:</span>
                <span className='text-[14px] text-[#060606] font-semibold'>
                    {locationData.city || details?.district || 'N/A'}
                </span>
            </div>

            <div className="flex gap-2">
                <span className="text-[14px] text-[#060606] font-bold min-w-[100px]">Coordinates:</span>
                <span className='text-[14px] text-[#573BB6] font-semibold'>
                    {Number(locationData.lat).toFixed(4)}, {Number(locationData.lng).toFixed(4)}
                </span>
            </div>
        </div>

        <div className='flex gap-2 mt-4 ml-2'>
            <div className='h-[30px] w-[30px] rounded-full bg-[#15B076] flex justify-center items-center shadow-md'>
                <i className="fa-solid fa-location-arrow text-[14px] text-[#ffffff]"></i>
            </div>
            <a
                href={`https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`}
                target="_blank" rel="noopener noreferrer"
                className='text-[16px] font-semibold text-[#15b076] underline flex items-center'
            >
                Directions
            </a>
        </div>
    </>
};

export default VenueMap;
