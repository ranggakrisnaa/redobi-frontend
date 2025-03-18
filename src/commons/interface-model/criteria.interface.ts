import { CriteriaTypeEnum } from '../enums/criteria-type.enum';
import { ISubCriteria } from './sub-criteria.enum';

export interface ICriteria {
  id: number;
  name: string;
  weight: number;
  type: CriteriaTypeEnum;
  subCriteriaId?: number;
  subCriteria?: ISubCriteria;
}
