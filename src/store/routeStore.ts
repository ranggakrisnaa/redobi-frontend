import { create } from 'zustand';

type RouteStore = {
  previousPath: string | null;
  setPreviousPath: (path: string) => void;
};

export const useRouteStore = create<RouteStore>((set) => ({
  previousPath: null,
  setPreviousPath: (path) => set({ previousPath: path }),
}));
