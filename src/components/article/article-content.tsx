interface ArticleContentProps {
  title: string;
  body: string;
}
import { SanitizedHtml } from '../common';

export const ArticleContent = ({ title, body }: ArticleContentProps) => {
  return (
    <div className="py-8">
      <h1 className="mb-4 text-4xl font-semibold">{title}</h1>
      <SanitizedHtml
        html={body}
        className="prose max-w-none whitespace-pre-wrap"
      />
    </div>
  );
};
