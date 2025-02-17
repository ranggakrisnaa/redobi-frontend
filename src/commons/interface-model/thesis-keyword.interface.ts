import { ThesisKeywordCategoryEnum } from '../enums/thesis-keyword-category.enum';
import { IKeyword } from './keyword.interface';

export interface IThesisKeyword {
  id: number;
  category: ThesisKeywordCategoryEnum;
  keyword?: IKeyword[];
}
