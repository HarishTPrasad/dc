import axios from "axios";

const api = axios.create({
  baseURL: "http://10.0.1.221:2026/api", // Use the backend service name
});

export default api;