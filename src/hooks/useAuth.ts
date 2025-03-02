import { getAuthToken } from '@/utils/auth-utils';
import { useState } from 'react';

export const useAuth = () => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(getAuthToken() !== null);

  return {
    user,
    setUser,
    isAuthenticated,
    setIsAuthenticated,
  };
};
