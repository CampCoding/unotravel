import axios from "axios";
import { configs } from "../configs";
import { base_url } from "../constants";

const token = localStorage.getItem(configs.localstorageTokenName);

const apiInstance = axios.create({
  baseURL: base_url,
  headers: {
    "Content-Type": "application/json",
    "all-langs":false,
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  },
});

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
