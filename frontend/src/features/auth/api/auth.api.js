import apiClient from '../../../core/api/client';
import { AUTH } from '../../../core/api/endpoints';

export const register = async (payload) => {
  const { data } = await apiClient.post(AUTH.register, payload);
  return data;
};

export const login = async (payload) => {
  const { data } = await apiClient.post(AUTH.login, payload);
  return data;
};

export const logout = async () => {
  const { data } = await apiClient.post(AUTH.logout);
  return data;
};

export const me = async () => {
  const { data } = await apiClient.get(AUTH.me);
  return data;
};

export const refresh = async () => {
  const { data } = await apiClient.post(AUTH.refresh);
  return data;
};

export const forgotPassword = async (payload) => {
  const { data } = await apiClient.post(AUTH.forgotPassword, payload);
  return data;
};

export const resetPassword = async (payload) => {
  const { data } = await apiClient.post(AUTH.resetPassword, payload);
  return data;
};

export const sendVerificationEmail = async () => {
  const { data } = await apiClient.post(AUTH.sendVerificationEmail);
  return data;
};

export const verifyEmail = async (payload) => {
  const { data } = await apiClient.post(AUTH.verifyEmail, payload);
  return data;
};
