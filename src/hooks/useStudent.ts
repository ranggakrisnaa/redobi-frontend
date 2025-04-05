import { StudentPaginationResponse } from '@/commons/types/student/student-fetch-api.type.ts';
import { fetchStudentsPagination } from '@/services/studentService.ts';
import { useStudentStore } from '@/store/studentStore.ts';
import { keepPreviousData, useQuery } from '@tanstack/react-query';

export const useStudentsPagination = () => {
  const {
    currentPage,
    pageSize,
    setStudentData,
    filters,
    search,
    sortOrder,
    sortBy,
  } = useStudentStore();

  return useQuery({
    queryKey: [
      'students',
      currentPage,
      pageSize,
      filters,
      search,
      sortBy,
      sortOrder,
    ],
    queryFn: async (): Promise<StudentPaginationResponse> => {
      const data = await fetchStudentsPagination(
        currentPage,
        pageSize,
        filters,
        search as string,
        sortBy as string,
        sortOrder as 'asc',
      );
      setStudentData(data);
      return data;
    },
    placeholderData: keepPreviousData,
    staleTime: 0,
  });
};
