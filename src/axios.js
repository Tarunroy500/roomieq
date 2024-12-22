import axios from 'axios';

// Backend Base URL
const BASE_URL = import.meta.env.VITE_URL + "/api";
// Create Axios Instance
export const axiosI = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json', // Default Content Type
  },
  withCredentials: true
});