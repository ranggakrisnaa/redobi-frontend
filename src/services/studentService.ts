import apiService from '@/api/apiService.ts';
import { IStudent } from '@/commons/interface-model/student.interface.ts';
import { CreateStudentSchema } from '@/commons/schema/create-student.schema.ts';
import { StudentPaginationResponse } from '@/commons/types/student/student-fetch-api.type.ts';
import { StudentFilter } from '@/commons/types/student/student-filter-data.type.ts';

export const fetchStudentsPagination = async (
  page = 1,
  limit = 10,
  filters: StudentFilter,
  search: string,
  sortBy?: string,
  sortOrder: 'asc' | 'desc' = 'desc',
): Promise<StudentPaginationResponse> => {
  const params = new URLSearchParams();
  params.append('page', page.toString());
  params.append('limit', limit.toString());

  if (search) {
    params.append('search', search);
  }

  Object.entries(filters).forEach(([key, value]) => {
    if (value !== undefined && value !== '') {
      params.append(key, value.toString());
    }
  });

  if (sortBy) {
    params.append('sort', sortBy);
    params.append('order', sortOrder.toUpperCase());
  } else {
    params.append('sort', 'full_name');
    params.append('order', 'ASC');
  }

  const response = await apiService.get<StudentPaginationResponse>(
    `/students?${params.toString()}`,
  );
  return response.data;
};

export const fetchStudentDetail = async (id: string) => {
  const response = await apiService.get<IStudent>(`/students/${id}`);
  return response.data;
};

export const createStudent = async (data: CreateStudentSchema) => {
  const formData = new FormData();

  (Object.keys(data) as (keyof IStudent)[]).forEach((key) => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    const value = data[key];

    if (value !== undefined && value !== null) {
      formData.append(key, value instanceof File ? value : String(value));
    }
  });

  if (data.file instanceof File) {
    formData.append('file', data.file);
  }

  const response = await apiService.post<IStudent>('/students', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  return response.data;
};

export const updateStudent = () => {};

export const deleteStudent = () => {};
