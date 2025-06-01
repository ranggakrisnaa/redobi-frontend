import { ILecturer } from '@/commons/interface-model/lecturer-entity.interface';
import { UpdateLecturerSchema } from '@/commons/schema/update-lecturer.schema';

export type UpdateLecturerProps = {
  onSuccess?: (data: UpdateLecturerSchema) => void;
  data: ILecturer;
};
