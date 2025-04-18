import axios, {
  AxiosInstance,
  AxiosRequestHeaders,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from 'axios';

const apiClient: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    Accept: 'application/json',
  },
  withCredentials: true,
});

apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
    const token =
      localStorage.getItem('auth-token') ||
      sessionStorage.getItem('auth-token');
    if (token) {
      config.headers = {
        ...config.headers,
        Authorization: `Bearer ${token}`,
      } as AxiosRequestHeaders;
    }
    if (config.data instanceof FormData) {
      delete config.headers!['Content-Type'];
    } else {
      config.headers = {
        ...config.headers,
        'Content-Type': 'application/json',
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
          localStorage.removeItem('auth-token');
          localStorage.removeItem('auth-data');
          window.location.href = '/sign-in';
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
    config?: { headers?: Record<string, string> },
  ): Promise<AxiosResponse<T>> =>
    apiClient.get<T>(endpoint, { params, headers: config?.headers }),

  post: <T>(
    endpoint: string,
    data?: any,
    config?: { headers?: Record<string, string> },
  ): Promise<AxiosResponse<T>> =>
    apiClient.post<T>(endpoint, data, { headers: config?.headers }),

  put: <T>(
    endpoint: string,
    data?: any,
    config?: { headers?: Record<string, string> },
  ): Promise<AxiosResponse<T>> =>
    apiClient.put<T>(endpoint, data, { headers: config?.headers }),

  patch: <T>(
    endpoint: string,
    data?: any,
    config?: { headers?: Record<string, string> },
  ): Promise<AxiosResponse<T>> =>
    apiClient.patch<T>(endpoint, data, { headers: config?.headers }),

  delete: <T>(
    endpoint: string,
    data?: any,
    config?: { headers?: Record<string, string> },
  ): Promise<AxiosResponse<T>> =>
    apiClient.delete<T>(endpoint, { data, headers: config?.headers }),
};

export default apiService;
