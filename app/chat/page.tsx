'use client';

import { useState, useRef, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import ChatMessage from '@/components/ChatMessage';
import ResultCard from '@/components/ResultCard';
import LoadingSpinner from '@/components/LoadingSpinner';
import ChatHistorySidebar from '@/components/ChatHistorySidebar';
import { ChatMessage as ChatMessageType, Listing } from '@/lib/models';

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
}

export default function ChatPage() {
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get('q') || '';
  const chatIdFromUrl = searchParams.get('id');
  
  const [messages, setMessages] = useState<ChatMessageType[]>([]);
  const [isMorphing, setIsMorphing] = useState(false);

  // Check if we're morphing from homepage
  useEffect(() => {
    const morphQuery = sessionStorage.getItem('morphQuery');
    if (morphQuery) {
      setIsMorphing(true);
      sessionStorage.removeItem('morphQuery');
      setTimeout(() => setIsMorphing(false), 800);
    }
  }, []);
  const [input, setInput] = useState(initialQuery);
  const [isLoading, setIsLoading] = useState(false);
  const [currentMatches, setCurrentMatches] = useState<Listing[]>([]);
  const [user, setUser] = useState<User | null | undefined>(undefined);
  const [currentChatId, setCurrentChatId] = useState<string | null>(null);
  const [chatCategory, setChatCategory] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const hasSubmittedInitialQuery = useRef(false);
  const hasLoadedChatFromUrl = useRef(false);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Fetch current user
  useEffect(() => {
    fetchUser();
  }, []);

  // Load chat from URL if chatId is provided
  useEffect(() => {
    if (chatIdFromUrl && !hasLoadedChatFromUrl.current) {
      hasLoadedChatFromUrl.current = true;
      loadChat(chatIdFromUrl);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chatIdFromUrl]);

  // Auto-submit query from homepage (wait for user to load)
  useEffect(() => {
    if (initialQuery && !hasSubmittedInitialQuery.current && !chatIdFromUrl && user !== undefined) {
      hasSubmittedInitialQuery.current = true;
      handleSubmit(new Event('submit') as any);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  const fetchUser = async () => {
    try {
      const response = await fetch('/api/auth/me');
      const data = await response.json();
      setUser(data.user || null);
    } catch (error) {
      console.error('Error fetching user:', error);
      setUser(null);
    }
  };

  const saveChatHistory = async (updatedMessages: ChatMessageType[], category?: string) => {
    if (!user || updatedMessages.length === 0) {
      return;
    }

    try {
      // Generate title from first user message
      const firstUserMessage = updatedMessages.find(m => m.role === 'user');
      const title = firstUserMessage 
        ? firstUserMessage.content.slice(0, 50) + (firstUserMessage.content.length > 50 ? '...' : '')
        : 'Untitled Chat';

      const response = await fetch('/api/chat-history', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: currentChatId,
          title,
          messages: updatedMessages,
          category: category || chatCategory,
          matches: currentMatches, // Save search results
        }),
      });

      if (response.ok) {
        const data = await response.json();
        if (!currentChatId) {
          setCurrentChatId(data.chat.id);
        }
        // Trigger sidebar refresh by dispatching custom event
        window.dispatchEvent(new CustomEvent('chatHistoryUpdated'));
      }
    } catch (error) {
      console.error('Error saving chat history:', error);
    }
  };

  const loadChat = async (chatId: string) => {
    try {
      const response = await fetch(`/api/chat-history/${chatId}`);
      if (response.ok) {
        const data = await response.json();
        // Convert timestamp strings back to Date objects
        const messagesWithDates = data.chat.messages.map((msg: any) => ({
          ...msg,
          timestamp: new Date(msg.timestamp),
        }));
        setMessages(messagesWithDates);
        setCurrentChatId(data.chat.id);
        setChatCategory(data.chat.category);
        // Restore search results if they exist
        if (data.chat.matches && Array.isArray(data.chat.matches)) {
          setCurrentMatches(data.chat.matches);
        } else {
          setCurrentMatches([]);
        }
      }
    } catch (error) {
      console.error('Error loading chat:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!input.trim() || isLoading) return;

    const userMessage: ChatMessageType = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
      timestamp: new Date(),
    };

    setMessages((prev: ChatMessageType[]) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);
    setCurrentMatches([]);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: input }),
      });

      if (!response.ok) {
        throw new Error('Failed to get response');
      }

      const data = await response.json();

      const assistantMessage: ChatMessageType = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: data.answerText,
        timestamp: new Date(),
      };

      const updatedMessages = [...messages, userMessage, assistantMessage];
      setMessages(updatedMessages);
      
      if (data.matches && data.matches.length > 0) {
        setCurrentMatches(data.matches);
      }

      // Save chat history if user is logged in
      const categoryLabel = data.category?.label || data.category;
      if (categoryLabel) {
        setChatCategory(categoryLabel);
      }
      await saveChatHistory(updatedMessages, categoryLabel);

    } catch (error) {
      console.error('[BURAQ_X] Chat error:', error);
      
      const errorMessage: ChatMessageType = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: 'I apologize, but I encountered an error processing your request. Please try again.',
        timestamp: new Date(),
      };
      
      setMessages((prev: ChatMessageType[]) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gradient-to-br from-[#0a0a0a] via-[#151515] to-[#0f0f0f]">
      <div className="flex-1 overflow-hidden flex pt-0">
        {/* Chat History Sidebar */}
        <ChatHistorySidebar onLoadChat={loadChat} currentChatId={currentChatId} />
        
        {/* Chat Area */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: isMorphing ? 0.4 : 0, ease: [0.22, 1, 0.36, 1] }}
          className="flex-1 flex flex-col relative"
        >
          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto px-4 sm:px-6 py-8 relative">
            <div className="max-w-[760px] mx-auto">
              {messages.map((message: ChatMessageType) => (
                <ChatMessage
                  key={message.id}
                  role={message.role}
                  content={message.content}
                  timestamp={message.timestamp}
                />
              ))}
              
              {/* Result Cards Inside Chat */}
              {currentMatches.length > 0 && (
                <div className="mt-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {currentMatches.map((listing) => (
                      <ResultCard key={listing.id} listing={listing} />
                    ))}
                  </div>
                </div>
              )}
              
              {isLoading && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex justify-start mb-3"
                >
                  <div className="px-4 py-2.5 bg-zinc-800/40 rounded-[20px] shadow-md shadow-black/20">
                    <div className="flex gap-1.5">
                      <motion.div
                        className="w-1.5 h-1.5 bg-zinc-400 rounded-full"
                        animate={{ opacity: [0.4, 1, 0.4] }}
                        transition={{ duration: 1.2, repeat: Infinity, delay: 0, ease: "easeInOut" }}
                      />
                      <motion.div
                        className="w-1.5 h-1.5 bg-zinc-400 rounded-full"
                        animate={{ opacity: [0.4, 1, 0.4] }}
                        transition={{ duration: 1.2, repeat: Infinity, delay: 0.2, ease: "easeInOut" }}
                      />
                      <motion.div
                        className="w-1.5 h-1.5 bg-zinc-400 rounded-full"
                        animate={{ opacity: [0.4, 1, 0.4] }}
                        transition={{ duration: 1.2, repeat: Infinity, delay: 0.4, ease: "easeInOut" }}
                      />
                    </div>
                  </div>
                </motion.div>
              )}
              
              <div ref={messagesEndRef} />
            </div>
          </div>

          {/* Input Area */}
          <div className={`border-t border-white/5 bg-gradient-to-b from-[#0a0a0a]/80 to-[#0a0a0a]/95 backdrop-blur-xl px-4 sm:px-6 py-6 relative transition-all duration-700 ease-in-out ${isMorphing ? 'translate-y-[35vh] scale-95 opacity-0' : ''}`}>
            <form onSubmit={handleSubmit} className="max-w-[760px] mx-auto">
              <div className="relative flex items-center gap-3 bg-white/[0.05] hover:bg-white/[0.07] border border-white/[0.15] rounded-full px-5 py-3 shadow-2xl shadow-black/40 transition-all duration-300 focus-within:border-[#0ea5e9]/50 focus-within:shadow-[0_0_30px_rgba(14,165,233,0.15)]">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Message..."
                  className="flex-1 text-[15px] bg-transparent text-white placeholder:text-zinc-400
                           border-0 focus:outline-0 focus:ring-0 outline-0 ring-0 p-0
                           disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={isLoading}
                  aria-label="Chat input"
                  style={{ outline: 'none', boxShadow: 'none' }}
                />
                <motion.button
                  type="submit"
                  disabled={isLoading || !input.trim()}
                  whileHover={{ scale: 1.08 }}
                  whileTap={{ scale: 0.92 }}
                  className="w-8 h-8 bg-gradient-to-br from-[#0ea5e9] to-[#0284c7] hover:from-[#38bdf8] hover:to-[#0ea5e9] text-white rounded-full
                           disabled:opacity-40 disabled:cursor-not-allowed
                           focus:outline-none flex items-center justify-center flex-shrink-0
                           transition-all duration-200 shadow-lg shadow-[#0ea5e9]/20"
                >
                  {isLoading ? (
                    <div className="w-1.5 h-1.5 bg-white rounded-full animate-pulse"></div>
                  ) : (
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14m-7-7l7 7-7 7"/>
                    </svg>
                  )}
                </motion.button>
              </div>
            </form>
          </div>
        </motion.div>


      </div>
    </div>
  );
}
