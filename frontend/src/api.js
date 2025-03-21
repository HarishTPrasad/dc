import axios from "axios";

const api = axios.create({
  baseURL: "http://server:2026/api", // Use the backend service name
});

export default api;