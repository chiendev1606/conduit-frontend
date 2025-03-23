import { articleServices } from '@/services/article-services';
import { ArticleQuery } from '@/types/article';
import { useQuery } from '@tanstack/react-query';
import { queryKeys } from './query-key';

export const myFeedsQueryOptions = (query: ArticleQuery) => ({
  queryKey: queryKeys.articles.myFeeds(query),
  queryFn: () => articleServices.getMyFeeds(query),
  staleTime: 0,
  retry: false,
  refetchOnWindowFocus: false,
  refetchOnMount: false,
  refetchOnReconnect: false,
});

function useMyFeedsQuery(query?: ArticleQuery) {
  return useQuery(myFeedsQueryOptions(query ?? {}));
}

export default useMyFeedsQuery;
