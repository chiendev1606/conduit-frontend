import LoadingScreen from '@/components/common/loading-screen';
import Feeds from '@/components/feeds/feeds';
import { Banner } from '@/components/home';
import useMyFeedsQuery, { myFeedsQueryOptions } from '@/hooks/queries/use-my-feeds-query';
import { searchParamsSchema } from '@/schemas/search-feed-list';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_auth-layout/my-feed')({
  component: RouteComponent,
  validateSearch: searchParamsSchema,
  loader: async ({ context: { queryClient } }) => {
    return queryClient.ensureQueryData(myFeedsQueryOptions({ offset: 0, limit: 10 }));
  },
  pendingComponent: LoadingScreen,
});

function RouteComponent() {
  const navigate = Route.useNavigate();
  const { page, limit, tag, author, favorited } = Route.useSearch();
  const offset = (page - 1) * limit;
  const { data: articles, isLoading } = useMyFeedsQuery({ offset, limit, tag, author, favorited });
  const router = Route.useMatch();

  const activeTab = router.pathname.includes('/my-feed') ? 'your' : 'global';

  return (
    <div>
      <Banner />
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
