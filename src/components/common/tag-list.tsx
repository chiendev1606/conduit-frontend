import React from 'react';
import { Tag } from '@/types/tag';

interface TagListProps {
  tags: Tag[];
  onTagClick?: (tag: string) => void;
  className?: string;
}

export const TagList = ({ tags, onTagClick, className = '' }: TagListProps) => {
  return (
    <div className={`flex flex-wrap gap-2 ${className}`}>
      {tags.map((tag) => (
        <button
          key={tag.id}
          onClick={() => onTagClick?.(tag.name)}
          className="rounded-full bg-gray-200 px-3 py-1 text-xs text-gray-600 hover:bg-gray-300"
        >
          {tag.name}
          {tag.count > 0 && <span className="ml-1 text-xs text-gray-500">({tag.count})</span>}
        </button>
      ))}
    </div>
  );
};
