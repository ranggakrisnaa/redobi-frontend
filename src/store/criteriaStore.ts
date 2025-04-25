import { ICriteria } from '@/commons/interface-model/criteria.interface';
import { CriteriaFilter } from '@/commons/types/criteria/criteria-filter-data.type';
import { create } from 'zustand';

type CriteriaStore = {
  criteriaData: ICriteria[];
  criteriaDetail: ICriteria | null;
  criteriaId: number | null;
  currentPage: number;
  pageSize: number;
  sortBy: string | null;
  search: string | null;
  sortOrder: string;
  filters: CriteriaFilter;
  totalRecords: number;
  totalPages: number;
  setCriteriaData: (data: Record<any, any>) => void;
  setPage: (page: number) => void;
  setPageSize: (size: number) => void;
  setFilters: (filters: CriteriaFilter) => void;
  setSearch: (searchValue: string) => void;
  setSortData: (sort: string) => void;
  setCriteriaId: (id: number) => void;
  setCriteriaDetail: (data: ICriteria) => void;
};

export const useCriteriaStore = create<CriteriaStore>((set) => ({
  criteriaData: [],
  currentPage: 1,
  pageSize: 10,
  totalRecords: 0,
  filters: {} as CriteriaFilter,
  totalPages: 0,
  search: null,
  sortBy: null,
  sortOrder: 'asc',
  criteriaId: null,
  criteriaDetail: null,

  setCriteriaData: ({ data, pagination }) =>
    set({
      criteriaData: data,
      totalRecords: pagination.totalRecords,
      totalPages: pagination.totalPages,
    }),

  setPage: (page) => set({ currentPage: page }),
  setPageSize: (size) => set({ pageSize: size, currentPage: 1 }),
  setFilters: (newFilters) => set({ filters: { ...newFilters } }),
  setSearch: (searchValue) => set({ search: searchValue }),
  setSortData: (column) =>
    set((state) => ({
      sortBy: column,
      sortOrder:
        state.sortBy === column && state.sortOrder === 'desc' ? 'asc' : 'desc',
    })),
  setCriteriaId: (id: number) => set({ criteriaId: id }),
  setCriteriaDetail: (data: ICriteria) => set({ criteriaDetail: data }),
}));
