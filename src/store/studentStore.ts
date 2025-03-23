import { IStudent } from '@/commons/interface-model/student.interface.ts';
import { StudentFilter } from '@/commons/types/student/student-filter-data.type.ts';
import { create } from 'zustand';

type StudentStore = {
  studentData: IStudent[];
  currentPage: number;
  pageSize: number;
  filters: StudentFilter;
  totalRecords: number;
  totalPages: number;
  setStudentData: (data: Record<string, any>) => void;
  setPage: (page: number) => void;
  setPageSize: (size: number) => void;
  setFilters: (filters: StudentFilter) => void;
};

export const useStudentStore = create<StudentStore>((set) => ({
  studentData: [],
  currentPage: 1,
  pageSize: 10,
  totalRecords: 0,
  filters: {} as StudentFilter,
  totalPages: 0,

  setStudentData: ({ data, pagination }) =>
    set({
      studentData: data,
      totalRecords: pagination.totalRecords,
      totalPages: pagination.totalPages,
    }),

  setPage: (page) => set({ currentPage: page }),
  setPageSize: (size) => set({ pageSize: size, currentPage: 1 }),
  setFilters: (newFilters) => set({ filters: { ...newFilters } }),
}));
