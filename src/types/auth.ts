import { QueryClient } from '@tanstack/react-query';
import { ApiResponse } from './common';

export type User = {
  id: string;
  email: string;
  name: string;
  role: string;
  token: string;
};

export type AuthResponse = ApiResponse<{
  user: User;
}>;

export type AuthContextType = {
  user: User | null;
  queryClient: QueryClient;
};
