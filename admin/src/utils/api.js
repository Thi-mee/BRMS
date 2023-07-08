import axios from "axios";

export const getAxiosInstance = (baseUrl) => {
  const instance = axios.create({
    baseURL: baseUrl,
    timeout: 10000,
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    }
  });
  return instance;
}

export const apiCall = async (api, endpoint, method, data) => {
  try {
    const token = localStorage.getItem("brms-token");
    const headers = {};
    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }
    const response = await api.request({
      url: endpoint,
      method,
      data,
      headers,
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || error.message);
    }
    throw new Error(error);
  }
};