import { z } from 'zod';

export const updateLecturerSchema = z.object({
  fullName: z.string().min(3, 'Nama minimal 3 karakter').optional(),
  nidn: z.string().min(8, 'NIDN minimal 8 karakter').optional(),
  tipePembimbing: z.string().optional(),
  prodi: z.string().min(1, 'Prodi harus diisi').optional(),
  kuotaBimbingan: z.string().min(1, 'Kuota Bimbingan harus diisi').optional(),
  jumlahBimbingan: z.string().optional(),
  file: z.any().optional(),
});

export type UpdateLecturerSchema = z.infer<typeof updateLecturerSchema>;
