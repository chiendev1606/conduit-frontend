import { z } from 'zod';

export const searchParamsSchema = z.object({
  page: z.number().optional().default(1),
  limit: z.number().optional().default(10),
  tag: z.string().optional(),
  author: z.string().optional(),
  favorited: z.string().optional(),
  authorId: z.string().optional(),
});
