import { articleServices } from '@/services/article-services';
import { useMutation } from '@tanstack/react-query';

export const useFavoriteMutation = () => {
  const mutation = useMutation({
    mutationFn: articleServices.favoriteArticle,
  });

  return { ...mutation, favorite: mutation.mutate };
};

export const useUnfavoriteMutation = () => {
  const mutation = useMutation({
    mutationFn: articleServices.unfavoriteArticle,
  });

  return { ...mutation, unfavorite: mutation.mutate };
};
