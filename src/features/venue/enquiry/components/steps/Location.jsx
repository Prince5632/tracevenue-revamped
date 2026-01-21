import React, { useState, useRef, useEffect, useMemo } from 'react';
import { MapPin } from 'lucide-react';
import { Button, Divider, GradientText, Input, Map } from '@shared/components/ui';
import { Search } from 'lucide-react';
import { LocateFixed } from 'lucide-react';
import { LoadScript } from '@react-google-maps/api';

const Location = () => {
    const [location, setLocation] = useState('');
    const [center, setCenter] = useState({
        lat: 28.6139,
        lng: 77.2090,
    })
    const [hasSearched, setHasSearched] = useState(false);
    const libraries = useMemo(() => ["geometry", "places"], []);
    const [range, setRange] = useState(20);
    const [options, setOptions] = useState(false);
    const [radiusSlider, setRadiusSlider] = useState(false)
    const [showMarker, setShowMarker] = useState(false);
    const [query, setQuery] = useState("");
    const [suggestions, setSuggestions] = useState([]);
    const placesServiceRef = useRef(null);
    const debounceTimer = useRef(null);
    const [isSearching, setIsSearching] = useState(false);
    const placeDetailsServiceRef = useRef(null);



    const handleSelectSuggestion = (item) => {
        if (!placeDetailsServiceRef.current) return;

        placeDetailsServiceRef.current.getDetails(
            {
                placeId: item.place_id,
                fields: ["geometry", "formatted_address"],
            },
            (place, status) => {
                if (
                    status === window.google.maps.places.PlacesServiceStatus.OK &&
                    place?.geometry?.location
                ) {
                    const lat = place.geometry.location.lat();
                    const lng = place.geometry.location.lng();


                    setCenter({ lat, lng });
                    setShowMarker(true);
                    setLocation(place.formatted_address);

                    setSuggestions([]);
                    setOptions(false);
                    setRadiusSlider(true);
                }
            }
        );
    };

    const fetchSuggestions = (input) => {
        if (!input || !input.trim() || !placesServiceRef.current) {
            setSuggestions([]);
            setIsSearching(false);
            setHasSearched(false);
            return;
        }

        setIsSearching(true);
        setHasSearched(true);

        placesServiceRef.current.getPlacePredictions(
            {
                input,
                componentRestrictions: { country: "in" },
            },
            (predictions, status) => {
                setIsSearching(false);

                if (
                    status === window.google.maps.places.PlacesServiceStatus.OK &&
                    predictions?.length
                ) {
                    setSuggestions(predictions);
                } else {
                    setSuggestions([]);
                }
            }
        );
    };



    function showRadiusSlider() {
        setRadiusSlider(true);
    }
    const detectCurrentLocation = () => {
        if (!navigator.geolocation) {
            alert("Geolocation not supported");
            return;
        }

        navigator.geolocation.getCurrentPosition(
            (position) => {
                const lat = position.coords.latitude;
                const lng = position.coords.longitude;

                setCenter({ lat, lng });
                setShowMarker(true);
                showRadiusSlider(true);
                reverseGeocode(lat, lng);
            },
            (error) => {
                console.error(error);
                alert("Location permission denied");
            },
            {
                enableHighAccuracy: true,
                timeout: 10000,
            }
        );
    };
    const reverseGeocode = (lat, lng) => {
        const geocoder = new window.google.maps.Geocoder();

        geocoder.geocode(
            { location: { lat, lng } },
            (results, status) => {
                if (status === "OK" && results[0]) {
                    setLocation(results[0].formatted_address);
                }
            }
        );
    };

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

    const handleSlider = (e) => {
        setRange(e.target.value);
        setZoom(e.target.value)
    }
    const wrapperRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
                setOptions(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <>

            <div ref={wrapperRef} className="w-full">
                {/* search bar */}
                <div>

                    {/* input */}
                    <div className='relative z-4 flex justify-end items-center w-full'>

                        <Input type="text" inputClassName='text-secondary text-[5px] py-2 z-2'
                            placeholder="Enter Your Location" onChange={(e) => {
                                const value = e.target.value;
                                setQuery(value);
                                setLocation(value);

                                clearTimeout(debounceTimer.current);
                                debounceTimer.current = setTimeout(() => {
                                    fetchSuggestions(value);
                                }, 400);
                                if (!value.trim()) {
                                    setSuggestions([]);
                                    setHasSearched(false);
                                    setIsSearching(false);
                                    return;
                                }

                            }}
                            onFocus={() => setOptions(true)} value={location} leftIcon={<MapPin size={15} />} rightIcon={<Search size={18} className='text-primary cursor-pointer' />}
                            onClick={() => {
                                setOptions(true);
                            }} />
                        {location &&
                            <Button onClick={() => {
                                setLocation('')
                                setRadiusSlider(false);
                                setShowMarker(false)

                            }} size="sm" className='absolute z-5 mr-12'>Clear</Button>
                        }

                    </div>

                    {options &&
                        <>
                            <div onClick={() => { setOptions(false) }}>
                                <div className="text-primary text-[18px] font-bold absolute z-4 bg-white w-full  rounded-2xl p-4 border border-[#d7d9da]">

                                    <div className='flex items-center gap-2 '>
                                        <LocateFixed size={12} />
                                        <button onClick={detectCurrentLocation} className='cursor-pointer' >Detect live location</button>
                                    </div>
                                    <div>
                                        <Divider />
                                    </div>


                                    <div className="z-50 mt-2 shadow-lg max-h-60 overflow-auto flex flex-col justify-start">
                                        {/* Suggestions */}
                                        {suggestions.map((item) => (
                                            <div
                                                key={item.place_id}
                                                className="px-4 py-3 cursor-pointer hover:bg-gray-100"
                                                onClick={() => handleSelectSuggestion(item)}
                                            >
                                                <div className="flex gap-2 items-center">
                                                    <LocateFixed size={14} />
                                                    <p className="text-sm font-semibold">
                                                        {item.structured_formatting.main_text}
                                                    </p>
                                                </div>
                                                <p className="text-xs text-gray-500">
                                                    {item.structured_formatting.secondary_text}
                                                </p>
                                                <Divider />
                                            </div>
                                        ))}

                                        {/* Searching */}
                                        {isSearching && (
                                            <div className="px-4 py-3 text-sm text-gray-400 text-center">
                                                Searching...
                                            </div>
                                        )}

                                        {/* No results (ONLY after search) */}
                                        {hasSearched && !isSearching && suggestions.length === 0 && (
                                            <div className="px-4 py-3 text-sm text-gray-500 text-center">
                                                No location found
                                            </div>
                                        )}

                                    </div>


                                </div>
                            </div>


                        </>

                    }
                </div>

                {/* Map Section*/}
                <div className='h-80 rounded-2xl mt-4 relative z-2 w-full'>

                    {/* radius */}
                    {radiusSlider && <div
                        className="
                                bg-white
                                border-2 border-gray-300
                                rounded-3xl
                                absolute bottom-70 left-8 z-90
                                flex items-center justify-between
                                px-5
                                h-12
                                w-55
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
                                w-30
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
                                [&::-webkit-slider-thumb]:bg-[#e63900]
                                [&::-webkit-slider-thumb]:-mt-1

                                [&::-moz-range-thumb]:h-4
                                [&::-moz-range-thumb]:w-4
                                [&::-moz-range-thumb]:rounded-full
                                [&::-moz-range-thumb]:bg-[#e63900]
                            "
                            value={range}
                            onChange={(e) => handleSlider(e)}
                        />
                    </div>}


                    {/* map */}
                    <div className='w-full'>
                        <LoadScript
                            googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}
                            libraries={libraries} onLoad={() => {
                                placesServiceRef.current =
                                    new window.google.maps.places.AutocompleteService();

                                placeDetailsServiceRef.current =
                                    new window.google.maps.places.PlacesService(
                                        document.createElement("div")
                                    );
                            }}>

                            <Map
                                center={center}
                                radius={range * 1000}
                                handleLocation={handleLocation}
                                showRadiusSlider={showRadiusSlider}
                                showMarker={showMarker}
                                setShowMarker={() => {
                                    setShowMarker(true)
                                }}
                            />
                        </LoadScript>
                    </div>
                </div>
            </div>


        </>
    );
};

export default Location;
