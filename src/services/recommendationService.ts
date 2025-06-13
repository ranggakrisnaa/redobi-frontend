import apiService from '@/api/apiService';
import { INormalizedMatrices } from '@/commons/interface-model/normalized-matrices-entity.interface';
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

export const normalizationsPagination = async (page = 1, limit = 10) => {
  const params = new URLSearchParams();
  params.append('page', page.toString());
  params.append('limit', limit.toString());
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

export const rankingMatricesPagination = async () => {
  const params = new URLSearchParams({ stage: 'Ranking Normalization' });
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

export const recommendationPagination = async (page = 1, limit = 10) => {
  const params = new URLSearchParams();
  params.append('page', page.toString());
  params.append('limit', limit.toString());
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
