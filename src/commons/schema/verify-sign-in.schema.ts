import { z } from 'zod';

export const verifySignInSchema = z.object({
  otpCode: z.string().min(6, 'Kode OTP harus 6 digit angka.'),
});

export type VerifySignInSchema = z.infer<typeof verifySignInSchema>;
