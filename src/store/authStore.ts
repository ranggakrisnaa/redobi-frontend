import { getStoredUser } from '@/utils/storageUtil.ts';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

type User = {
  email: string;
  id: string;
  timestamp?: number;
};

type AuthState = {
  user: User | null;
  token: string | null;
  rememberMe: boolean;
  login: (user: User, rememberMe: boolean) => void;
  setToken: (value: string, rememberMe: boolean) => void;
  logout: () => void;
  setRememberMe: (value: boolean) => void;
  checkSession: () => void;
};

const TEN_MINUTES = 60 * 60 * 1000;

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      rememberMe: false,

      login: (user, rememberMe) => {
        const timestamp = Date.now();
        const userData = { ...user, timestamp };
        set({ user: userData, rememberMe });

        const storage = rememberMe ? localStorage : sessionStorage;
        storage.setItem('auth-data', JSON.stringify({ ...userData }));
      },

      setToken: (value, rememberMe) => {
        set({ token: value });
        const storage = rememberMe ? localStorage : sessionStorage;
        storage.setItem('auth-token', value);
      },

      logout: () => {
        set({ user: null, rememberMe: false });
        localStorage.removeItem('auth-user');
        localStorage.removeItem('auth-storage');
        sessionStorage.removeItem('auth-user');
      },

      setRememberMe: (value) => {
        set({ rememberMe: value });
      },

      checkSession: () => {
        const storedData = getStoredUser();
        if (storedData) {
          const { timestamp } = storedData;

          if (Date.now() - timestamp > TEN_MINUTES) {
            set({ user: null, token: null, rememberMe: false });

            localStorage.removeItem('auth-data');
            sessionStorage.removeItem('auth-data');
            localStorage.removeItem('auth-storage');
            sessionStorage.removeItem('auth-storage');
          }
          return;
        }
      },
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
