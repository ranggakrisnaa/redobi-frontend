import { z } from 'zod';

export const createStudentSchema = z.object({
  fullName: z.string().min(3, 'Nama minimal 3 karakter'),
  nim: z.string().min(11, 'Harus angka dan minimal 11 digit.'),
  class: z.string().min(0, 'Kelas harus diisi.'),
  abstract: z.string().min(100, 'Abstrak minimal 100 karakter.'),
  judulSkripsi: z.string().min(20, 'Judul skripsi minimal 20 karakter.'),
  major: z.string().min(0, 'Jurusan harus diisi.'),
  tahunMasuk: z.string().min(0, 'Tahun Masuk harus diisi.'),
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

export type CreateStudentSchema = z.infer<typeof createStudentSchema>;
