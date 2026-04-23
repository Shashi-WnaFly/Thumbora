import axios from "axios";
import { BASE_URL } from "../utils/constants";

const api = axios.create({
  baseURL: BASE_URL || "http://localhost:5173",
  withCredentials: true,
});

export default api;
