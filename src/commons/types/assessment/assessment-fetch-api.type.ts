import { IAssessment } from '@/commons/interface-model/assessment-entity.interface';

export type AssessmentPaginationResponse = {
  data: IAssessment[];
  pagination: {
    totalRecords: number;
    totalPages: number;
  };
};
