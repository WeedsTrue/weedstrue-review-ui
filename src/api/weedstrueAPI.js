import { Auth } from '@aws-amplify/auth';
import axios from 'axios';
import { PRODUCTION } from '../config/constants';

const weedstrueAPI = axios.create({
  baseURL: PRODUCTION ? '' : 'https://localhost:7264'
});

weedstrueAPI.interceptors.request.use(
  async config => {
    try {
      const token = (await Auth.currentSession()).getIdToken().getJwtToken();
      if (token) {
        config.headers = {
          Authorization: `Bearer ${token}`
        };
        config.withCredentials = true;
      }
    } catch {}
    return config;
  },
  error => {
    console.log(error);

    Promise.reject(error);
  }
);

export default weedstrueAPI;
