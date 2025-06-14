import { UUID } from 'crypto';
import { IBaseEntity } from './base-entity.interface';
import { ISubCriteria } from './sub-criteria-entity.entity';

export interface IAssessmentSubCriteria extends IBaseEntity {
  id: number;
  subCriteriaId: number;
  score: number;
  assessmentId: UUID;
  subCriteria?: ISubCriteria;
}
