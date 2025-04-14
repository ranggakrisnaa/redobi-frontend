import { IStudent } from '@/commons/interface-model/student.interface.ts';
import { CreateStudentSchema } from '@/commons/schema/create-student.schema.ts';
import { StudentPaginationResponse } from '@/commons/types/student/student-fetch-api.type.ts';
import { useToast } from '@/hooks/use-toast.ts';
import {
  createStudent,
  fetchStudentDetail,
  fetchStudentsPagination,
} from '@/services/studentService.ts';
import { useGlobalStore } from '@/store/globalStore.ts';
import { useStudentStore } from '@/store/studentStore.ts';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

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
    staleTime: 0,
  });
};

export const useStudentDetail = () => {
  const { studentId, setStudentDetail } = useStudentStore();

  return useQuery({
    queryKey: ['student-detail', studentId],
    queryFn: async () => {
      const data = await fetchStudentDetail(studentId as string);
      setStudentDetail(data as unknown as IStudent);
      return data;
    },
    enabled: !!studentId,
    staleTime: 0,
  });
};

export const useStudentCreate = () => {
  const { setLoading, setError } = useGlobalStore();
  const navigate = useNavigate();
  const { toast } = useToast();
  return useMutation({
    mutationFn: (data: CreateStudentSchema) => createStudent(data),

    onMutate: () => {
      setLoading(true);
      setError(null);
    },

    onSuccess: () => {
      toast({
        title: 'Berhasil!',
        description: 'Data mahasiswa berhasil ditambahkan.',
      });

      navigate('/students');
    },

    onError: (error: any) => {
      console.error(error);
      if (
        error.code == 'ERR_BAD_REQUEST' &&
        error.response.data.message == 'Student data already exist.'
      ) {
        setError('Gagal! Data mahasiswa ini sudah ada.');
      } else {
        setError(`Gagal!, ${error}`);
      }
    },

    onSettled: () => {
      setLoading(false);
    },
  });
};

export const useStudentUpdate = () => {};

export const useStudentDelete = () => {};
