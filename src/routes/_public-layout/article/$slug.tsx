import { ArticleComments } from '@/components/article/article-comments';
import { ArticleContent } from '@/components/article/article-content';
import { ArticleMeta } from '@/components/article/article-meta';
import LoadingScreen from '@/components/common/loading-screen';
import Error404 from '@/components/error/error-404';
import { articleDetailsQueryOptions, useArticleDetailsQuery } from '@/hooks/queries/use-article-details-query';
import useCommentsQuery, { commentQueryOptions } from '@/hooks/queries/use-comments.query';
import { delay } from '@/utils';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_public-layout/article/$slug')({
  component: ArticlePage,
  loader: async ({ params, context: { queryClient } }) => {
    await delay(2000);
    await queryClient.ensureQueryData(commentQueryOptions(params.slug));
    return queryClient.ensureQueryData(articleDetailsQueryOptions(params.slug));
  },
  pendingComponent: LoadingScreen,
  errorComponent: () => <Error404 />,
});

function ArticlePage() {
  const { slug } = Route.useParams();
  const { article } = useArticleDetailsQuery(slug);
  const { comments } = useCommentsQuery(slug);

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
          />
        </div>
      </div>

      {/* Article Body and Comments */}
      <div className="container mx-auto px-4">
        <ArticleComments
          comments={comments}
          authorArticle={article.author}
        />
      </div>
    </div>
  );
}
