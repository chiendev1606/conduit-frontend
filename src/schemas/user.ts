import { z } from 'zod';

export const updateUserSchema = z.object({
  image: z.string().optional(),
  username: z.string().min(1, 'Username is required'),
  bio: z.string().optional(),
  email: z.string().min(1, 'Email is required').email('Invalid email format'),
  password: z.string().optional(),
});

export type UpdateUserSchema = z.infer<typeof updateUserSchema>;
