import React from 'react';
import ChatScreen from '@/components/chat/ChatScreen';

const Chat = () => {
  return (
    <div className="min-h-screen flex flex-col prevent-horizontal-scroll overflow-hidden">
      <ChatScreen />
    </div>
  );
};

export default Chat; 