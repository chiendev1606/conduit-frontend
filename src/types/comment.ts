import { AuthorArticle } from './user';

export type CommentItem = {
  id: number;
  createdAt: string;
  updatedAt: string;
  body: string;
  author: AuthorArticle;
};

export type CommentResponse = {
  comments: CommentItem[];
};

export type CreateCommentRequest = {
  comment: {
    body: string;
  };
};
