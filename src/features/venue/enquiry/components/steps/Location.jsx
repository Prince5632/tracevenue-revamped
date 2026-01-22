import React, { useState, useRef, useEffect, useMemo } from 'react';
import { MapPin, Search, LocateFixed, X } from 'lucide-react';
import { Button, Divider, GradientText, Input, Map } from '@shared/components/ui';
import { LoadScript } from '@react-google-maps/api';

const Location = ({ formData, updateFormData }) => {
    // Initialize state from formData if available
    const initialCity = formData.selectedCities?.[0];
    const initialLocationName = initialCity?.name || '';
    const initialLat = initialCity?.latitude || 30.7333;
    const initialLng = initialCity?.longitude || 76.7794;
    const initialDistance = formData.distance || 20; // Default to 20 as per requirement

    const [locationInput, setLocationInput] = useState(initialLocationName);
    const [center, setCenter] = useState({
        lat: initialLat,
        lng: initialLng,
    });
    const [range, setRange] = useState(initialDistance);
    
    // UI States
    const [suggestions, setSuggestions] = useState([]);
    const [isSearching, setIsSearching] = useState(false);
    const [showOptions, setShowOptions] = useState(false);
    const [showRadiusSlider, setShowRadiusSlider] = useState(!!initialLocationName);
    const [showMapMarker, setShowMapMarker] = useState(!!initialLocationName);

    // Refs
    const placesServiceRef = useRef(null);
    const geocoderRef = useRef(null);
    const placeDetailsServiceRef = useRef(null);
    const debounceTimer = useRef(null);
    const wrapperRef = useRef(null);
    const libraries = useMemo(() => ["geometry", "places"], []);

    // Hydrate local state when formData changes (e.g. navigation back)
    useEffect(() => {
        if (formData.selectedCities?.[0]) {
            const city = formData.selectedCities[0];
            setLocationInput(city.name);
            setCenter({ lat: city.latitude, lng: city.longitude });
            setRange(formData.distance || 20);
            setShowRadiusSlider(true);
            setShowMapMarker(true);
        }
    }, [formData.selectedCities, formData.distance]);

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
        const payload = {
            selectedCities: [locationDetails],
            distance: distanceVal
        };
        
        // Update fields individually to match updateFormData signature
        updateFormData('selectedCities', payload.selectedCities);
        updateFormData('distance', payload.distance);
    };

    const handleSelectSuggestion = (prediction) => {
        if (!placeDetailsServiceRef.current) return;

        placeDetailsServiceRef.current.getDetails(
            {
                placeId: prediction.place_id,
                fields: ["username", "formatted_address", "geometry", "address_components"],
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

        navigator.geolocation.getCurrentPosition(
            (position) => {
                const lat = position.coords.latitude;
                const lng = position.coords.longitude;
                setCenter({ lat, lng });
                setShowMapMarker(true);

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
        if (formData.selectedCities?.[0]) {
            updateFormData('distance', newRange);
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
        updateFormData('selectedCities', []);
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
        <div ref={wrapperRef} className="w-full">
            {/* Search Input Section */}
            <div className='relative z-4 w-full'>
                <div className='relative flex items-center w-full'>
                    <Input 
                        type="text" 
                        inputClassName='text-secondary text-[14px] py-2 z-2 pr-20' // Added padding-right for Clear button
                        placeholder="Enter Your Location" 
                        value={locationInput}
                        onChange={handleInputChange}
                        onFocus={() => setShowOptions(true)}
                        leftIcon={<MapPin size={15} />} 
                        rightIcon={<Search size={18} className='text-primary cursor-pointer' />}
                    />
                    
                    {locationInput && (
                        <Button 
                            onClick={clearSelection}
                            size="sm" 
                            variant="ghost"
                            className='absolute right-10 z-5 text-gray-500 hover:text-red-500 p-1 h-auto'
                        >
                            <X size={16} />
                        </Button>
                    )}
                </div>

                {/* Suggestions Dropdown */}
                {showOptions && (
                    <div className="absolute top-full left-0 w-full mt-2 z-50 bg-white rounded-2xl shadow-lg border border-[#d7d9da] overflow-hidden">
                        <div className="p-4 bg-gray-50 border-b border-gray-100 cursor-pointer hover:bg-gray-100 transition-colors" onClick={detectCurrentLocation}>
                            <div className='flex items-center gap-3 text-primary font-medium'>
                                <LocateFixed size={18} />
                                <span>Detect current location</span>
                            </div>
                        </div>

                        <div className="max-h-60 overflow-y-auto">
                            {suggestions.map((item) => (
                                <div
                                    key={item.place_id}
                                    className="px-4 py-3 cursor-pointer hover:bg-gray-50 border-b border-gray-100 last:border-0 transition-colors"
                                    onClick={() => handleSelectSuggestion(item)}
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
            </div>

            {/* Map Section */}
            <div className='h-80 rounded-2xl mt-4 relative z-0 w-full overflow-hidden border border-gray-200'>
                {/* Radius Slider Float */}
                {showRadiusSlider && (
                    <div className="absolute top-4 left-4 z-50 bg-white/95 backdrop-blur-sm border border-gray-200 rounded-full shadow-lg px-6 py-3 flex flex-col items-center gap-1 min-w-[200px]">
                        <div className="flex items-center gap-2 text-sm font-medium">
                            <span className="text-gray-600">Radius:</span>
                            <GradientText className="font-bold text-lg">{range} km</GradientText>
                        </div>
                        <input
                            type="range"
                            min="1"
                            max="50"
                            className="w-full h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#e63900]"
                            value={range}
                            onChange={handleRadiusChange}
                        />
                    </div>
                )}

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
