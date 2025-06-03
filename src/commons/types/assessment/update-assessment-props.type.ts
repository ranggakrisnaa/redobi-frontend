import { IAssessment } from '@/commons/interface-model/assessment-entity.interface';
import { UpdateAssessmentSchema } from '@/commons/schema/update-assessment.schema';

export type UpdateAssessmentProps = {
  onSuccess: (data: UpdateAssessmentSchema) => void;
  data: IAssessment;
};
