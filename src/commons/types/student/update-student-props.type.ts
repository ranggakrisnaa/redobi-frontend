import { IStudent } from '@/commons/interface-model/student.interface';
import { UpdateStudentSchema } from '@/commons/schema/update-student.schema';

export type UpdateStudentProps = {
  onSuccess?: (data: UpdateStudentSchema) => void;
  data: IStudent;
};
