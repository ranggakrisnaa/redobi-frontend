import { CreateCriteriaSchema } from '@/commons/schema/create-criteria.schema';

export type CreateCriteriaProps = {
  onSuccess?: (data: CreateCriteriaSchema) => void;
};
