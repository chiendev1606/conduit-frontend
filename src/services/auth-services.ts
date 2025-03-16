import { type SignInSchema, type SignUpSchema } from '@/schemas';
import BaseServices from './base-services';
import { AuthResponse } from '@/types';

export class AuthServices extends BaseServices {
  private static instance: AuthServices;

  constructor() {
    super('/api/users');
  }

  static getInstance() {
    if (!AuthServices.instance) {
      AuthServices.instance = new AuthServices();
    }
    return AuthServices.instance;
  }

  signIn = async (data: SignInSchema) => {
    return this.post<AuthResponse>('/login', { user: data });
  };

  signUp = async (data: SignUpSchema) => {
    return this.post('', { user: data });
  };

  getMe = async () => {
    return this.get<AuthResponse>('/me');
  };
}

const authServices = AuthServices.getInstance();

export default authServices;
