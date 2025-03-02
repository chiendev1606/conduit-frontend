import { appConfig } from '@/app-config';
import { getAuthToken } from '@/utils/auth-utils';
import axios from 'axios';

const axiosClient = axios.create({
  baseURL: appConfig.apiUrl,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${getAuthToken()}`,
  },
});

export default axiosClient;
