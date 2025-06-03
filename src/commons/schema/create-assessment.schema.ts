import { z } from 'zod';

export const createAssessmentSchema = z.object({
  lecturerId: z.string().uuid('Dosen pembimbing harus diisi'),
  scores: z
    .array(
      z.object({
        criteriaName: z.string().min(1, 'Kriteria harus diisi'),
        subCriteria: z.array(
          z.object({
            id: z.coerce.string(),
            name: z.string(),
          }),
        ),
        subScores: z
          .array(
            z.object({
              subCriteriaId: z.coerce.string(),
              score: z
                .string()
                .min(1, 'Skor harus diisi')
                .refine(
                  (val) => {
                    const num = Number(val);
                    return !isNaN(num) && num >= 0 && num <= 100;
                  },
                  { message: 'Skor harus berupa angka antara 0 hingga 100' },
                ),
            }),
          )
          .min(1, 'Minimal satu sub-skor harus diisi'),
      }),
    )
    .min(1, 'Minimal satu kriteria harus diisi'),
});

export type CreateAssessmentSchema = z.infer<typeof createAssessmentSchema>;
