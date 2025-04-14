import { CreateStudentSchema } from '@/commons/schema/create-student.schema.ts';

export type CreateStudentProps = {
  onSuccess?: (data: CreateStudentSchema) => void;
};
