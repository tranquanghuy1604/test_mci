import axios, { InternalAxiosRequestConfig, AxiosResponse } from 'axios';
import Cookies from 'universal-cookie';

const apiClient = axios.create({
  baseURL: 'https://dev.thabicare.zenix.com.vn/api/v1',
  headers: {
    'content-type': 'application/json',
  },
});

const cookies = new Cookies();

apiClient.interceptors.request.use(async (config: InternalAxiosRequestConfig) => {
  const jwt = cookies.get('JWT');
  if (config.headers) {
    if (jwt) {
      config.headers['Authorization'] = 'Bearer ' + jwt;
    }
  }
  return config;
});

apiClient.interceptors.response.use(
  (response: AxiosResponse) => {
    if (response && response.data) {
      return response.data;
    }
    return response;
  },
  (error) => {
    if (typeof window === 'undefined') {
      throw error;
    }
    return Promise.reject(error);
  },
);

export default apiClient;
