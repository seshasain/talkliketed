
import React from 'react';
import { useNavigate } from 'react-router-dom';
import ChatScreen from '@/components/chat/ChatScreen';
import { useAuth } from '@/context/AuthContext';
import { ArrowLeft, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Chat = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  return (
    <div className="min-h-screen flex flex-col prevent-horizontal-scroll overflow-hidden bg-gradient-to-br from-flirt-navy/10 via-background to-flirt-blue/10">
      {/* Header */}
      <header className="bg-flirt-navy/90 text-white py-3 px-4 flex justify-between items-center">
        <div className="flex items-center space-x-3">
          <Button 
            variant="ghost" 
            size="icon" 
            className="text-white hover:bg-white/10"
            onClick={() => navigate('/dashboard')}
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-xl font-bold">Chat</h1>
        </div>
        
        <div className="flex items-center space-x-2">
          <span className="text-sm text-white/80">Hi, {user?.name || 'User'}</span>
          <Button 
            variant="ghost" 
            size="icon" 
            className="text-white hover:bg-white/10"
            onClick={() => navigate('/settings')}
          >
            <Settings className="h-5 w-5" />
          </Button>
        </div>
      </header>
      
      {/* Chat Content */}
      <div className="flex-1 overflow-hidden">
        <ChatScreen />
      </div>
    </div>
  );
};

export default Chat;
