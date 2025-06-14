import { z } from 'zod';

export const recommendationFormSchema = z.object({
  mahasiswa: z
    .array(
      z.object({
        nama: z.string().min(1, { message: 'Nama mahasiswa wajib diisi' }),
        pembimbing1: z.string().min(1, { message: 'Pilih pembimbing 1' }),
        pembimbing2: z.string().min(1, { message: 'Pilih pembimbing 2' }),
      }),
    )
    .min(1, { message: 'Minimal satu mahasiswa' }),
});

export type RecommendationFormSchema = z.infer<typeof recommendationFormSchema>;
