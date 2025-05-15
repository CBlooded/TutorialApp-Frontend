import axios from "axios";

const axiosConfig = axios.create({
  baseURL: "http://localhost:8080", //base url for connecting with backend //to be changed when endpoints will be done
  headers: {
    "Content-Type": "application/json", //same
  },
});

export default axiosConfig;
