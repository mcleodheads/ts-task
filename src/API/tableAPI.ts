import axios, { AxiosRequestConfig } from 'axios';

axios.interceptors.request.use((config: AxiosRequestConfig) => {
  config.headers!.Authorization = `Bearer ${localStorage.getItem('token')}`;
  return config;
});

function fetchConfiguration() {
  return axios.get('/api/appConfiguration', {
    withCredentials: true,
  });
}

function fetchSearchResult(name: string) {
  const data = {
    filter: {},
    sort: {},
  };
  return axios.post(`/api/${name}/search`, data, {
    withCredentials: true,
  });
}

function fetchSelectorData(name: string, field: string) {
  const config = {
    filter: {},
    skip: 0,
    take: 0,
    sort: {},
  };
  return axios.post(`/api/${name}/forSelect/${field}`, config, {
    withCredentials: true,
  });
}

function fetchById(name: string, id: string) {
  return axios.get(`/api/${name}/getById/${id}`, { withCredentials: true });
}

function fetchPopupData(name: string, config: { filter: any }) {
  return axios.post(`/api/${name}/ids`, config, { withCredentials: true });
}

const tableAPI = {
  fetchConfiguration,
  fetchSearchResult,
  fetchSelectorData,
  fetchById,
  fetchPopupData,
};

export default tableAPI;
