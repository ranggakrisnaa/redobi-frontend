import { z } from 'zod';

export const profileSchema = z.object({
  name: z
    .string()
    .min(1, { message: 'Nama tidak boleh kosong' })
    .max(100, { message: 'Nama terlalu panjang' }),
  email: z
    .string()
    .min(1, { message: 'Email tidak boleh kosong' })
    .email({ message: 'Format email tidak valid' }),
  username: z
    .string()
    .min(3, { message: 'Username minimal 3 karakter' })
    .max(30, { message: 'Username terlalu panjang' }),
  password: z.string().optional(),
});

export type ProfileFormSchema = z.infer<typeof profileSchema>;
