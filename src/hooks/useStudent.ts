import { IStudent } from '@/commons/interface-model/student.interface.ts';
import { CreateStudentSchema } from '@/commons/schema/create-student.schema.ts';
import { UpdateStudentSchema } from '@/commons/schema/update-student.schema';
import { StudentPaginationResponse } from '@/commons/types/student/student-fetch-api.type.ts';
import {
  createStudent,
  deleteStudent,
  fetchStudentDetail,
  fetchStudentsPagination,
  importEcxelStudent,
  updateStudent,
} from '@/services/studentService.ts';
import { useStudentStore } from '@/store/studentStore.ts';
import { useMutation, useQuery } from '@tanstack/react-query';
import { UseBaseMutationHandler } from './useBaseMutationHandler';

export const useStudentsPagination = () => {
  const { currentPage, pageSize, filters, search, sortOrder, sortBy } =
    useStudentStore();

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
      return data;
    },
    staleTime: 5 * 60 * 1000,
  });
};

export const useStudentDetail = () => {
  const { studentId } = useStudentStore();

  return useQuery({
    queryKey: ['student-detail', studentId],
    queryFn: async () => {
      const data = await fetchStudentDetail(studentId as string);
      return data;
    },
    enabled: !!studentId,
    staleTime: 5 * 60 * 1000,
  });
};

export const useStudentCreate = () => {
  const {
    handleMutate,
    queryClient,
    handleError,
    handleSuccess,
    handleSettled,
  } = UseBaseMutationHandler();
  return useMutation({
    mutationFn: (data: CreateStudentSchema) => createStudent(data),

    onMutate: handleMutate,

    onSuccess: (newStudent) => {
      queryClient.invalidateQueries({
        queryKey: ['student-detail', newStudent.data.id],
      });
      queryClient.invalidateQueries({ queryKey: ['students'] });
      handleSuccess('Data mahasiswa berhasil ditambahkan.', '/students');
    },

    onError: (error: any) => {
      if (
        error.code == 'ERR_BAD_REQUEST' &&
        error.response.data.message == 'Student data already exist.'
      ) {
        handleError(error, 'Gagal! Data mahasiswa ini sudah ada.');
      } else {
        handleError(error, `Gagal!, ${error}`);
      }
    },

    onSettled: handleSettled,
  });
};

export const useStudentUpdate = () => {
  const {
    handleMutate,
    queryClient,
    handleError,
    handleSuccess,
    handleSettled,
  } = UseBaseMutationHandler();

  return useMutation<
    IStudent,
    Error,
    { id: string; data: UpdateStudentSchema }
  >({
    mutationFn: async ({ data, id }) => {
      const response = await updateStudent({ payload: data, id });
      return response.data;
    },

    onMutate: handleMutate,

    onSuccess: (newStudent) => {
      queryClient.invalidateQueries({
        queryKey: ['student-detail', newStudent.id],
      });
      queryClient.invalidateQueries({ queryKey: ['students'] });
      handleSuccess('Data mahasiswa berhasil diperbarui.', '/students');
    },

    onError: (error: any) => {
      console.error(error);
      if (error) {
        handleError(error, 'Gagal memperbarui data mahasiswa!.');
      } else {
        handleError(error, `Gagal!, ${error}`);
      }
    },

    onSettled: handleSettled,
  });
};

export const useStudentDelete = () => {
  const {
    handleMutate,
    queryClient,
    handleError,
    handleSuccess,
    handleSettled,
  } = UseBaseMutationHandler();

  return useMutation({
    mutationFn: (ids: string[]) => deleteStudent(ids),

    onMutate: handleMutate,

    onError: (error: any) => {
      handleError(error, 'Gagal menghapus data mahasiswa!');
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['students'] });
      handleSuccess('Data mahasiswa berhasil dihapus.', '/students');
    },

    onSettled: handleSettled,
  });
};

export const useStudentImportExcel = () => {
  const {
    handleMutate,
    queryClient,
    handleError,
    handleSuccess,
    handleSettled,
  } = UseBaseMutationHandler();

  return useMutation({
    mutationFn: (file: File) => importEcxelStudent(file),

    onMutate: handleMutate,

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['students'] });
      handleSuccess('Data mahasiswa berhasil ditambahkan.', '/students');
    },

    onError: (error: any) => {
      if (
        error.code == 'ERR_BAD_RESPONSE' &&
        error.response.data.message == 'Missing data in Excel.'
      ) {
        handleError(error, 'Gagal! Data Excel tidak ada.');
      }
    },

    onSettled: handleSettled,
  });
};
