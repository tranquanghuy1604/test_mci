import { useMutation, useQuery } from '@tanstack/react-query';
import apiClient from './apiClient';

const createApi = {
  async createStatus(title: string) {
    const url = `/customer-status/`;
    return await apiClient.post(url, title);
  },
  async getStatusList() {
    const url = `/customer-status/`;
    return await apiClient.get(url);
  },
  async createSource(title: string) {
    const url = `/customer-source/`;
    return await apiClient.post(url, title);
  },
  async getListSource() {
    const url = `/customer-source/`;
    return await apiClient.get(url);
  },
  async createSocialMedia(title: string) {
    const url = `/customer-social/`;
    return await apiClient.post(url, title);
  },
  async getListSocialMedia() {
    const url = `/customer-social/`;
    return await apiClient.get(url);
  },

  async createUser(params: any) {
    const url = `/customers/`;
    return await apiClient.post(url, params);
  },

  async getListCustomer() {
    const url = `/customers/`;
    return await apiClient.get(url);
  },
};

export const useCreateStatus = () => {
  return useMutation({ mutationFn: (title: string) => createApi.createStatus(title) });
};

export const useGetListStatus = () => {
  return useQuery({
    queryKey: ['list-status'],
    queryFn: async () => await createApi.getStatusList(),
  });
};

export const useCreateSocialMedia = () => {
  return useMutation({ mutationFn: (title: string) => createApi.createSocialMedia(title) });
};

export const useGetListSocialMedia = () => {
  return useQuery({
    queryKey: ['list-social'],
    queryFn: async () => await createApi.getListSocialMedia(),
  });
};

export const useCreateSource = () => {
  return useMutation({ mutationFn: (title: string) => createApi.createSource(title) });
};

export const useGetListSource = () => {
  return useQuery({
    queryKey: ['list-source'],
    queryFn: async () => await createApi.getListSource(),
  });
};

export const useCreateUser = () => {
  return useMutation({ mutationFn: (params: any) => createApi.createUser(params) });
};

export const useGetListCustomer = () => {
  return useQuery({
    queryKey: ['list-customer'],
    queryFn: async () => await createApi.getListCustomer(),
  });
};

export default createApi;
