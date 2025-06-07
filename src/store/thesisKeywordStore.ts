import { ThesisKeywordFilter } from '@/commons/types/thesis-keyword/thesis-keyword-filter-data.type';
import { create } from 'zustand';

type ThesisKeywordStore = {
  thesiskeywordId: string | null;
  currentPage: number;
  sortBy: string | null;
  pageSize: number;
  sortOrder: string;
  filters: ThesisKeywordFilter;
  search: string | null;
  totalRecords: number;
  totalPages: number;
  setPage: (page: number) => void;
  setPageSize: (size: number) => void;
  setSearch: (searchValue: string) => void;
  setSortData: (sort: string) => void;
  setThesisKeywordId: (id: string) => void;
  setFilters: (filters: ThesisKeywordFilter) => void;
};

export const useThesisKeywordStore = create<ThesisKeywordStore>((set) => ({
  currentPage: 1,
  pageSize: 10,
  filters: {} as ThesisKeywordFilter,
  totalRecords: 0,
  totalPages: 0,
  sortBy: null,
  sortOrder: 'asc',
  thesiskeywordId: null,
  search: null,
  setPage: (page) => set({ currentPage: page }),
  setPageSize: (size) => set({ pageSize: size, currentPage: 1 }),
  setSearch: (searchValue) => set({ search: searchValue }),
  setSortData: (column) =>
    set((state) => ({
      sortBy: column,
      sortOrder:
        state.sortBy === column && state.sortOrder === 'desc' ? 'asc' : 'desc',
    })),
  setThesisKeywordId: (id) => set({ thesiskeywordId: id }),
  setFilters: (newFilters) => set({ filters: newFilters }),
}));
