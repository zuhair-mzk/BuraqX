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
      className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-3 animate-message-in`}
    >
      <div
        className={`max-w-[85%] rounded-2xl px-4 py-3 ${
          isUser
            ? 'bg-white text-black'
            : 'bg-[#1a1a1a] border border-gray-800 text-gray-200'
        }`}
      >
        {/* Message content */}
        <div className="whitespace-pre-wrap break-words leading-relaxed text-sm">
          {content}
        </div>

        {/* Timestamp */}
        {timestamp && (
          <div
            className={`text-xs mt-1.5 ${
              isUser ? 'text-gray-600' : 'text-gray-600'
            }`}
          >
            {timestamp.toLocaleTimeString('en-US', {
              hour: 'numeric',
              minute: '2-digit',
            })}
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes message-in {
          from {
            opacity: 0;
            transform: translateY(10px) scale(0.95);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
        .animate-message-in {
          animation: message-in 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}
