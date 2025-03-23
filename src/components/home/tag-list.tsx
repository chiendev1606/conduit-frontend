interface TagListProps {
  tags: string[];
  onTagClick: (tag: string) => void;
  selectedTag?: string;
}

export const TagList = ({ tags, onTagClick, selectedTag }: TagListProps) => {
  return (
    <div className="rounded-lg bg-gray-100 p-4">
      <h2 className="mb-4 text-base font-semibold text-gray-700">Popular Tags</h2>
      <div className="flex flex-wrap gap-2">
        {tags.map((tag) => (
          <button
            key={tag}
            onClick={() => onTagClick(tag)}
            className={`rounded-full bg-gray-600 px-3 py-1 text-xs text-white hover:bg-gray-700 ${
              selectedTag === tag ? 'bg-green-500 hover:bg-green-600' : ''
            }`}
          >
            {tag}
          </button>
        ))}
      </div>
    </div>
  );
};
