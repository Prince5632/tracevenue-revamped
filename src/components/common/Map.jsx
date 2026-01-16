import { GoogleMap, LoadScript, Marker, Circle } from "@react-google-maps/api";

const containerStyle = {
  width: "100%",
  height: "280px",
};


function Map({center,radius,handleLocation}) {
    
  return (
   <LoadScript >
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={14}
        className='w-fit'
        onClick={(e)=>{
            const lat = e.latLng.lat();
            const lng = e.latLng.lng();
            handleLocation(lat,lng);
            console.log(lat, lng);
        }}   
      >
      
        <Marker position={center} />

        {/* Blue Circle */}
        <Circle
          center={center}
          radius={radius}
          options={{
            fillColor: "#2563eb",      // blue
            fillOpacity: 0.2,
            strokeColor: "#2563eb",
            strokeOpacity: 0.8,
            strokeWeight: 2,
          }}
        />
      </GoogleMap>
    </LoadScript>
  );
}

export default Map;
