import { CreateArticleRequest } from '@/types/article';
import { useMutation } from '@tanstack/react-query';
import { articleServices } from '@/services/article-services';

export function useCreateArticleMutation() {
  const mutation = useMutation({
    mutationFn: (article: CreateArticleRequest) => articleServices.createArticle(article),
  });

  return { ...mutation, createArticle: mutation.mutateAsync };
}
