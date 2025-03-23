import { IStudent } from '@/commons/interface-model/student.interface.ts';
import { fetchStudents } from '@/services/studentService.ts';
import { useStudentStore } from '@/store/studentStore.ts';
import { keepPreviousData, useQuery } from '@tanstack/react-query';

type StudentResponse = {
  data: IStudent[];
  pagination: { totalRecords: number; totalPages: number };
};

export const useStudents = () => {
  const { currentPage, pageSize, setStudentData, filters } = useStudentStore();

  return useQuery({
    queryKey: ['students', currentPage, pageSize, filters],
    queryFn: async (): Promise<StudentResponse> => {
      const data = await fetchStudents(currentPage, pageSize, filters);
      setStudentData(data);
      return data;
    },
    placeholderData: keepPreviousData,
    staleTime: 0,
  });
};
