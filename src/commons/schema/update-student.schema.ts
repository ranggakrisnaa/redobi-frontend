import { z } from 'zod';

export const updateStudentSchema = z.object({
  fullName: z.string().min(3, 'Nama minimal 3 karakter').optional(),
  nim: z.string().min(11, 'Harus angka dan minimal 11 digit.').optional(),
  class: z.string().min(0, 'Kelas harus diisi.').optional(),
  abstract: z.string().min(100, 'Abstrak minimal 100 karakter.').optional(),
  judulSkripsi: z
    .string()
    .min(20, 'Judul skripsi minimal 20 karakter.')
    .optional(),
  major: z.string().min(0, 'Jurusan harus diisi.').optional(),
  tahunMasuk: z.string().min(0, 'Tahun Masuk harus diisi.').optional(),
  file: z.any().optional(),
});

export type UpdateStudentSchema = z.infer<typeof updateStudentSchema>;
