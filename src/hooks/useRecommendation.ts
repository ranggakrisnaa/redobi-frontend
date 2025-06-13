import {
  NormalizationPaginationResponse,
  RankingPaginationResponse,
  RecommendationPaginationResponse,
} from '@/commons/types/recommendation/recommendation-fetch-api.type';
import {
  createNormalization,
  createRankingMatrices,
  createRecommendation,
  deleteNormalizations,
  deleteRankingMatrices,
  normalizationsPagination,
  rankingMatricesPagination,
  recommendationPagination,
} from '@/services/recommendationService';
import { useRecommendationStore } from '@/store/recommendationStore';
import { useMutation, useQuery } from '@tanstack/react-query';
import { UseBaseMutationHandler } from './useBaseMutationHandler';

export const usePaginationNormalization = () => {
  const { currentPage, pageSize } = useRecommendationStore();
  return useQuery({
    queryKey: ['normalizations', currentPage, pageSize],
    queryFn: async (): Promise<NormalizationPaginationResponse> => {
      return await normalizationsPagination(currentPage, pageSize);
    },
    staleTime: 5 * 60 * 1000,
  });
};

export const useCreateNormalization = () => {
  const {
    handleMutate,
    queryClient,
    handleError,
    handleSuccess,
    handleSettled,
  } = UseBaseMutationHandler();

  return useMutation({
    mutationFn: () => createNormalization(),

    onMutate: handleMutate,

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['normalizations'] });
      handleSuccess(
        'Data Normalisasi Matriks Berhasil di generate.',
        '/recommendations',
      );
    },

    onError: (error: any) => {
      handleError(error, `Gagal!, ${error}`);
    },

    onSettled: handleSettled,
  });
};

export const useDeleteNormalization = () => {
  const {
    handleMutate,
    queryClient,
    handleError,
    handleSuccess,
    handleSettled,
    toast,
  } = UseBaseMutationHandler();

  return useMutation({
    mutationFn: (ids: string[]) => deleteNormalizations(ids),

    onMutate: handleMutate,

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['normalizations'] });
      handleSuccess(
        'Data Normalisasi Matriks berhasil dihapus.',
        '/recommendations',
      );
    },

    onError: (error: any) => {
      if (error.code == 'ERR_BAD_RESPONSE')
        toast({
          title: 'Gagal!',
          description: 'Gagal menghapus data Normalisasi Matriks.',
          duration: 2000,
        });
      handleError(error, 'Gagal menghapus data Normalisasi Matriks.');
    },

    onSettled: handleSettled,
  });
};

export const usePaginationRankingMatrices = () => {
  const { currentPage, pageSize } = useRecommendationStore();
  return useQuery({
    queryKey: ['rankings', currentPage, pageSize],
    queryFn: async (): Promise<RankingPaginationResponse> => {
      return await rankingMatricesPagination();
    },
    staleTime: 5 * 60 * 1000,
  });
};

export const useCreateRankingMatrices = () => {
  const {
    handleMutate,
    queryClient,
    handleError,
    handleSuccess,
    handleSettled,
  } = UseBaseMutationHandler();

  return useMutation({
    mutationFn: () => createRankingMatrices(),

    onMutate: handleMutate,

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['rankings'] });
      handleSuccess(
        'Data Ranking Matriks Berhasil di generate.',
        '/recommendations',
      );
    },

    onError: (error: any) => {
      handleError(error, `Gagal!, ${error}`);
    },

    onSettled: handleSettled,
  });
};

export const useDeleteRankingMatrices = () => {
  const {
    handleMutate,
    queryClient,
    handleError,
    handleSuccess,
    handleSettled,
    toast,
  } = UseBaseMutationHandler();

  return useMutation({
    mutationFn: (ids: string[]) => deleteRankingMatrices(ids),

    onMutate: handleMutate,

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['rankings'] });
      handleSuccess(
        'Data Ranking Matriks berhasil dihapus.',
        '/recommendations',
      );
    },

    onError: (error: any) => {
      if (error.code == 'ERR_BAD_RESPONSE')
        toast({
          title: 'Gagal!',
          description: 'Gagal menghapus data Ranking Matriks.',
          duration: 2000,
        });

      handleError(error, 'Gagal menghapus data Ranking Matriks.');
    },

    onSettled: handleSettled,
  });
};

export const usePaginationRecommendations = () => {
  const { currentPage, pageSize } = useRecommendationStore();
  return useQuery({
    queryKey: ['recommendations', currentPage, pageSize],
    queryFn: async (): Promise<RecommendationPaginationResponse> => {
      return await recommendationPagination(currentPage, pageSize);
    },
    staleTime: 5 * 60 * 1000,
  });
};

export const useCreateRecommendation = () => {
  const { handleMutate, queryClient, handleError, handleSettled } =
    UseBaseMutationHandler();

  return useMutation({
    mutationFn: () => createRecommendation(),

    onMutate: handleMutate,

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['recommendations'] });
    },

    onError: (error: any) => {
      handleError(error, `Gagal!, ${error}`);
    },

    onSettled: handleSettled,
  });
};
