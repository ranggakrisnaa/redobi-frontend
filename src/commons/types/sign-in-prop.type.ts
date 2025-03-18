import { SignInSchema } from '@/commons/schema/sign-in.schema.ts';

export type SignInFormProps = {
  onSuccess?: (data: SignInSchema) => void;
};
