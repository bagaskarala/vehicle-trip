import Axios from 'axios';
const URL = 'https://nominatim.openstreetmap.org/';

// create axios instance
let instanceAxios = Axios.create({
   baseURL: URL,
   headers: {
      'Content-Type': 'application/json'
   }
});

// specify endpoint API function
let endpoint = {
   getReverseGeocoding(lat, lon, format = 'jsonv2') {
      return instanceAxios.get(`reverse?format=${format}&lat=${lat}&lon=${lon}`);
   },
   getPublicNominatim(placeId) {
      return URL + `details.php?place_id=${placeId}`;
   }
};

export default endpoint;