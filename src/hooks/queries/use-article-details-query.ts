import { useSuspenseQuery } from '@tanstack/react-query';
import { queryKeys } from './query-key';
import { articleServices } from '@/services/article-services';

export const articleDetailsQueryOptions = (slug: string) => ({
  queryKey: queryKeys.articles.detail(slug),
  queryFn: () => articleServices.getArticleDetails(slug),
  enabled: !!slug,
});

export const useArticleDetailsQuery = (slug: string) => {
  const query = useSuspenseQuery(articleDetailsQueryOptions(slug));
  return { ...query, article: query.data?.article ?? [] };
};
