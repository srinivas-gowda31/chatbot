import { useState, useCallback } from 'react';
import axios from 'axios';

const API_ENDPOINT = 'http://localhost:8000/chat';

const useChat = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const sendMessage = useCallback(async (userMessage) => {
    if (!userMessage.trim()) {
      return;
    }

    // Add user message
    const userMsg = {
      id: Date.now(),
      text: userMessage,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMsg]);
    setLoading(true);
    setError(null);

    try {
      const response = await axios.post(API_ENDPOINT, {
        message: userMessage,
      });

      const botMsg = {
        id: Date.now() + 1,
        text: response.data.response,
        sender: 'bot',
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, botMsg]);
    } catch (err) {
      console.error('Error sending message:', err);
      setError('Something went wrong. Please try again.');

      // Add error message
      const errorMsg = {
        id: Date.now() + 1,
        text: "I'm sorry, I encountered an error. Please try again later.",
        sender: 'bot',
        timestamp: new Date(),
        isError: true,
      };

      setMessages(prev => [...prev, errorMsg]);
    } finally {
      setLoading(false);
    }
  }, []);

  const clearChat = useCallback(() => {
    setMessages([]);
    setError(null);
  }, []);

  return {
    messages,
    loading,
    error,
    sendMessage,
    clearChat,
  };
};

export default useChat;
