import React, { useEffect } from 'react';
import Header from './components/Header';
import ChatContainer from './components/ChatContainer';
import InputBar from './components/InputBar';
import useTheme from './hooks/useTheme';
import useChat from './hooks/useChat';

function App() {
  const { isDark, toggleTheme } = useTheme();
  const { messages, loading, sendMessage, clearChat } = useChat();

  // Apply theme on mount
  useEffect(() => {
    const root = document.documentElement;
    if (isDark) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [isDark]);

  const handleClearChat = () => {
    if (window.confirm('Are you sure you want to clear the chat history?')) {
      clearChat();
    }
  };

  return (
    <div className="app-shell min-h-screen transition-colors duration-300">
      <div className="mx-auto flex h-screen w-full max-w-6xl flex-col px-2 py-2 sm:px-4 sm:py-4">
        <div className="glass-panel flex h-full flex-col overflow-hidden rounded-3xl shadow-glow">
          {/* Header */}
          <Header
            isDark={isDark}
            onThemeToggle={toggleTheme}
            onClearChat={handleClearChat}
          />

          {/* Chat Container */}
          <ChatContainer messages={messages} loading={loading} />

          {/* Input Bar */}
          <InputBar onSendMessage={sendMessage} loading={loading} />
        </div>
      </div>
    </div>
  );
}

export default App;
