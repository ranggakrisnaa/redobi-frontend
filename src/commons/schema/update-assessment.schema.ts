import { z } from 'zod';

export const updateAssessmentSchema = z.object({
  lecturerId: z.string().uuid('Dosen pembimbing harus diisi').optional(),
  scores: z
    .array(
      z.object({
        criteriaName: z.string().min(1, 'Kriteria harus diisi'),
        subCriteria: z
          .array(
            z
              .object({
                id: z.coerce.string(),
                name: z.string(),
              })
              .optional(),
          )
          .optional(),
        subScores: z
          .array(
            z
              .object({
                assessmentSubCriteriaId: z.coerce.string(),
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
              })
              .optional(),
          )
          .optional(),
      }),
    )
    .optional(),
});

export type UpdateAssessmentSchema = z.infer<typeof updateAssessmentSchema>;
