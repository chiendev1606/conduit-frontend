import { useFollowMutation, useUnFollowMutation } from '@/hooks/mutations/use-follow-mutation';
import { queryKeys } from '@/hooks/queries/query-key';
import { formatDate } from '@/utils/date';
import { useQueryClient } from '@tanstack/react-query';
import { useParams } from '@tanstack/react-router';

interface ArticleMetaProps {
  username: string;
  createdAt: string;
  following?: boolean;
  favorited?: boolean;
  favoritesCount?: number;
  onFavorite?: () => void;
}

export const ArticleMeta = ({
  username,
  createdAt,
  following,
  favorited = false,
  favoritesCount = 0,
  onFavorite,
}: ArticleMetaProps) => {
  const { followUser } = useFollowMutation();
  const { unFollowUser } = useUnFollowMutation();
  const { articleId } = useParams({ from: '/_public-layout/article/$articleId' });

  const queryClient = useQueryClient();

  const handleFollow = () => {
    const onSuccess = () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.articles.detail(articleId) });
    };

    if (following) {
      unFollowUser(username, { onSuccess });
    } else {
      followUser(username, { onSuccess });
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
        <button
          onClick={handleFollow}
          className={`rounded-md border px-3 py-1 text-sm ${
            following ? 'border-gray-400 bg-gray-200 text-gray-600' : 'border-gray-300 text-gray-400 hover:bg-gray-50'
          }`}
        >
          {following ? 'Following' : 'Follow'} {username}
        </button>
        <button
          onClick={onFavorite}
          className={`rounded-md border px-3 py-1 text-sm ${
            favorited ? 'border-green-500 bg-green-500 text-white' : 'border-green-500 text-green-500 hover:bg-green-50'
          }`}
        >
          {favorited ? 'Favorited' : 'Favorite'} Post ({favoritesCount})
        </button>
      </div>
    </div>
  );
};
