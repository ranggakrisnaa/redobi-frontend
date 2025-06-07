import { z } from 'zod';

const keywordItemSchema = z.object({
  name: z.string().min(1, 'Keyword tidak boleh kosong'),
});

export const createThesisKeywordSchema = z.object({
  category: z.string().min(1, 'Kategori judul skripsi harus diisi'),
  keywords: z
    .array(keywordItemSchema)
    .min(1, 'Minimal satu keyword diperlukan'),
});

export type CreateThesisKeywordSchema = z.infer<
  typeof createThesisKeywordSchema
>;
export type KeywordItem = z.infer<typeof keywordItemSchema>;
