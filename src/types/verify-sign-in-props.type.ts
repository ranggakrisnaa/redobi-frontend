import { VerifySignInSchema } from '@/commons/schema/verify-sign-in.schema';

export type VerifySignInProps = {
  onSuccess?: (data: VerifySignInSchema) => void;
};
