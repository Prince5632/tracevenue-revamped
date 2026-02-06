import React, { useState, useRef, useEffect, useMemo } from 'react';
import { MapPin, Search, LocateFixed, X } from 'lucide-react';
import { Button, Divider, GradientText, Input, Map } from '@shared/components/ui';
import { LoadScript } from '@react-google-maps/api';
import { decodeLocationFromUrl } from '@features/venue/enquiry/utils';
import useEnquiryStore from '../../context/useEnquiryStore';
import { Spinner } from '@/shared';


const Location = ({ urlParams = {} }) => {
    // Use global store
    const {
        formData,
        updateFormData,
    } = useEnquiryStore();
    // Initialize state from formData if available (using flat structure)
    const initialLocationName = formData.locations || '';
    const initialLat = formData.latitude || 30.7333;
    const initialLng = formData.longitude || 76.7794;
    const initialRadius = formData.radius || 20; // Default to 20 as per requirement

    const [locationInput, setLocationInput] = useState(initialLocationName);
    const [center, setCenter] = useState({
        lat: initialLat,
        lng: initialLng,
    });
    const [range, setRange] = useState(initialRadius);

    // UI States
    const [suggestions, setSuggestions] = useState([]);
    const [isSearching, setIsSearching] = useState(false);
    const [showOptions, setShowOptions] = useState(false);
    const [showRadiusSlider, setShowRadiusSlider] = useState(!!initialLocationName);
    const [showMapMarker, setShowMapMarker] = useState(!!initialLocationName);
    const [isLoading, setIsLoading] = useState(false)
    const [mapType, setMapType] = useState('roadmap');

    // Refs
    const placesServiceRef = useRef(null);
    const geocoderRef = useRef(null);
    const placeDetailsServiceRef = useRef(null);
    const debounceTimer = useRef(null);
    const wrapperRef = useRef(null);
    const libraries = useMemo(() => ["geometry", "places"], []);
    const mapInstanceRef = useRef(null);

    // Hydrate from URL params if formData is empty (initial mount via URL)
    useEffect(() => {
        if (!formData.locations && urlParams.location) {
            const locationData = decodeLocationFromUrl(urlParams.location);
            if (locationData) {
                setLocationInput(locationData.name);
                setCenter({ lat: locationData.latitude, lng: locationData.longitude });
                setRange(locationData.distance || 20);
                setShowRadiusSlider(true);
                setShowMapMarker(true);
                // Update global state
                updateFormData('locations', locationData.name);
                updateFormData('latitude', locationData.latitude);
                updateFormData('longitude', locationData.longitude);
                updateFormData('radius', locationData.distance || 20);
            }
        }
    }, [urlParams.location]);

    // Hydrate local state when formData changes (e.g. navigation back)
    useEffect(() => {
        if (formData.locations) {
            setLocationInput(formData.locations);
            setCenter({ lat: formData.latitude, lng: formData.longitude });
            setRange(formData.radius || 20);
            setShowRadiusSlider(true);
            setShowMapMarker(true);
        }
    }, [formData.locations, formData.latitude, formData.longitude, formData.radius]);

    // Helper to extract locality details
    const extractLocationDetails = (addressComponents, formattedAddress, geometry) => {
        let locality = { short_name: '', long_name: '' };
        let subLocality = { short_name: '', long_name: '' };

        addressComponents?.forEach(component => {
            if (component.types.includes('locality')) {
                locality = {
                    short_name: component.short_name,
                    long_name: component.long_name
                };
            }
            if (component.types.includes('sublocality') || component.types.includes('sublocality_level_1')) {
                subLocality = {
                    short_name: component.short_name,
                    long_name: component.long_name
                };
            }
        });

        return {
            name: formattedAddress,
            city: formattedAddress, // Keeping consistent with payload requirement
            latitude: geometry.location.lat(),
            longitude: geometry.location.lng(),
            locality,
            subLocality
        };
    };

    // Update global form data
    const updateGlobalState = (locationDetails, distanceVal) => {
        // Update flat fields individually
        updateFormData('locations', locationDetails.name || locationDetails.city);
        updateFormData('latitude', locationDetails.latitude);
        updateFormData('longitude', locationDetails.longitude);
        updateFormData('radius', distanceVal);

        // Update complex objects for API payload
        updateFormData('location', {
            latitude: locationDetails.latitude,
            longitude: locationDetails.longitude
        });

        updateFormData('selectedCities', [{
            name: locationDetails.name,
            city: locationDetails.city,
            latitude: locationDetails.latitude,
            longitude: locationDetails.longitude,
            locality: locationDetails.locality,
            subLocality: locationDetails.subLocality
        }]);
    };

    const handleSelectSuggestion = (prediction) => {
        if (!placeDetailsServiceRef.current) return;

        placeDetailsServiceRef.current.getDetails(
            {
                placeId: prediction.place_id,
                fields: ["name", "formatted_address", "geometry", "address_components"],
            },
            (place, status) => {
                if (status === window.google.maps.places.PlacesServiceStatus.OK && place?.geometry?.location) {
                    const details = extractLocationDetails(
                        place.address_components,
                        place.formatted_address,
                        place.geometry
                    );

                    // Update Local State
                    setCenter({ lat: details.latitude, lng: details.longitude });
                    setLocationInput(details.name);
                    setShowMapMarker(true);
                    setShowRadiusSlider(true);
                    setShowOptions(false);
                    setSuggestions([]);

                    // Update Global State
                    updateGlobalState(details, range);
                }
            }
        );
    };

    const fetchSuggestions = (input) => {
        if (!input?.trim() || !placesServiceRef.current) {
            setSuggestions([]);
            return;
        }

        setIsSearching(true);
        placesServiceRef.current.getPlacePredictions(
            {
                input,
                componentRestrictions: { country: "in" },
            },
            (predictions, status) => {
                setIsSearching(false);
                if (status === window.google.maps.places.PlacesServiceStatus.OK && predictions) {
                    setSuggestions(predictions);
                } else {
                    setSuggestions([]);
                }
            }
        );
    };

    const handleInputChange = (e) => {
        const value = e.target.value;
        setLocationInput(value);

        if (!value.trim()) {
            setSuggestions([]);
            setShowRadiusSlider(false);
            setShowMapMarker(false);
            return;
        }

        clearTimeout(debounceTimer.current);
        debounceTimer.current = setTimeout(() => {
            fetchSuggestions(value);
        }, 400);
    };

    const detectCurrentLocation = () => {
        if (!navigator.geolocation) {
            alert("Geolocation not supported");
            return;
        }
        setIsLoading(true)
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const lat = position.coords.latitude;
                const lng = position.coords.longitude;
                setCenter({ lat, lng });
                setShowMapMarker(true);
                setIsLoading(false);
                if (!geocoderRef.current) {
                    geocoderRef.current = new window.google.maps.Geocoder();
                }

                geocoderRef.current.geocode({ location: { lat, lng } }, (results, status) => {
                    if (status === "OK" && results[0]) {
                        const details = extractLocationDetails(
                            results[0].address_components,
                            results[0].formatted_address,
                            { location: { lat: () => lat, lng: () => lng } } // Mock geometry object
                        );

                        setLocationInput(details.name);
                        setShowRadiusSlider(true);
                        setShowOptions(false);
                        updateGlobalState(details, range);
                    }
                });
            },
            (error) => {
                console.error(error);
                alert("Location permission denied");
            }
        );
    };

    const handleRadiusChange = (e) => {
        const newRange = parseInt(e.target.value, 10);
        setRange(newRange);

        // Sync with global state if we have a valid location
        if (formData.locations) {
            updateFormData('radius', newRange);
        }
    };

    const handleMapLocationChange = (lat, lng) => {
        setCenter({ lat, lng });

        if (!geocoderRef.current) {
            geocoderRef.current = new window.google.maps.Geocoder();
        }

        geocoderRef.current.geocode({ location: { lat, lng } }, (results, status) => {
            if (status === "OK" && results[0]) {
                const details = extractLocationDetails(
                    results[0].address_components,
                    results[0].formatted_address,
                    { location: { lat: () => lat, lng: () => lng } }
                );

                setLocationInput(details.name);
                updateGlobalState(details, range);
            }
        });
    };

    const clearSelection = () => {
        setLocationInput('');
        setSuggestions([]);
        setShowRadiusSlider(false);
        setShowMapMarker(false);
        // Clear all location fields
        updateFormData('locations', '');
        updateFormData('latitude', '');
        updateFormData('longitude', '');
        updateFormData('radius', 20);
    };

    // Close suggestions on click outside
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
                setShowOptions(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <div ref={wrapperRef} className="w-full relative pb-18">
            {/* Search Input Section */}
            <div className='relative z-4 w-full'>
                <div className='relative flex items-center w-full'>
                    <Input
                        type="text"
                        inputClassName='text-secondary text-[14px] py-2 z-2 pr-20 font-normal' // Added padding-right for Clear button
                        placeholder="Enter Location"
                        value={locationInput}
                        onChange={handleInputChange}
                        onFocus={() => setShowOptions(true)}
                        leftIcon={<img src="src\assets\dashboard\location.svg" />}
                        rightIcon={<Search size={18} className='text-primary cursor-pointer' />}
                    />

                    {locationInput && (
                        <Button
                            onClick={clearSelection}
                            size="sm"
                            children="Clear"
                            className='absolute right-10 z-5 text-gray-500 p-1 h-auto'
                        >

                        </Button>
                    )}
                </div>

                {/* Suggestions Dropdown */}
                {showOptions && (
                    <div className="absolute top-full left-0 w-full mt-0 z-100 bg-white rounded-2xl shadow-lg border border-[#d7d9da] overflow-hidden">
                        <div className="p-4 bg-gray-50 border-b border-gray-100 cursor-pointer hover:bg-gray-100 transition-colors" onClick={detectCurrentLocation}>
                            <div className='flex items-center gap-3 text-primary font-medium'>
                                <LocateFixed size={18} />
                                <span>Detect current location</span>
                            </div>
                        </div>

                        <Divider />

                        <div className="max-h-60 overflow-y-auto z-120">
                            {suggestions.map((item) => (
                                <div
                                    key={item.place_id}
                                    className="px-4 py-3 cursor-pointer hover:bg-gray-50 border-b border-gray-100 last:border-0 transition-colors"
                                    onClick={() => handleSelectSuggestion(item)

                                    }
                                >
                                    <div className="flex gap-3 items-start">
                                        <MapPin size={16} className="mt-1 text-gray-400 shrink-0" />
                                        <div>
                                            <p className="text-sm font-medium text-gray-900">
                                                {item.structured_formatting.main_text}
                                            </p>
                                            <p className="text-xs text-gray-500 mt-0.5">
                                                {item.structured_formatting.secondary_text}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            ))}

                            {isSearching && (
                                <div className="p-4 text-center text-sm text-gray-400">Searching...</div>
                            )}

                            {!isSearching && locationInput && suggestions.length === 0 && (
                                <div className="p-4 text-center text-sm text-gray-400">No locations found</div>
                            )}
                        </div>
                    </div>
                )}

                {showRadiusSlider && (
                    <div className="absolute  left-4 z-50 bg-white/95 backdrop-blur-sm border border-gray-200 rounded-4xl shadow-lg flex justify-between items-center px-4 py-3 w-60 mt-3 h-11">

                        {/* Label */}
                        <div className="shrink-0">
                            <GradientText className="font-bold text-sm flex flex-col leading-[0.9]">
                                <span className='pt-2'>Within</span>
                                <span className="text-xl">{range}km</span>
                            </GradientText>
                        </div>

                        {/* Slider */}
                        <div className="relative flex-1">
                            <input
                                type="range"
                                min="1"
                                max="50"
                                value={range}
                                onChange={handleRadiusChange}
                                className="w-full h-4 rounded-full appearance-none cursor-pointer"
                                style={{
                                    background: `linear-gradient(to right, #f08e45 0%, #ee5763 ${(range / 50) * 100}%, #e5e5e5 ${(range / 50) * 100}%, #e5e5e5 100%)`
                                }}
                            />
                            {/* Custom thumb for Webkit browsers */}
                            <style>
                                {`
                                        input[type=range]::-webkit-slider-thumb {
                                            -webkit-appearance: none;
                                            appearance: none;
                                            width: 25px;
                                            height: 25px;
                                            background: #e63900;
                                            border-radius: 50%;
                                            border: 2px solid white;
                                            cursor: pointer;
                                            margin-top: -1px; /* Center thumb on track */
                                        }
                                        input[type=range]::-moz-range-thumb {
                                            width: 25px;
                                            height: 25px;
                                            background: #e63900;
                                            border-radius: 50%;
                                            border: 2px solid white;
                                            cursor: pointer;
                                        }
                                        input[type=range]::-ms-thumb {
                                            width: 25px;
                                            height: 25px;
                                            background: #e63900;
                                            border-radius: 50%;
                                            border: 2px solid white;
                                            cursor: pointer;
                                        }
                                    `}
                            </style>
                        </div>
                    </div>
                )}
            </div>


            <div className='rounded-2xl mt-8 relative z-0 w-full overflow-hidden border border-gray-200 h-80'>
                {isLoading && (
                    <div className="absolute inset-0 z-50 bg-white/70 backdrop-blur-sm flex flex-col items-center justify-center gap-3">
                        <Spinner size='lg' color='gray' />
                        <span className="text-sm text-gray-600 font-medium">
                            Detecting your location…
                        </span>
                    </div>
                )}
               <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 z-50 pointer-events-auto">
    <div className="flex bg-white rounded shadow-md border border-gray-200 overflow-hidden">
        {['roadmap', 'satellite'].map((type) => (
            <button
                key={type}
                onClick={() => setMapType(type)}
                className={`px-4 py-1 text-sm font-medium transition-colors ${
                    mapType === type
                        ? 'text-[#f15a24]'
                        : 'text-gray-600 hover:text-[#f15a24]'
                }`}
            >
                {type === 'roadmap' ? 'Street' : 'Satellite'}
            </button>
        ))}
    </div>
</div>

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
                        mapTypeId={mapType}
                        onMapLoad={(map) => {
                            mapInstanceRef.current = map;
                        }}
                        center={center}
                        radius={range * 1000} // Convert km to meters
                        handleLocation={handleMapLocationChange}
                        showRadiusSlider={() => setShowRadiusSlider(true)}
                        showMarker={showMapMarker}
                        setShowMarker={setShowMapMarker}
                        zoom={11}
                    // Add marker functionality to Map component if not already present
                    // Assuming Map component handles the marker logic via props
                    />
                </LoadScript>
            </div>
        </div>
    );
};

export default Location;
