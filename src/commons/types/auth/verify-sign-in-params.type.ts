import { VerifySignInSchema } from '@/commons/schema/verify-sign-in.schema.ts';
import { UserLoginData } from '@/commons/types/auth/user-login-data.type.ts';

export type VerifySignInParams = {
  data: VerifySignInSchema;
  user: UserLoginData;
};
