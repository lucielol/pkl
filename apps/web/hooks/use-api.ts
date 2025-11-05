import api from "@/lib/axios";
import { AxiosRequestConfig, AxiosResponse } from "axios";

export function useApi(url?: string) {
  const fetcher = async <T>(
    endpoint: string,
    options: AxiosRequestConfig = {}
  ): Promise<T> => {
    const config: AxiosRequestConfig = {
      ...options,
      url: endpoint,
    };

    if (url) {
      config.baseURL = url;
    }

    try {
      const response: AxiosResponse<T> = await api.request<T>(config);
      return response.data;
    } catch (error: any) {
      console.error("API Error:", error.response?.data || error.message);
      throw error;
    }
  };

  return { fetcher };
}
