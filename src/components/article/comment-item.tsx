import { CommentItem as CommentItemType } from '@/types/comment';
import { formatDate } from '@/utils/date';
import { MoreVertical } from 'lucide-react';
import { CommentDropdown } from './comment-dropdown';
import { SanitizedHtml } from '@/components/common';

interface CommentItemProps {
  comment: CommentItemType;
  isOwner: boolean;
  isDropdownOpen: boolean;
  toggleDropdown: (id: number) => void;
  onEdit: (comment: CommentItemType) => void;
  onDelete: (commentId: number) => void;
  isDeletingComment: boolean;
}

export const CommentItem = ({
  comment,
  isOwner,
  isDropdownOpen,
  toggleDropdown,
  onEdit,
  onDelete,
  isDeletingComment,
}: CommentItemProps) => {
  return (
    <div className="rounded-md border p-4">
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <img
            src={'https://www.gravatar.com/avatar/?d=identicon'}
            alt={comment.author.username}
            className="h-8 w-8 rounded-full"
          />
          <div>
            <span className="font-medium text-green-500">{comment.author.username}</span>
            <span className="ml-2 text-sm text-gray-400">{formatDate(comment.createdAt)}</span>
          </div>
        </div>

        {isOwner && (
          <div className="relative">
            <button
              onClick={() => toggleDropdown(comment.id)}
              className="p-1 text-gray-400 hover:text-gray-600 focus:outline-none"
            >
              <MoreVertical size={16} />
            </button>

            <CommentDropdown
              comment={comment}
              isOpen={isDropdownOpen}
              onClose={() => toggleDropdown(comment.id)}
              onEdit={onEdit}
              onDelete={onDelete}
              isDeleting={isDeletingComment}
            />
          </div>
        )}
      </div>

      <SanitizedHtml
        html={comment.body}
        className="prose prose-sm max-w-none text-gray-700"
      />
    </div>
  );
};
