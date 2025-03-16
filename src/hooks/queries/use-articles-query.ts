import { ArticleQuery } from '@/types/article';
import { useQuery } from '@tanstack/react-query';
import { queryKeys } from './query-key';
import { articleServices } from '@/services/article-services';

const articleQueryOptions = (query: ArticleQuery) => ({
  queryKey: queryKeys.articles.list(query),
  queryFn: () => articleServices.getArticles(query),
});

function useArticlesQuery(query?: ArticleQuery) {
  return useQuery(articleQueryOptions(query ?? {}));
}

export default useArticlesQuery;
