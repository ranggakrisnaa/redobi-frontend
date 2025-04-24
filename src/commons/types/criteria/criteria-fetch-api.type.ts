import { ICriteria } from '@/commons/interface-model/criteria.interface';

export type CriteriaPaginationResponse = {
  data: ICriteria[];
  pagination: {
    totalRecords: number;
    totalPages: number;
  };
};
