import { z } from 'zod';

export const envSchema = z.object({
  apiUrl: z.string().min(1).url(),
});
