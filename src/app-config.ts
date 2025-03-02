import {} from 'zod';
import { envSchema } from './schemas';

export const appConfig = {
  apiUrl: import.meta.env.VITE_API_URL,
};

const result = envSchema.safeParse(appConfig);

if (!result.success) {
  throw new Error('Invalid environment variables');
}
