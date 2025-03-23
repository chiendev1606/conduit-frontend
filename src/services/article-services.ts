import { ArticleDetailsResponse, ArticleQuery, ArticlesResponse, CreateArticleRequest } from '@/types/article';
import BaseServices from './base-services';
import { CommentResponse, CreateCommentRequest } from '@/types/comment';
import { TagsResponse } from '@/types/tag';

export class ArticleServices extends BaseServices {
  private static instance: ArticleServices;
  constructor() {
    super('/api/articles');
  }

  static getInstance() {
    if (!this.instance) {
      this.instance = new ArticleServices();
    }
    return this.instance;
  }

  getArticles = async (query: ArticleQuery) => {
    return this.get<ArticlesResponse>('', query);
  };

  getArticleDetails = async (slug: string) => {
    return this.get<ArticleDetailsResponse>(`/${slug}`);
  };

  createArticle = async (article: CreateArticleRequest) => {
    return this.post<ArticleDetailsResponse>('', { article });
  };

  favoriteArticle = async (slug: string) => {
    return this.post<ArticleDetailsResponse>(`/${slug}/favorite`);
  };

  unfavoriteArticle = async (slug: string) => {
    return this.delete<ArticleDetailsResponse>(`/${slug}/favorite`);
  };

  getCommentsByArticleSlug = async (slug: string) => {
    return this.get<CommentResponse>(`/${slug}/comments`);
  };

  createComment = async ({ slug, comment }: { slug: string; comment: CreateCommentRequest }) => {
    return this.post(`/${slug}/comments`, comment);
  };

  updateComment = async ({
    slug,
    commentId,
    comment,
  }: {
    slug: string;
    commentId: number;
    comment: CreateCommentRequest;
  }) => {
    return this.put(`/${slug}/comments/${commentId}`, comment);
  };

  deleteComment = async ({ slug, commentId }: { slug: string; commentId: number }) => {
    return this.delete(`/${slug}/comments/${commentId}`);
  };

  getMyFeeds = async (query: ArticleQuery) => {
    return this.get<ArticlesResponse>('/feeds', query);
  };

  getPopularTags = async () => {
    return this.get<TagsResponse>('/tags');
  };
}

export const articleServices = ArticleServices.getInstance();
