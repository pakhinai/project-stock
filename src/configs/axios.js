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

    const tokenAdmin = localStorageService.getAdminToken();
    const tokenUser = localStorageService.getUserToken()
    if (tokenAdmin) {
      config.headers["Authorization"] = `Bearer ${tokenAdmin}`;
    } else {
      config.headers["Authorization"] = `Bearer ${tokenUser}`
    }
    return config;
  },
  (err) => {
    Promise.reject(err);
  }
);

export default axios;
