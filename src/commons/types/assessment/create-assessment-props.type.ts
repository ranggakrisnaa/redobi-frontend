import { ILecturer } from '@/commons/interface-model/lecturer-entity.interface';

export type CreateAssessmentProps = {
  onSuccess: (data: CreateAssessmentProps) => void;
  data?: ILecturer;
};
