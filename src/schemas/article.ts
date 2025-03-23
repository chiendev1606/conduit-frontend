import { z } from 'zod';

export const createArticleSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().min(1, 'Description is required'),
  body: z.string().min(1, 'Content is required'),
  tagList: z.array(z.string()).optional().default([]),
});

export type CreateArticleSchema = z.infer<typeof createArticleSchema>;
