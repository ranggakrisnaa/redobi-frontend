import { SignInSchema } from '@/commons/schema/sign-in.schema';

export type SignInFormProps = {
  onSuccess?: (data: SignInSchema) => void;
};
