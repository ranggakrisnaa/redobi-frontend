import { z } from 'zod';

const keywordItemSchema = z.object({ name: z.string().optional() });

export const updateThesisKeywordSchema = z.object({
  category: z.string().optional(),
  keywords: z.array(keywordItemSchema).optional(),
});

export type UpdateThesisKeywordSchema = z.infer<
  typeof updateThesisKeywordSchema
>;
