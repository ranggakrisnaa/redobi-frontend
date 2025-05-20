import { ICriteria } from '@/commons/interface-model/criteria-entity.interface';
import { UpdateCriteriaSchema } from '@/commons/schema/update-criteria.schema';

export type UpdateCriteriaProps = {
  onSuccess?: (data: UpdateCriteriaSchema) => void;
  data: ICriteria;
};
