import { AuthResponse } from '@/types';
import BaseServices from './base-services';

export class UserServices extends BaseServices {
  private static instance: UserServices;

  private constructor() {
    super('/api/user');
  }

  static getInstance() {
    if (!UserServices.instance) {
      UserServices.instance = new UserServices();
    }
    return UserServices.instance;
  }

  getMe = async () => {
    return this.get<AuthResponse>('');
  };
}

const userServices = UserServices.getInstance();

export default userServices;
