import Feeds from '@/components/feeds/feeds';
import useArticlesQuery, { articleQueryOptions } from '@/hooks/queries/use-articles-query';
import { tagQueryOptions } from '@/hooks/queries/use-tag';
import { searchParamsSchema } from '@/schemas/search-feed-list';
import { createFileRoute } from '@tanstack/react-router';
import { useEffect } from 'react';

export const Route = createFileRoute('/_public-layout/')({
  component: HomePage,
  validateSearch: searchParamsSchema,
  loader: ({ context: { queryClient } }) => {
    return Promise.all([
      queryClient.ensureQueryData(articleQueryOptions({ offset: 0, limit: 10 })),
      queryClient.ensureQueryData(tagQueryOptions),
    ]);
  },
});

function HomePage() {
  const { page, limit, tag, author, favorited } = Route.useSearch();
  const navigate = Route.useNavigate();
  const offset = (page - 1) * limit;
  const activeTab = window.location.pathname.includes('/my-feed') ? 'your' : 'global';
  const { data: articles, isLoading } = useArticlesQuery({ offset, limit, tag, author, favorited });

  useEffect(() => {
    document.getElementById('loading-global')?.remove();
  }, []);

  return (
    <div>
      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="py-8">
          <Feeds
            isLoading={isLoading}
            navigate={navigate}
            activeTab={activeTab}
            articles={articles?.articles ?? []}
            articlesCount={articles?.articlesCount ?? 0}
            limit={limit}
            page={page}
            selectedTag={tag}
          />
        </div>
      </main>
    </div>
  );
}
