import { UUID } from 'crypto';
import { ISubCriteria } from './sub-criteria-entity.entity';

export interface IAssessmentSubCriteria {
  id: number;
  subCriteriaId: number;
  score: number;
  assessmentId: UUID;
  subCriteria?: ISubCriteria;
}
