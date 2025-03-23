import { AuthResponse } from '@/types';
import { UpdateUserSchema } from '@/schemas/user';
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

  updateUser = async (userData: UpdateUserSchema) => {
    return this.put<AuthResponse>('', { user: userData });
  };
}

const userServices = UserServices.getInstance();

export default userServices;
