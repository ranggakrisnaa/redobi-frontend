import { StudentFilter } from '@/commons/types/student/student-filter-data.type.ts';
import { create } from 'zustand';

type StudentStore = {
  studentId: string | null;
  currentPage: number;
  pageSize: number;
  sortBy: string | null;
  search: string | null;
  sortOrder: string;
  filters: StudentFilter;
  totalRecords: number;
  totalPages: number;
  photoFile?: File;
  photoPreview?: string;
  setPage: (page: number) => void;
  setPageSize: (size: number) => void;
  setFilters: (filters: StudentFilter) => void;
  setSearch: (searchValue: string) => void;
  setSortData: (sort: string) => void;
  setStudentId: (id: string) => void;
  setPhoto: (file: File | undefined) => void;
};

export const useStudentStore = create<StudentStore>((set) => ({
  currentPage: 1,
  pageSize: 10,
  totalRecords: 0,
  filters: {} as StudentFilter,
  totalPages: 0,
  search: null,
  sortBy: null,
  sortOrder: 'asc',
  studentId: null,
  studentDetail: null,
  imagePreview: undefined,
  photoPreview: undefined,
  photoFile: undefined,

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
  setStudentId: (id) => set({ studentId: id }),
  setPhoto: (file) => {
    set(() => ({
      photoFile: file,
      photoPreview: file ? URL.createObjectURL(file) : '',
    }));
  },
}));
