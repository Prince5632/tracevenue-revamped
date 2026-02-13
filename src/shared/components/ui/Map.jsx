import { GoogleMap, Marker, Circle } from "@react-google-maps/api";
import { useRef, useEffect } from "react";

const containerStyle = {
  width: "100%",
  height: "300px",
};

function Map({ center, radius, setCenter, onLocationSelector, mapTypeId, onMapLoad       }) {
  const mapRef = useRef(null);

  const onLoad = (map) => {
    mapRef.current = map;
    onMapLoad?.(map);
  };

  useEffect(() => {
    mapRef.current?.panTo(center);
  }, [center]);

  return (
    <div className="rounded-xl overflow-hidden">
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={11}
        onLoad={onLoad}
        mapTypeId={mapTypeId}
         options={{
    mapTypeControl: false,      
  }}
        onClick={(e) => {
          const lat = e.latLng.lat();
          const lng = e.latLng.lng();
          setCenter({ lat, lng });
          onLocationSelector(lat, lng);
        }}
      >
        <Marker position={center} />
        <Circle
          center={center}
          radius={radius}
          options={{
            fillColor: "#2563eb",
            fillOpacity: 0.2,
            strokeColor: "#2563eb",
            strokeOpacity: 0.8,
            strokeWeight: 2,
          }}
        />
      </GoogleMap>
    </div>
  );
}

export default Map;


