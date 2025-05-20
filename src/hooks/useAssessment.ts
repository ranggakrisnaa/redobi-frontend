import { CreateAssessmentSchema } from '@/commons/schema/create-assessment.schema';
import { AssessmentPaginationResponse } from '@/commons/types/assessment/assessment-fetch-api.type';
import {
  createAssessment,
  fetchAssessmentPagination,
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
    staleTime: 0,
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

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['assessments'] });
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
