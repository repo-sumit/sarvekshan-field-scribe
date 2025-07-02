
import React from 'react';
import { FileText, History, User } from 'lucide-react';

interface BottomNavigationProps {
  activeTab: 'survey' | 'history' | 'profile';
  onTabChange: (tab: 'survey' | 'history' | 'profile') => void;
}

const BottomNavigation = ({ activeTab, onTabChange }: BottomNavigationProps) => {
  const tabs = [
    { id: 'survey' as const, label: 'Survey', icon: FileText },
    { id: 'history' as const, label: 'History', icon: History },
    { id: 'profile' as const, label: 'Profile', icon: User },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-2 py-2 z-50">
      <div className="flex justify-around">
        {tabs.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            onClick={() => onTabChange(id)}
            className={`flex flex-col items-center py-2 px-4 rounded-lg transition-all ${
              activeTab === id
                ? 'text-blue-600 bg-blue-50'
                : 'text-gray-600 hover:text-blue-600 hover:bg-blue-50'
            }`}
          >
            <Icon className={`w-5 h-5 mb-1 ${activeTab === id ? 'scale-110' : ''}`} />
            <span className="text-xs font-medium">{label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default BottomNavigation;
