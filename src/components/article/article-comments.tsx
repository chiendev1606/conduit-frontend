import {
  useCreateCommentMutation,
  useDeleteCommentMutation,
  useUpdateCommentMutation,
} from '@/hooks/mutations/use-comments-mutation';
import { CommentItem as CommentItemType } from '@/types/comment';
import { AuthorArticle } from '@/types/user';
import { useParams } from '@tanstack/react-router';
import { useProfileQuery } from '@/hooks/queries/use-profile-query';
import { useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { CommentForm } from './comment-form';
import { CommentItem } from './comment-item';

interface ArticleCommentsProps {
  comments: CommentItemType[];
  authorArticle?: AuthorArticle;
}

export const ArticleComments = ({ comments, authorArticle }: ArticleCommentsProps) => {
  const { user } = useProfileQuery();
  const getAllowedDelete = (comment: CommentItemType) =>
    user?.id === comment?.author?.id || user?.id === authorArticle?.id;
  const queryClient = useQueryClient();
  const [editingComment, setEditingComment] = useState<CommentItemType | null>(null);
  const [openDropdownId, setOpenDropdownId] = useState<number | null>(null);

  const { createComment, isPending: isCreatingComment } = useCreateCommentMutation();
  const { deleteComment, isPending: isDeletingComment } = useDeleteCommentMutation();
  const { updateComment, isPending: isUpdatingComment } = useUpdateCommentMutation();
  const { user } = useProfileQuery();

  const refetchComments = () => {
    queryClient.invalidateQueries({ queryKey: ['comments'] });
  };

  const { slug } = useParams({ from: '/_public-layout/article/$slug' });

  const handleCreateComment = async (comment: string) => {
    createComment(
      { slug: slug, comment: { comment: { body: comment } } },
      {
        onSuccess: () => {
          refetchComments();
        },
      },
    );
  };

  // Handle edit mode toggle
  const handleEditClick = (comment: CommentItemType) => {
    setEditingComment(comment);
  };

  // Handle cancel edit
  const handleCancelEdit = () => {
    setEditingComment(null);
  };

  // Handle save edit
  const handleSaveEdit = async (updatedComment: string) => {
    if (!editingComment) return;

    updateComment(
      { slug: slug, commentId: editingComment.id, comment: { comment: { body: updatedComment } } },
      {
        onSuccess: () => {
          refetchComments();
          setEditingComment(null);
        },
      },
    );
  };

  // Toggle dropdown menu
  const toggleDropdown = (commentId: number) => {
    setOpenDropdownId(openDropdownId === commentId ? null : commentId);
  };

  const handleFormSubmit = async (commentText: string) => {
    if (editingComment) {
      await handleSaveEdit(commentText);
    } else {
      await handleCreateComment(commentText);
    }
  };

  const handleDeleteComment = (commentId: number) => {
    deleteComment(
      { slug: slug, commentId },
      {
        onSuccess: () => {
          refetchComments();
        },
      },
    );
  };

  return (
    <div className="mx-auto max-w-3xl py-8">
      {/* Comment Form */}
      {!!user && (
        <div className="comment-form-container mb-8">
          <h3 className="mb-3 text-lg font-medium">{editingComment ? 'Edit Comment' : 'Add Comment'}</h3>
          <CommentForm
            initialValue={editingComment ? editingComment.body : ''}
            onSubmit={handleFormSubmit}
            onCancel={editingComment ? handleCancelEdit : undefined}
            isLoading={isCreatingComment || isUpdatingComment}
            submitLabel={editingComment ? 'Update Comment' : 'Post Comment'}
            key={editingComment ? `edit-${editingComment.id}` : 'create'}
          />
        </div>
      )}

      {/* Comments List */}
      <div className="space-y-6">
        {comments.map((comment) => (
          <CommentItem
            key={comment.id}
            comment={comment}
            isOwner={getAllowedDelete(comment)}
            isDropdownOpen={openDropdownId === comment.id}
            toggleDropdown={toggleDropdown}
            onEdit={handleEditClick}
            onDelete={handleDeleteComment}
            isDeletingComment={isDeletingComment}
          />
        ))}
      </div>
    </div>
  );
};
