import { LoginSchema } from '@/commons/schema/sign-in.schema';

export type SignInFormProps = {
  onSuccess?: (data: LoginSchema) => void;
};
