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
  
  const [messages, setMessages] = useState<ChatMessageType[]>([]);
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
    <div className="flex flex-col h-screen bg-black">
      <div className="flex-1 overflow-hidden flex">
        {/* Chat Area */}
        <div className="flex-1 flex flex-col relative">
          {/* Messages */}
          <div className="flex-1 overflow-y-auto px-4 sm:px-6 py-8 sm:py-12 relative">
            <div className="max-w-3xl mx-auto space-y-6 sm:space-y-8">
              {messages.map((message: ChatMessageType) => (
                <ChatMessage
                  key={message.id}
                  role={message.role}
                  content={message.content}
                  timestamp={message.timestamp}
                />
              ))}
              
              {isLoading && (
                <div className="flex justify-start animate-fade-in">
                  <div className="text-sm text-zinc-600 font-light">
                    <span className="inline-block animate-pulse">...</span>
                  </div>
                </div>
              )}

              {/* Mobile Results - Show below messages */}
              {currentMatches.length > 0 && (
                <div className="lg:hidden mt-8 pt-8 border-t border-zinc-900">
                  <div className="mb-4">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-base font-light text-zinc-100">
                        Results
                      </h3>
                      <span className="px-2 py-0.5 bg-zinc-900 text-zinc-500 text-xs font-light rounded-full">
                        {currentMatches.length}
                      </span>
                    </div>
                    <p className="text-xs text-zinc-600 font-light">
                      Tap to view details
                    </p>
                  </div>
                  <div className="space-y-3">
                    {currentMatches.map((listing) => (
                      <ResultCard key={listing.id} listing={listing} />
                    ))}
                  </div>
                </div>
              )}
              
              <div ref={messagesEndRef} />
            </div>
          </div>

          {/* Input Area */}
          <div className="border-t border-zinc-950/50 bg-black px-4 sm:px-6 py-5 sm:py-7 relative">
            <form onSubmit={handleSubmit} className="max-w-3xl mx-auto">
              <div className="relative">
                <div className="relative flex items-center bg-zinc-950/30 backdrop-blur-xl border border-zinc-800/40 rounded-full overflow-hidden hover:border-zinc-700/60 focus-within:border-zinc-700/60 transition-all duration-700 shadow-xl shadow-black/30 hover:shadow-black/50">
                  <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Ask for anything..."
                    className="flex-1 px-6 sm:px-8 py-4 sm:py-5 text-sm bg-transparent text-white placeholder:text-zinc-700 font-extralight tracking-wide
                             focus:outline-none
                             disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={isLoading}
                    aria-label="Chat input"
                  />
                  <button
                    type="submit"
                    disabled={isLoading || !input.trim()}
                    className="mr-2 px-5 sm:px-6 py-2.5 sm:py-3 bg-white hover:bg-zinc-50 text-black rounded-full text-xs font-light tracking-wide
                             transition-all duration-700 hover:scale-110 active:scale-105
                             disabled:opacity-20 disabled:cursor-not-allowed shadow-lg shadow-white/20 hover:shadow-xl hover:shadow-white/30"
                  >
                    {isLoading ? '...' : 'Send'}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>

        {/* Results Sidebar */}
        {currentMatches.length > 0 && (
          <div className="hidden lg:block w-96 border-l border-zinc-900 bg-zinc-950 overflow-y-auto animate-slide-in">
            <div className="p-6 border-b border-zinc-900 bg-zinc-900/50 backdrop-blur-xl sticky top-0 z-10">
              <div className="flex items-center justify-between mb-2">
                <h2 className="text-lg font-semibold text-zinc-100">
                  Matched Results
                </h2>
                <span className="px-2.5 py-1 bg-accent-500/10 border border-accent-500/20 text-accent-400 text-xs font-semibold rounded-lg">
                  {currentMatches.length}
                </span>
              </div>
              <p className="text-sm text-zinc-500">
                Curated from our trusted community
              </p>
            </div>
            <div className="p-4 space-y-4">
              {currentMatches.map((listing) => (
                <ResultCard key={listing.id} listing={listing} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
