'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

interface ChatHistoryItem {
  id: string;
  title: string;
  category: string | null;
  createdAt: string;
  updatedAt: string;
}

interface ChatHistorySidebarProps {
  onLoadChat: (chatId: string) => void;
  currentChatId: string | null;
}

export default function ChatHistorySidebar({ onLoadChat, currentChatId }: ChatHistorySidebarProps) {
  const [chats, setChats] = useState<ChatHistoryItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    fetchChats();
  }, []);

  const fetchChats = async () => {
    try {
      const response = await fetch('/api/chat-history');
      if (response.ok) {
        const data = await response.json();
        setChats(data.chats);
      }
    } catch (error) {
      console.error('Error fetching chat history:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (chatId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    
    if (!confirm('Delete this conversation?')) return;

    try {
      const response = await fetch(`/api/chat-history/${chatId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setChats(chats.filter(chat => chat.id !== chatId));
        if (currentChatId === chatId) {
          window.location.href = '/chat';
        }
      }
    } catch (error) {
      console.error('Error deleting chat:', error);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInDays = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));

    if (diffInDays === 0) return 'Today';
    if (diffInDays === 1) return 'Yesterday';
    if (diffInDays < 7) return `${diffInDays} days ago`;
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  if (isLoading) {
    return (
      <div className="w-56 border-r border-zinc-800/30 bg-[#0d0d0f]/80 backdrop-blur-xl p-3">
        <div className="animate-pulse space-y-2">
          <div className="h-4 bg-gray-900 rounded w-3/4"></div>
          <div className="h-12 bg-gray-900 rounded"></div>
          <div className="h-12 bg-gray-900 rounded"></div>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Mobile Toggle */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="lg:hidden fixed top-20 left-4 z-30 p-2 bg-[#111113] hover:bg-[#18181B] border border-gray-900 text-white rounded-lg transition-colors"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>

      {/* Overlay */}
      {isOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div 
        className={`fixed lg:relative inset-y-0 left-0 z-50 lg:z-auto w-64 bg-white/[0.02] backdrop-blur-2xl border-r border-white/10 transition-transform duration-300 ${
          isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        <div className="h-full flex flex-col">
          {/* Brand Header */}
          <div className="px-5 py-5 border-b border-white/5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-semibold bg-gradient-to-r from-white to-white/60 bg-clip-text text-transparent tracking-tight">BuraqX</h3>
              <button
                onClick={() => setIsOpen(false)}
                className="lg:hidden p-1 text-white/60 hover:text-white transition-colors"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <Link href="/chat" onClick={() => setIsOpen(false)}>
              <motion.button 
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full px-4 py-2.5 bg-gradient-to-br from-[#0ea5e9]/10 to-[#0284c7]/10 border border-[#0ea5e9]/20 text-white text-sm font-medium rounded-xl hover:border-[#0ea5e9]/40 transition-all duration-200 shadow-lg shadow-[#0ea5e9]/5"
              >
                + New Chat
              </motion.button>
            </Link>
          </div>

          {/* Navigation Links */}
          <div className="px-3 py-4">
            <p className="px-3 text-xs font-medium text-white/40 uppercase tracking-wider mb-3">Menu</p>
            <nav className="space-y-1">
              <Link href="/" onClick={() => setIsOpen(false)} className="block">
                <div className="flex items-center px-3 py-2.5 text-sm text-white/60 hover:text-white hover:bg-white/[0.05] rounded-lg transition-all duration-200">
                  <svg className="w-4 h-4 mr-3" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                  </svg>
                  Home
                </div>
              </Link>
              <Link href="/dashboard" onClick={() => setIsOpen(false)}>
                <div className="flex items-center px-3 py-2.5 text-sm text-white/60 hover:text-white hover:bg-white/5 rounded-lg transition-all duration-200">
                  <svg className="w-4 h-4 mr-3" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                  Dashboard
                </div>
              </Link>
              <Link href="/join" onClick={() => setIsOpen(false)}>
                <div className="flex items-center px-3 py-2.5 text-sm text-white/60 hover:text-white hover:bg-white/5 rounded-lg transition-all duration-200">
                  <svg className="w-4 h-4 mr-3" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                  </svg>
                  Join
                </div>
              </Link>
              <Link href="/about" onClick={() => setIsOpen(false)}>
                <div className="flex items-center px-3 py-2.5 text-sm text-white/60 hover:text-white hover:bg-white/5 rounded-lg transition-all duration-200">
                  <svg className="w-4 h-4 mr-3" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  About
                </div>
              </Link>
              <Link href="/admin" onClick={() => setIsOpen(false)}>
                <div className="flex items-center px-3 py-2.5 text-sm text-white/60 hover:text-white hover:bg-white/5 rounded-lg transition-all duration-200">
                  <svg className="w-4 h-4 mr-3" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  Admin
                </div>
              </Link>
            </nav>
          </div>

          {/* Chat List */}
          <div className="flex-1 overflow-y-auto px-3 py-2">
            <p className="px-3 text-xs font-medium text-white/40 uppercase tracking-wider mb-3">Recent Chats</p>
            {chats.length === 0 ? (
              <div className="text-center py-12 px-3">
                <p className="text-sm text-white/40">No conversations yet</p>
              </div>
            ) : (
              <div className="space-y-0.5">
                {chats.map((chat) => (
                  <div
                    key={chat.id}
                    onClick={() => {
                      onLoadChat(chat.id);
                      setIsOpen(false);
                    }}
                    className={`group px-3 py-2 rounded-md cursor-pointer transition-colors duration-200 ease-out ${
                      currentChatId === chat.id 
                        ? 'bg-white/[0.08]' 
                        : 'hover:bg-white/[0.05]'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex-1 min-w-0">
                        <p className={`text-sm truncate font-normal ${
                          currentChatId === chat.id ? 'text-white' : 'text-white/70'
                        }`}>
                          {chat.title}
                        </p>
                        <p className="text-xs text-white/40 mt-0.5">
                          {formatDate(chat.updatedAt)}
                        </p>
                      </div>
                      <button
                        onClick={(e: React.MouseEvent) => handleDelete(chat.id, e)}
                        className="opacity-0 group-hover:opacity-100 p-1.5 text-white/40 hover:text-white/80 transition-all rounded"
                      >
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
