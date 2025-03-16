import { FollowUserResponse } from '@/types/profile';
import BaseServices from './base-services';

export class ProfileServices extends BaseServices {
  private static instance: ProfileServices;

  constructor() {
    super('/api/profile');
  }

  static getInstance() {
    if (!ProfileServices.instance) {
      ProfileServices.instance = new ProfileServices();
    }
    return ProfileServices.instance;
  }

  followUser = (username: string) => {
    return this.post<FollowUserResponse>(`/${username}/follow`);
  };
  unFollowUser = (username: string) => {
    return this.delete<FollowUserResponse>(`/${username}/follow`);
  };
}

const profileServices = ProfileServices.getInstance();

export default profileServices;
