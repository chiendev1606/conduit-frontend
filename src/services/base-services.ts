import { AxiosRequestConfig } from 'axios';
import axiosClient from './axios-client';

export abstract class BaseServices {
  protected endpoint: string;

  protected constructor(endpoint: string = '') {
    this.endpoint = endpoint;
  }

  get = async <T>(path: string, params?: any, config?: AxiosRequestConfig) => {
    const response = await axiosClient.get<T>(`${this.endpoint}${path}`, {
      params,
      ...config,
    });
    return response.data;
  };

  post = async <T>(path: string, data?: any, config?: AxiosRequestConfig) => {
    const response = await axiosClient.post<T>(`${this.endpoint}${path}`, data, config);
    return response.data;
  };

  put = async <T>(path: string, data?: any, config?: AxiosRequestConfig) => {
    const response = await axiosClient.put<T>(`${this.endpoint}${path}`, data, config);
    return response.data;
  };

  patch = async <T>(path: string, data?: any, config?: AxiosRequestConfig) => {
    const response = await axiosClient.patch<T>(`${this.endpoint}${path}`, data, config);
    return response.data;
  };

  delete = async <T>(path: string, config?: AxiosRequestConfig) => {
    const response = await axiosClient.delete<T>(`${this.endpoint}${path}`, config);
    return response.data;
  };
}

export default BaseServices;
