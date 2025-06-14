import apiService from '@/api/apiService';
import { INormalizedMatrices } from '@/commons/interface-model/normalized-matrices-entity.interface';
import { RecommendationFormSchema } from '@/commons/schema/update-recommendation.schema';
import {
  NormalizationPaginationResponse,
  RankingPaginationResponse,
  RecommendationPaginationResponse,
} from '@/commons/types/recommendation/recommendation-fetch-api.type';
import { ResponseData } from '@/utils/responseData';

export const createNormalization = async () => {
  const { data } = await apiService.post('/recommendations/normalized');
  return data;
};

export const normalizationsPagination = async (
  page = 1,
  limit = 10,
  search: string,
) => {
  const params = new URLSearchParams();
  params.append('page', page.toString());
  params.append('limit', limit.toString());

  if (search) {
    params.append('search', search);
  }

  params.append('stage', 'Normalization');
  const { data } = await apiService.get<NormalizationPaginationResponse>(
    `/recommendations?${params.toString()}`,
  );
  return data;
};

export const deleteNormalizations = async (ids: string[], id?: string) => {
  const url = id
    ? `/recommendations/normalized/${id}`
    : '/recommendations/normalized';
  const config = id
    ? {}
    : ids.length > 0
      ? { normalizedMatrixIds: ids }
      : { deleteAll: true };
  console.log(config);

  const { data } = await apiService.delete<
    ResponseData<INormalizedMatrices | INormalizedMatrices[]>
  >(url, config);
  return data;
};

export const createRankingMatrices = async () => {
  const { data } = await apiService.post('/recommendations/rank');
  return data;
};

export const rankingMatricesPagination = async (
  page = 1,
  limit = 10,
  search: string,
) => {
  const params = new URLSearchParams({ stage: 'Ranking Normalization' });
  params.append('page', page.toString());
  params.append('limit', limit.toString());

  if (search) {
    params.append('search', search);
  }

  const { data } = await apiService.get<RankingPaginationResponse>(
    `/recommendations?${params.toString()}`,
  );
  return data;
};

export const deleteRankingMatrices = async (ids: string[], id?: string) => {
  const url = id
    ? `/recommendations/ranking/${id}`
    : '/recommendations/ranking';
  const config = id
    ? {}
    : ids.length !== 0
      ? { rankingMatrixIds: ids }
      : { deleteAll: true };

  const { data } = await apiService.delete<
    ResponseData<INormalizedMatrices | INormalizedMatrices[]>
  >(url, config);
  return data;
};

export const recommendationPagination = async (
  page = 1,
  limit = 10,
  search: string,
) => {
  const params = new URLSearchParams();
  params.append('page', page.toString());
  params.append('limit', limit.toString());

  if (search) {
    params.append('search', search);
  }

  params.append('stage', 'Reccomendation');
  const { data } = await apiService.get<RecommendationPaginationResponse>(
    `/recommendations?${params.toString()}`,
  );
  return data;
};

export const createRecommendation = async () => {
  const { data } = await apiService.post('/recommendations');
  return data;
};

export const updateRecommendation = async (
  payload: RecommendationFormSchema,
) => {
  const { data } = await apiService.put('/recommendations', payload);
  return data;
};

export const exportPDF = async () => {
  const response = await apiService.get('/recommendations/pdf', {
    responseType: 'blob',
    headers: {
      Accept: 'application/pdf',
    },
  });

  return response.data;
};

export const deleteRecommendation = async (ids: string[], id?: string) => {
  const url = id ? `/recommendations/${id}` : '/recommendations';
  const config = id
    ? {}
    : ids.length !== 0
      ? { recommendationIds: ids }
      : { deleteAll: true };

  const { data } = await apiService.delete<
    ResponseData<INormalizedMatrices | INormalizedMatrices[]>
  >(url, config);
  return data;
};
