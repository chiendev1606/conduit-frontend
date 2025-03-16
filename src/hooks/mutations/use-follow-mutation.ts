import profileServices from '@/services/profile-services';
import { useMutation } from '@tanstack/react-query';

export function useFollowMutation() {
  const mutation = useMutation({
    mutationFn: (username: string) => profileServices.followUser(username),
  });

  return { ...mutation, followUser: mutation.mutate };
}

export function useUnFollowMutation() {
  const mutation = useMutation({
    mutationFn: (username: string) => profileServices.unFollowUser(username),
  });

  return { ...mutation, unFollowUser: mutation.mutate };
}
