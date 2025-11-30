import { useState, useEffect } from 'react';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

const CHAT_HISTORY_KEY = 'chat_history';
const MAX_MESSAGES = 50; // Limit stored messages

export function useChatHistory() {
  const [messages, setMessages] = useState<Message[]>([]);

  // Load chat history from localStorage on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        const stored = localStorage.getItem(CHAT_HISTORY_KEY);
        if (stored) {
          const parsed = JSON.parse(stored);
          // Convert timestamp strings back to Date objects
          const messagesWithDates = parsed.map((msg: any) => ({
            ...msg,
            timestamp: new Date(msg.timestamp)
          }));
          setMessages(messagesWithDates);
        }
      } catch (error) {
        console.error('Error loading chat history:', error);
      }
    }
  }, []);

  // Save to localStorage whenever messages change
  useEffect(() => {
    if (typeof window !== 'undefined' && messages.length > 0) {
      try {
        // Keep only the latest MAX_MESSAGES
        const toStore = messages.slice(-MAX_MESSAGES);
        localStorage.setItem(CHAT_HISTORY_KEY, JSON.stringify(toStore));
      } catch (error) {
        console.error('Error saving chat history:', error);
      }
    }
  }, [messages]);

  const addMessage = (message: Message) => {
    setMessages(prev => [...prev, message]);
  };

  const clearHistory = () => {
    setMessages([]);
    if (typeof window !== 'undefined') {
      localStorage.removeItem(CHAT_HISTORY_KEY);
    }
  };

  return {
    messages,
    setMessages,
    addMessage,
    clearHistory
  };
}
