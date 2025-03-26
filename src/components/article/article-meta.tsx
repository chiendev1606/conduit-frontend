import { useFavoriteMutation, useUnfavoriteMutation } from '@/hooks/mutations/use-favorite-mutation';
import { useFollowMutation, useUnFollowMutation } from '@/hooks/mutations/use-follow-mutation';
import { queryKeys } from '@/hooks/queries/query-key';
import { useProfileQuery } from '@/hooks/queries/use-profile-query';
import { formatDate } from '@/utils/date';
import { useQueryClient } from '@tanstack/react-query';
import { useParams } from '@tanstack/react-router';

interface ArticleMetaProps {
  username: string;
  createdAt: string;
  following?: boolean;
  favorited?: boolean;
  favoritesCount?: number;
}

export const ArticleMeta = ({ username, createdAt, following, favorited, favoritesCount = 0 }: ArticleMetaProps) => {
  const { followUser, isPending: isFollowPending } = useFollowMutation();
  const { unFollowUser, isPending: isUnfollowPending } = useUnFollowMutation();
  const { unfavorite, isPending: isUnfavoritePending } = useUnfavoriteMutation();
  const { favorite, isPending: isFavoritePending } = useFavoriteMutation();
  const { slug } = useParams({ from: '/_public-layout/article/$slug' });
  const { user } = useProfileQuery();
  const isAuthor = user?.username === username;
  const queryClient = useQueryClient();

  const refetchArticle = () => {
    queryClient.invalidateQueries({ queryKey: queryKeys.articles.detail(slug) });
  };

  const handleFollow = () => {
    if (isFollowPending || isUnfollowPending) return;
    if (following) {
      unFollowUser(username, { onSuccess: refetchArticle });
    } else {
      followUser(username, { onSuccess: refetchArticle });
    }
  };

  const handleFavorite = () => {
    if (isFavoritePending || isUnfavoritePending) return;
    if (favorited) {
      unfavorite(slug, { onSuccess: refetchArticle });
    } else {
      favorite(slug, { onSuccess: refetchArticle });
    }
  };

  return (
    <div className="flex items-center space-x-4">
      <img
        src={`https://i.pravatar.cc/300`}
        alt={username}
        className="h-8 w-8 rounded-full"
      />
      <div className="flex flex-col">
        {username}

        <span className="text-sm text-gray-400">{formatDate(createdAt)}</span>
      </div>
      <div className="ml-auto flex items-center space-x-2">
        {!isAuthor && (
          <button
            onClick={handleFollow}
            className={`rounded-md border px-3 py-1 text-sm ${
              following ? 'border-gray-400 bg-gray-200 text-gray-600' : 'border-gray-300 text-gray-400 hover:bg-gray-50'
            }`}
          >
            {following ? 'Following' : 'Follow'} {username}
          </button>
        )}
        <button
          onClick={handleFavorite}
          className={`cursor-pointer rounded-md border px-3 py-1 text-sm ${
            favorited ? 'border-green-500 bg-green-500 text-white' : 'border-green-500 text-green-500 hover:bg-green-50'
          }`}
        >
          {favorited ? 'Favorited' : 'Favorite'} Post ({favoritesCount})
        </button>
      </div>
    </div>
  );
};
