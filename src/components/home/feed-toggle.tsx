interface FeedToggleProps {
  activeTab: 'your' | 'global';
  onTabChange: (tab: 'your' | 'global') => void;
}

export const FeedToggle = ({ activeTab, onTabChange }: FeedToggleProps) => {
  return (
    <div className="border-b border-gray-200">
      <nav
        className="-mb-px flex space-x-8"
        aria-label="Feed"
      >
        <button
          onClick={() => onTabChange('your')}
          className={`border-b-2 px-1 py-4 text-sm font-medium ${
            activeTab === 'your'
              ? 'border-green-500 text-green-600'
              : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
          } `}
        >
          Your Feed
        </button>
        <button
          onClick={() => onTabChange('global')}
          className={`border-b-2 px-1 py-4 text-sm font-medium ${
            activeTab === 'global'
              ? 'border-green-500 text-green-600'
              : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
          } `}
        >
          Global Feed
        </button>
      </nav>
    </div>
  );
};
