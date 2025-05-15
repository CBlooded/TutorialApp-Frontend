import axiosConfig from "./axiosConfig";

const Interceptors = () => {
  axiosConfig.interceptors.request.use(
    (config) => {
      const acessToken = localStorage.getItem("acessToken");
      if (acessToken) {
        config.headers.Authorization = `Bearer ${acessToken}`;
      }
      return config;
    },
    (error) => Promise.reject(error)
  );
};

export default Interceptors;
