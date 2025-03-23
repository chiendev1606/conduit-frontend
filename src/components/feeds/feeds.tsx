import { Article } from '@/types/article';
import { UseNavigateResult } from '@tanstack/react-router';
import { Pagination } from '../common';
import { FeedToggle, TagList } from '../home';
import FeedList from '../home/feed-list';
import Loading from '../loading';
import useTagsQuery from '@/hooks/queries/use-tag';

type FeedsProps = Readonly<{
  navigate: UseNavigateResult<'/'>;
  articles: Article[];
  articlesCount: number;
  limit: number;
  page: number;
  activeTab: 'your' | 'global';
  isLoading: boolean;
  selectedTag?: string;
}>;

function Feeds({ navigate, articles, articlesCount, limit, page, activeTab, isLoading, selectedTag }: FeedsProps) {
  const { data: tagsData } = useTagsQuery();
  const popularTags = tagsData?.tags ?? [];

  const handleTagClick = (tag: string) => {
    if (selectedTag === tag) {
      clearSelectedTag();
    } else {
      navigate({ search: { tag } });
    }
  };

  const clearSelectedTag = () => {
    navigate({
      search: (prev) => {
        const { tag, ...rest } = prev;
        return rest;
      },
    });
  };

  return (
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
      <div className="lg:col-span-2">
        <FeedToggle
          activeTab={activeTab}
          onTabChange={() => {
            if (activeTab === 'global') {
              navigate({ to: '/my-feed' });
            } else {
              navigate({ to: '/' });
            }
          }}
        />

        {selectedTag && (
          <div className="mt-2 flex items-center">
            <span className="rounded-full bg-green-100 px-3 py-1 text-xs text-green-800">#{selectedTag}</span>
            <button
              onClick={clearSelectedTag}
              className="ml-2 text-xs text-gray-500 hover:text-gray-700"
            >
              <span aria-hidden="true">&times;</span> Clear
            </button>
          </div>
        )}

        <div className="divide-y divide-gray-200">
          {isLoading ? (
            <div className="flex min-h-[500px] items-center justify-center">
              <Loading />
            </div>
          ) : (
            <FeedList articles={articles} />
          )}
        </div>
        {!isLoading && articlesCount > 10 && (
          <Pagination
            pageCount={Math.ceil((articlesCount ?? 0) / limit)}
            currentPage={page - 1}
            onPageChange={(selectedItem) => {
              const newPage = selectedItem.selected + 1;
              navigate({ to: '/', search: { page: newPage } });
            }}
          />
        )}
      </div>

      {/* Sidebar */}
      <div className="lg:col-span-1">
        <TagList
          selectedTag={selectedTag}
          tags={popularTags.map((tag) => tag.name)}
          onTagClick={handleTagClick}
        />
      </div>
    </div>
  );
}

export default Feeds;
