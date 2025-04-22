import { CreateLecturerSchema } from '@/commons/schema/create-lecturer.schema';

export type CreateLecturerProps = {
  onSuccess?: (data: CreateLecturerSchema) => void;
};
