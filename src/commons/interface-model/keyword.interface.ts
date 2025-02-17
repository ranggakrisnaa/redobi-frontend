import { IThesisKeyword } from './thesis-keyword.interface';

export interface IKeyword {
  id: number;
  name: string;
  thesisKeywordId: number;
  thesisKeyword?: IThesisKeyword;
}
