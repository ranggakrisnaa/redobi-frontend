import { create } from 'zustand';

type RecommendationStore = {
  totalRecords: number;
  totalPages: number;
  currentPage: number;
  pageSize: number;
  setPage: (page: number) => void;
  setPageSize: (size: number) => void;
};

export const useRecommendationStore = create<RecommendationStore>((set) => ({
  currentPage: 1,
  pageSize: 10,
  totalRecords: 0,
  totalPages: 0,
  setPage: (page) => set({ currentPage: page }),
  setPageSize: (size) => set({ pageSize: size, currentPage: 1 }),
}));
