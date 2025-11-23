'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { AnimatePresence } from 'framer-motion';

type ChatType = 'all' | 'general' | 'provider_ai' | 'direct_provider';

interface ChatMessage {
  id: string;
  title: string;
  chatType: string;
  providerName?: string;
  updatedAt: string;
  lastMessage: string;
}

export default function ChatInbox({ userId }: { userId: string }) {
  const router = useRouter();
  const [activeFilter, setActiveFilter] = useState<ChatType>('all');
  const [chats, setChats] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch chat history on mount
  useEffect(() => {
    fetchChatHistory();
  }, [userId]);

  const fetchChatHistory = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(`/api/chat-history`);
      if (response.ok) {
        const data = await response.json();
        const formattedChats: ChatMessage[] = data.chats.map((chat: any) => ({
          id: chat.id,
          title: chat.title,
          chatType: chat.chatType || 'general',
          providerName: chat.providerName,
          updatedAt: chat.updatedAt,
          lastMessage: Array.isArray(chat.messages) && chat.messages.length > 0
            ? chat.messages[chat.messages.length - 1]?.content || 'No messages'
            : 'No messages',
        }));
        setChats(formattedChats);
      }
    } catch (error) {
      console.error('Failed to fetch chat history:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleChatClick = (chatId: string) => {
    router.push(`/chat?id=${chatId}`);
  };

  const filters = [
    { value: 'all' as ChatType, label: 'All' },
    { value: 'general' as ChatType, label: 'AI' },
    { value: 'provider_ai' as ChatType, label: 'Providers' },
    { value: 'direct_provider' as ChatType, label: 'Direct' },
  ];

  const filteredChats = activeFilter === 'all' 
    ? chats 
    : chats.filter(chat => chat.chatType === activeFilter);

  return (
    <div className="w-full">
      {/* Filter Tabs */}
      <div className="flex gap-6 mb-8 overflow-x-auto">
        {filters.map((filter) => (
          <button
            key={filter.value}
            onClick={() => setActiveFilter(filter.value)}
            className={`text-sm font-light whitespace-nowrap transition-colors ${
              activeFilter === filter.value
                ? 'text-white'
                : 'text-zinc-600 hover:text-zinc-400'
            }`}
          >
            {filter.label}
          </button>
        ))}
      </div>

      {/* Chat List */}
      <div className="space-y-2">
        {isLoading ? (
          <div className="py-8">
            <div className="animate-pulse space-y-2">
              <div className="h-16 bg-zinc-950 rounded"></div>
              <div className="h-16 bg-zinc-950 rounded"></div>
              <div className="h-16 bg-zinc-950 rounded"></div>
            </div>
          </div>
        ) : (
          <AnimatePresence mode="popLayout">
          {filteredChats.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-zinc-700 text-sm">No conversations</p>
            </div>
          ) : (
            filteredChats.map((chat) => (
              <div
                key={chat.id}
                onClick={() => handleChatClick(chat.id)}
                className="group border border-zinc-900 hover:border-zinc-800 rounded p-4 cursor-pointer transition-colors"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="text-white font-light text-[15px] truncate">
                        {chat.title}
                      </h3>
                      {chat.chatType === 'provider_ai' && (
                        <span className="text-[10px] px-1.5 py-0.5 bg-zinc-900 text-zinc-500 rounded">
                          Provider
                        </span>
                      )}
                    </div>
                    {chat.providerName && (
                      <p className="text-zinc-700 text-xs mb-1.5">
                        {chat.providerName}
                      </p>
                    )}
                    <p className="text-zinc-600 text-sm line-clamp-1">
                      {chat.lastMessage}
                    </p>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <span className="text-[11px] text-zinc-700 whitespace-nowrap">
                      {new Date(chat.updatedAt).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                      })}
                    </span>
                  </div>
                </div>
              </div>
            ))
          )}
          </AnimatePresence>
        )}
      </div>
    </div>
  );
}
