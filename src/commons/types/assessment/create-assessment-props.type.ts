import { ILecturer } from '@/commons/interface-model/lecturer-entity.interface';
import { CreateAssessmentSchema } from '@/commons/schema/create-assessment.schema';

export type CreateAssessmentProps = {
  onSuccess: (data: CreateAssessmentSchema) => void;
  data?: ILecturer;
};
