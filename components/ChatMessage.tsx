import { MessageRole } from '@/lib/models';
import { motion } from 'framer-motion';

interface ChatMessageProps {
  role: MessageRole;
  content: string;
  timestamp?: Date;
}

export default function ChatMessage({ role, content, timestamp }: ChatMessageProps) {
  const isUser = role === 'user';

  return (
    <motion.div 
      initial={{ opacity: 0, y: 12, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-4`}
    >
      <div className="max-w-[75%] lg:max-w-[70%]">
        {/* Premium Message Bubble */}
        <motion.div 
          whileHover={{ scale: 1.01 }}
          transition={{ duration: 0.2 }}
          className={`
            px-4 py-3 rounded-[20px]
            ${isUser 
              ? 'bg-[#2a2a2a] text-white shadow-md shadow-black/40' 
              : 'bg-[#1e1e1e] text-white shadow-md shadow-black/40'
            }
          `}
        >
          <p className="whitespace-pre-wrap break-words leading-[1.6] text-[15px]">
            {content}
          </p>
        </motion.div>

        {/* Timestamp */}
        {timestamp && (
          <div className={`text-[11px] text-white/30 mt-1.5 px-2 ${
            isUser ? 'text-right' : 'text-left'
          }`}>
            {new Date(timestamp).toLocaleTimeString('en-US', {
              hour: 'numeric',
              minute: '2-digit',
            })}
          </div>
        )}
      </div>
    </motion.div>
  );
}
