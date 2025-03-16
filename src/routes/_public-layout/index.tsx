import { Pagination } from '@/components/common';
import { Banner, FeedToggle, TagList } from '@/components/home';
import FeedList from '@/components/home/feed-list';
import useArticlesQuery from '@/hooks/queries/use-articles-query';
import { createFileRoute } from '@tanstack/react-router';
import { useState } from 'react';
import { z } from 'zod';

const searchParamsSchema = z.object({
  page: z.number().optional().default(1),
  limit: z.number().optional().default(10),
  tag: z.string().optional(),
  author: z.string().optional(),
  favorited: z.string().optional(),
});

export const Route = createFileRoute('/_public-layout/')({
  component: HomePage,
  validateSearch: searchParamsSchema,
});

function HomePage() {
  const [activeTab, setActiveTab] = useState<'your' | 'global'>('global');
  const { page, limit, tag, author, favorited } = Route.useSearch();
  const offset = (page - 1) * limit;
  const navigate = Route.useNavigate();

  const { data: articles } = useArticlesQuery({ offset, limit, tag, author, favorited });

  const popularTags = [
    'Angular',
    'Signals',
    'Development',
    'talwindcss',
    'hello',
    'hi',
    'user@example.com',
    'realword',
    'installation',
    'Blog',
    'NEWS',
    'tag',
  ];

  const handleTagClick = (tag: string) => {
    console.log('Tag clicked:', tag);
    // Implement tag filtering logic here
  };

  return (
    <div>
      <Banner />
      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="py-8">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <FeedToggle
                activeTab={activeTab}
                onTabChange={setActiveTab}
              />
              <div className="divide-y divide-gray-200">
                <FeedList articles={articles?.articles ?? []} />
              </div>
              <Pagination
                pageCount={Math.ceil((articles?.articlesCount ?? 0) / limit)}
                currentPage={page - 1}
                onPageChange={(selectedItem) => {
                  const newPage = selectedItem.selected + 1;
                  navigate({ to: '/', search: { page: newPage } });
                }}
              />
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <TagList
                tags={popularTags}
                onTagClick={handleTagClick}
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
