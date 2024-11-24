import apiClient from './apiClient';

export interface ParamsLogin {
  username: string;
  password: string;
}

const registerApi = {
  register(params: ParamsLogin) {
    const url = `/create-user-account/`;
    return apiClient.post(url, params);
  },
};

export default registerApi;
