import { VerifySignInSchema } from '@/commons/schema/verify-sign-in.schema.ts';

export type VerifySignInProps = {
  onSuccess?: (data: VerifySignInSchema) => void;
};
