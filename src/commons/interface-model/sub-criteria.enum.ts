import { IAssessment } from './assessment.interface';
import { ICriteria } from './criteria.interface';

export interface ISubCriteria {
  id: number;
  name: string;
  weight: number;
  criteria?: ICriteria[];
  assessment?: IAssessment[];
}
