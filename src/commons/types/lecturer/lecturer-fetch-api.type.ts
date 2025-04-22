import { ILecturer } from '@/commons/interface-model/lecturer.interface';

export type LecturerPaginationResponse = {
  data: ILecturer[];
  pagination: {
    totalRecords: number;
    totalPages: number;
  };
};
