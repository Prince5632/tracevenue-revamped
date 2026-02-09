import { GoogleMap, Marker, Circle } from "@react-google-maps/api";
import { useRef, useEffect } from "react";

const containerStyle = {
  width: "100%",
  height: "100%",
};

function Map({
  center,
  radius,
  handleLocation,
  showMarker,
  onMapLoad,
  mapTypeId,
  zoom = 11,
}) {
  const mapRef = useRef(null);

  return (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={zoom}
      onLoad={(map) => {
        mapRef.current = map;
        onMapLoad?.(map);
      }}
      options={{
        mapTypeId: mapTypeId,
        mapTypeControl: false,
        fullscreenControl: false,
        streetViewControl: false,
        zoomControl: true,
      }}
      onClick={(e) => {
        handleLocation(e.latLng.lat(), e.latLng.lng());
      }}
    >
      {showMarker && (
        <>
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
        </>
      )}
    </GoogleMap>
  );
}

export default Map;
