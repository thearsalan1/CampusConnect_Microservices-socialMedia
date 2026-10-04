// src/api/axiosClient.ts
import axios from "axios";

export const axiosClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  withCredentials: true,
});

let isRefreshing = false;
let pendingQueue: Array<() => void> = [];

axiosClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      if (!isRefreshing) {
        isRefreshing = true;
        try {
          await axiosClient.post("/auth/refresh-token");
          isRefreshing = false;
          pendingQueue.forEach((cb) => cb());
          pendingQueue = [];
          return axiosClient(originalRequest);
        } catch (refreshError) {
          isRefreshing = false;
          pendingQueue = [];
          return Promise.reject(refreshError);
        }
      }

      return new Promise((resolve) => {
        pendingQueue.push(() => resolve(axiosClient(originalRequest)));
      });
    }

    return Promise.reject(error);
  },
);
