import { z } from 'zod';

export const createLecturerSchema = z.object({
  fullName: z.string().min(3, 'Nama minimal 3 karakter'),
  nidn: z.string().min(8, 'NIDN minimal 8 karakter'),
  tipePembimbing: z.string().min(1, 'Tipe Pembimbing harus diisi'),
  prodi: z.string().min(1, 'Prodi harus diisi'),
  kuotaBimbingan: z.string().min(1, 'Kuota Bimbingan harus diisi'),
  jumlahBimbingan: z.string().optional(),
  file: z
    .any()
    .refine(
      (file) => {
        return file !== undefined || file instanceof File;
      },
      {
        message: 'Foto tidak valid',
      },
    )
    .optional(),
});

export type CreateLecturerSchema = z.infer<typeof createLecturerSchema>;
