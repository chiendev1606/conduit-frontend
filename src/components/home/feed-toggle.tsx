import { Tabs, TabItem } from '../common/tab';

interface FeedToggleProps {
  activeTab: 'your' | 'global';
  onTabChange: (tab: 'your' | 'global') => void;
}

export const FeedToggle = ({ activeTab, onTabChange }: FeedToggleProps) => {
  const tabs: TabItem[] = [
    {
      id: 'your',
      label: 'Your Feed',
    },
    {
      id: 'global',
      label: 'Global Feed',
    },
  ];

  return (
    <Tabs
      tabs={tabs}
      activeTab={activeTab}
      onTabChange={(tabId) => onTabChange(tabId as 'your' | 'global')}
    />
  );
};
