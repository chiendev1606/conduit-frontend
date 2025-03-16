import { ArticleDetailsResponse, ArticleQuery, ArticlesResponse } from '@/types/article';
import BaseServices from './base-services';

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
}

export const articleServices = ArticleServices.getInstance();
