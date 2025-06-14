import { ILecturer } from '@/commons/interface-model/lecturer-entity.interface';
import { CreateLecturerSchema } from '@/commons/schema/create-lecturer.schema';
import { UpdateLecturerSchema } from '@/commons/schema/update-lecturer.schema';
import { LecturerPaginationResponse } from '@/commons/types/lecturer/lecturer-fetch-api.type';
import {
  createLecturer,
  deleteLecturer,
  fetchLecturerDetail,
  fetchLecturerPagination,
  importEcxelLecturer,
  updateLecturer,
} from '@/services/lecturerService';
import { useLecturerStore } from '@/store/lecturerStore';
import { useMutation, useQuery } from '@tanstack/react-query';
import { UseBaseMutationHandler } from './useBaseMutationHandler';

export const useLecturerPagination = () => {
  const { currentPage, pageSize, filters, search, sortOrder, sortBy } =
    useLecturerStore();

  return useQuery({
    queryKey: [
      'lecturers',
      currentPage,
      pageSize,
      filters,
      search,
      sortBy,
      sortOrder,
    ],
    queryFn: async (): Promise<LecturerPaginationResponse> => {
      return await fetchLecturerPagination(
        currentPage,
        pageSize,
        filters,
        search as string,
        sortBy as string,
        sortOrder as 'asc',
      );
    },
    staleTime: 5 * 60 * 1000,
  });
};

export const useLecturerCreate = () => {
  const {
    handleMutate,
    queryClient,
    handleError,
    handleSuccess,
    handleSettled,
  } = UseBaseMutationHandler();

  return useMutation({
    mutationFn: (lecturer: CreateLecturerSchema) => createLecturer(lecturer),

    onMutate: handleMutate,

    onSuccess: (newLecturer) => {
      queryClient.invalidateQueries({
        queryKey: ['lecturer-detail', newLecturer.data.id],
      });
      queryClient.invalidateQueries({ queryKey: ['lecturers'] });
      queryClient.invalidateQueries({ queryKey: ['statistics'] });
      handleSuccess(
        'Data Dosen Pembimbing berhasil ditambahkan.',
        '/lecturers',
      );
    },

    onError: (error: any) => {
      if (
        error.code == 'ERR_BAD_REQUEST' &&
        error.response.data.message == 'Lecturer data already exist.'
      ) {
        handleError(error, 'Gagal! Data Dosen Pembimbing ini sudah ada.');
      } else {
        handleError(error, `Gagal!, ${error}`);
      }
    },

    onSettled: handleSettled,
  });
};

export const useLecturerDetail = () => {
  const { lecturerId } = useLecturerStore();

  return useQuery({
    queryKey: ['lecturer-detail', lecturerId],
    queryFn: async () => {
      const data = await fetchLecturerDetail(lecturerId as string);
      return data;
    },
    enabled: !!lecturerId,
    staleTime: 5 * 60 * 1000,
  });
};

export const useLecturerUpdate = () => {
  const {
    handleMutate,
    queryClient,
    handleError,
    handleSuccess,
    handleSettled,
  } = UseBaseMutationHandler();

  return useMutation<
    ILecturer,
    Error,
    { id: string; data: UpdateLecturerSchema }
  >({
    mutationFn: async ({ data, id }) => {
      const response = await updateLecturer({ payload: data, id });
      return response.data;
    },

    onMutate: handleMutate,

    onSuccess: (newLecturer) => {
      queryClient.invalidateQueries({
        queryKey: ['lecturer-detail', newLecturer.id],
      });
      queryClient.invalidateQueries({ queryKey: ['lecturers'] });
      handleSuccess('Data dosen pembimbing berhasil diperbarui.', '/lecturers');
    },

    onError: (error: any) => {
      console.error(error);
      if (error) {
        handleError(error, 'Gagal memperbarui data dosen pembimbing!.');
      } else {
        handleError(error, `Gagal!, ${error}`);
      }
    },

    onSettled: handleSettled,
  });
};

export const useLecturerDelete = () => {
  const {
    handleMutate,
    queryClient,
    handleError,
    handleSuccess,
    handleSettled,
  } = UseBaseMutationHandler();
  return useMutation({
    mutationFn: (ids: string[]) => deleteLecturer(ids),

    onMutate: handleMutate,

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['lecturers'] });
      queryClient.invalidateQueries({ queryKey: ['statistics'] });
      handleSuccess('Data Dosen Pembimbing berhasil dihapus.', '/lecturers');
    },

    onError: (error: any) => {
      handleError(error, 'Gagal menghapus data Dosen Pembimbing.');
    },

    onSettled: handleSettled,
  });
};

export const useLecturerImportExcel = () => {
  const {
    handleMutate,
    queryClient,
    handleError,
    handleSuccess,
    handleSettled,
  } = UseBaseMutationHandler();

  return useMutation({
    mutationFn: (file: File) => importEcxelLecturer(file),

    onMutate: handleMutate,

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['lecturers'] });
      queryClient.invalidateQueries({ queryKey: ['statistics'] });
      handleSuccess(
        'Data Dosen Pembimbing berhasil ditambahkan.',
        '/lecturers',
      );
    },

    onError: (error: any) => {
      if (
        error.code == 'ERR_BAD_RESPONSE' &&
        error.response.data.message == 'Missing data in Excel.'
      ) {
        handleError(error, 'Gagal! Data Excel tidak ada.');
      } else {
        handleError(error, 'Gagal! Error pada file excel.');
      }
    },

    onSettled: handleSettled,
  });
};
