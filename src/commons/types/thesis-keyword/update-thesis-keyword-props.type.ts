import { IThesisKeyword } from '@/commons/interface-model/thesis-keyword-entity.interface';
import { UpdateThesisKeywordSchema } from '@/commons/schema/update-thesis-keyword.schema';

export type UpdateThesisKeywordProps = {
  onSuccess?: (data: UpdateThesisKeywordSchema) => void;
  data: IThesisKeyword;
};
