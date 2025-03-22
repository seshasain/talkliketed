import React from 'react';
import ChatScreen from '@/components/chat/ChatScreen';
import Navbar from '@/components/layout/Navbar';

const Chat = () => {
  return (
    <div className="min-h-screen flex flex-col prevent-horizontal-scroll">
      <Navbar />
      <div className="flex-grow">
        <ChatScreen />
      </div>
    </div>
  );
};

export default Chat; 