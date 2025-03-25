import { Pagination, TabItem, Tabs } from '@/components/common';
import FeedList from '@/components/home/feed-list';
import useArticlesQuery from '@/hooks/queries/use-articles-query';
import { useProfileQuery } from '@/hooks/queries/use-profile-query';
import { searchParamsSchema } from '@/schemas/search-feed-list';
import { createFileRoute } from '@tanstack/react-router';
import { useCallback, useState } from 'react';

export const Route = createFileRoute('/_auth-layout/profile')({
  component: ProfilePage,
  validateSearch: searchParamsSchema,
});

function ProfilePage() {
  const [activeTab, setActiveTab] = useState<'my' | 'favorited'>('my');
  const navigate = Route.useNavigate();
  const { user, isLoading: isProfileLoading } = useProfileQuery();
  const { page, limit, tag } = Route.useSearch();
  const offset = (page - 1) * limit;
  const { data: articlesData, isLoading: isArticlesLoading } = useArticlesQuery({
    offset,
    limit,
    tag,
    author: activeTab === 'my' ? user?.id?.toString() : undefined,
    favorited: activeTab === 'favorited' ? '1' : undefined,
  });

  const handleTabChange = useCallback((tab: string) => {
    setActiveTab(tab as 'my' | 'favorited');
  }, []);

  const renderContent = () => {
    if (isArticlesLoading) {
      return <div className="flex justify-center py-8">Loading articles...</div>;
    }

    if (articlesData?.articles?.length) {
      return <FeedList articles={articlesData.articles} />;
    }

    return <div className="flex justify-center py-8 text-gray-500">No articles are here... yet.</div>;
  };

  // Define tabs for the profile
  const tabs: TabItem[] = [
    {
      id: 'my',
      label: 'My Articles',
    },
    {
      id: 'favorited',
      label: 'Favorited Articles',
    },
  ];

  if (isProfileLoading) {
    return <div className="container mx-auto px-4 py-8">Loading profile...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8 rounded-lg bg-gray-100 p-8">
        <div className="flex flex-col items-center">
          <img
            src={user?.image}
            alt={`${user?.username}'s avatar`}
            className="mb-4 h-24 w-24 rounded-full"
          />
          <h1 className="mb-2 text-2xl font-bold">{user?.username}</h1>
          {user?.bio && <p className="mb-4 text-center text-gray-600">{user?.bio}</p>}
        </div>
      </div>

      <div className="mb-6">
        <Tabs
          tabs={tabs}
          activeTab={activeTab}
          onTabChange={handleTabChange}
        />
      </div>

      {renderContent()}

      {articlesData?.articlesCount && articlesData?.articlesCount > 10 && (
        <Pagination
          pageCount={Math.ceil((articlesData?.articlesCount ?? 0) / limit)}
          currentPage={page - 1}
          onPageChange={(selectedItem) => {
            const newPage = selectedItem.selected + 1;
            navigate({ search: { page: newPage } });
          }}
        />
      )}
    </div>
  );
}
