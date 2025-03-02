import { type SignInSchema, type SignUpSchema } from '@/schemas';
import BaseServices from './base-services';
import { SignInResponse } from '@/types';

export class AuthServices extends BaseServices {
  constructor() {
    super('/api/auth');
  }

  signIn = async (data: SignInSchema) => {
    return this.post<SignInResponse>('/sign-in', data);
  };

  signUp = async (data: SignUpSchema) => {
    return this.post('/sign-up', data);
  };
}

const authServices = new AuthServices();

export default authServices;
