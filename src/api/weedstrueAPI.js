import axios from 'axios';
import { getAuthToken, refreshAuthToken } from './auth';
import { PRODUCTION } from '../config/constants';

const weedstrueAPI = axios.create({
  baseURL: PRODUCTION ? '' : 'https://localhost:7264'
});

weedstrueAPI.interceptors.request.use(
  async config => {
    const token = await getAuthToken();
    if (token) {
      config.headers = {
        Authorization: `Bearer ${token.accessToken}`
      };
    }
    return config;
  },
  error => {
    Promise.reject(error);
  }
);

weedstrueAPI.interceptors.response.use(
  response => {
    return response;
  },
  async function (error) {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest.__isRetryRequest) {
      originalRequest.__isRetryRequest = true;
      await refreshAuthToken();
      const token = await getAuthToken();
      if (token) {
        axios.defaults.headers.common.Authorization = `Bearer ${token.accessToken}`;
        return weedstrueAPI(originalRequest);
      }
    }
    return Promise.reject(error);
  }
);

export default weedstrueAPI;
