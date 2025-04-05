import { SignInSchema } from '@/commons/schema/sign-in.schema.ts';

export type SignInProps = {
  onSuccess?: (data: SignInSchema) => void;
  onClick?: () => void;
};
