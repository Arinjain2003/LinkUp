import axios from "axios";

const api = axios.create({
  baseURL: "https://linkup-v7ni.onrender.com",
});

export default api;

//   baseURL: "http://localhost:5000/",