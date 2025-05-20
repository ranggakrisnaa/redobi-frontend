import { UUID } from 'crypto';
import { IAssessmentSubCriteria } from './assessment-sub-criteria-entity.interface';
import { IBaseEntity } from './base-entity.interface';
import { ILecturer } from './lecturer-entity.interface';

export interface IAssessment extends IBaseEntity {
  id: UUID;
  lecturerId: UUID;
  assessmentSubCriteria?: IAssessmentSubCriteria[];
  lecturer: ILecturer;
}
