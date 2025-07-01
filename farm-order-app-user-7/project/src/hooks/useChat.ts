import { useState } from 'react';
import { Message, ChatState } from '../types/chat';
import {useAuth} from "../components/auth/AuthContext.tsx";

export const useChat = () => {
  const [chatState, setChatState] = useState<ChatState>({
    isOpen: false,
    messages: [],
    isLoading: false,
    inputValue: '',
  });

    const { user } = useAuth();

  const toggleChat = () => {
    const newIsOpen = !chatState.isOpen;
    
    setChatState(prev => {
      // Add welcome message if opening the chat and no messages exist
      if (newIsOpen && prev.messages.length === 0 && user?._id !== undefined) {
        return {
          ...prev,
          isOpen: newIsOpen,
          messages: [...prev.messages, {
            id: Date.now().toString(),
            content: "**Hello!** \nI'm FarmBot, your farm equipment rental assistant. How can I help you today?",
            sender: 'assistant',
            timestamp: new Date(),
          }]
        };
      }else{
        return {
          ...prev,
          isOpen: newIsOpen,
          messages: [...prev.messages, {
            id: Date.now().toString(),
            content: "**Hello!** \nI'm FarmBot, your farm equipment rental assistant. \n \n**Please login to start chatting.**",
            sender: 'assistant',
            timestamp: new Date(),
          }]
        };
      }
      
      return { 
        ...prev, 
        isOpen: newIsOpen 
      };
    });
  };

  const addMessage = (message: Message) => {
    setChatState(prev => ({
      ...prev,
      messages: [...prev.messages, message],
    }));
  };

  const setInputValue = (value: string) => {
    setChatState(prev => ({
      ...prev,
      inputValue: value,
    }));
  };

  const setLoading = (isLoading: boolean) => {
    setChatState(prev => ({
      ...prev,
      isLoading,
    }));
  };

  const sendMessage = async () => {
    const { inputValue } = chatState;
    if (!inputValue.trim()) return;
    
    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputValue,
      sender: 'user',
      timestamp: new Date(),
    };
    
    addMessage(userMessage);
    setInputValue('');
    setLoading(true);
    
    try {
      console.log("------------------------>",user);
      if (user?._id === undefined) return;
      const response = await fetch('http://localhost:5000/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: inputValue,
          userId: user?._id, // In a real app, this would come from auth
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to get response from chat server');
      }

      const data = await response.json();
      
      // Add bot response
      addMessage({
        id: (Date.now() + 1).toString(),
        content: data.message.content,
        sender: data.message.sender,
        // timestamp: data.message.timestamp,
        timestamp: new Date(),
      });
    } catch (error) {
      // Handle error
      addMessage({
        id: (Date.now() + 1).toString(),
        content: "Sorry, I'm having trouble connecting to the chat server. Please try again later.",
        sender: 'assistant',
        timestamp: new Date(),
      });
    } finally {
      setLoading(false);
    }
  };

  return {
    chatState,
    toggleChat,
    addMessage,
    setInputValue,
    sendMessage,
  };
};