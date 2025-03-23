import { useQuery } from '@tanstack/react-query';
import { TagsResponse } from '@/types/tag';
import { articleServices } from '@/services/article-services';
import { queryKeys } from './query-key';

function useTagsQuery() {
  return useQuery<TagsResponse>({
    queryKey: queryKeys.articles.tags(),
    queryFn: () => articleServices.getPopularTags(),
  });
}

export default useTagsQuery;
