import axios, { AxiosRequestConfig } from 'axios';
import {
  IConfiguration,
  IFilter,
  ISearchingResults,
} from '../Types/TableTypes/TableTypes';

axios.interceptors.request.use((config: AxiosRequestConfig) => {
  config.headers!.Authorization = `Bearer ${localStorage.getItem('token')}`;
  return config;
});

function fetchConfiguration(): Promise<IConfiguration[]> {
  return axios.get('/api/appConfiguration', {
    withCredentials: true,
  });
}

function fetchSearchResult(name: string): Promise<ISearchingResults> {
  const data = {
    filter: {},
    sort: {},
  };
  return axios.post(`/api/${name}/search`, data, {
    withCredentials: true,
  });
}

function fetchSelectorData(name: string, field: string): Promise<IFilter> {
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

function fetchById(name: string, id: string): Promise<any> {
  return axios.get(`/api/${name}/getById/${id}`, { withCredentials: true });
}

function fetchPopupData(
  name: string,
  config: { filter: any }
): Promise<IFilter> {
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
