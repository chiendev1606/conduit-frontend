import { useMutation } from '@tanstack/react-query';
import authServices from '@/services/auth-services';

export const useSignIn = () => {
  const mutation = useMutation({
    mutationFn: authServices.signIn,
  });

  return { ...mutation, signIn: mutation.mutateAsync };
};

export const useSignUp = () => {
  const mutation = useMutation({
    mutationFn: authServices.signUp,
  });

  return { ...mutation, signUp: mutation.mutateAsync };
};
