import { z } from 'zod';

export const createSubCriteriaSchema = z.object({
  name: z.string().min(1, 'Nama sub-kriteria harus diisi'),
  weight: z.string({
    invalid_type_error: 'Bobot sub-kriteria harus berupa angka',
  }),
});

export const createCriteriaSchema = z.object({
  name: z.string().min(3, 'Nama minimal 3 karakter'),
  weight: z.string({ invalid_type_error: 'Bobot kriteria harus berupa angka' }),
  type: z.string().min(1, 'Tipe kriteria harus diisi'),
  subCriteria: z
    .array(createSubCriteriaSchema)
    .min(1, 'Minimal 1 sub-kriteria harus diisi.'),
});

export type CreateCriteriaSchema = z.infer<typeof createCriteriaSchema>;
