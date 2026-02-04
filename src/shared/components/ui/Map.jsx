import { GoogleMap, Marker, Circle } from "@react-google-maps/api";
import { useRef, useEffect, useState } from "react";

const containerStyle = {
  width: "100%",
  height: "100%",
};

function Map({ center, radius, handleLocation,showRadiusSlider,showMarker,setShowMarker, mapTypeId,}) {
  console.log("Map rendering")
  const mapRef = useRef(null);
  const isLoaded = useRef(false);


  const onLoad = (map) => {
    if (isLoaded.current) return; 
    isLoaded.current = true;
    mapRef.current = map;
  };

  const getZoomFromRadius = (radiusMeters) => {
    if (radiusMeters <= 500) return 6;
    if (radiusMeters <= 1000) return 14;
    if (radiusMeters <= 2000) return 14;
    if (radiusMeters <= 5000) return 13;
    if (radiusMeters <= 10000) return 12;
    if (radiusMeters <= 20000) return 11;
    return 10;
  };

  // Zoom map when radius changes
  useEffect(() => {
    if (!mapRef.current || !center || !showMarker) return;
      const zoom = getZoomFromRadius(radius);
      mapRef.current.setZoom(zoom);
      mapRef.current.panTo(center);
  }, [radius, center, showMarker]);

  useEffect(() => {
    if (!mapRef.current || !center) return;
   mapRef.current.panTo(center);  
}, [center]);

  return (
  <>
    <div className="rounded-xl overflow-hidden h-[100%]">
    <GoogleMap
      mapContainerStyle={containerStyle}
      mapTypeId={mapTypeId}  
      center={center}
      zoom={8}
      onLoad={onLoad}
      options={{
       
          mapTypeControl: false, 
          fullscreenControl: false,   
          streetViewControl: false,  
          zoomControl: true,
          zoomControlOptions: {
            position: window.google.maps.ControlPosition.RIGHT_CENTER,
          },
          mapTypeControlOptions: {
          style: window.google.maps.MapTypeControlStyle.HORIZONTAL_BAR,
          position: window.google.maps.ControlPosition.BOTTOM_RIGHT,
          mapTypeIds: ["roadmap", "satellite"],
    },
  }}
      onClick={(e) => {
        const lat = e.latLng.lat();
        const lng = e.latLng.lng();
        handleLocation(lat, lng);
        setShowMarker();
        showRadiusSlider()
      }}
    >
      {showMarker && (
        <>
          <Marker position={center} />
          <Circle
            key={`${center.lat}-${center.lng}-${radius}`}
            center={center}
            radius={radius/2}
            options={{
              fillColor: "#2563eb",
              fillOpacity: 0.2,
              strokeColor: "#2563eb",
              strokeOpacity: 0.8,
              strokeWeight: 2,
            }}
          />
        </>
      )}
    </GoogleMap>

    </div>
  </>
  );
}

export default Map;
