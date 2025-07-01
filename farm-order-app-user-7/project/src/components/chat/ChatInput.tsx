import React, { KeyboardEvent } from 'react';
import { Send } from 'lucide-react';

interface ChatInputProps {
  value: string;
  onChange: (value: string) => void;
  onSend: () => void;
  disabled: boolean;
}

const ChatInput: React.FC<ChatInputProps> = ({ 
  value, 
  onChange, 
  onSend,
  disabled
}) => {
  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey && !disabled) {
      e.preventDefault();
      onSend();
    }
  };

  return (
    <div className="p-3 border-t border-gray-200 bg-white flex items-center">
      <input
        type="text"
        placeholder="Ask about farm equipment..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={handleKeyDown}
        disabled={disabled}
        className="flex-1 border border-gray-300 rounded-l-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
      />
      <button
        onClick={onSend}
        disabled={disabled || !value.trim()}
        className={`
          bg-green-600 text-white p-2 rounded-r-lg
          flex items-center justify-center
          ${disabled || !value.trim() ? 'opacity-50 cursor-not-allowed' : 'hover:bg-green-700'}
          transition duration-150 ease-in-out
        `}
      >
        <Send className="w-5 h-7" />
      </button>
    </div>
  );
};

export default ChatInput;