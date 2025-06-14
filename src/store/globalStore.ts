import { create } from 'zustand';

type GlobalState = {
  loading: boolean;
  error: string | null;
  scrollY: number;
  selected: (string | number)[];
  isSearch: Record<string, string> | null;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  setScrollY: (y: number) => void;
  setSelected: (selected: (string | number)[]) => void;
  setIsSearch: (search: Record<string, string> | null) => void;
};

export const useGlobalStore = create<GlobalState>((set) => ({
  loading: false,
  error: null,
  scrollY: 0,
  isSearch: null,
  selected: [],
  setLoading: (loading) => set({ loading }),
  setError: (error) => set({ error }),
  setScrollY: (y: number) => set({ scrollY: y }),
  setSelected: (selected) => set({ selected }),
  setIsSearch: (search) => set({ isSearch: search }),
}));
