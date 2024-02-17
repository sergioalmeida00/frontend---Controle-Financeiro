import axios from "axios";
import { localStorageKeys } from "../config/localStorageKeys";
import { sleep } from "../utils/sleep";

const httpClient = axios.create({
  baseURL: "http://127.0.0.1:8000/api",
  headers: {
    "Content-Type": "application/json",
  },
});

httpClient.interceptors.request.use(async (config) => {
  const accessToken = localStorage.getItem(localStorageKeys.ACCESS_TOKEN);

  await sleep(1500);

  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});

export { httpClient };
