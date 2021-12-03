import axios, { AxiosRequestConfig } from 'axios'; // AxiosResponse, //, // AxiosInstance, // AxiosError,

axios.interceptors.request.use((config: AxiosRequestConfig) => {
  config.headers!.Authorization = `Bearer ${localStorage.getItem('token')}`;
  return config;
});

function loginAPI(login: string, password: string, country: string) {
  return axios.post(
    '/api/identity/login',
    { login, password, language: country },
    { withCredentials: true }
  );
}

const userAPI = { loginAPI };

export default userAPI;
