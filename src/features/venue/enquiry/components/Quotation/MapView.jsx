import React, { useState, useEffect, useRef, useMemo } from "react";
import { venues } from "../../../services/mapViewVenueContent";
import {
  useJsApiLoader,
  GoogleMap,
  Marker,
  Circle,
  InfoWindow,
} from "@react-google-maps/api";
import { Logs } from "lucide-react";

const MapView = ({ onTabClick, click, setClick }) => {
  const initialLat = 30.7333;
  const initialLng = 76.7794;
  const initialRadius = 5;

  const [selectedMarker, setSelectedMarker] = useState(null);
  const [selectedVenue, setSelectedVenue] = useState(null);
  const [center, setCenter] = useState({
    lat: initialLat,
    lng: initialLng,
  });
  const [range, setRange] = useState(initialRadius);
  const [defaultIcon, setDefaultIcon] = useState(null);
const [activeIcon, setActiveIcon] = useState(null);


  const mapRef = useRef(null);
  const libraries = useMemo(() => ["geometry", "places"], []);

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
    libraries: libraries,
  });

  // Reset Map Button
  const handleClick = () => {
    setClick(true);
    setRange(20);

    const resetCenter = { lat: initialLat, lng: initialLng };
    setCenter(resetCenter);

    onTabClick?.({
      range: 20,
      center: resetCenter,
      type: "map",
    });

    if (mapRef.current) {
      mapRef.current.panTo(resetCenter);
      mapRef.current.setZoom(11);
    }
  };

  // When venue selected → center map
  useEffect(() => {
    if (selectedVenue && mapRef.current) {
      const newCenter = {
        lat: selectedVenue.lat,
        lng: selectedVenue.lng,
      };

      setCenter(newCenter);
      mapRef.current.panTo(newCenter);
      mapRef.current.setZoom(14);
    }
  }, [selectedVenue]);

  if (!isLoaded) return <div>Loading Map...</div>;

  return (
    <div className="flex">
      {/* Sidebar */}
      <div className="bg-white shadow-lg overflow-y-auto w-[30%] mt-4 h-[300px] rounded-[20px] ">
        <div className="py-2 px-4 flex gap-2 border-b border-gray-300 bg-gray-100 sticky top-0">
          <Logs className="w-[18px]" />
          <h5 className="text-gray-700 font-bold">
            Venues ({venues?.length || 0})
          </h5>
        </div>

        <ul>
          {venues?.map((venue) => (
            <li
              key={venue.id}
              onClick={() => setSelectedVenue(venue)}
              className={`py-3  px-4 cursor-pointer transition truncate text-sm
                ${
                  selectedVenue?.id === venue.id
                    ? "text-white bg-orange-600"
                    : "hover:bg-blue-50"
                }`}
            >
              <span>
               <i className="fa-solid fa-shop pr-6"></i>
             </span>
              {venue.name}
            </li>
          ))}
        </ul>
      </div>

      {/* Map Section */}
      <div
        onClick={handleClick}
        className="flex-1 bg-white rounded-[30px] border border-[#D7D9DA] ml-2 mt-4 h-[300px]"
      >
        <GoogleMap
          center={center}
          zoom={11}
          mapContainerStyle={{
            width: "100%",
            height: "300px",
            borderRadius: "30px",
          }}
          onLoad={(map) => {
            mapRef.current = map;

            // Create custom marker icon AFTER Google loads
            if (window.google) {
              const defaultMarker = {
                url: "/custom-marker.png", 
                scaledSize: new window.google.maps.Size(40, 40),
                anchor: new window.google.maps.Point(20, 40),
              };
             
              const orangeMarker = {
                url: "/orange-custom-marker.png", 
                scaledSize: new window.google.maps.Size(40, 40),
                anchor: new window.google.maps.Point(20, 40),
              };

              setDefaultIcon(defaultMarker)
              setActiveIcon(orangeMarker)
            }
          }}
          options={{
            mapTypeControl: false,
          }}
        >
          {/* Radius Circle */}
          <Circle
            center={center}
            radius={range * 1000}
            options={{
              fillColor: "#3B82F6",
              fillOpacity: 0.2,
              strokeColor: "#3B82F6",
              strokeOpacity: 0.8,
              strokeWeight: 2,
            }}
          />

          {/* Markers */}
          {venues?.map((venue) => (
            <Marker
              key={venue.id}
              position={{ lat: venue.lat, lng: venue.lng }}
              onClick={() => setSelectedVenue(venue)}
              onMouseOver={() => setSelectedMarker(venue.id)}
              onMouseOut={() => setSelectedMarker(null)}
              icon={
                selectedVenue?.id === venue.id
                  ? activeIcon
                  : defaultIcon
              }
            >
              {selectedMarker === venue.id && (
                <InfoWindow
                >
                  <div className="bg-white rounded-xl shadow-lg p-3">
                    <p className="font-semibold text-gray-800 text-sm">
                      {venue.name}
                    </p>
                  </div>
                </InfoWindow>
              )}
            </Marker>
          ))}
        </GoogleMap>
      </div>
    </div>
  );
};

export default MapView;
