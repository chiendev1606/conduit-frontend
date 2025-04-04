import { useFavoriteMutation, useUnfavoriteMutation } from '@/hooks/mutations/use-favorite-mutation';
import { useProfileQuery } from '@/hooks/queries/use-profile-query';
import { Article } from '@/types/article';
import { formatDate } from '@/utils/date';
import { Link, useRouter, useRouterState, useSearch } from '@tanstack/react-router';
import { useMemo } from 'react';

interface FeedItemProps {
  data: Article;
}

export const FeedItem = ({ data }: FeedItemProps) => {
  const routerState = useRouterState();
  const isHomepage = routerState.location.pathname === '/';
  const search = useSearch({ from: isHomepage ? '/_public-layout/' : '/_auth-layout/my-feed', shouldThrow: false });

  const articleQuery = useMemo(() => {
    return {
      offset: ((search?.page ?? 1) - 1) * (search?.limit ?? 10),
      limit: search?.limit ?? 10,
      tag: search?.tag,
      author: search?.author,
      favorited: search?.favorited,
    };
  }, []);

  const { favorite, isPending: isFavoritePending } = useFavoriteMutation(articleQuery);
  const { unfavorite, isPending: isUnfavoritePending } = useUnfavoriteMutation(articleQuery);

  const { navigate } = useRouter();
  const { user } = useProfileQuery();
  const handleFavorite = () => {
    if (isFavoritePending || isUnfavoritePending) return;
    if (!user) {
      navigate({ to: '/sign-in' });
      return;
    }
    if (data.favorited) {
      unfavorite(data.slug);
    } else {
      favorite(data.slug);
    }
  };

  return (
    <article className="border-b border-gray-200 py-6">
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center">
          <img
            src={data.author.image}
            alt={data.author.username}
            className="h-10 w-10 rounded-full"
          />
          <div className="ml-3">
            <p className="text-sm font-medium text-green-600">{data.author.username}</p>
            <p className="text-xs text-gray-500">{formatDate(data.createdAt)}</p>
          </div>
        </div>
        <button
          className="flex items-center space-x-1 rounded-md border border-green-500 px-3 py-1 text-sm text-green-600 hover:bg-green-50"
          onClick={handleFavorite}
        >
          <svg
            className="h-4 w-4"
            fill={data.favorited ? 'oklch(0.723 0.219 149.579)' : 'none'}
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
            />
          </svg>
          <span>{data.favoritesCount}</span>
        </button>
      </div>
      <h2 className="mb-2 text-xl font-bold text-gray-900">
        <Link
          to="/article/$slug"
          params={{ slug: data.slug }}
          preload={false}
        >
          {data.title}
        </Link>
      </h2>
      <p className="mb-4 text-gray-500">{data.description.slice(0, 100)}...</p>
      <div className="flex items-center justify-between">
        <Link
          to="/article/$slug"
          params={{ slug: data.slug }}
          className="cursor-pointer"
          preload={false}
        >
          <button className="text-sm text-gray-500 hover:text-gray-700">Read more...</button>
        </Link>
        <div className="flex flex-wrap gap-2">
          {data.tagList.map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-gray-100 px-2 py-1 text-xs text-gray-600"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </article>
  );
};
