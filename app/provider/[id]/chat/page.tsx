'use client';

import { useState, useRef, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Listing } from '@/lib/models';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export default function ProviderChatPage() {
  const params = useParams();
  const router = useRouter();
  const [provider, setProvider] = useState<Listing | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isSending, setIsSending] = useState(false);
  const [currentChatId, setCurrentChatId] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const saveChatHistory = async (updatedMessages: Message[]) => {
    if (!provider || updatedMessages.length === 0) return;

    try {
      const firstUserMessage = updatedMessages.find(m => m.role === 'user');
      const title = firstUserMessage 
        ? `${provider.title}: ${firstUserMessage.content.slice(0, 40)}...`
        : `Chat with ${provider.title}`;

      const response = await fetch('/api/chat-history', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: currentChatId,
          title,
          messages: updatedMessages,
          chatType: 'provider_ai',
          providerId: provider.id,
          providerName: provider.title,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        if (!currentChatId) {
          setCurrentChatId(data.chat.id);
        }
      }
    } catch (error) {
      console.error('Error saving chat history:', error);
    }
  };

  useEffect(() => {
    const fetchProvider = async () => {
      try {
        const response = await fetch(`/api/listings?id=${params.id}`);
        if (!response.ok) throw new Error('Failed to fetch provider');
        const data = await response.json();
        const providerData = data.listings[0];
        setProvider(providerData);

        // Set initial greeting from AI assistant
        const greeting: Message = {
          id: '0',
          role: 'assistant',
          content: `Hi! I'm ${providerData.title}'s AI assistant. I can help you learn more about our services, check availability, and schedule appointments. How can I help you today?`,
          timestamp: new Date(),
        };
        setMessages([greeting]);
      } catch (error) {
        console.error('Error fetching provider:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProvider();
  }, [params.id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isSending || !provider) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsSending(true);

    try {
      const response = await fetch('/api/provider-chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: input,
          providerId: params.id,
          conversationHistory: messages.slice(-5).map(m => ({
            role: m.role,
            content: m.content
          })),
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to get response');
      }

      const data = await response.json();

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: data.response,
        timestamp: new Date(),
      };

      const updatedMessages = [...messages, userMessage, assistantMessage];
      setMessages(updatedMessages);
      await saveChatHistory(updatedMessages);
    } catch (error) {
      console.error('[BURAQ_X] Provider chat error:', error);

      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: 'I apologize, but I encountered an error. Please try again.',
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsSending(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-zinc-700 font-extralight animate-pulse">Loading...</div>
      </div>
    );
  }

  if (!provider) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-extralight text-white mb-4">Provider not found</h1>
          <button onClick={() => router.back()} className="text-sm text-zinc-600 hover:text-zinc-400">
            Go back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen bg-black">
      {/* Header */}
      <div className="border-b border-zinc-950/50 bg-black/80 backdrop-blur-md px-6 py-5">
        <div className="max-w-3xl mx-auto flex items-center justify-between">
          <div className="flex-1">
            <button
              onClick={() => router.push(`/provider/${params.id}`)}
              className="flex items-center text-xs text-zinc-700 hover:text-zinc-500 mb-3 transition-all duration-500 font-extralight tracking-wider uppercase"
            >
              <svg className="w-3 h-3 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back to profile
            </button>
            <h1 className="text-lg font-extralight text-white tracking-wide">
              {provider.title}
            </h1>
            <p className="text-xs text-zinc-800 font-extralight mt-1 tracking-wider">
              AI Assistant
            </p>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 sm:px-6 py-8">
        <div className="max-w-3xl mx-auto space-y-6">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className="max-w-[80%]">
                <div
                  className={`${
                    message.role === 'user'
                      ? 'text-white text-right'
                      : 'text-zinc-400 text-left'
                  } text-sm font-extralight leading-relaxed`}
                >
                  {message.content}
                </div>
                <div
                  className={`text-xs text-zinc-800 font-extralight mt-2 ${
                    message.role === 'user' ? 'text-right' : 'text-left'
                  }`}
                >
                  {message.timestamp.toLocaleTimeString([], {
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </div>
              </div>
            </div>
          ))}

          {isSending && (
            <div className="flex justify-start">
              <div className="text-sm text-zinc-700 font-extralight">
                <span className="inline-block animate-pulse">...</span>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input Area */}
      <div className="border-t border-zinc-950/50 bg-black px-4 sm:px-6 py-5 sm:py-7">
        <form onSubmit={handleSubmit} className="max-w-3xl mx-auto">
          <div className="relative">
            <div className="relative flex items-center bg-zinc-950/30 backdrop-blur-sm border border-zinc-900/50 rounded-full overflow-hidden hover:border-zinc-800 focus-within:border-zinc-800 transition-all duration-700">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about availability, services, pricing..."
                className="flex-1 px-6 sm:px-8 py-4 sm:py-5 text-sm bg-transparent text-white placeholder:text-zinc-800
                         focus:outline-none font-extralight tracking-widest
                         disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={isSending}
              />
              <button
                type="submit"
                disabled={isSending || !input.trim()}
                className="mr-2 px-5 sm:px-6 py-2.5 sm:py-3 bg-white hover:bg-white/90 text-black rounded-full text-xs font-extralight tracking-widest uppercase
                         transition-all duration-500 hover:scale-105
                         disabled:opacity-10 disabled:cursor-not-allowed"
              >
                {isSending ? '...' : 'Send'}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
