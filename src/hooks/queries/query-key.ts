import { ArticleQuery } from '@/types/article';

export const queryKeys = {
  users: {
    all: () => ['users'],
    detail: (id: string) => [...queryKeys.users.all(), id],
    me: () => [...queryKeys.users.all(), 'me'],
  },
  articles: {
    all: () => ['articles'],
    detail: (id: string) => [...queryKeys.articles.all(), id],
    list: (query: ArticleQuery) => [...queryKeys.articles.all(), query],
  },
};
