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
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const mapRef = useRef(null);
  const libraries = useMemo(() => ["geometry", "places"], []);

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
    libraries: libraries,
  });

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
    <div className="flex relative px-4 ">
      {/* Sidebar */}
      <div
        className={`
     absolute md:static  top-4 left-0 z-40 
    h-[300px] md:h-[300px]
    w-[50%] sm:w-[40%] md:w-[30%]
    bg-white border border-gray-200 rounded-xl md:rounded-xl
    shadow-xl md:shadow-sm
    flex flex-col mt-0 md:mt-4
    transform transition-transform duration-300
    ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
    md:translate-x-0
  `}
      >
        <div className="px-5 py-4 border-b border-gray-200 flex items-center justify-between">
          <div className="flex gap-3">
            <div className="flex items-center gap-2 ">
            <Logs className="w-4  text-gray-800" />
            <h5 className="text-md font-bold text-gray-800 tracking-wide">
              Venues
            </h5>
          </div>

          <span className="text-sm font-semibold text-gray-600 bg-gray-100 px-2.5 py-1 rounded-md">
            {venues?.length || 0}
          </span>
          </div>
          
          <button
            onClick={() => setSidebarOpen(false)}
            className="md:hidden bg-red-500 text-white rounded-full w-8 h-8"
          >
            ✕
          </button>
        </div>

        {/* List */}
        <ul className="flex-1 overflow-y-auto divide-y divide-gray-100">
          {venues?.map((venue) => {
            const active = selectedVenue?.id === venue.id;

            return (
              <li
                key={venue.id}
                onClick={() => setSelectedVenue(venue)}
                className={`flex items-center gap-3 px-5 py-3 text-sm cursor-pointer transition-colors duration-150
            ${
              active
                ? "bg-[linear-gradient(95.02deg,#F08E45_0.07%,#EE5763_61.45%)] text-white "
                : "text-gray-700 hover:bg-gray-50"
            }
          `}
              >
                <div className="p-2 flex items-center justify-center rounded-md bg-gray-100 text-gray-500">
                  <i className="fa-solid fa-shop text-xs"></i>
                </div>

                <span className="truncate font-medium">{venue.name}</span>
              </li>
            );
          })}
        </ul>
      </div>

      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-30 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
      {/* Map Section */}
      <div
        onClick={handleClick}
        className="flex-1 relative bg-white rounded-[30px] border border-[#D7D9DA] ml-0 md:ml-2 mt-4 h-[300px]"
      >
        {!sidebarOpen && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              setSidebarOpen(true);
            }}
            className="absolute top-2 left-2 z-50 md:hidden bg-white p-2 rounded-lg shadow-md border border-gray-200"
          >
            <Logs className="w-5 h-5 text-gray-800" />
          </button>
        )}

        <GoogleMap
          center={center}
          zoom={11}
          mapContainerStyle={{
            width: "100%",
            height: "300px",
            borderRadius: "14px",
          }}
          onLoad={(map) => {
            mapRef.current = map;
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

              setDefaultIcon(defaultMarker);
              setActiveIcon(orangeMarker);
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
              onClick={() => {
                setSelectedVenue(venue);
                setSidebarOpen(false);
              }}
              onMouseOver={() => setSelectedMarker(venue.id)}
              onMouseOut={() => setSelectedMarker(null)}
              icon={selectedVenue?.id === venue.id ? activeIcon : defaultIcon}
            >
              {selectedMarker === venue.id && (
                <InfoWindow>
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
