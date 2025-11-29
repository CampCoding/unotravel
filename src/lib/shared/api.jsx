
// api.js
import axios from "axios";
import { base_url } from "../constants";
import { getToken } from "../../utils/token";
import { getLanguage } from "../../utils/language";

const apiInstance = axios.create({
  baseURL: base_url,
  headers: {
    "Content-Type": "application/json",
    "all-langs": false,
    // "accept-language" : 
  },
});

// Use the utility function in request interceptor
apiInstance.interceptors.request.use(
  (config) => {
    const token = getToken();
    const lang = getLanguage();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
     if (lang) {
      config.headers["accept-language"] = lang;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

const _get = (url, config = {}) => {
  return apiInstance.get(url, config);
};

const _delete = (url, config = {}) => {
  return apiInstance.delete(url, config);
};

const _post = (url, data = {}, config = {}) => {
  return apiInstance.post(url, data, config);
};

const _put = (url, data, config = {}) => {
  return apiInstance.put(url, data, config);
};

export { _get, _post, _delete, _put };