import React, { useState, useEffect, useRef } from 'react';
import { 
  Send, 
  Phone, 
  Video, 
  Smile, 
  Paperclip, 
  Target, 
  Zap, 
  ArrowLeft, 
  Settings, 
  Clock,
  Search,
  Star,
  ChevronRight,
  LayoutDashboard,
  Minimize2,
  Maximize2,
  LogOut,
  RefreshCw,
  Filter,
  Flame,
  Heart,
  PenTool,
  Sparkles,
  Brain,
  ChevronDown,
  ChevronUp,
  Clipboard,
  Copy,
  HelpCircle
} from 'lucide-react';
import AnimatedButton from '../ui/AnimatedButton';
import { Link } from 'react-router-dom';

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

// Define the tone type
type ToneType = 'all' | ResponseSuggestion['tone'];

// Define the flirting style type
type FlirtingStyleType = 'any' | 'playful' | 'romantic' | 'mysterious' | 'intellectual' | 'bold';

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

  // Add new state for tone filter and flirting style
  const [selectedToneFilter, setSelectedToneFilter] = useState<ToneType>('all');
  const [selectedFlirtingStyle, setSelectedFlirtingStyle] = useState<FlirtingStyleType>('any');
  const [flirtingIntensity, setFlirtingIntensity] = useState<number>(50);
  
  // Original response suggestions
  const allResponseSuggestions: ResponseSuggestion[] = [
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

  // Response suggestions - filtered based on selected tone
  const [responseSuggestions, setResponseSuggestions] = useState<ResponseSuggestion[]>(allResponseSuggestions);

  // State management
  const [activeProfileId, setActiveProfileId] = useState<string>(profiles[0].id);
  const [inputText, setInputText] = useState<string>('');
  const [isTyping, setIsTyping] = useState<boolean>(false);
  const [selectedSuggestion, setSelectedSuggestion] = useState<string | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(true);
  const [isSuggestionsPanelOpen, setIsSuggestionsPanelOpen] = useState<boolean>(true);
  const [isCompactMode, setIsCompactMode] = useState<boolean>(false);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Add new state for filter panel visibility
  const [isFilterPanelOpen, setIsFilterPanelOpen] = useState<boolean>(false);

  // Add new state for showing help tooltip
  const [showWorkflowHelp, setShowWorkflowHelp] = useState<boolean>(false);

  // Get active profile
  const activeProfile = profiles.find(profile => profile.id === activeProfileId) || profiles[0];

  // Update responseSuggestions when the tone filter changes
  useEffect(() => {
    if (selectedToneFilter === 'all') {
      setResponseSuggestions(allResponseSuggestions);
    } else {
      setResponseSuggestions(allResponseSuggestions.filter(suggestion => suggestion.tone === selectedToneFilter));
    }
  }, [selectedToneFilter]);

  // Handle profile switch
  const handleProfileSwitch = (profileId: string) => {
    setActiveProfileId(profileId);
    setSelectedSuggestion(null);
    setInputText('');
    setIsTyping(false);
  };

  // Generate new suggestions based on the current conversation and selected filters
  const getNewSuggestions = () => {
    // In a real app, this would call an API to get new AI-generated suggestions
    // with the selected tone, flirting style, and intensity
    
    // Show loading state
    setResponseSuggestions([]);
    
    setTimeout(() => {
      // In a real implementation, these would be generated by AI based on the filters
      const newSuggestions: ResponseSuggestion[] = [
        { 
          id: '5', 
          text: generateSuggestionText('confident', selectedFlirtingStyle, flirtingIntensity), 
          tone: 'confident' 
        },
        { 
          id: '6', 
          text: generateSuggestionText('engaging', selectedFlirtingStyle, flirtingIntensity), 
          tone: 'engaging' 
        },
        { 
          id: '7', 
          text: generateSuggestionText('direct', selectedFlirtingStyle, flirtingIntensity), 
          tone: 'direct' 
        },
        { 
          id: '8', 
          text: generateSuggestionText('friendly', selectedFlirtingStyle, flirtingIntensity), 
          tone: 'friendly' 
        }
      ];
      
      // Filter the new suggestions if a tone is selected
      if (selectedToneFilter === 'all') {
        setResponseSuggestions(newSuggestions);
      } else {
        setResponseSuggestions(newSuggestions.filter(suggestion => suggestion.tone === selectedToneFilter));
      }
    }, 1000);
  };

  // Helper function to generate suggestion text based on flirting style and intensity
  const generateSuggestionText = (
    tone: ResponseSuggestion['tone'], 
    flirtingStyle: FlirtingStyleType, 
    intensity: number
  ): string => {
    // Base texts - in a real app these would come from an AI
    const baseResponses = {
      confident: [
        "I know some great beginner-friendly trails around Mountain Ridge. I'd be glad to show you my favorite spots. Do you have any specific preferences for hiking?",
        "I'd be happy to show you Mountain Ridge sometime! It's actually perfect for beginners looking to challenge themselves a bit. When are you usually free?"
      ],
      engaging: [
        "Mountain Ridge is actually perfect this time of year! The views are incredible. I'd love to take you there sometime - what's your availability like in the next couple weeks?",
        "I'd definitely be up for showing you some trails! Mountain Ridge has amazing views and is pretty accessible. Have you got any hiking gear?"
      ],
      direct: [
        "I can guide you through Mountain Ridge. Let's plan for next Saturday if you're free. What time works for you?",
        "Sure, I'd love to show you around Mountain Ridge. It's beautiful this time of year. Would next weekend work for you?"
      ],
      friendly: [
        "I'd be thrilled to show you around! Mountain Ridge has some amazing trails with beautiful scenery. How about we go together next weekend? I can help you prepare too!",
        "That sounds fun! I'd enjoy showing you some of my favorite spots. Mountain Ridge has great trails for all skill levels. What days work best for you?"
      ]
    };

    // Modify based on flirting style and intensity
    let responseText = baseResponses[tone][Math.floor(Math.random() * baseResponses[tone].length)];
    
    // In a real implementation, this would be much more sophisticated
    // and would use AI to generate appropriate responses
    switch(flirtingStyle) {
      case 'playful':
        if (intensity > 70) {
          responseText += " Maybe we can race to the top? Loser buys drinks after 😉";
        } else if (intensity > 40) {
          responseText += " I promise I won't push you off any cliffs... unless you deserve it 😜";
        } else {
          responseText += " It'll be fun!";
        }
        break;
      case 'romantic':
        if (intensity > 70) {
          responseText += " There's something magical about watching the sunset from the ridge with someone special.";
        } else if (intensity > 40) {
          responseText += " The view is almost as beautiful as the company would be.";
        } else {
          responseText += " It's quite peaceful there.";
        }
        break;
      case 'mysterious':
        if (intensity > 70) {
          responseText += " I know a secret spot off the main trail that very few people discover.";
        } else if (intensity > 40) {
          responseText += " There's more to the trail than most people get to see.";
        } else {
          responseText += " It's an interesting place.";
        }
        break;
      case 'intellectual':
        if (intensity > 70) {
          responseText += " The geological formations there tell a fascinating story about the region's tectonic history.";
        } else if (intensity > 40) {
          responseText += " I can tell you about the native flora and fauna along the way.";
        } else {
          responseText += " It's quite an educational experience.";
        }
        break;
      case 'bold':
        if (intensity > 70) {
          responseText += " I've been thinking about you on my past few hikes. It would be much better with you there.";
        } else if (intensity > 40) {
          responseText += " I've been wanting to ask you to join me for a while now.";
        } else {
          responseText += " I think we'd have a great time together.";
        }
        break;
    }
    
    return responseText;
  };

  // Use selected suggestion
  const handleSuggestionSelect = (suggestion: ResponseSuggestion) => {
    // Only store the selected suggestion ID, don't fill the input field
    setSelectedSuggestion(suggestion.id);
    
    // Don't set input text anymore
    // setInputText(suggestion.text);
    
    // Focus input field in case user wants to modify before sending
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  // Add new function to directly send a suggestion
  const handleSendSuggestion = (suggestion: ResponseSuggestion) => {
    // Store which suggestion was used
    setSelectedSuggestion(suggestion.id);
    
    // In a real app, you would add this to your outgoing messages
    // For the demo, we'll simulate sending by adding to the UI
    
    // Create a temporary variable to hold the active profile with the new message
    const updatedProfiles = [...profiles];
    const profileIndex = updatedProfiles.findIndex(p => p.id === activeProfileId);
    
    if (profileIndex !== -1) {
      // Create a new message from the user (using the selected suggestion text)
      const newMessage = {
        id: `user-${Date.now()}`,
        text: suggestion.text,
        sender: 'user' as const,
        timestamp: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})
      };
      
      // Add the message to the active profile's messages
      updatedProfiles[profileIndex].messages = [
        ...updatedProfiles[profileIndex].messages,
        newMessage
      ];
      
      // Update the profiles state
      profiles.splice(0, profiles.length, ...updatedProfiles);
    }
    
    // Clear any existing input
    setInputText('');
    
    // Simulate typing response from contact
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      
      // Generate new response suggestions based on the sent message
      getNewSuggestions();
    }, 2000);
  };

  // Enhance handleSendMessage to make it clearer this is for outgoing messages
  const handleSendMessage = () => {
    // If there's text in the input, use that
    if (inputText.trim()) {
      // Create a temporary variable to hold the active profile with the new message
      const updatedProfiles = [...profiles];
      const profileIndex = updatedProfiles.findIndex(p => p.id === activeProfileId);
      
      if (profileIndex !== -1) {
        // Create a new message from the user
        const newMessage = {
          id: `user-${Date.now()}`,
          text: inputText,
          sender: 'user' as const,
          timestamp: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})
        };
        
        // Add the message to the active profile's messages
        updatedProfiles[profileIndex].messages = [
          ...updatedProfiles[profileIndex].messages,
          newMessage
        ];
        
        // Update the profiles state
        profiles.splice(0, profiles.length, ...updatedProfiles);
      }
      
      // Clear input and selection
      setInputText('');
      setSelectedSuggestion(null);
      
      // Simulate typing response
      setIsTyping(true);
      setTimeout(() => {
        setIsTyping(false);
        
        // Generate new response suggestions based on the latest message
        getNewSuggestions();
      }, 2000);
    } 
    // Otherwise, if there's a selected suggestion, use that
    else if (selectedSuggestion) {
      const suggestion = responseSuggestions.find(s => s.id === selectedSuggestion);
      if (suggestion) {
        // Create a temporary variable to hold the active profile with the new message
        const updatedProfiles = [...profiles];
        const profileIndex = updatedProfiles.findIndex(p => p.id === activeProfileId);
        
        if (profileIndex !== -1) {
          // Create a new message from the user (using the selected suggestion text)
          const newMessage = {
            id: `user-${Date.now()}`,
            text: suggestion.text,
            sender: 'user' as const,
            timestamp: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})
          };
          
          // Add the message to the active profile's messages
          updatedProfiles[profileIndex].messages = [
            ...updatedProfiles[profileIndex].messages,
            newMessage
          ];
          
          // Update the profiles state
          profiles.splice(0, profiles.length, ...updatedProfiles);
        }
        
        // Clear selection
        setSelectedSuggestion(null);
        
        // Simulate typing response
        setIsTyping(true);
        setTimeout(() => {
          setIsTyping(false);
          
          // Generate new response suggestions based on the sent message
          getNewSuggestions();
        }, 2000);
      }
    }
  };

  // Add mock function to handle pasting of "crush's" messages
  const handlePasteMessage = () => {
    // In a real app, this would access the clipboard API
    // For demo purposes, we'll prompt the user
    const pastedMessage = prompt("Paste your crush's message here:");
    
    if (pastedMessage && pastedMessage.trim()) {
      // In a real app, you would add this message to the conversation
      alert("Message added to conversation");
      
      // Generate new response suggestions based on the pasted message
      getNewSuggestions();
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

  // Helper function to get tone background color class
  const getToneBackgroundClass = (tone: ResponseSuggestion['tone']) => {
    switch(tone) {
      case 'confident': return 'bg-flirt-purple/10';
      case 'engaging': return 'bg-flirt-pink/10';
      case 'direct': return 'bg-flirt-orange/10';
      case 'friendly': return 'bg-flirt-blue/10';
      default: return 'bg-flirt-purple/10';
    }
  };

  // Helper to toggle compact mode
  const toggleCompactMode = () => {
    setIsCompactMode(!isCompactMode);
  };

  // Get icon for flirting style
  const getFlirtingStyleIcon = (style: FlirtingStyleType) => {
    switch(style) {
      case 'playful': return <Sparkles size={12} />;
      case 'romantic': return <Heart size={12} />;
      case 'mysterious': return <PenTool size={12} />;
      case 'intellectual': return <Brain size={12} />;
      case 'bold': return <Flame size={12} />;
      default: return <Star size={12} />;
    }
  };

  // Get color class for flirting style
  const getFlirtingStyleColorClass = (style: FlirtingStyleType) => {
    switch(style) {
      case 'playful': return 'text-flirt-blue';
      case 'romantic': return 'text-flirt-pink';
      case 'mysterious': return 'text-flirt-purple';
      case 'intellectual': return 'text-emerald-500';
      case 'bold': return 'text-flirt-orange';
      default: return 'text-muted-foreground';
    }
  };

  // Get background color class for flirting style
  const getFlirtingStyleBgClass = (style: FlirtingStyleType) => {
    switch(style) {
      case 'playful': return 'bg-flirt-blue/10';
      case 'romantic': return 'bg-flirt-pink/10';
      case 'mysterious': return 'bg-flirt-purple/10';
      case 'intellectual': return 'bg-emerald-500/10';
      case 'bold': return 'bg-flirt-orange/10';
      default: return 'bg-muted/10';
    }
  };

  return (
    <div className="flex flex-col h-screen max-h-screen overflow-hidden prevent-horizontal-scroll bg-gradient-to-b from-white/80 to-white/50 dark:from-transparent dark:to-transparent">
      <div className="flex flex-grow overflow-hidden relative">
        {/* Sidebar - Profile Switching */}
        <div className={`bg-white dark:bg-flirt-slate/90 border-r border-flirt-purple/10 h-full flex flex-col ${isSidebarOpen ? (isCompactMode ? 'w-[250px]' : 'w-[280px]') : 'w-0'} transition-all duration-300 absolute md:relative z-20`}>
          {/* Sidebar Header with App Title */}
          <div className="h-14 flex items-center justify-between px-3 border-b border-flirt-purple/10">
            <div className="flex items-center">
              <div className="text-base font-heading font-semibold">
                Messages
              </div>
            </div>
            
            <div className="flex items-center space-x-1">
              <button
                onClick={toggleCompactMode}
                className="w-7 h-7 rounded-full flex items-center justify-center hover:bg-flirt-purple/10 transition-colors"
                title={isCompactMode ? "Expand view" : "Compact view"}
              >
                {isCompactMode ? <Maximize2 size={14} /> : <Minimize2 size={14} />}
              </button>
              <button 
                onClick={() => setIsSidebarOpen(!isSidebarOpen)} 
                className="md:hidden w-7 h-7 rounded-full flex items-center justify-center hover:bg-flirt-purple/10 transition-colors"
              >
                <ArrowLeft size={14} className="text-flirt-purple" />
              </button>
            </div>
          </div>
          
          <div className="p-2">
            <div className="relative">
              <input
                type="text"
                placeholder="Search..."
                className="w-full h-8 pl-8 pr-3 bg-white/70 dark:bg-white/10 rounded-full focus:outline-none focus:ring-1 focus:ring-flirt-purple/50 text-sm"
              />
              <Search size={14} className="absolute left-2.5 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
            </div>
          </div>
          
          <div className="flex-1 overflow-y-auto">
            {profiles.map((profile) => (
              <div 
                key={profile.id}
                onClick={() => handleProfileSwitch(profile.id)}
                className={`flex items-center p-2.5 border-b border-flirt-purple/5 cursor-pointer transition-colors ${activeProfileId === profile.id ? 'bg-flirt-purple/10' : 'hover:bg-flirt-purple/5'}`}
              >
                <div className={`${isCompactMode ? 'w-8 h-8' : 'w-10 h-10'} rounded-full bg-gradient-to-r ${profile.color} flex-shrink-0 flex items-center justify-center relative`}>
                  <span className="text-white font-semibold">{profile.avatar}</span>
                  {profile.status === 'online' && (
                    <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full bg-green-500 border-2 border-white"></span>
                  )}
                  {profile.status === 'away' && (
                    <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full bg-amber-500 border-2 border-white"></span>
                  )}
                </div>
                <div className="ml-2.5 flex-1 overflow-hidden">
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium text-sm truncate">{profile.name}</h3>
                    <span className="text-xs text-muted-foreground ml-1">{profile.messages[profile.messages.length - 1].timestamp}</span>
                  </div>
                  <p className="text-xs text-muted-foreground truncate max-w-[170px]">
                    {profile.messages[profile.messages.length - 1].text}
                  </p>
                </div>
              </div>
            ))}
          </div>
          
          <div className="p-2.5 border-t border-flirt-purple/10 bg-flirt-purple/5 flex items-center justify-between">
            <div className="flex items-center">
              <div className="w-8 h-8 rounded-full bg-gradient-to-r from-flirt-blue to-flirt-purple flex-shrink-0 flex items-center justify-center">
                <span className="text-white font-semibold text-sm">Y</span>
              </div>
              <div className="flex-1 ml-2.5 overflow-hidden">
                <h3 className="font-medium text-xs">Your Profile</h3>
                <p className="text-xs text-muted-foreground">Premium</p>
              </div>
            </div>
            <button className="w-7 h-7 rounded-full flex items-center justify-center hover:bg-flirt-purple/10 transition-colors">
              <Settings size={14} className="text-flirt-purple" />
            </button>
          </div>
        </div>
        
        {/* Main Chat Area */}
        <div className="flex-1 flex flex-col h-full overflow-hidden">
          {/* Chat Header */}
          <div className="h-14 border-b border-flirt-purple/10 flex items-center justify-between px-3 py-2 bg-white dark:bg-flirt-slate/90">
            <div className="flex items-center">
              <button 
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                className="md:hidden w-8 h-8 rounded-full flex items-center justify-center hover:bg-flirt-purple/10 transition-colors mr-2"
              >
                {isSidebarOpen ? <ArrowLeft size={16} /> : <LayoutDashboard size={16} />}
              </button>
              <div className={`${isCompactMode ? 'w-8 h-8' : 'w-9 h-9'} rounded-full bg-gradient-to-r ${activeProfile.color} flex-shrink-0 flex items-center justify-center`}>
                <span className="text-white font-semibold">{activeProfile.avatar}</span>
              </div>
              <div className="ml-2.5 overflow-hidden">
                <div className="flex items-center">
                  <h3 className="font-medium text-sm truncate">{activeProfile.name}</h3>
                  <div className="ml-1.5 flex items-center">
                    <span className="text-[10px] text-white px-1.5 py-0.5 rounded-full bg-flirt-purple/80">External Chat</span>
                  </div>
                </div>
                <div className="flex items-center">
                  {activeProfile.status === 'online' ? (
                    <>
                      <span className="h-1.5 w-1.5 rounded-full bg-green-500 mr-1"></span>
                      <p className="text-xs text-muted-foreground whitespace-nowrap">Conversation from another platform</p>
                    </>
                  ) : (
                    <>
                      <span className="h-1.5 w-1.5 rounded-full bg-muted mr-1"></span>
                      <p className="text-xs text-muted-foreground whitespace-nowrap truncate">Last seen {activeProfile.lastActive}</p>
                    </>
                  )}
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-1">
              <button className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-flirt-purple/10 transition-colors">
                <Phone size={14} className="text-flirt-purple" />
              </button>
              <button className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-flirt-purple/10 transition-colors">
                <Video size={14} className="text-flirt-purple" />
              </button>
              <button 
                onClick={() => setIsSuggestionsPanelOpen(!isSuggestionsPanelOpen)} 
                className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-flirt-purple/10 transition-colors"
                title={isSuggestionsPanelOpen ? "Hide suggestions" : "Show suggestions"}
              >
                {isSuggestionsPanelOpen ? 
                  <ChevronRight size={14} className="text-flirt-purple" /> : 
                  <Target size={14} className="text-flirt-purple" />
                }
              </button>
            </div>
          </div>
          
          {/* Add workflow help message */}
          <div className="bg-flirt-purple/5 border-b border-flirt-purple/10 px-3 py-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Clipboard size={14} className="text-flirt-purple mr-2" />
                <span className="text-xs text-muted-foreground">Paste messages from your crush, then use AI to generate perfect responses</span>
              </div>
              <button 
                onMouseEnter={() => setShowWorkflowHelp(true)}
                onMouseLeave={() => setShowWorkflowHelp(false)}
                className="h-5 w-5 rounded-full flex items-center justify-center hover:bg-flirt-purple/10 text-flirt-purple/70"
              >
                <HelpCircle size={12} />
              </button>
            </div>
            {showWorkflowHelp && (
              <div className="mt-2 p-2 bg-white/80 dark:bg-white/10 rounded-md text-xs shadow-sm border border-flirt-purple/10">
                <p className="mb-1 font-medium text-flirt-purple">How to use FlirtSync:</p>
                <ol className="list-decimal pl-5 space-y-1 text-muted-foreground">
                  <li>Paste messages from your crush from other platforms</li>
                  <li>FlirtSync AI analyzes the conversation and generates response options</li>
                  <li>Select a response style and customize flirting intensity</li>
                  <li>Choose the perfect response and copy it to send back to your crush</li>
                </ol>
              </div>
            )}
          </div>
          
          {/* Chat Messages */}
          <div 
            ref={chatContainerRef}
            className="flex-1 p-3 overflow-y-auto scroll-smooth"
          >
            <div className="max-w-2xl mx-auto space-y-4">
              {/* Date Separator */}
              <div className="flex items-center justify-center">
                <div className="bg-flirt-purple/10 text-xs text-flirt-purple/80 rounded-full py-0.5 px-2.5 flex items-center">
                  <Clock size={10} className="mr-1" />
                  <span>Today</span>
                </div>
              </div>
              
              {/* Messages */}
              {activeProfile.messages.map((message) => (
                <div key={message.id} className={`flex items-start ${message.sender === 'user' ? 'ml-auto justify-end' : ''} max-w-[88%]`}>
                  {message.sender === 'contact' && !isCompactMode && (
                    <div className={`w-7 h-7 rounded-full bg-gradient-to-r ${activeProfile.color} flex-shrink-0 flex items-center justify-center mr-2`}>
                      <span className="text-white text-xs font-bold">{activeProfile.avatar}</span>
                    </div>
                  )}
                  
                  <div 
                    className={`p-2.5 rounded-xl shadow-sm ${
                      message.sender === 'user' 
                        ? 'bg-gradient-to-r from-flirt-purple to-flirt-pink text-white rounded-br-none mr-2' : 
                        'bg-white dark:bg-flirt-slate/20 rounded-bl-none'
                    }`}
                  >
                    <p className="text-sm">{message.text}</p>
                    <div className="flex items-center justify-end mt-0.5">
                      <span className={`text-xs ${message.sender === 'user' ? 'text-white/70' : 'text-muted-foreground'}`}>{message.timestamp}</span>
                    </div>
                  </div>
                  
                  {message.sender === 'user' && !isCompactMode && (
                    <div className="w-7 h-7 rounded-full bg-gradient-to-r from-flirt-blue to-flirt-purple flex-shrink-0 flex items-center justify-center">
                      <span className="text-white text-xs font-bold">Y</span>
                    </div>
                  )}
                </div>
              ))}
              
              {/* Typing indicator */}
              {isTyping && (
                <div className="flex items-start max-w-[88%]">
                  {!isCompactMode && (
                    <div className={`w-7 h-7 rounded-full bg-gradient-to-r ${activeProfile.color} flex-shrink-0 flex items-center justify-center mr-2`}>
                      <span className="text-white text-xs font-bold">{activeProfile.avatar}</span>
                    </div>
                  )}
                  <div className="bg-white dark:bg-flirt-slate/20 rounded-r-xl rounded-bl-xl p-2.5 shadow-sm">
                    <div className="flex space-x-1">
                      <div className="w-1.5 h-1.5 rounded-full bg-flirt-purple animate-pulse"></div>
                      <div className="w-1.5 h-1.5 rounded-full bg-flirt-pink animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                      <div className="w-1.5 h-1.5 rounded-full bg-flirt-orange animate-pulse" style={{ animationDelay: '0.4s' }}></div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
          
          {/* Message Input */}
          <div className="border-t border-flirt-purple/10 bg-white dark:bg-flirt-slate/90">
            <div className="p-3">
              <div className="flex items-center">
                <button 
                  onClick={handlePasteMessage}
                  className="w-9 h-9 rounded-full flex items-center justify-center hover:bg-flirt-purple/10 transition-colors" 
                  title="Paste message from your crush"
                >
                  <Clipboard size={18} className="text-flirt-purple" />
                </button>
                <div className="flex-1 relative mx-2">
                  <input
                    ref={inputRef}
                    type="text"
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    placeholder="Paste your crush's message or type your response..."
                    className="w-full h-10 px-3 pr-9 bg-white/70 dark:bg-white/10 rounded-full focus:outline-none focus:ring-1 focus:ring-flirt-purple/50 text-sm"
                    onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                  />
                  <button className="absolute right-2 top-1/2 transform -translate-y-1/2 h-6 w-6 rounded-full hover:bg-flirt-purple/10 flex items-center justify-center transition-colors">
                    <Smile size={16} className="text-flirt-purple" />
                  </button>
                </div>
                <button 
                  onClick={handleSendMessage}
                  className="w-10 h-10 rounded-full bg-gradient-to-r from-flirt-purple to-flirt-pink text-white flex items-center justify-center shadow-md hover:shadow-lg transition-shadow"
                  title="Send selected AI-generated response"
                >
                  <Send size={16} />
                </button>
              </div>
              
              {/* Toggle for flirting preferences */}
              <div className="mt-2 flex justify-center">
                <button 
                  onClick={() => setIsFilterPanelOpen(!isFilterPanelOpen)}
                  className="flex items-center text-xs text-muted-foreground hover:text-flirt-purple transition-colors px-3 py-1.5 rounded-full bg-flirt-purple/5 hover:bg-flirt-purple/10"
                >
                  <Heart size={12} className="mr-1.5" />
                  <span>Response Preferences</span>
                  {isFilterPanelOpen ? 
                    <ChevronUp size={12} className="ml-1.5" /> : 
                    <ChevronDown size={12} className="ml-1.5" />
                  }
                </button>
              </div>
            </div>
            
            {/* Message Preferences Panel */}
            {isFilterPanelOpen && (
              <div className="px-4 pb-3 border-t border-flirt-purple/5 bg-white/50 dark:bg-white/5 animate-slide-up" style={{animationDuration: '0.2s'}}>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-3">
                  {/* Flirting Style Filter Section */}
                  <div className="bg-white dark:bg-white/10 rounded-md p-2.5 shadow-sm">
                    <div className="flex items-center mb-1.5">
                      <Heart size={12} className="text-flirt-pink mr-1.5" />
                      <span className="text-xs font-medium">Flirting Style</span>
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      <button
                        onClick={() => setSelectedFlirtingStyle('any')}
                        className={`px-2 py-0.5 rounded-full text-xs transition-colors ${
                          selectedFlirtingStyle === 'any' 
                            ? 'bg-flirt-purple text-white' 
                            : 'bg-flirt-purple/10 text-flirt-purple hover:bg-flirt-purple/20'
                        }`}
                      >
                        Any Style
                      </button>
                      <button
                        onClick={() => setSelectedFlirtingStyle('playful')}
                        className={`px-2 py-0.5 rounded-full text-xs transition-colors flex items-center ${
                          selectedFlirtingStyle === 'playful' 
                            ? 'bg-flirt-blue text-white' 
                            : 'bg-flirt-blue/10 text-flirt-blue hover:bg-flirt-blue/20'
                        }`}
                      >
                        <Sparkles size={10} className="mr-1" /> Playful
                      </button>
                      <button
                        onClick={() => setSelectedFlirtingStyle('romantic')}
                        className={`px-2 py-0.5 rounded-full text-xs transition-colors flex items-center ${
                          selectedFlirtingStyle === 'romantic' 
                            ? 'bg-flirt-pink text-white' 
                            : 'bg-flirt-pink/10 text-flirt-pink hover:bg-flirt-pink/20'
                        }`}
                      >
                        <Heart size={10} className="mr-1" /> Romantic
                      </button>
                      <button
                        onClick={() => setSelectedFlirtingStyle('mysterious')}
                        className={`px-2 py-0.5 rounded-full text-xs transition-colors flex items-center ${
                          selectedFlirtingStyle === 'mysterious' 
                            ? 'bg-flirt-purple text-white' 
                            : 'bg-flirt-purple/10 text-flirt-purple hover:bg-flirt-purple/20'
                        }`}
                      >
                        <PenTool size={10} className="mr-1" /> Mysterious
                      </button>
                      <button
                        onClick={() => setSelectedFlirtingStyle('intellectual')}
                        className={`px-2 py-0.5 rounded-full text-xs transition-colors flex items-center ${
                          selectedFlirtingStyle === 'intellectual' 
                            ? 'bg-emerald-500 text-white' 
                            : 'bg-emerald-500/10 text-emerald-500 hover:bg-emerald-500/20'
                        }`}
                      >
                        <Brain size={10} className="mr-1" /> Intellectual
                      </button>
                      <button
                        onClick={() => setSelectedFlirtingStyle('bold')}
                        className={`px-2 py-0.5 rounded-full text-xs transition-colors flex items-center ${
                          selectedFlirtingStyle === 'bold' 
                            ? 'bg-flirt-orange text-white' 
                            : 'bg-flirt-orange/10 text-flirt-orange hover:bg-flirt-orange/20'
                        }`}
                      >
                        <Flame size={10} className="mr-1" /> Bold
                      </button>
                    </div>
                  </div>
                  
                  {/* Flirting Intensity Slider */}
                  <div className="bg-white dark:bg-white/10 rounded-md p-2.5 shadow-sm">
                    <div className="flex items-center justify-between mb-1.5">
                      <div className="flex items-center">
                        <Flame size={12} className="text-flirt-orange mr-1.5" />
                        <span className="text-xs font-medium">Flirting Intensity</span>
                      </div>
                      <span className="text-xs text-muted-foreground">{flirtingIntensity}%</span>
                    </div>
                    <input
                      type="range"
                      min="10"
                      max="90"
                      value={flirtingIntensity}
                      onChange={(e) => setFlirtingIntensity(parseInt(e.target.value))}
                      className="w-full h-1.5 bg-gradient-to-r from-flirt-blue via-flirt-pink to-flirt-orange rounded-full appearance-none cursor-pointer"
                      style={{
                        background: `linear-gradient(to right, 
                          rgba(131, 58, 180, 0.5) 0%, 
                          rgba(198, 39, 142, 0.5) 50%, 
                          rgba(252, 175, 69, 0.5) 100%)`
                      }}
                    />
                    <div className="flex justify-between text-[9px] text-muted-foreground mt-1 px-1">
                      <span>Subtle</span>
                      <span>Balanced</span>
                      <span>Intense</span>
                    </div>
                  </div>
                  
                  {/* Message Tone Filter */}
                  <div className="bg-white dark:bg-white/10 rounded-md p-2.5 shadow-sm">
                    <div className="flex items-center mb-1.5">
                      <Filter size={12} className="text-flirt-purple mr-1.5" />
                      <span className="text-xs font-medium">Message Tone</span>
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      <button
                        onClick={() => setSelectedToneFilter('all')}
                        className={`px-2 py-0.5 rounded-full text-xs transition-colors ${
                          selectedToneFilter === 'all' 
                            ? 'bg-flirt-purple text-white' 
                            : 'bg-flirt-purple/10 text-flirt-purple hover:bg-flirt-purple/20'
                        }`}
                      >
                        All
                      </button>
                      <button
                        onClick={() => setSelectedToneFilter('confident')}
                        className={`px-2 py-0.5 rounded-full text-xs transition-colors ${
                          selectedToneFilter === 'confident' 
                            ? 'bg-flirt-purple text-white' 
                            : 'bg-flirt-purple/10 text-flirt-purple hover:bg-flirt-purple/20'
                        }`}
                      >
                        Confident
                      </button>
                      <button
                        onClick={() => setSelectedToneFilter('engaging')}
                        className={`px-2 py-0.5 rounded-full text-xs transition-colors ${
                          selectedToneFilter === 'engaging' 
                            ? 'bg-flirt-pink text-white' 
                            : 'bg-flirt-pink/10 text-flirt-pink hover:bg-flirt-pink/20'
                        }`}
                      >
                        Engaging
                      </button>
                      <button
                        onClick={() => setSelectedToneFilter('direct')}
                        className={`px-2 py-0.5 rounded-full text-xs transition-colors ${
                          selectedToneFilter === 'direct' 
                            ? 'bg-flirt-orange text-white' 
                            : 'bg-flirt-orange/10 text-flirt-orange hover:bg-flirt-orange/20'
                        }`}
                      >
                        Direct
                      </button>
                      <button
                        onClick={() => setSelectedToneFilter('friendly')}
                        className={`px-2 py-0.5 rounded-full text-xs transition-colors ${
                          selectedToneFilter === 'friendly' 
                            ? 'bg-flirt-blue text-white' 
                            : 'bg-flirt-blue/10 text-flirt-blue hover:bg-flirt-blue/20'
                        }`}
                      >
                        Friendly
                      </button>
                    </div>
                  </div>
                </div>
                
                {/* Generate Button */}
                <div className="flex justify-center mt-3">
                  <button 
                    onClick={getNewSuggestions}
                    className="px-3 py-1.5 bg-gradient-to-r from-flirt-purple to-flirt-pink text-white text-xs rounded-full shadow-sm hover:shadow-md transition-all flex items-center"
                  >
                    <RefreshCw size={10} className="mr-1.5" />
                    Generate Suggestions
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
        
        {/* AI Suggestions Panel - Hidden on small screens, toggleable on large screens */}
        <div className={`hidden ${isSuggestionsPanelOpen ? 'lg:flex' : 'lg:hidden'} flex-col ${isCompactMode ? 'w-[280px]' : 'w-[320px]'} border-l border-flirt-purple/10 bg-white dark:bg-flirt-slate/90 overflow-hidden transition-all duration-300`}>
          <div className="h-14 p-3 border-b border-flirt-purple/10 flex items-center justify-between">
            <div className="flex items-center">
              <div className="w-6 h-6 rounded-full flex items-center justify-center bg-flirt-purple/10">
                <Target size={14} className="text-flirt-purple" />
              </div>
              <h3 className="font-heading font-semibold ml-2 text-sm">Response Options</h3>
            </div>
            <div className="text-xs flex items-center">
              <button 
                onClick={getNewSuggestions}
                className="w-7 h-7 rounded-full flex items-center justify-center hover:bg-flirt-purple/10 transition-colors mr-1"
                title="Get new response options"
              >
                <RefreshCw size={12} className="text-flirt-purple" />
              </button>
              <Star size={10} className="mr-1 text-flirt-purple/70" />
              <span className="text-muted-foreground text-xs">AI powered</span>
            </div>
          </div>
          
          <div className="flex-1 overflow-y-auto p-3">
            {responseSuggestions.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-32">
                <RefreshCw size={20} className="text-flirt-purple/50 animate-spin mb-2" />
                <p className="text-xs text-muted-foreground">Generating response options...</p>
              </div>
            ) : (
              <div className="space-y-2.5">
                {responseSuggestions.map((suggestion) => (
                  <div 
                    key={suggestion.id}
                    onClick={() => handleSuggestionSelect(suggestion)}
                    className={`p-2.5 rounded-md border transition-all duration-300 cursor-pointer hover:shadow-md ${
                      selectedSuggestion === suggestion.id ? 'border-flirt-pink bg-flirt-pink/5 shadow-sm' : 'border-border bg-white/50 dark:bg-white/5'
                    }`}
                  >
                    <p className="text-xs">{suggestion.text}</p>
                    <div className="flex items-center justify-between mt-1.5">
                      <div className="flex items-center space-x-1">
                        <div className={`h-1.5 w-1.5 rounded-full ${getToneColorClass(suggestion.tone)}`}></div>
                        <span className={`text-xs ${selectedSuggestion === suggestion.id ? 'text-flirt-pink font-medium' : 'text-muted-foreground'}`}>
                          {suggestion.tone.charAt(0).toUpperCase() + suggestion.tone.slice(1)}
                        </span>
                        {selectedFlirtingStyle !== 'any' && (
                          <div className="flex items-center ml-1">
                            <div className={`h-1.5 w-1.5 rounded-full ${getFlirtingStyleColorClass(selectedFlirtingStyle)}`}></div>
                            <span className={`text-xs ${getFlirtingStyleColorClass(selectedFlirtingStyle)} ml-1`}>
                              {selectedFlirtingStyle.charAt(0).toUpperCase() + selectedFlirtingStyle.slice(1)}
                            </span>
                          </div>
                        )}
                      </div>
                      <div className="flex items-center">
                        <button 
                          onClick={(e) => {
                            e.stopPropagation();
                            navigator.clipboard.writeText(suggestion.text);
                            alert('Response copied to clipboard!');
                          }}
                          className="text-xs mr-1 px-1.5 py-0.5 rounded bg-flirt-blue/10 text-flirt-blue"
                          title="Copy response to clipboard"
                        >
                          <Copy size={10} />
                        </button>
                        <button 
                          onClick={(e) => {
                            e.stopPropagation();
                            handleSendSuggestion(suggestion);
                          }}
                          className={`text-xs px-2 py-0.5 rounded flex items-center ${getToneBackgroundClass(suggestion.tone)} ${getToneColorClass(suggestion.tone)}`}
                        >
                          <Send size={10} className="mr-1" /> Send
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
            
            {!isCompactMode && (
              <>
                <div className="mt-4 pt-3 border-t border-border">
                  <h4 className="text-xs font-medium mb-2.5 flex items-center">
                    <div className="w-5 h-5 rounded-full flex items-center justify-center bg-flirt-pink/10 mr-1.5">
                      <Zap size={12} className="text-flirt-pink" />
                    </div>
                    Conversation Analysis
                  </h4>
                  <div className="space-y-2.5">
                    <div className="flex items-center text-xs">
                      <div className="w-20 text-muted-foreground text-xs">Interest:</div>
                      <div className="flex-1 h-1.5 bg-muted/50 rounded-full overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-flirt-orange to-flirt-red rounded-full" style={{width: '90%'}}></div>
                      </div>
                    </div>
                    <div className="flex items-center text-xs">
                      <div className="w-20 text-muted-foreground text-xs">Engagement:</div>
                      <div className="flex-1 h-1.5 bg-muted/50 rounded-full overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-flirt-pink to-flirt-red rounded-full" style={{width: '85%'}}></div>
                      </div>
                    </div>
                    <div className="flex items-center text-xs">
                      <div className="w-20 text-muted-foreground text-xs">Chemistry:</div>
                      <div className="flex-1 h-1.5 bg-muted/50 rounded-full overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-flirt-purple to-flirt-blue rounded-full" style={{width: '78%'}}></div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="mt-4 pt-3 border-t border-border">
                  <h4 className="text-xs font-medium mb-2.5">Suggested Topics</h4>
                  <div className="flex flex-wrap gap-1.5">
                    <span className="px-2 py-0.5 bg-flirt-purple/10 text-flirt-purple text-xs rounded-full">Weekend plans</span>
                    <span className="px-2 py-0.5 bg-flirt-pink/10 text-flirt-pink text-xs rounded-full">Hiking gear</span>
                    <span className="px-2 py-0.5 bg-flirt-orange/10 text-flirt-orange text-xs rounded-full">Coffee shops</span>
                    <span className="px-2 py-0.5 bg-flirt-blue/10 text-flirt-blue text-xs rounded-full">Shared interests</span>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatScreen; 