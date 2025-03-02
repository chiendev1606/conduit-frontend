import { ApiResponse } from './common';

export type SignInResponse = ApiResponse<{
  accessToken: string;
}>;

export type AuthContextType = {
  accessToken: string | null;
  user: any;
  setUser: (user: any) => void;
  isAuthenticated: boolean;
  setIsAuthenticated: (isAuthenticated: boolean) => void;
};
