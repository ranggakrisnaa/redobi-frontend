import { create } from 'zustand';

type AsessmentStore = {
  assessmentId: string | null;
  currentPage: number;
  sortBy: string | null;
  pageSize: number;
  sortOrder: string;
  search: string | null;
  totalRecords: number;
  totalPages: number;
  selectedCriteria: string[];
  setPage: (page: number) => void;
  setPageSize: (size: number) => void;
  setSearch: (searchValue: string) => void;
  setSortData: (sort: string) => void;
  setAsessmentId: (id: string) => void;
  setSelectedCriteria: (criteria: string | string[]) => void;
  resetSelectedCriteria: () => void;
};

export const useAssessmentStore = create<AsessmentStore>((set) => ({
  assessmentData: [],
  currentPage: 1,
  totalRecords: 0,
  totalPages: 0,
  sortBy: null,
  sortOrder: 'asc',
  assessmentId: null,
  pageSize: 10,
  search: null,
  selectedCriteria: [],

  setPage: (page) => set({ currentPage: page }),
  setPageSize: (size) => set({ pageSize: size, currentPage: 1 }),
  setSearch: (searchValue) => set({ search: searchValue }),
  setSortData: (column) =>
    set((state) => ({
      sortBy: column,
      sortOrder:
        state.sortBy == column && state.sortOrder == 'desc' ? 'asc' : 'desc',
    })),
  setAsessmentId: (id) => set({ assessmentId: id }),
  setSelectedCriteria: (criteria: string | string[]) =>
    set((state) => ({
      selectedCriteria: Array.isArray(criteria)
        ? criteria
        : [...state.selectedCriteria, criteria],
    })),
  resetSelectedCriteria: () => set({ selectedCriteria: [] }),
}));
