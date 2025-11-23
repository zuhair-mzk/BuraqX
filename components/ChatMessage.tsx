import { MessageRole } from '@/lib/models';

interface ChatMessageProps {
  role: MessageRole;
  content: string;
  timestamp?: Date;
}

export default function ChatMessage({ role, content, timestamp }: ChatMessageProps) {
  const isUser = role === 'user';

  return (
    <div 
      className={`flex ${isUser ? 'justify-end' : 'justify-start'} animate-fade-in-up`}
    >
      <div className="max-w-[80%] lg:max-w-[70%]">
        {/* Message content */}
        <div className={`whitespace-pre-wrap break-words leading-relaxed text-sm font-light ${
          isUser ? 'text-white' : 'text-zinc-400'
        }`}>
          {content}
        </div>

        {/* Timestamp */}
        {timestamp && (
          <div className="text-xs mt-1.5 text-zinc-700 font-light">
            {timestamp.toLocaleTimeString('en-US', {
              hour: 'numeric',
              minute: '2-digit',
            })}
          </div>
        )}
      </div>
    </div>
  );
}
