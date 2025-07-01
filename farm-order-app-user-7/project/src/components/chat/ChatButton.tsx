import React from 'react';
import { MessageCircle } from 'lucide-react';

interface ChatButtonProps {
  onClick: () => void;
  isOpen: boolean;
}

const ChatButton: React.FC<ChatButtonProps> = ({ onClick, isOpen }) => {
  return (
    <button
      className={`
        fixed bottom-6 left-6 z-50 
        flex items-center justify-center 
        w-14 h-14 rounded-full 
        bg-green-700 text-white
        shadow-lg hover:bg-green-800 
        transition-all duration-300 ease-in-out
        ${isOpen ? 'scale-90' : 'scale-100 animate-pulse'}
      `}
      onClick={onClick}
      aria-label={isOpen ? "Close chat" : "Open chat"}
    >
      <MessageCircle className="w-6 h-6" />
    </button>
  );
};

export default ChatButton;