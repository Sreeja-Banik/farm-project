import React from 'react';
import { Message } from '../../types/chat';

interface MessageItemProps {
  message: Message;
}

const MessageItem: React.FC<MessageItemProps> = ({ message }) => {
  const { content, sender, timestamp } = message;
  
  // Format time as HH:MM
  const formattedTime = timestamp.toLocaleTimeString([], { 
    hour: '2-digit', 
    minute: '2-digit',
    hour12: true
  });

  const isAssistant = sender === 'assistant';
  
  // Process content to handle markdown-like syntax
  const processContent = (text: string) => {
    return text
      .split('\n')
      .map((line, i) => {
        // Handle bold text
        line = line.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
        // Handle italic text
        line = line.replace(/\*(.*?)\*/g, '<em>$1</em>');
        return line;
      })
      .join('\n');
  };

  return (
    <div 
      className={`flex ${isAssistant ? 'justify-start' : 'justify-end'} mb-4`}
    >
      <div 
        className={`
          relative max-w-[80%] px-4 py-2 pb-6 rounded-lg shadow-sm
          ${isAssistant 
            ? 'bg-green-50 text-green-900 border border-green-100' 
            : 'bg-blue-600 text-white'}
        `}
      >
        <p 
          className="text-sm whitespace-pre-wrap break-words"
          dangerouslySetInnerHTML={{ __html: processContent(content) }}
        />
        <span 
          className={`
            absolute bottom-1 right-2 text-[10px]
            ${isAssistant ? 'text-green-600/75' : 'text-blue-200/75'}
          `}
        >
          {formattedTime}
        </span>
      </div>
    </div>
  );
};

export default MessageItem;