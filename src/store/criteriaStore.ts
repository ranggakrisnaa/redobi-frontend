import { ISubCriteria } from '@/commons/interface-model/sub-criteria-entity.entity';
import { CriteriaFilter } from '@/commons/types/criteria/criteria-filter-data.type';
import { create } from 'zustand';

type CriteriaStore = {
  criteriaId: number | null;
  currentPage: number;
  pageSize: number;
  sortBy: string | null;
  search: string | null;
  sortOrder: string;
  filters: CriteriaFilter;
  totalRecords: number;
  totalPages: number;
  subCriteriaData: ISubCriteria[] | null;
  setPage: (page: number) => void;
  setPageSize: (size: number) => void;
  setFilters: (filters: CriteriaFilter) => void;
  setSearch: (searchValue: string) => void;
  setSortData: (sort: string) => void;
  setCriteriaId: (id: number) => void;
  setSubCriteriaData: (data: ISubCriteria[]) => void;
};

export const useCriteriaStore = create<CriteriaStore>((set) => ({
  currentPage: 1,
  pageSize: 10,
  totalRecords: 0,
  subCriteriaData: null,
  filters: {} as CriteriaFilter,
  totalPages: 0,
  search: null,
  sortBy: null,
  sortOrder: 'asc',
  criteriaId: null,

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
  setCriteriaId: (id) => set({ criteriaId: id }),
  setSubCriteriaData: (data) => set({ subCriteriaData: data }),
}));
