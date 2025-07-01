import React from 'react';
import MessageList from './MessageList';
import ChatInput from './ChatInput';
import { Tractor } from 'lucide-react';
import { ChatState } from '../../types/chat';

interface ChatWindowProps {
  chatState: ChatState;
  onInputChange: (value: string) => void;
  onSendMessage: () => void;
}

const ChatWindow: React.FC<ChatWindowProps> = ({
  chatState,
  onInputChange,
  onSendMessage,
}) => {
  const { isOpen, messages, isLoading, inputValue } = chatState;

  
  return (
    <div
      className={`
        fixed top-4 left-4 z-40
        w-96 h-[500px]
        bg-white rounded-lg shadow-xl
        flex flex-col
        transition-all duration-300 ease-in-out
        ${isOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'}
        border border-gray-200
        resize-window
        min-w-[320px] min-h-[400px]
        max-w-[80vw] max-h-[90vh]
      `}
    >
      {/* Header */}
      <div className="p-4 bg-green-700 text-white rounded-t-lg flex items-center cursor-move">
        <Tractor className="w-6 h-6 mr-2" />
        <h3 className="font-medium text-lg">Ask FarmBot</h3>
      </div>
      
      {/* Message List */}
      <MessageList
        messages={messages}
        isLoading={isLoading}
      />
      
      {/* Input Area */}
      <ChatInput
        value={inputValue}
        onChange={onInputChange}
        onSend={onSendMessage}
        disabled={isLoading}
      />
    </div>
  );
};

export default ChatWindow;