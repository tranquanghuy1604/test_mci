import { useMutation } from '@tanstack/react-query';
import apiClient from './apiClient';

export interface ParamsLogin {
  username: string;
  password: string;
}

const authApi = {
  async login(params: ParamsLogin) {
    const url = `/user-login/`;
    return await apiClient.post(url, params);
  },
  register(params: ParamsLogin) {
    const url = `/create-user-account/`;
    return apiClient.post(url, params);
  },
};

export const useLogin = () => {
  return useMutation({ mutationFn: (params: ParamsLogin) => authApi.login(params) });
};

export const useRegister = () => {
  return useMutation({ mutationFn: (params: ParamsLogin) => authApi.register(params) });
};

export default authApi;
