import { articleServices } from '@/services/article-services';
import { ArticleDetailsResponse, ArticleQuery, ArticlesResponse } from '@/types/article';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { queryKeys } from '../queries/query-key';
type context = {
  previousArticle?: ArticlesResponse;
};

const getQueryKeyArticleByPathname = (query?: ArticleQuery) => {
  if (!query) return [];
  if (window.location.pathname.includes('my-feed')) {
    return queryKeys.articles.myFeeds({
      offset: query.offset,
      limit: query.limit,
      tag: query.tag,
      author: query.author,
      favorited: query.favorited,
    });
  }
  return queryKeys.articles.list({
    offset: query.offset,
    limit: query.limit,
    tag: query.tag,
    author: query.author,
    favorited: query.favorited,
  });
};

export const useFavoriteMutation = (query?: ArticleQuery) => {
  const queryClient = useQueryClient();
  const queryKey = getQueryKeyArticleByPathname(query);
  const mutation = useMutation<ArticleDetailsResponse, Error, string, context>({
    mutationFn: articleServices.favoriteArticle,
    onMutate: async (slug) => {
      if (!query) return;
      const previousArticle = queryClient.getQueryData<ArticlesResponse>(queryKey);
      if (!previousArticle) return;
      queryClient.setQueryData<ArticlesResponse>(queryKey, {
        ...previousArticle,
        articles: previousArticle.articles.map((article) => {
          if (article.slug === slug) {
            return {
              ...article,
              favorited: !article.favorited,
              favoritesCount: article.favorited ? article.favoritesCount - 1 : article.favoritesCount + 1,
            };
          }
          return article;
        }),
      });
      return { previousArticle };
    },
    onError: (error, variables, context) => {
      if (!context?.previousArticle) return;
      queryClient.setQueryData(queryKey, context?.previousArticle);
    },
  });

  return { ...mutation, favorite: mutation.mutate };
};

export const useUnfavoriteMutation = (query?: ArticleQuery) => {
  const queryClient = useQueryClient();
  const queryKey = getQueryKeyArticleByPathname(query);
  const mutation = useMutation<ArticleDetailsResponse, Error, string, context>({
    mutationFn: articleServices.unfavoriteArticle,
    onMutate: async (slug) => {
      if (!query) return;
      const previousArticle = queryClient.getQueryData<ArticlesResponse>(queryKey);
      if (!previousArticle) return;
      queryClient.setQueryData<ArticlesResponse>(queryKey, {
        ...previousArticle,
        articles: previousArticle.articles.map((article) => {
          if (article.slug === slug) {
            return {
              ...article,
              favorited: !article.favorited,
              favoritesCount: article.favorited ? article.favoritesCount - 1 : article.favoritesCount + 1,
            };
          }
          return article;
        }),
      });
      return { previousArticle };
    },
    onError: (error, variables, context) => {
      if (!context?.previousArticle) return;
      queryClient.setQueryData(queryKey, context?.previousArticle);
    },
  });

  return { ...mutation, unfavorite: mutation.mutate };
};
