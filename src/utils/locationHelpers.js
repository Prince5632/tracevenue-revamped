import axios from "axios";

export const fetchCityFromCoords = async (
  latitude,
  longitude,
  keyName,
  setValue = () => {},
  setError = () => {}
) => {
  try {
    const response = await axios.get(
      `https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=${
        import.meta.env.VITE_GEOCODING_API_KEY
      }`
    );
    const cityName =
      response.data.results[0]?.components.city ||
      response.data.results[0]?.components.town ||
      response.data.results[0]?.components.state;

    setValue(keyName, cityName || "City not found", "both");
  } catch (err) {
    setError("Failed to fetch city name.");
  }
};
