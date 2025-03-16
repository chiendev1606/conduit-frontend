import { ArticleComments } from '@/components/article/article-comments';
import { ArticleContent } from '@/components/article/article-content';
import { ArticleMeta } from '@/components/article/article-meta';
import Error404 from '@/components/error/error-404';
import Loading from '@/components/loading';
import { articleDetailsQueryOptions, useArticleDetailsQuery } from '@/hooks/queries/use-article-details-query';
import { delay } from '@/utils';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_public-layout/article/$articleId')({
  component: ArticlePage,
  loader: async ({ params, context }) => {
    await delay(2000);
    return context.queryClient.ensureQueryData(articleDetailsQueryOptions(params.articleId));
  },
  pendingComponent: () => (
    <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
      <Loading />
    </div>
  ),
  errorComponent: () => <Error404 />,
});

function ArticlePage() {
  const { articleId } = Route.useParams();
  const { data } = useArticleDetailsQuery(articleId);
  const article = data?.article;

  const comments = [
    {
      id: 1,
      body: 'werdgfdghfghfg',
      createdAt: '2024-03-14',
      author: {
        username: 'dimitris',
        image: 'https://api.realworld.io/images/dimitris.jpg',
      },
    },
  ];

  return (
    <div>
      {/* Article Header */}
      <div className="bg-gray-800 py-8 text-white">
        <div className="container mx-auto px-4">
          <ArticleContent
            title={article?.title}
            body={article?.body}
          />
          <ArticleMeta
            username={article?.author?.username}
            createdAt={article?.createdAt}
            favorited={article?.favorited}
            following={article?.author?.following}
            favoritesCount={article?.favoritesCount}
            onFavorite={() => console.log('favorite')}
          />
        </div>
      </div>

      {/* Article Body and Comments */}
      <div className="container mx-auto px-4">
        <ArticleComments
          comments={comments}
          onPostComment={(comment) => console.log('post comment', comment)}
          onDeleteComment={(id) => console.log('delete comment', id)}
          currentUser="dimitris"
        />
      </div>
    </div>
  );
}
