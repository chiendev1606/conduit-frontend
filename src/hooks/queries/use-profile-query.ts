import { UseQueryOptions, useQuery } from '@tanstack/react-query';
import { queryKeys } from './query-key';
import userServices from '@/services/user-services';
import { AuthResponse } from '@/types';

export const profileQueryOptions: UseQueryOptions<AuthResponse | undefined, unknown, AuthResponse, string[]> = {
  queryKey: queryKeys.users.me(),
  queryFn: userServices.getMe,
  staleTime: Infinity,
  retry: false,
  refetchOnWindowFocus: false,
  refetchOnMount: false,
  refetchOnReconnect: false,
  refetchInterval: false,
  refetchIntervalInBackground: false,
};

export const useProfileQuery = () => {
  const query = useQuery(profileQueryOptions);
  return { ...query, data: query.data };
};
