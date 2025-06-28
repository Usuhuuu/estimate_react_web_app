import axios from "axios";

interface ImportMetaEnv {
  readonly VITE_API_URL: string;
}

declare global {
  interface ImportMeta {
    readonly env: ImportMetaEnv;
  }
}

export const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
  withCredentials: true,
  timeout: 10000,
});

export const axiosRegularInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
  withCredentials: true,
  timeout: 10000,
});

axiosInstance.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => Promise.reject(error)
);
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    let originalRequest = error.config;

    if (
      error.response &&
      error.response.status === 401 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;
      try {
        originalRequest = await axiosRegularInstance.post(
          "/refresh",
          {},
          { withCredentials: true }
        );
        return axiosInstance(originalRequest); // Retry original request
      } catch (refreshError) {
        // Optionally redirect to login
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);
