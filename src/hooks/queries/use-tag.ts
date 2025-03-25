import { articleServices } from '@/services/article-services';
import { useQuery } from '@tanstack/react-query';
import { queryKeys } from './query-key';

export const tagQueryOptions = {
  queryKey: queryKeys.articles.tags(),
  queryFn: () => articleServices.getPopularTags(),
};

function useTagsQuery() {
  return useQuery(tagQueryOptions);
}

export default useTagsQuery;
