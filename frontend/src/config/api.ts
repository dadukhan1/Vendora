/** @format */

import axios from "axios";

// No need to import dotenv/config in React - CRA handles this automatically

const api = axios.create({
  baseURL: "http://localhost:3000/api",
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
