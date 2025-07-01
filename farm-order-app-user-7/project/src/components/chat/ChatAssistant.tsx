import React from 'react';
import ChatButton from './ChatButton';
import ChatWindow from './ChatWindow';
import { useChat } from '../../hooks/useChat';

const ChatAssistant: React.FC = () => {
  const { 
    chatState,
    toggleChat, 
    setInputValue, 
    sendMessage 
  } = useChat();

  const handleInputChange = (value: string) => {
    setInputValue(value);
  };

  return (
    <>
      <ChatButton 
        onClick={toggleChat} 
        isOpen={chatState.isOpen} 
      />
      <ChatWindow 
        chatState={chatState}
        onInputChange={handleInputChange}
        onSendMessage={sendMessage}
      />
    </>
  );
};

export default ChatAssistant;