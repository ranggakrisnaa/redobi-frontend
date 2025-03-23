import apiService from '@/api/apiService.ts';
import { IStudent } from '@/commons/interface-model/student.interface.ts';
import { StudentFilter } from '@/commons/types/student/student-filter-data.type.ts';

export type StudentResponse = {
  data: IStudent[];
  pagination: {
    totalRecords: number;
    totalPages: number;
  };
};

export const fetchStudents = async (
  page = 1,
  limit = 10,
  filters: StudentFilter,
): Promise<StudentResponse> => {
  const params = new URLSearchParams();

  params.append('page', page.toString());
  params.append('limit', limit.toString());

  Object.entries(filters).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      params.append(key, value.toString());
    }
  });

  const response = await apiService.get<StudentResponse>(
    `/students?${params.toString()}`,
  );
  return response.data;
};
