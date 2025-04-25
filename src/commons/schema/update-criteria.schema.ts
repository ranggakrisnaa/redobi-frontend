import { z } from 'zod';

export const updateSubCriteriaSchema = z.object({
  name: z.string().optional(),
  weight: z.string().optional(),
});

export const updateCriteriaSchema = z.object({
  name: z.string().optional(),
  weight: z.string().optional(),
  type: z.string().optional(),
  subCriteria: z.array(updateSubCriteriaSchema).optional(),
});

export type UpdateCriteriaSchema = z.infer<typeof updateCriteriaSchema>;
