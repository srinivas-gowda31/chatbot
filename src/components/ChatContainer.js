import React, { useEffect, useRef } from 'react';
import MessageBubble from './MessageBubble';
import TypingIndicator from './TypingIndicator';
import EmptyState from './EmptyState';

const ChatContainer = ({ messages, loading }) => {
  const endOfMessagesRef = useRef(null);

  // Auto-scroll to latest message
  useEffect(() => {
    endOfMessagesRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  return (
    <div className="relative flex-1 overflow-y-auto bg-transparent px-3 py-6 sm:px-5 sm:py-8">
      <div className="mx-auto w-full max-w-5xl">
        {messages.length === 0 ? (
          <EmptyState />
        ) : (
          messages.map((message) => (
            <MessageBubble
              key={message.id}
              message={message}
              isUser={message.sender === 'user'}
            />
          ))
        )}

        {loading && <TypingIndicator />}

        {/* Dummy element to scroll to */}
        <div ref={endOfMessagesRef} />
      </div>
    </div>
  );
};

export default ChatContainer;
