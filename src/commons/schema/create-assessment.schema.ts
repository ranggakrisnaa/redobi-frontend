import { z } from 'zod';

export const createAsessmentSchema = z.object({
  lecturerId: z.string().uuid().min(1, 'Dosen pembimbing harus diisi'),
  scores: z
    .array(
      z.object({
        subCriteriaId: z.string().uuid().min(1, 'Sub Criteria harus diisi'),
        score: z.string().min(1, 'Skor sub criteria harus diisi'),
        criteriaName: z.string(),
      }),
    )
    .min(1, 'Minimal satu sub-criteria harus diisi'),
});

export type CreateAssessmentSchema = z.infer<typeof createAsessmentSchema>;
