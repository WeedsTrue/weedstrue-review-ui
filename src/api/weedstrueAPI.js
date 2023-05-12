import { Auth } from '@aws-amplify/auth';
import axios from 'axios';
import { PRODUCTION } from '../config/constants';
import { logger } from '../helpers/logger';

const weedstrueAPI = axios.create({
  baseURL: PRODUCTION ? 'https://api.weedstrue.ca' : 'https://localhost:7264'
});

weedstrueAPI.interceptors.request.use(
  async config => {
    try {
      const token = (await Auth.currentSession()).getIdToken().getJwtToken();
      if (token) {
        config.headers = {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        };
      }
    } catch {}
    return config;
  },
  error => {
    logger(error);

    Promise.reject(error);
  }
);

export default weedstrueAPI;
