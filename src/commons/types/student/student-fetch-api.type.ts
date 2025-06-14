import { IStudent } from '@/commons/interface-model/student-entity.interface';

export type StudentPaginationResponse = {
  data: IStudent[];
  pagination: {
    totalRecords: number;
    totalPages: number;
  };
};
