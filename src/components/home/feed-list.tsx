import { Article } from '@/types/article';
import React from 'react';
import { FeedItem } from './feed-item';

interface FeedListProps {
  articles: Article[];
}

export default function FeedList({ articles }: React.PropsWithChildren<FeedListProps>) {
  return (
    <div className="divide-y divide-gray-200">
      {articles.map((item) => (
        <FeedItem
          key={item.slug}
          data={item}
        />
      ))}
    </div>
  );
}
