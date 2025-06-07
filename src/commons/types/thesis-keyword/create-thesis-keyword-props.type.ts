import { CreateThesisKeywordSchema } from '@/commons/schema/create-thesis-keyword.schema';

export type CreateThesisKeywordProps = {
  onSuccess: (data: CreateThesisKeywordSchema) => void;
};
