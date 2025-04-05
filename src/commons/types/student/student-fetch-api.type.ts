import { IStudent } from '@/commons/interface-model/student.interface.ts';

export type StudentPaginationResponse = {
  data: IStudent[];
  pagination: {
    totalRecords: number;
    totalPages: number;
  };
};
