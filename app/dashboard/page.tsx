'use client';

import { useState } from 'react';
import ChatInbox from '@/components/ChatInbox';
import CalendarView from '@/components/CalendarView';

type TabType = 'inbox' | 'calendar';

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState<TabType>('inbox');
  
  // TODO: Get user from session/auth
  const userId = 'user-123';

  const tabs = [
    { value: 'inbox' as TabType, label: 'Messages' },
    { value: 'calendar' as TabType, label: 'Calendar' },
  ];

  return (
    <div className="min-h-screen bg-black">
      <div className="max-w-6xl mx-auto px-6 py-12">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-2xl text-white font-light tracking-tight mb-1">
            Dashboard
          </h1>
          <p className="text-zinc-600 text-sm">
            Your activity
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="flex gap-8 mb-10 border-b border-zinc-900">
          {tabs.map((tab) => (
            <button
              key={tab.value}
              onClick={() => setActiveTab(tab.value)}
              className={`pb-3 text-[15px] font-light transition-colors relative ${
                activeTab === tab.value
                  ? 'text-white'
                  : 'text-zinc-600 hover:text-zinc-400'
              }`}
            >
              {tab.label}
              {activeTab === tab.value && (
                <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-white" />
              )}
            </button>
          ))}
        </div>

        {/* Content Area */}
        <div>
          {activeTab === 'inbox' && <ChatInbox userId={userId} />}
          {activeTab === 'calendar' && <CalendarView userId={userId} />}
        </div>
      </div>
    </div>
  );
}
