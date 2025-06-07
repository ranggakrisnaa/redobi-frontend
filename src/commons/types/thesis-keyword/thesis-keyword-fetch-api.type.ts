import { IThesisKeyword } from '@/commons/interface-model/thesis-keyword-entity.interface';

export type ThesisKeywordPaginationResponse = {
  data: IThesisKeyword[];
  pagination: {
    totalRecords: number;
    totalPages: number;
  };
};
