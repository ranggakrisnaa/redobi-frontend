import { ILecturer } from '@/commons/interface-model/lecturer.interface';
import { LecturerFilter } from '@/commons/types/lecturer/lecturer-filter-data.type';
import { create } from 'zustand';

type LecturerStore = {
  lecturerData: ILecturer[];
  lecturerDetail: ILecturer | null;
  lecturerId: string | null;
  currentPage: number;
  pageSize: number;
  sortBy: string | null;
  search: string | null;
  sortOrder: string;
  filters: LecturerFilter;
  totalRecords: number;
  totalPages: number;
  photoFile?: File;
  photoPreview?: string;
  setLecturerData: (data: Record<any, any>) => void;
  setPage: (page: number) => void;
  setPageSize: (size: number) => void;
  setFilters: (filters: LecturerFilter) => void;
  setSearch: (searchValue: string) => void;
  setSortData: (sort: string) => void;
  setLecturerId: (id: string) => void;
  setLecturerDetail: (data: ILecturer) => void;
  setPhoto: (file: File | undefined) => void;
};

export const useLecturerStore = create<LecturerStore>((set) => ({
  lecturerData: [],
  currentPage: 1,
  pageSize: 10,
  totalRecords: 0,
  filters: {} as LecturerFilter,
  totalPages: 0,
  search: null,
  sortBy: null,
  sortOrder: 'asc',
  lecturerId: null,
  lecturerDetail: null,
  imagePreview: undefined,
  photoPreview: undefined,
  photoFile: undefined,

  setLecturerData: ({ data, pagination }) =>
    set({
      lecturerData: data,
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
  setLecturerId: (id: string) => set({ lecturerId: id }),
  setLecturerDetail: (data: ILecturer) => set({ lecturerDetail: data }),
  setPhoto: (file: File | undefined) => {
    set(() => ({
      photoFile: file,
      photoPreview: file ? URL.createObjectURL(file) : '',
    }));
  },
}));
