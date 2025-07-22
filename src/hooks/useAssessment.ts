import { IAssessment } from '@/commons/interface-model/assessment-entity.interface';
import { CreateAssessmentSchema } from '@/commons/schema/create-assessment.schema';
import { UpdateAssessmentSchema } from '@/commons/schema/update-assessment.schema';
import { AssessmentPaginationResponse } from '@/commons/types/assessment/assessment-fetch-api.type';
import {
  createAssessment,
  deleteAssessment,
  fecthAssessmentDetail,
  fetchAssessmentPagination,
  updateAssessment,
} from '@/services/assessmentService';
import { useAssessmentStore } from '@/store/assessmentStore';
import { useMutation, useQuery } from '@tanstack/react-query';
import { UseBaseMutationHandler } from './useBaseMutationHandler';

export const useAssessmentPagination = () => {
  const { currentPage, pageSize, search, sortOrder, sortBy } =
    useAssessmentStore();

  return useQuery({
    queryKey: ['assessments', currentPage, pageSize, search, sortOrder, sortBy],
    queryFn: async (): Promise<AssessmentPaginationResponse> => {
      const data = await fetchAssessmentPagination(
        currentPage,
        pageSize,
        search as string,
        sortBy as string,
        sortOrder as 'asc',
      );
      return data;
    },
    staleTime: 5 * 60 * 1000,
  });
};

export const useAssessmentCreate = () => {
  const {
    handleMutate,
    queryClient,
    handleError,
    handleSuccess,
    handleSettled,
  } = UseBaseMutationHandler();

  return useMutation({
    mutationFn: (data: CreateAssessmentSchema) => createAssessment(data),

    onMutate: handleMutate,

    onSuccess: (newAssessment) => {
      queryClient.invalidateQueries({
        queryKey: ['assessment-detail', newAssessment.id],
      });
      queryClient.invalidateQueries({ queryKey: ['assessments'] });
      queryClient.invalidateQueries({
        queryKey: ['lecturers'],
        exact: false,
        refetchType: 'active',
      });
      handleSuccess(
        'Data Penilaian Dosen berhasil ditambahkan.',
        '/assessments',
      );
    },

    onError: (error: any) => {
      if (
        error.code == 'ERR_BAD_REQUEST' &&
        error.response.data.message == 'Assessment data already exist.'
      ) {
        handleError(error, 'Gagal! Data Dosen Pembimbing ini sudah ada.');
      } else {
        handleError(error, `Gagal!, ${error}`);
      }
    },

    onSettled: handleSettled,
  });
};

export const useAssessmentDetail = () => {
  const { assessmentId } = useAssessmentStore();
  return useQuery({
    queryKey: ['assessment-detail', assessmentId],
    queryFn: async () => {
      const data = await fecthAssessmentDetail(assessmentId as string);
      return data;
    },
    enabled: !!assessmentId,
    staleTime: 5 * 60 * 1000,
  });
};

export const useAssessmentUpdate = () => {
  const {
    handleMutate,
    queryClient,
    handleError,
    handleSuccess,
    handleSettled,
  } = UseBaseMutationHandler();

  return useMutation<
    IAssessment,
    Error,
    { id: string; data: UpdateAssessmentSchema }
  >({
    mutationFn: async ({ data, id }) => {
      const response = await updateAssessment({ payload: data, id });
      return response.data;
    },

    onMutate: handleMutate,

    onSuccess: (newAssessment) => {
      queryClient.invalidateQueries({
        queryKey: ['assessment-detail', newAssessment.id],
      });
      queryClient.invalidateQueries({ queryKey: ['assessments'] });
      queryClient.invalidateQueries({ queryKey: ['lecturers'] });
      handleSuccess(
        'Data Penilaian Dosen berhasil diperbarui.',
        '/assessments',
      );
    },

    onError: (error: any) => {
      if (
        error.code == 'ERR_BAD_REQUEST' &&
        error.response.data.message == 'Assessment data already exist.'
      ) {
        handleError(error, 'Gagal! Data Dosen Pembimbing ini sudah ada.');
      } else {
        handleError(error, `Gagal!, ${error}`);
      }
    },

    onSettled: handleSettled,
  });
};

export const useAssessmentDelete = () => {
  const {
    handleMutate,
    queryClient,
    handleError,
    handleSuccess,
    handleSettled,
  } = UseBaseMutationHandler();

  return useMutation({
    mutationFn: async (ids: string[]) => deleteAssessment(ids),

    onMutate: handleMutate,

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['assessments'] });
      queryClient.invalidateQueries({ queryKey: ['lecturers'] });
      handleSuccess('Data Penilaian Dosen berhasil dihapus.', '/assessments');
    },

    onError: (error: any) => {
      handleError(error, `Gagal menghapus data! ${error}`);
    },

    onSettled: handleSettled,
  });
};
