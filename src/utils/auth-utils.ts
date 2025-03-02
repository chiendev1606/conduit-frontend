const localStorageKey = 'auth';

export const setAuthToken = (accessToken: string) => {
  localStorage.setItem(localStorageKey, accessToken);
};

export const getAuthToken = () => {
  return localStorage.getItem(localStorageKey);
};

export const removeAuthToken = () => {
  localStorage.removeItem(localStorageKey);
};
