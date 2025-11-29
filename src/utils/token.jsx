import { configs } from "../lib/configs";

export const getToken = () => {
  if (typeof window !== "undefined") {
    return localStorage.getItem(configs.localstorageTokenName);
  }
  return null;
};
