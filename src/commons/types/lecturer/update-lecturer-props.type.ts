import { ILecturer } from '@/commons/interface-model/lecturer.interface';
import { UpdateLecturerSchema } from '@/commons/schema/update-lecturer.schema';

export type UpdateLecturerProps = {
  onSuccess?: (data: UpdateLecturerSchema) => void;
  data: ILecturer;
};
