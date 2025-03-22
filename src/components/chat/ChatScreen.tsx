import React, { useState, useEffect, useRef } from 'react';
import { 
  Send, 
  Phone, 
  Video, 
  MoreVertical, 
  Smile, 
  Paperclip, 
  Image, 
  Mic, 
  Target, 
  Zap, 
  ThumbsUp, 
  RefreshCw, 
  ArrowLeft, 
  Settings, 
  User, 
  Bell, 
  Clock,
  Search,
  Star,
  Info
} from 'lucide-react';
import GlassCard from '../ui/GlassCard';
import AnimatedButton from '../ui/AnimatedButton';

// Define profile types
interface Profile {
  id: string;
  name: string;
  avatar: string;
  color: string;
  status: string;
  lastActive?: string;
  messages: Message[];
}

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'contact';
  timestamp: string;
  read?: boolean;
}

// Response suggestion interface
interface ResponseSuggestion {
  id: string;
  text: string;
  tone: 'confident' | 'engaging' | 'direct' | 'friendly';
}

const ChatScreen: React.FC = () => {
  // Define profiles data
  const profiles: Profile[] = [
    {
      id: '1',
      name: 'Sarah Johnson',
      avatar: 'S',
      color: 'from-flirt-purple to-flirt-pink',
      status: 'online',
      messages: [
        { id: '1', text: "Hey! I really enjoyed our conversation about hiking yesterday. Any trails you'd recommend?", sender: 'contact', timestamp: '11:42 AM' },
        { id: '2', text: "I'd definitely check out Mountain Ridge - it has some challenging sections but the view is worth it. Have you done much hiking before?", sender: 'user', timestamp: '11:45 AM' },
        { id: '3', text: "Not too much, but I'm excited to try more advanced trails! Would you want to show me sometime?", sender: 'contact', timestamp: '11:50 AM' },
      ]
    },
    {
      id: '2',
      name: 'Jessica Miller',
      avatar: 'J',
      color: 'from-flirt-orange to-flirt-red',
      status: 'online',
      messages: [
        { id: '1', text: "Hi! I heard you're a photographer too. What kind of camera do you use?", sender: 'contact', timestamp: '10:15 AM' },
        { id: '2', text: "I use a Sony Alpha a7III. It's been amazing for both portraits and landscapes. What about you?", sender: 'user', timestamp: '10:20 AM' },
        { id: '3', text: "Nice! I have a Canon EOS R5, but I've been curious about Sony. Would you recommend it for someone who does a lot of night photography?", sender: 'contact', timestamp: '10:25 AM' },
      ]
    },
    {
      id: '3',
      name: 'Emily Wilson',
      avatar: 'E',
      color: 'from-flirt-blue to-flirt-purple',
      status: 'away',
      lastActive: '2 hours ago',
      messages: [
        { id: '1', text: "I just finished reading that book you recommended! It was incredible.", sender: 'contact', timestamp: 'Yesterday' },
        { id: '2', text: "I'm so glad you enjoyed it! The character development was amazing, wasn't it?", sender: 'user', timestamp: 'Yesterday' },
        { id: '3', text: "Absolutely! I was completely invested in their journey. Do you have any other recommendations in that genre?", sender: 'contact', timestamp: 'Yesterday' },
      ]
    },
    {
      id: '4',
      name: 'Amanda Garcia',
      avatar: 'A',
      color: 'from-flirt-pink to-flirt-orange',
      status: 'offline',
      lastActive: '5 hours ago',
      messages: [
        { id: '1', text: "Thanks for helping me with my project yesterday! You really saved me.", sender: 'contact', timestamp: 'Yesterday' },
        { id: '2', text: "No problem at all! It was actually fun working through those problems. How did the presentation go?", sender: 'user', timestamp: 'Yesterday' },
        { id: '3', text: "It went great! My boss was impressed with the solutions we came up with.", sender: 'contact', timestamp: 'Yesterday' },
      ]
    }
  ];

  // Response suggestions
  const responseSuggestions: ResponseSuggestion[] = [
    { 
      id: '1', 
      text: "I'd be happy to show you Mountain Ridge sometime! It's actually perfect for beginners looking to challenge themselves a bit. When are you usually free?", 
      tone: 'confident' 
    },
    { 
      id: '2', 
      text: "I'd definitely be up for showing you some trails! Mountain Ridge has amazing views and is pretty accessible. Have you got any hiking gear?", 
      tone: 'engaging' 
    },
    { 
      id: '3', 
      text: "Sure, I'd love to show you around Mountain Ridge. It's beautiful this time of year. Would next weekend work for you?", 
      tone: 'direct' 
    },
    { 
      id: '4', 
      text: "That sounds fun! I'd enjoy showing you some of my favorite spots. Mountain Ridge has great trails for all skill levels. What days work best for you?", 
      tone: 'friendly' 
    }
  ];

  // State management
  const [activeProfileId, setActiveProfileId] = useState<string>(profiles[0].id);
  const [inputText, setInputText] = useState<string>('');
  const [isTyping, setIsTyping] = useState<boolean>(false);
  const [selectedSuggestion, setSelectedSuggestion] = useState<string | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(true);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Get active profile
  const activeProfile = profiles.find(profile => profile.id === activeProfileId) || profiles[0];

  // Handle profile switch
  const handleProfileSwitch = (profileId: string) => {
    setActiveProfileId(profileId);
    setSelectedSuggestion(null);
    setInputText('');
    setIsTyping(false);
  };

  // Handle sending a message
  const handleSendMessage = () => {
    if (!inputText.trim() && !selectedSuggestion) return;
    
    // You would normally add this to the messages array
    // For this demo, we're keeping it simple
    setInputText('');
    setSelectedSuggestion(null);
    
    // Simulate typing response
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
    }, 3000);
  };

  // Use selected suggestion
  const handleSuggestionSelect = (suggestion: ResponseSuggestion) => {
    setSelectedSuggestion(suggestion.id);
    setInputText(suggestion.text);
    
    // Focus input field
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  // Scroll to bottom when messages change
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [activeProfile.messages, isTyping]);

  // Helper function to get tone color class
  const getToneColorClass = (tone: ResponseSuggestion['tone']) => {
    switch(tone) {
      case 'confident': return 'text-flirt-purple';
      case 'engaging': return 'text-flirt-pink';
      case 'direct': return 'text-flirt-orange';
      case 'friendly': return 'text-flirt-blue';
      default: return 'text-flirt-purple';
    }
  };

  return (
    <div className="flex flex-col h-screen md:h-[calc(100vh-80px)] max-h-screen overflow-hidden prevent-horizontal-scroll">
      <div className="flex flex-grow overflow-hidden relative">
        {/* Sidebar - Profile Switching */}
        <div className={`bg-white dark:bg-flirt-slate/90 border-r border-flirt-purple/10 h-full flex flex-col ${isSidebarOpen ? 'w-[320px]' : 'w-0'} transition-all duration-300 absolute md:relative z-20`}>
          <div className="p-4 flex items-center justify-between border-b border-flirt-purple/10">
            <h2 className="font-heading font-semibold text-lg">Messages</h2>
            <div className="flex items-center space-x-2">
              <button className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-flirt-purple/10 transition-colors">
                <Settings size={18} className="text-flirt-purple" />
              </button>
              <button className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-flirt-purple/10 transition-colors">
                <Bell size={18} className="text-flirt-purple" />
              </button>
            </div>
          </div>
          
          <div className="p-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search conversations..."
                className="w-full h-10 pl-10 pr-4 bg-white/70 dark:bg-white/10 rounded-full focus:outline-none focus:ring-2 focus:ring-flirt-purple/50 shadow-sm"
              />
              <Search size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
            </div>
          </div>
          
          <div className="flex-1 overflow-y-auto">
            {profiles.map((profile) => (
              <div 
                key={profile.id}
                onClick={() => handleProfileSwitch(profile.id)}
                className={`flex items-center p-4 border-b border-flirt-purple/5 cursor-pointer transition-colors ${activeProfileId === profile.id ? 'bg-flirt-purple/10' : 'hover:bg-flirt-purple/5'}`}
              >
                <div className={`w-12 h-12 rounded-full bg-gradient-to-r ${profile.color} flex-shrink-0 flex items-center justify-center relative`}>
                  <span className="text-white font-semibold text-lg">{profile.avatar}</span>
                  {profile.status === 'online' && (
                    <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-green-500 border-2 border-white"></span>
                  )}
                  {profile.status === 'away' && (
                    <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-amber-500 border-2 border-white"></span>
                  )}
                </div>
                <div className="ml-3 flex-1">
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium">{profile.name}</h3>
                    <span className="text-xs text-muted-foreground">{profile.messages[profile.messages.length - 1].timestamp}</span>
                  </div>
                  <p className="text-sm text-muted-foreground truncate max-w-[180px]">
                    {profile.messages[profile.messages.length - 1].text}
                  </p>
                </div>
              </div>
            ))}
          </div>
          
          <div className="p-4 border-t border-flirt-purple/10 bg-flirt-purple/5 flex items-center space-x-2">
            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-flirt-blue to-flirt-purple flex-shrink-0 flex items-center justify-center">
              <span className="text-white font-semibold">Y</span>
            </div>
            <div className="flex-1">
              <h3 className="font-medium text-sm">Your Profile</h3>
              <p className="text-xs text-muted-foreground">Premium Account</p>
            </div>
            <AnimatedButton 
              variant="ghost"
              size="icon"
              className="w-8 h-8"
              icon={<MoreVertical size={16} />}
            >
              <span className="sr-only">Menu</span>
            </AnimatedButton>
          </div>
        </div>
        
        {/* Main Chat Area */}
        <div className="flex-1 flex flex-col h-full overflow-hidden">
          {/* Chat Header */}
          <div className="h-16 border-b border-flirt-purple/10 flex items-center justify-between px-4 py-2 bg-white dark:bg-flirt-slate/90">
            <div className="flex items-center">
              <button 
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                className="md:hidden w-8 h-8 rounded-full flex items-center justify-center hover:bg-flirt-purple/10 transition-colors mr-2"
              >
                <ArrowLeft size={18} className="text-flirt-purple" />
              </button>
              <div className={`w-10 h-10 rounded-full bg-gradient-to-r ${activeProfile.color} flex-shrink-0 flex items-center justify-center`}>
                <span className="text-white font-semibold">{activeProfile.avatar}</span>
              </div>
              <div className="ml-3">
                <h3 className="font-medium">{activeProfile.name}</h3>
                <div className="flex items-center">
                  {activeProfile.status === 'online' ? (
                    <>
                      <span className="h-1.5 w-1.5 rounded-full bg-green-500 mr-1.5"></span>
                      <p className="text-xs text-muted-foreground">Online now</p>
                    </>
                  ) : (
                    <>
                      <span className="h-1.5 w-1.5 rounded-full bg-muted mr-1.5"></span>
                      <p className="text-xs text-muted-foreground">Last active {activeProfile.lastActive}</p>
                    </>
                  )}
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <button className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-flirt-purple/10 transition-colors">
                <Phone size={18} className="text-flirt-purple" />
              </button>
              <button className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-flirt-purple/10 transition-colors">
                <Video size={18} className="text-flirt-purple" />
              </button>
              <button className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-flirt-purple/10 transition-colors">
                <Info size={18} className="text-flirt-purple" />
              </button>
            </div>
          </div>
          
          {/* Chat Messages */}
          <div 
            ref={chatContainerRef}
            className="flex-1 p-4 overflow-y-auto bg-gradient-to-b from-white/80 to-white/50 dark:from-transparent dark:to-transparent scroll-smooth"
          >
            <div className="max-w-3xl mx-auto space-y-6">
              {/* Date Separator */}
              <div className="flex items-center justify-center">
                <div className="bg-flirt-purple/10 text-xs text-flirt-purple/80 rounded-full py-1 px-3 flex items-center">
                  <Clock size={12} className="mr-1.5" />
                  <span>Today</span>
                </div>
              </div>
              
              {/* Messages */}
              {activeProfile.messages.map((message) => (
                <div key={message.id} className={`flex items-start ${message.sender === 'user' ? 'ml-auto justify-end' : ''} max-w-[85%]`}>
                  {message.sender === 'contact' && (
                    <div className={`w-8 h-8 rounded-full bg-gradient-to-r ${activeProfile.color} flex-shrink-0 flex items-center justify-center mr-3`}>
                      <span className="text-white text-xs font-bold">{activeProfile.avatar}</span>
                    </div>
                  )}
                  
                  <div 
                    className={`p-3 rounded-xl shadow-sm max-w-md ${
                      message.sender === 'user' 
                        ? 'bg-gradient-to-r from-flirt-purple to-flirt-pink text-white rounded-br-none mr-3' 
                        : 'bg-white dark:bg-flirt-slate/20 rounded-bl-none'
                    }`}
                  >
                    <p className="text-sm">{message.text}</p>
                    <div className="flex items-center justify-end mt-1">
                      <span className={`text-xs ${message.sender === 'user' ? 'text-white/70' : 'text-muted-foreground'}`}>{message.timestamp}</span>
                    </div>
                  </div>
                  
                  {message.sender === 'user' && (
                    <div className="w-8 h-8 rounded-full bg-gradient-to-r from-flirt-blue to-flirt-purple flex-shrink-0 flex items-center justify-center">
                      <span className="text-white text-xs font-bold">Y</span>
                    </div>
                  )}
                </div>
              ))}
              
              {/* Typing indicator */}
              {isTyping && (
                <div className="flex items-start max-w-[85%]">
                  <div className={`w-8 h-8 rounded-full bg-gradient-to-r ${activeProfile.color} flex-shrink-0 flex items-center justify-center mr-3`}>
                    <span className="text-white text-xs font-bold">{activeProfile.avatar}</span>
                  </div>
                  <div className="bg-white dark:bg-flirt-slate/20 rounded-r-xl rounded-bl-xl p-3 shadow-sm">
                    <div className="flex space-x-1.5">
                      <div className="w-2 h-2 rounded-full bg-flirt-purple animate-pulse"></div>
                      <div className="w-2 h-2 rounded-full bg-flirt-pink animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                      <div className="w-2 h-2 rounded-full bg-flirt-orange animate-pulse" style={{ animationDelay: '0.4s' }}></div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
          
          {/* Message Input */}
          <div className="p-4 border-t border-flirt-purple/10 bg-white dark:bg-flirt-slate/90">
            <div className="flex items-center">
              <button className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-flirt-purple/10 transition-colors">
                <Paperclip size={20} className="text-flirt-purple" />
              </button>
              <div className="flex-1 relative mx-2">
                <input
                  ref={inputRef}
                  type="text"
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  placeholder="Type your message..."
                  className="w-full h-12 px-4 pr-12 bg-white/70 dark:bg-white/10 rounded-full focus:outline-none focus:ring-2 focus:ring-flirt-purple/50 shadow-sm"
                  onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                />
                <button className="absolute right-2 top-1/2 transform -translate-y-1/2 h-8 w-8 rounded-full hover:bg-flirt-purple/10 flex items-center justify-center transition-colors">
                  <Smile size={20} className="text-flirt-purple" />
                </button>
              </div>
              <button 
                onClick={handleSendMessage}
                className="w-12 h-12 rounded-full bg-gradient-to-r from-flirt-purple to-flirt-pink text-white flex items-center justify-center shadow-md hover:shadow-lg transition-shadow"
              >
                <Send size={18} />
              </button>
            </div>
          </div>
        </div>
        
        {/* AI Suggestions Panel */}
        <div className="hidden lg:flex flex-col w-[350px] border-l border-flirt-purple/10 bg-white dark:bg-flirt-slate/90 overflow-hidden">
          <div className="p-4 border-b border-flirt-purple/10">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="w-8 h-8 rounded-full flex items-center justify-center bg-flirt-purple/10">
                  <Target size={18} className="text-flirt-purple" />
                </div>
                <h3 className="font-heading font-semibold ml-2">Response Suggestions</h3>
              </div>
              <div className="text-xs text-muted-foreground flex items-center">
                <Star size={12} className="mr-1 text-flirt-purple/70" />
                <span>AI powered</span>
              </div>
            </div>
          </div>
          
          <div className="flex-1 overflow-y-auto p-4">
            <div className="space-y-3">
              {responseSuggestions.map((suggestion) => (
                <div 
                  key={suggestion.id}
                  onClick={() => handleSuggestionSelect(suggestion)}
                  className={`p-3 rounded-md border transition-all duration-300 cursor-pointer hover:shadow-md ${
                    selectedSuggestion === suggestion.id ? 'border-flirt-pink bg-flirt-pink/5 shadow-sm' : 'border-border bg-white/50 dark:bg-white/5'
                  }`}
                >
                  <p className="text-sm">{suggestion.text}</p>
                  <div className="flex items-center justify-between mt-2">
                    <div className="flex items-center space-x-1">
                      <div className={`h-2 w-2 rounded-full ${getToneColorClass(suggestion.tone)}`}></div>
                      <span className={`text-xs ${selectedSuggestion === suggestion.id ? 'text-flirt-pink font-medium' : 'text-muted-foreground'}`}>
                        {suggestion.tone.charAt(0).toUpperCase() + suggestion.tone.slice(1)}
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <button className="text-muted-foreground hover:text-flirt-pink transition-colors p-1.5 rounded-full hover:bg-flirt-pink/10">
                        <RefreshCw size={14} />
                      </button>
                      <button className={`${selectedSuggestion === suggestion.id ? 'text-flirt-pink' : 'text-muted-foreground'} hover:text-flirt-pink transition-colors p-1.5 rounded-full hover:bg-flirt-pink/10`}>
                        <ThumbsUp size={14} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-6 pt-4 border-t border-border">
              <h4 className="text-sm font-medium mb-3 flex items-center">
                <div className="w-6 h-6 rounded-full flex items-center justify-center bg-flirt-pink/10 mr-2">
                  <Zap size={14} className="text-flirt-pink" />
                </div>
                Conversation Analysis
              </h4>
              <div className="space-y-3.5">
                <div className="flex items-center text-xs">
                  <div className="w-24 text-muted-foreground">Interest:</div>
                  <div className="flex-1 h-2 bg-muted/50 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-flirt-orange to-flirt-red rounded-full" style={{width: '90%'}}></div>
                  </div>
                  <div className="ml-2 text-muted-foreground font-medium">Very High</div>
                </div>
                <div className="flex items-center text-xs">
                  <div className="w-24 text-muted-foreground">Engagement:</div>
                  <div className="flex-1 h-2 bg-muted/50 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-flirt-pink to-flirt-red rounded-full" style={{width: '85%'}}></div>
                  </div>
                  <div className="ml-2 text-muted-foreground font-medium">High</div>
                </div>
                <div className="flex items-center text-xs">
                  <div className="w-24 text-muted-foreground">Your Tone:</div>
                  <div className="flex-1 h-2 bg-muted/50 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-flirt-purple to-flirt-pink rounded-full" style={{width: '75%'}}></div>
                  </div>
                  <div className="ml-2 text-muted-foreground font-medium">Good</div>
                </div>
              </div>
            </div>
            
            <div className="mt-6 pt-4 border-t border-border">
              <h4 className="text-sm font-medium mb-3">Suggested Topics</h4>
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 bg-flirt-purple/10 text-flirt-purple text-xs rounded-full">Weekend plans</span>
                <span className="px-3 py-1 bg-flirt-pink/10 text-flirt-pink text-xs rounded-full">Hiking gear</span>
                <span className="px-3 py-1 bg-flirt-orange/10 text-flirt-orange text-xs rounded-full">Coffee shops</span>
                <span className="px-3 py-1 bg-flirt-blue/10 text-flirt-blue text-xs rounded-full">Photography</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatScreen; 