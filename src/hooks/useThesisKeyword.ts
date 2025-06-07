import { IThesisKeyword } from '@/commons/interface-model/thesis-keyword-entity.interface';
import { CreateThesisKeywordSchema } from '@/commons/schema/create-thesis-keyword.schema';
import { UpdateThesisKeywordSchema } from '@/commons/schema/update-thesis-keyword.schema';
import {
  createThesisKeyword,
  deleteThesisKeyword,
  fetchThesisKeywordDetail,
  fetchThesisKeywordPagination,
  updateThesisKeyword,
} from '@/services/thesisKeywordService';
import { useThesisKeywordStore } from '@/store/thesisKeywordStore';
import { useMutation, useQuery } from '@tanstack/react-query';
import { UseBaseMutationHandler } from './useBaseMutationHandler';

export const useThesisKeywordPagination = () => {
  const { currentPage, pageSize, search, sortOrder, sortBy, filters } =
    useThesisKeywordStore();
  return useQuery({
    queryKey: [
      'thesis-keywords',
      currentPage,
      pageSize,
      filters,
      search,
      sortBy,
      sortOrder,
    ],
    queryFn: async () => {
      return await fetchThesisKeywordPagination(
        currentPage,
        pageSize,
        filters,
        search as string,
        sortBy as string,
        sortOrder as 'asc',
      );
    },
  });
};

export const useThesisKeywordCreate = () => {
  const {
    handleError,
    handleMutate,
    handleSettled,
    handleSuccess,
    queryClient,
  } = UseBaseMutationHandler();
  return useMutation({
    mutationFn: (data: CreateThesisKeywordSchema) => createThesisKeyword(data),

    onMutate: handleMutate,

    onSuccess: (newThesisKeyword) => {
      queryClient.invalidateQueries({
        queryKey: ['thesis-keyword', newThesisKeyword.id],
      });
      queryClient.invalidateQueries({ queryKey: ['thesis-keywords'] });
      handleSuccess(
        'Data judul skripsi berhasil ditambahkan',
        '/thesis-keywords',
      );
    },

    onError: (error: any) => {
      if (
        error.code == 'ERR_BAD_REQUEST' &&
        error.response.data.message == 'Thesis keyword data already exist.'
      ) {
        handleError(error, 'Gagal! Data Dosen Pembimbing ini sudah ada.');
      } else {
        handleError(error, `Gagal!, ${error}`);
      }
    },

    onSettled: handleSettled,
  });
};

export const useThesisKeywordDetail = () => {
  const { thesiskeywordId } = useThesisKeywordStore();

  return useQuery({
    queryKey: ['thesis-keyword-detail', thesiskeywordId],
    queryFn: async () => {
      const data = await fetchThesisKeywordDetail(thesiskeywordId as string);
      return data;
    },
    enabled: !!thesiskeywordId,
    staleTime: 5 * 60 * 1000,
  });
};

export const useThesisKeywordUpdate = () => {
  const {
    handleError,
    handleMutate,
    handleSettled,
    handleSuccess,
    queryClient,
  } = UseBaseMutationHandler();

  return useMutation<
    IThesisKeyword,
    Error,
    { id: number; data: UpdateThesisKeywordSchema }
  >({
    mutationFn: async ({ data, id }) => {
      const response = await updateThesisKeyword({ payload: data, id });
      return response.data;
    },

    onMutate: handleMutate,

    onSuccess: (newThesisKeyword) => {
      queryClient.invalidateQueries({
        queryKey: ['thesis-keyword', newThesisKeyword.id],
      });
      queryClient.invalidateQueries({ queryKey: ['thesis-keywords'] });
      handleSuccess(
        'Data judul skripsi berhasil diperbarui',
        '/thesis-keywords',
      );
    },

    onError: (error: any) => {
      if (
        error.code == 'ERR_BAD_REQUEST' &&
        error.response.data.message == 'Thesis keyword data already exist.'
      ) {
        handleError(error, 'Gagal! Data Dosen Pembimbing ini sudah ada.');
      } else {
        handleError(error, `Gagal!, ${error}`);
      }
    },

    onSettled: handleSettled,
  });
};

export const useThesisKeywordDelete = () => {
  const {
    handleError,
    handleMutate,
    handleSettled,
    handleSuccess,
    queryClient,
  } = UseBaseMutationHandler();

  return useMutation({
    mutationFn: async (ids: number[]) => deleteThesisKeyword(ids),

    onMutate: handleMutate,

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['thesis-keywords'] });
      handleSuccess('Data judul skripsi berhasil dihapus.', '/thesis-keywords');
    },

    onError: (error: any) => {
      handleError(error, `Gagal menghapus data! ${error}`);
    },

    onSettled: handleSettled,
  });
};
