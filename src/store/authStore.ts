import { create } from 'zustand';

type AuthState = {
  rememberMe: boolean;
  userId: string | null;
  setRememberMe: (value: boolean) => void;
  setUserId: (id: string) => void;
};

export const useAuthStore = create<AuthState>((set) => ({
  rememberMe: false,
  userId: null,
  setRememberMe: (value) => set({ rememberMe: value }),
  setUserId: (id) => set({ userId: id }),
}));
