import axiosConfig from "./axiosConfig";
import axios from "axios";

const setupInterceptors = () => {
  axiosConfig.interceptors.request.use(
    (config) => {
      const accessToken = localStorage.getItem("accessToken");
      if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
      }
      return config;
    },
    (error) => Promise.reject(error)
  );

  axiosConfig.interceptors.response.use(
    (response) => {
      return response;
    },
    async (error) => {
      const originalRequest = error.config;
      if (error.response.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;
        const refreshToken = localStorage.getItem("refreshToken"); //tbc
        if (refreshToken) {
          try {
            const response = await axiosConfig.post(`/refreshToken`, {
              //tbc
              refreshToken,
            });
            const newAccessToken = response.data.accessToken;
            localStorage.setItem("accessToken", newAccessToken);
            originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
            return axios(originalRequest);
          } catch (error) {
            console.log(`Token failed: ${error}`);
          }
        }
      }
      return Promise.reject(error);
    }
  );
};

export default setupInterceptors;
