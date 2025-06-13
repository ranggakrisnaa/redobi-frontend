import { INormalizedMatrices } from '@/commons/interface-model/normalized-matrices-entity.interface';
import { IRankingMatrices } from '@/commons/interface-model/ranking-matrices-entity.interface';
import { IRecommendation } from '@/commons/interface-model/recommendation-entity.interface';

export type NormalizationPaginationResponse = {
  data: INormalizedMatrices[];
  pagination: {
    totalRecords: number;
    totalPages: number;
  };
};

export type RankingPaginationResponse = {
  data: IRankingMatrices[];
  pagination: {
    totalRecords: number;
    totalPages: number;
  };
};

export type RecommendationPaginationResponse = {
  data: IRecommendation[];
  pagination: {
    totalRecords: number;
    totalPages: number;
  };
};
