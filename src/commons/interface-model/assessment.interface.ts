import { ICriteria } from './criteria.interface';
import { ILecturer } from './lecturer.interface';
import { ISubCriteria } from './sub-criteria.enum';

export interface IAssessment {
  id: number;
  lecturerId: string;
  criteriaId: string;
  subCriteriaId: string;
  score: number;
  lecturer?: ILecturer;
  criteria?: ICriteria;
  subCriteria?: ISubCriteria;
}
