import { articleServices } from '@/services/article-services';
import { useMutation } from '@tanstack/react-query';

export function useCreateCommentMutation() {
  const mutation = useMutation({
    mutationFn: articleServices.createComment,
  });

  return { ...mutation, createComment: mutation.mutate };
}

export function useDeleteCommentMutation() {
  const mutation = useMutation({
    mutationFn: articleServices.deleteComment,
  });

  return { ...mutation, deleteComment: mutation.mutate };
}

export function useUpdateCommentMutation() {
  const mutation = useMutation({
    mutationFn: articleServices.updateComment,
  });

  return { ...mutation, updateComment: mutation.mutate };
}
