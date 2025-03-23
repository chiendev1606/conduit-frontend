import { ArticleQuery } from '@/types/article';

export const queryKeys = {
  users: {
    all: () => ['users'],
    detail: (id: string) => [...queryKeys.users.all(), id],
    me: () => [...queryKeys.users.all(), 'me'],
  },
  profiles: {
    all: () => ['profiles'],
    details: (username: string) => [...queryKeys.profiles.all(), username],
  },
  articles: {
    all: () => ['articles'],
    detail: (id: string) => [...queryKeys.articles.all(), id],
    list: (query: ArticleQuery) => [...queryKeys.articles.all(), query],
    myFeeds: (query: ArticleQuery) => ['my-feeds', query],
    tags: () => ['tags'],
  },
  comments: {
    all: () => ['comments'],
    detail: (slug: string) => [...queryKeys.comments.all(), slug],
  },
};
