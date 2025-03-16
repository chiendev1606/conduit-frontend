import { formatDate } from '@/utils/date';

interface Comment {
  id: number;
  body: string;
  createdAt: string;
  author: {
    username: string;
    image: string;
  };
}

interface ArticleCommentsProps {
  comments: Comment[];
  onPostComment: (comment: string) => void;
  onDeleteComment?: (commentId: number) => void;
  currentUser?: string;
}

export const ArticleComments = ({ comments, onPostComment, onDeleteComment, currentUser }: ArticleCommentsProps) => {
  return (
    <div className="mx-auto max-w-3xl py-8">
      {/* Comment Form */}
      <div className="mb-8">
        <textarea
          className="w-full rounded-md border p-4 focus:ring-2 focus:ring-green-500 focus:outline-none"
          rows={4}
          placeholder="Write a comment..."
        />
        <div className="mt-4 flex justify-end">
          <button
            className="rounded-md bg-green-500 px-4 py-2 text-white hover:bg-green-600"
            onClick={() => onPostComment('')}
          >
            Post Comment
          </button>
        </div>
      </div>

      {/* Comments List */}
      <div className="space-y-6">
        {comments.map((comment) => (
          <div
            key={comment.id}
            className="rounded-md border p-4"
          >
            <div className="mb-4 flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <img
                  src={comment.author.image}
                  alt={comment.author.username}
                  className="h-8 w-8 rounded-full"
                />
                <div>
                  <span className="font-medium text-green-500">{comment.author.username}</span>
                  <span className="ml-2 text-sm text-gray-400">{formatDate(comment.createdAt)}</span>
                </div>
              </div>
              {currentUser === comment.author.username && onDeleteComment && (
                <button
                  onClick={() => onDeleteComment(comment.id)}
                  className="text-red-500 hover:text-red-700"
                >
                  Delete
                </button>
              )}
            </div>
            <p className="text-gray-700">{comment.body}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
