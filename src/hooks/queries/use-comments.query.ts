import { useQuery } from '@tanstack/react-query';
import { queryKeys } from './query-key';
import { articleServices } from '@/services/article-services';

export const commentQueryOptions = (slug: string) => ({
  queryKey: queryKeys.comments.detail(slug),
  queryFn: () => articleServices.getCommentsByArticleSlug(slug),
});

function useCommentsQuery(slug: string) {
  const query = useQuery(commentQueryOptions(slug));

  return { ...query, comments: query.data?.comments ?? [] };
}

export default useCommentsQuery;
