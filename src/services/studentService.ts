import apiService from '@/api/apiService.ts';
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
