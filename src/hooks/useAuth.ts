import { useEffect, useState } from 'react';
import { useProfileQuery } from './queries/use-profile-query';
import { getAuthToken } from '@/utils/auth-utils';

export const useAuth = () => {
  const { isLoading, error } = useProfileQuery();
  const [isAuthenticated, setIsAuthenticated] = useState(getAuthToken() !== null);

  useEffect(() => {
    if (error && !isLoading) {
      setIsAuthenticated(false);
    }
  }, [error, isLoading]);

  return {
    isAuthenticated,
  };
};
