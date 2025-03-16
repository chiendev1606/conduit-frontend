import { useProfileQuery } from './queries/use-profile-query';

export const useAuth = () => {
  const { data: profile } = useProfileQuery();
  const isAuthenticated = !!profile;

  return {
    user: profile?.user,
    isAuthenticated,
  };
};
