import axios, { AxiosRequestConfig } from 'axios';
import { IUserAuthRequest } from '../Types/userTypes/Users';

axios.interceptors.request.use((config: AxiosRequestConfig) => {
  config.headers!.Authorization = `Bearer ${localStorage.getItem('token')}`;
  return config;
});

function loginAPI(
  login: string,
  password: string,
  country: string
): Promise<IUserAuthRequest> {
  return axios.post(
    '/api/identity/login',
    { login, password, language: country },
    { withCredentials: true }
  );
}

const userAPI = { loginAPI };

export default userAPI;
