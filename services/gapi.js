import axios from "axios";
import config from "config";

const BASE_GAPI = `https://maps.googleapis.com/maps/api`;

function axiosInstance() {
  return axios.create();
}

const gapi = {
  geocode(address = "") {
    return `${BASE_GAPI}/geocode/json?language=es&key=${config.GOOGLE_MAPS_KEY}&components=country:MX&address=${address}`;
  },

  reverseGeocode(coords) {
    return `${BASE_GAPI}/geocode/json?language=es&key=${config.GOOGLE_MAPS_KEY}&latlng=${coords.lat},${coords.lng}`;
  },
};

const errorResponse = err => {
  let error = err;
  if (err.response && err.response.data) {
    error = err.response.data.error;
  }
  throw error;
};

const geo = {
  geocode(street) {
    return axiosInstance()
      .get(gapi.geocode(street))
      .then(res => res.data.results)
      .catch(errorResponse);
  },

  reverse(coords) {
    return axiosInstance()
      .get(gapi.reverseGeocode(coords))
      .then(res => res.data.results)
      .catch(errorResponse);
  },
};

export default geo;
