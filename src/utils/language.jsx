
export const getLanguage = () => {
  if (typeof window !== "undefined") {
    return localStorage.getItem('preferred-language');
  }
  return null;
};