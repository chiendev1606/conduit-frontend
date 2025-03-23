import { UpdateUserSchema } from '@/schemas/user';
import userServices from '@/services/user-services';
import { useMutation } from '@tanstack/react-query';

export function useUpdateUserMutation() {
  const mutation = useMutation({
    mutationFn: (userData: UpdateUserSchema) => userServices.updateUser(userData),
  });

  return { ...mutation, updateUser: mutation.mutateAsync };
}
