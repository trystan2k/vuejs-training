import axios from "axios";

console.log(process.env.VUE_APP_API_URL)

export const API_URL = process.env.VUE_APP_API_URL;

const axiosInstance = axios.create({
  baseURL: API_URL,
});

axiosInstance.interceptors.request.use(
  function(config) {
    const token = window.localStorage.token;
    if (token) {
      config.headers.Authorization = token;
    }

    return config;
  },
  function(error) {
    return Promise.reject(error);
  }
);

export const api = {
  get(endpoint) {
    return axiosInstance.get(endpoint);
  },
  post(endpoint, body) {
    return axiosInstance.post(endpoint, body);
  },
  delete(endpoint) {
    return axiosInstance.delete(endpoint);
  },
  put(endpoint, body) {
    return axiosInstance.put(endpoint, body);
  },
  createUser(body) {
    return axios.post("http://localhost:1337/auth/local/register", body);
  },
  login(body) {
    return axios.post("http://localhost:1337/auth/local", body);
  },
};

export function getCep(cep) {
  return axios.get(`https://viacep.com.br/ws/${cep}/json`);
}
