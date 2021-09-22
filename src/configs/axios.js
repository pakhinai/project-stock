import axios from "axios";
import localStorageService from "./localStorageService";

axios.defaults.baseURL = "http://localhost:8000";

axios.interceptors.request.use(
  (config) => {
    if (
      config.url.includes("/admin") ||
      config.url.includes("/user") ||
      config.url.includes("/register")
    ) {
      return config;
    }

    const token = localStorageService.getAdminToken();
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (err) => {
    Promise.reject(err);
  }
);

export default axios;
