'use client';

import { useState, useRef, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import ChatMessage from '@/components/ChatMessage';
import ResultCard from '@/components/ResultCard';
import LoadingSpinner from '@/components/LoadingSpinner';
import { ChatMessage as ChatMessageType, Listing } from '@/lib/models';

export default function ChatPage() {
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get('q') || '';
  
  const [messages, setMessages] = useState<ChatMessageType[]>([
    {
      id: '1',
      role: 'assistant',
      content: "As-salamu alaykum! I'm Buraq X, your Muslim community concierge. How can I help you today? You can ask me about STEM tutoring, creative freelancers, home services, masjid events, or wedding services.",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState(initialQuery);
  const [isLoading, setIsLoading] = useState(false);
  const [currentMatches, setCurrentMatches] = useState<Listing[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const hasSubmittedInitialQuery = useRef(false);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Auto-submit query from homepage
  useEffect(() => {
    if (initialQuery && !hasSubmittedInitialQuery.current) {
      hasSubmittedInitialQuery.current = true;
      handleSubmit(new Event('submit') as any);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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

      setMessages((prev: ChatMessageType[]) => [...prev, assistantMessage]);
      
      if (data.matches && data.matches.length > 0) {
        setCurrentMatches(data.matches);
      }

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
    <div className="flex flex-col h-[calc(100vh-3.5rem)] bg-[#0f0f0f]">
      <div className="flex-1 overflow-hidden flex">
        {/* Chat Area */}
        <div className="flex-1 flex flex-col">
          {/* Messages */}
          <div className="flex-1 overflow-y-auto px-4 py-6">
            <div className="max-w-3xl mx-auto space-y-4">
              {messages.map((message: ChatMessageType) => (
                <ChatMessage
                  key={message.id}
                  role={message.role}
                  content={message.content}
                  timestamp={message.timestamp}
                />
              ))}
              
              {isLoading && (
                <div className="flex justify-start mb-4 animate-fade-in">
                  <div className="bg-[#1a1a1a] border border-gray-800 rounded-2xl px-6 py-4">
                    <LoadingSpinner size="sm" />
                  </div>
                </div>
              )}
              
              <div ref={messagesEndRef} />
            </div>
          </div>

          {/* Input Area */}
          <div className="border-t border-gray-800 bg-[#0f0f0f] px-4 py-5">
            <form onSubmit={handleSubmit} className="max-w-3xl mx-auto">
              <div className="relative">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="e.g., 'I need a plumber in Scarborough' or 'Find a math tutor near me'"
                  className="w-full px-5 py-3.5 pr-24 text-base rounded-xl border border-gray-700 bg-[#1a1a1a]
                           text-white placeholder:text-gray-500
                           focus:border-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-700
                           transition-all duration-300
                           disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={isLoading}
                  aria-label="Chat input"
                />
                <button
                  type="submit"
                  disabled={isLoading || !input.trim()}
                  className="absolute right-2 top-1/2 -translate-y-1/2 
                           bg-white hover:bg-gray-200 text-black 
                           px-5 py-2 rounded-lg font-medium text-sm
                           transition-all duration-200
                           disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Send
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Results Sidebar */}
        {currentMatches.length > 0 && (
          <div className="w-96 border-l border-gray-800 bg-[#0f0f0f] overflow-y-auto animate-slide-in">
            <div className="p-5 border-b border-gray-800 bg-[#1a1a1a] sticky top-0">
              <h2 className="text-base font-semibold text-white">
                Matched Results ({currentMatches.length})
              </h2>
              <p className="text-xs text-gray-500 mt-1">
                Curated for you from our community
              </p>
            </div>
            <div className="p-3 space-y-3">
              {currentMatches.map((listing) => (
                <ResultCard key={listing.id} listing={listing} />
              ))}
            </div>
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes slide-in {
          from {
            opacity: 0;
            transform: translateX(20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        .animate-fade-in {
          animation: fade-in 0.4s ease-out;
        }
        .animate-slide-in {
          animation: slide-in 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}
