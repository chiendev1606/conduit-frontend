interface ArticleContentProps {
  title: string;
  body: string;
}

export const ArticleContent = ({ title, body }: ArticleContentProps) => {
  return (
    <div className="py-8">
      <h1 className="mb-4 text-4xl font-semibold">{title}</h1>
      <div className="prose max-w-none">{body}</div>
    </div>
  );
};
