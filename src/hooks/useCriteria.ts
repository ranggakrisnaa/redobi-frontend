import { ICriteria } from '@/commons/interface-model/criteria-entity.interface';
import { CreateCriteriaSchema } from '@/commons/schema/create-criteria.schema';
import { UpdateCriteriaSchema } from '@/commons/schema/update-criteria.schema';
import { CriteriaPaginationResponse } from '@/commons/types/criteria/criteria-fetch-api.type';
import {
  createCriteria,
  deleteCriteria,
  fetchCriteriaDetail,
  fetchCriteriaPagination,
  updateCriteria,
} from '@/services/criteriaService';
import { useCriteriaStore } from '@/store/criteriaStore';
import { useMutation, useQuery } from '@tanstack/react-query';
import { UseBaseMutationHandler } from './useBaseMutationHandler';

export const useCriteriaPagination = () => {
  const { currentPage, pageSize, filters, search, sortOrder, sortBy } =
    useCriteriaStore();

  return useQuery({
    queryKey: [
      'criteria',
      currentPage,
      pageSize,
      filters,
      search,
      sortBy,
      sortOrder,
    ],
    queryFn: async (): Promise<CriteriaPaginationResponse> => {
      const data = await fetchCriteriaPagination(
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

export const useCriteriaDetail = () => {
  const { criteriaId } = useCriteriaStore();

  return useQuery({
    queryKey: ['criteria-detail', criteriaId],
    queryFn: async () => {
      const data = await fetchCriteriaDetail(criteriaId as number);
      return data;
    },
    enabled: !!criteriaId,
    staleTime: 5 * 60 * 1000,
  });
};

export const useCriteriaDelete = () => {
  const {
    handleMutate,
    queryClient,
    handleError,
    handleSuccess,
    handleSettled,
  } = UseBaseMutationHandler();

  return useMutation({
    mutationFn: (ids: number[]) => deleteCriteria(ids),

    onMutate: handleMutate,

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['criteria'] });
      queryClient.invalidateQueries({ queryKey: ['statistics'] });
      handleSuccess('Data criteria berhasil dihapus.', '/criteria');
    },

    onError: (error: any) => {
      handleError(error, 'Gagal menghapus data criteria.');
    },

    onSettled: handleSettled,
  });
};

export const useCriteriaUpdate = () => {
  const {
    handleMutate,
    queryClient,
    handleError,
    handleSuccess,
    handleSettled,
  } = UseBaseMutationHandler();

  return useMutation<
    ICriteria,
    Error,
    { id: number; data: UpdateCriteriaSchema }
  >({
    mutationFn: async ({ data, id }) => {
      const response = await updateCriteria({ payload: data, id });
      return response.data;
    },

    onMutate: handleMutate,

    onSuccess: (newCriteria) => {
      queryClient.invalidateQueries({
        queryKey: ['criteria-detail', newCriteria.id],
      });
      queryClient.invalidateQueries({ queryKey: ['criteria'] });
      handleSuccess(
        'Data Kriteria dan Sub-Kriteria berhasil diperbarui.',
        '/criteria',
      );
    },

    onError: (error: any) => {
      if (
        error.code == 'ERR_BAD_REQUEST' &&
        error.response.data.message == 'Criteria data already exist.'
      ) {
        handleError(error, 'Gagal! Data Dosen Pembimbing ini sudah ada.');
      } else {
        handleError(error, `Gagal!, ${error}`);
      }
    },

    onSettled: handleSettled,
  });
};

export const useCriteriaCreate = () => {
  const {
    handleMutate,
    queryClient,
    handleError,
    handleSuccess,
    handleSettled,
  } = UseBaseMutationHandler();

  return useMutation({
    mutationFn: (criteria: CreateCriteriaSchema) => createCriteria(criteria),

    onMutate: handleMutate,

    onSuccess: (newCriteria) => {
      queryClient.invalidateQueries({
        queryKey: ['criteria-detail', newCriteria.data.id],
      });
      queryClient.invalidateQueries({ queryKey: ['criteria'] });
      queryClient.invalidateQueries({ queryKey: ['statistics'] });
      handleSuccess(
        'Data Criteria dan Sub-Kriteria berhasil ditambahkan.',
        '/criteria',
      );
    },

    onError: (error: any) => {
      if (
        error.code == 'ERR_BAD_REQUEST' &&
        error.response.data.message == 'Criteria data already exist.'
      ) {
        handleError(error, 'Gagal! Data Dosen Pembimbing ini sudah ada.');
      } else {
        handleError(error, `Gagal!, ${error}`);
      }
    },

    onSettled: handleSettled,
  });
};
