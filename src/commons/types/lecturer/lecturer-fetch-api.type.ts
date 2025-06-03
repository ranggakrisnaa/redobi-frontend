import { ILecturer } from '@/commons/interface-model/lecturer-entity.interface';

export type LecturerPaginationResponse = {
  data: ILecturer[];
  pagination: {
    totalRecords: number;
    totalPages: number;
  };
};
