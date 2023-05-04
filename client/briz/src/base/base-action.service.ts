import type { AxiosRequestConfig, AxiosResponse } from 'axios';
import axios from 'axios';
import { correspondingAPI } from '@/base/corresponding-api.service';

const { message } = correspondingAPI();

class BaseActionService {
  async request<T>(
    config: AxiosRequestConfig,
    successMsg?: string,
    errorMsg?: string
  ): Promise<T> {
    try {
      const response: AxiosResponse<T> = await axios.request<T>(config);
      if (successMsg) {
        message.success(successMsg);
      }
      return response.data;
    } catch (error) {
      message.error(errorMsg ?? 'Возникла непредвиденная ошибка');
      throw error;
    }
  }

  get<T>(
    url: string,
    config?: AxiosRequestConfig,
    successMsg?: string,
    errorMsg?: string
  ): Promise<T> {
    const requestConfig: AxiosRequestConfig = { url, method: 'get', ...config };
    return this.request<T>(requestConfig, successMsg, errorMsg);
  }

  post<T, D>(
    url: string,
    data?: D,
    config?: AxiosRequestConfig,
    successMsg?: string,
    errorMsg?: string
  ): Promise<T> {
    const requestConfig: AxiosRequestConfig = {
      url,
      method: 'post',
      data,
      ...config,
    };
    return this.request<T>(requestConfig, successMsg, errorMsg);
  }

  put<T, D>(
    url: string,
    data?: D,
    config?: AxiosRequestConfig,
    successMsg?: string,
    errorMsg?: string
  ): Promise<T> {
    const requestConfig: AxiosRequestConfig = {
      url,
      method: 'put',
      data,
      ...config,
    };
    return this.request<T>(requestConfig, successMsg, errorMsg);
  }

  delete<T>(
    url: string,
    config?: AxiosRequestConfig,
    successMsg?: string,
    errorMsg?: string
  ): Promise<T> {
    const requestConfig: AxiosRequestConfig = {
      url,
      method: 'delete',
      ...config,
    };
    return this.request<T>(requestConfig, successMsg, errorMsg);
  }
}

export default new BaseActionService();
