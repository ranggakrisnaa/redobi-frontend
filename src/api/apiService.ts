import axios, {
  AxiosInstance,
  AxiosRequestHeaders,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from 'axios';

const apiClient: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
  withCredentials: true,
});

apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
    const token = localStorage.getItem('auth_token');
    if (token) {
      config.headers = {
        ...config.headers,
        Authorization: `Bearer ${token}`,
      } as AxiosRequestHeaders;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

apiClient.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error) => {
    const { response } = error;

    if (response) {
      switch (response.status) {
        case 401:
          localStorage.removeItem('auth_token');
          break;
        case 500:
          console.error('Server error occurred:', error);
          break;
      }
    }

    return Promise.reject(error);
  },
);

const apiService = {
  get: <T>(
    endpoint: string,
    params?: Record<string, any>,
  ): Promise<AxiosResponse<T>> => {
    return apiClient.get<T>(endpoint, { params });
  },

  post: <T>(
    endpoint: string,
    data?: Record<string, any>,
  ): Promise<AxiosResponse<T>> => {
    return apiClient.post<T>(endpoint, data);
  },

  put: <T>(
    endpoint: string,
    data?: Record<string, any>,
  ): Promise<AxiosResponse<T>> => {
    return apiClient.put<T>(endpoint, data);
  },

  patch: <T>(
    endpoint: string,
    data?: Record<string, any>,
  ): Promise<AxiosResponse<T>> => {
    return apiClient.patch<T>(endpoint, data);
  },

  delete: <T>(endpoint: string): Promise<AxiosResponse<T>> => {
    return apiClient.delete<T>(endpoint);
  },
};

export default apiService;
