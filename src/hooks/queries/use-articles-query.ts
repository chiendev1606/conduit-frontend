import { ArticleQuery } from '@/types/article';
import { useQuery } from '@tanstack/react-query';
import { queryKeys } from './query-key';
import { articleServices } from '@/services/article-services';

export const articleQueryOptions = (query: ArticleQuery) => ({
  queryKey: queryKeys.articles.list(query),
  queryFn: () => articleServices.getArticles(query),
  staleTime: 0,
});

function useArticlesQuery(query?: ArticleQuery) {
  return useQuery(articleQueryOptions(query ?? {}));
}

export default useArticlesQuery;
