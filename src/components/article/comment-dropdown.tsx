import { useRef } from 'react';
import { Pencil, Trash } from 'lucide-react';
import { useClickOutside } from '@/hooks/use-click-outside';
import { CommentItem } from '@/types/comment';

interface CommentDropdownProps {
  comment: CommentItem;
  isOpen: boolean;
  onClose: () => void;
  onEdit: (comment: CommentItem) => void;
  onDelete: (commentId: number) => void;
  isDeleting?: boolean;
}

export const CommentDropdown = ({
  comment,
  isOpen,
  onClose,
  onEdit,
  onDelete,
  isDeleting = false,
}: CommentDropdownProps) => {
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useClickOutside(dropdownRef, onClose, isOpen);

  if (!isOpen) return null;

  return (
    <div
      ref={dropdownRef}
      className="ring-opacity-5 absolute right-0 z-10 mt-2 w-48 rounded-md bg-white py-1 shadow-lg ring-1 ring-black"
    >
      <button
        onClick={() => {
          onEdit(comment);
          onClose();
        }}
        className="flex w-full items-center px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100"
      >
        <Pencil
          size={14}
          className="mr-2"
        />
        Edit Comment
      </button>
      <button
        onClick={() => {
          onDelete(comment.id);
          onClose();
        }}
        className="flex w-full items-center px-4 py-2 text-left text-sm text-red-600 hover:bg-gray-100"
        disabled={isDeleting}
      >
        <Trash
          size={14}
          className="mr-2"
        />
        Delete Comment
      </button>
    </div>
  );
};
