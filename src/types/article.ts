import { AuthorArticle } from './user';

export type ArticleQuery = {
  tag?: string;
  author?: string;
  favorited?: string;
  limit?: number;
  offset?: number;
};

export type CreateArticleRequest = {
  title: string;
  description: string;
  body: string;
  tagList?: string[];
};

export type UpdateArticleRequest = Partial<Omit<CreateArticleRequest, 'tagList'>>;

export type Article = {
  slug: string;
  title: string;
  description: string;
  body: string;
  tagList: string[];
  createdAt: string;
  updatedAt: string;
  favorited: boolean;
  favoritesCount: number;
  author: AuthorArticle;
};

export type ArticlesResponse = {
  articles: Article[];
  articlesCount: number;
};

export type ArticleDetailsResponse = {
  article: Article;
};
