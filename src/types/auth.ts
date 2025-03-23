import { QueryClient } from '@tanstack/react-query';
import { ApiResponse } from './common';

export type User = {
  id: number;
  email: string;
  name: string;
  role: string;
  token: string;
  username: string;
  bio: string | null;
};

export type AuthResponse = ApiResponse<{
  user: User;
}>;

export type AuthContextType = {
  queryClient: QueryClient;
};
