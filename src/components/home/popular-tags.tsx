import React from 'react';
import { TagList } from '@/components/common';
import useTagsQuery from '@/hooks/queries/use-tag';

interface PopularTagsProps {
  onTagClick: (tag: string) => void;
}

export const PopularTags = ({ onTagClick }: PopularTagsProps) => {
  const { data, isLoading, error } = useTagsQuery();

  if (isLoading) {
    return (
      <div className="rounded-lg bg-gray-100 p-4">
        <h2 className="mb-4 text-base font-semibold text-gray-700">Popular Tags</h2>
        <div className="text-sm text-gray-500">Loading tags...</div>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="rounded-lg bg-gray-100 p-4">
        <h2 className="mb-4 text-base font-semibold text-gray-700">Popular Tags</h2>
        <div className="text-sm text-gray-500">Could not load tags</div>
      </div>
    );
  }

  return (
    <div className="rounded-lg bg-gray-100 p-4">
      <h2 className="mb-4 text-base font-semibold text-gray-700">Popular Tags</h2>
      <TagList
        tags={data.tags}
        onTagClick={onTagClick}
      />
    </div>
  );
};
