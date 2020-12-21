import axios from "axios";
//import { api } from "../urlConfig";

const axiosInstance = axios.create({
  baseURL: "http://localhost:2000/api",
});

export default axiosInstance;
