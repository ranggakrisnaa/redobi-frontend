import { create } from 'zustand';

type GlobalState = {
  loading: boolean;
  error: string | null;
  scrollY: number;
  selected: string[] | number[];
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  setScrollY: (y: number) => void;
  setSelected: (selected: string[]) => void;
};

export const useGlobalStore = create<GlobalState>((set) => ({
  loading: false,
  error: null,
  scrollY: 0,
  selected: [],
  setLoading: (loading) => set({ loading }),
  setError: (error) => set({ error }),
  setScrollY: (y: number) => set({ scrollY: y }),
  setSelected: (selected) => set({ selected }),
}));
