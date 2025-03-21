export const getStoredUser = (): {
  email: string;
  id: string;
  timestamp: number;
} | null => {
  const userData =
    localStorage.getItem('auth-data') || sessionStorage.getItem('auth-data');
  return userData ? JSON.parse(userData) : null;
};

export const getStoredToken = (): string | null => {
  const token =
    localStorage.getItem('auth-token') || sessionStorage.getItem('auth-token');
  return token ? token : null;
};
