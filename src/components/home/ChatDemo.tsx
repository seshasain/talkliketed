import React, { useState, useEffect, useRef } from 'react';
import GlassCard from '../ui/GlassCard';
import AnimatedButton from '../ui/AnimatedButton';
import { Send, RefreshCw, ThumbsUp, MessageCircle, Target, Zap, Info } from 'lucide-react';

const ChatDemo = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [isTyping, setIsTyping] = useState(false);
  const [currentTypingText, setCurrentTypingText] = useState('');
  // Add ref to track if component is mounted
  const isMountedRef = useRef(true);
  // Track if typing animation should restart
  const shouldRestartTyping = useRef(true);
  // Add a reference to the chat container for scrolling
  const chatContainerRef = useRef(null);
  
  const conversation = [
    { 
      user: "Hey Sarah! I really enjoyed our conversation about hiking yesterday. Any trails you'd recommend?", 
      responses: [
        "I'd definitely check out Mountain Ridge - it has some challenging sections but the view is worth it. Have you done much hiking before?",
        "There's this great trail called Eagle's Nest that I think you'd enjoy. It's got amazing views and some interesting terrain. When do you usually go hiking?",
        "I know a few good trails. Maybe we could check one out together sometime if you're interested? I'd be happy to show you my favorite spots."
      ] 
    },
    { 
      user: "I've been thinking about that new restaurant downtown. Would you want to grab dinner there sometime?", 
      responses: [
        "I've heard great things about that place. How about this Friday around 7? I can make a reservation if that works for you.",
        "That sounds like a plan. I've been wanting to try it too. What day works best for your schedule?",
        "Great minds think alike - I was just looking at their menu online yesterday. I'd definitely be up for that. When were you thinking?"
      ] 
    },
    { 
      user: "Your profile picture from your trip to Italy looks amazing! What was your favorite part of the trip?", 
      responses: [
        "Thanks for noticing! Rome was incredible - the history there is mind-blowing. Have you ever traveled through Europe?",
        "Appreciate that! The Amalfi Coast was unbeatable - cliff-side views, incredible food, and perfect weather. Are you planning any trips coming up?",
        "Thanks! It's hard to pick a favorite, but probably the small villages in Tuscany. The authentic culture and food were like nothing else. What's been your best travel experience?"
      ] 
    }
  ];

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      isMountedRef.current = false;
    };
  }, []);

  // Function to simulate typing effect - completely rewritten
  useEffect(() => {
    // Reset the typing state when activeStep changes
    setIsTyping(false);
    setCurrentTypingText('');
    shouldRestartTyping.current = true;
    
    const startTypingEffect = () => {
      if (!shouldRestartTyping.current) return;
      
      setIsTyping(true);
      setCurrentTypingText('');
      shouldRestartTyping.current = false;
      
      const text = conversation[activeStep].responses[0];
      let index = 0;
      
      const typeNextChar = () => {
        if (!isMountedRef.current) return;
        
        if (index < text.length) {
          setCurrentTypingText(prev => prev + text.charAt(index));
          index++;
          setTimeout(typeNextChar, 25);
        } else {
          setIsTyping(false);
        }
      };
      
      typeNextChar();
    };
    
    const timer = setTimeout(startTypingEffect, 1000);
    return () => clearTimeout(timer);
  }, [activeStep]);

  // Scroll to bottom of chat when new messages appear
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [currentTypingText, isTyping]);

  const handleNextExample = () => {
    setActiveStep((prev) => (prev + 1) % conversation.length);
    shouldRestartTyping.current = true;
  };

  // Helper function to get response tone class
  const getResponseToneClass = (index) => {
    switch(index) {
      case 0: return 'text-flirt-purple';
      case 1: return 'text-flirt-pink';
      case 2: return 'text-flirt-orange';
      default: return 'text-flirt-purple';
    }
  };

  // Helper function to get response tone text
  const getResponseTone = (index) => {
    switch(index) {
      case 0: return 'Confident';
      case 1: return 'Engaging';
      case 2: return 'Direct';
      default: return 'Balanced';
    }
  };

  return (
    <section id="how-it-works" className="py-20 relative prevent-horizontal-scroll">
      {/* Background elements */}
      <div className="absolute -top-24 right-0 w-96 h-96 bg-flirt-pink/15 rounded-full blur-3xl opacity-50 animate-pulse-subtle"></div>
      <div className="absolute -bottom-32 left-0 w-96 h-96 bg-flirt-purple/15 rounded-full blur-3xl opacity-50 animate-pulse-subtle"></div>
      
      <div className="container mx-auto relative z-10">
        <div className="text-center mb-12">
          <h2 className="gradient-text inline-block mb-4">FlirtSync in Action</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            See how FlirtSync helps you navigate conversations with confidence and strategy.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start max-w-[1440px] mx-auto">
          {/* Left side - Chat interface - wider on large screens */}
          <div className="lg:col-span-7">
            <GlassCard className="h-full shadow-insta" variant="masculine">
              {/* Chat header */}
              <div className="flex items-center justify-between mb-4 pb-3 border-b border-flirt-purple/10">
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full avatar-instagram bg-white flex items-center justify-center">
                    <div className="w-9 h-9 rounded-full bg-gradient-to-r from-flirt-purple to-flirt-pink flex items-center justify-center">
                      <span className="text-white font-semibold">S</span>
                    </div>
                  </div>
                  <div className="ml-3">
                    <h3 className="font-medium">Sarah</h3>
                    <div className="flex items-center">
                      <span className="h-1.5 w-1.5 rounded-full bg-green-500 mr-1.5"></span>
                      <p className="text-xs text-muted-foreground">Online now</p>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <AnimatedButton 
                    variant="ghost" 
                    size="sm" 
                    onClick={handleNextExample}
                    icon={<RefreshCw size={14} />}
                    className="text-flirt-purple hover:bg-flirt-purple/10"
                  >
                    Next example
                  </AnimatedButton>
                </div>
              </div>
              
              {/* Chat messages */}
              <div 
                ref={chatContainerRef}
                className="bg-gradient-to-b from-white/50 to-white/80 dark:from-transparent dark:to-transparent rounded-md p-4 h-[350px] overflow-y-auto flex flex-col mb-4 scroll-smooth"
              >
                {/* Message from the other person */}
                <div className="flex items-start mb-4 animate-fade-in" style={{animationDelay: '0.2s'}}>
                  <div className="w-8 h-8 rounded-full bg-gradient-to-r from-flirt-purple to-flirt-pink flex-shrink-0 flex items-center justify-center">
                    <span className="text-white text-xs font-semibold">S</span>
                  </div>
                  <div className="ml-3 bg-white dark:bg-flirt-slate/20 rounded-r-xl rounded-bl-xl p-3 max-w-[80%] shadow-sm">
                    <p className="text-sm">{conversation[activeStep].user}</p>
                    <p className="text-xs text-muted-foreground mt-1">11:42 AM</p>
                  </div>
                </div>
                
                {/* Typing indicator or message from user */}
                {isTyping ? (
                  <div className="flex items-start ml-auto animate-fade-in" style={{animationDelay: '0.4s'}}>
                    <div className="mr-3 bg-gradient-to-r from-flirt-purple to-flirt-pink text-white rounded-l-xl rounded-br-xl p-3 max-w-[80%] shadow-sm">
                      <p className="text-sm">{currentTypingText}</p>
                      <div className="flex space-x-1 mt-2 h-2">
                        <div className="w-1 h-1 rounded-full bg-white animate-pulse"></div>
                        <div className="w-1 h-1 rounded-full bg-white animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                        <div className="w-1 h-1 rounded-full bg-white animate-pulse" style={{ animationDelay: '0.4s' }}></div>
                      </div>
                    </div>
                    <div className="w-8 h-8 rounded-full bg-gradient-to-r from-flirt-orange to-flirt-red flex-shrink-0 flex items-center justify-center">
                      <span className="text-white text-xs font-semibold">Y</span>
                    </div>
                  </div>
                ) : currentTypingText && (
                  <div className="flex items-start ml-auto animate-fade-in" style={{animationDelay: '0.4s'}}>
                    <div className="mr-3 bg-gradient-to-r from-flirt-purple to-flirt-pink text-white rounded-l-xl rounded-br-xl p-3 max-w-[80%] shadow-sm">
                      <p className="text-sm">{currentTypingText}</p>
                      <p className="text-xs text-white/70 mt-1">11:43 AM</p>
                    </div>
                    <div className="w-8 h-8 rounded-full bg-gradient-to-r from-flirt-orange to-flirt-red flex-shrink-0 flex items-center justify-center">
                      <span className="text-white text-xs font-semibold">Y</span>
                    </div>
                  </div>
                )}
              </div>
              
              {/* Message input */}
              <div className="relative">
                <input
                  type="text"
                  placeholder="Type your message..."
                  className="w-full h-12 px-4 pr-12 bg-white/70 dark:bg-white/10 rounded-full focus:outline-none focus:ring-2 focus:ring-flirt-purple/50 shadow-sm"
                />
                <button className="absolute right-2 top-1/2 transform -translate-y-1/2 h-8 w-8 rounded-full bg-gradient-to-r from-flirt-purple to-flirt-pink text-white flex items-center justify-center shadow-md hover:shadow-lg transition-shadow">
                  <Send size={16} />
                </button>
              </div>
            </GlassCard>
          </div>
          
          {/* Right side - AI suggestions - narrower on large screens */}
          <div className="lg:col-span-5">
            <GlassCard className="h-full shadow-insta" variant="masculine">
              {/* Section header */}
              <div className="flex items-center justify-between mb-4 pb-3 border-b border-flirt-purple/10">
                <div className="flex items-center">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center bg-flirt-purple/10">
                    <Target size={18} className="text-flirt-purple" />
                  </div>
                  <h3 className="font-heading font-semibold ml-2">Strategic Responses</h3>
                </div>
                <div className="flex items-center">
                  <div className="text-xs text-muted-foreground flex items-center">
                    <Info size={12} className="mr-1 text-flirt-purple/70" />
                    <span>AI generated suggestions</span>
                  </div>
                </div>
              </div>
              
              {/* Response options */}
              <div className="space-y-3">
                {conversation[activeStep].responses.map((response, i) => (
                  <div 
                    key={i} 
                    className={`p-3 rounded-md border transition-all duration-300 cursor-pointer hover:shadow-md ${
                      i === 0 && currentTypingText ? 'border-flirt-pink bg-flirt-pink/5 shadow-sm' : 'border-border bg-white/50 dark:bg-white/5'
                    }`}
                  >
                    <p className="text-sm">{response}</p>
                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center space-x-1">
                        <div className={`h-2 w-2 rounded-full ${getResponseToneClass(i)}`}></div>
                        <span className={`text-xs ${i === 0 && currentTypingText ? 'text-flirt-pink font-medium' : 'text-muted-foreground'}`}>
                          {getResponseTone(i)}
                        </span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <button className="text-muted-foreground hover:text-flirt-pink transition-colors p-1.5 rounded-full hover:bg-flirt-pink/10">
                          <RefreshCw size={14} />
                        </button>
                        <button className={`${i === 0 && currentTypingText ? 'text-flirt-pink' : 'text-muted-foreground'} hover:text-flirt-pink transition-colors p-1.5 rounded-full hover:bg-flirt-pink/10`}>
                          <ThumbsUp size={14} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Conversation analysis */}
              <div className="mt-5 pt-4 border-t border-border">
                <h4 className="text-sm font-medium mb-3 flex items-center">
                  <div className="w-6 h-6 rounded-full flex items-center justify-center bg-flirt-pink/10 mr-2">
                    <Zap size={14} className="text-flirt-pink" />
                  </div>
                  Conversation Analysis
                </h4>
                <div className="space-y-3.5">
                  <div className="flex items-center text-xs">
                    <div className="w-24 text-muted-foreground">Confidence:</div>
                    <div className="flex-1 h-2 bg-muted/50 rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-flirt-purple to-flirt-pink rounded-full" style={{width: '85%'}}></div>
                    </div>
                    <div className="ml-2 text-muted-foreground font-medium">High</div>
                  </div>
                  <div className="flex items-center text-xs">
                    <div className="w-24 text-muted-foreground">Engagement:</div>
                    <div className="flex-1 h-2 bg-muted/50 rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-flirt-pink to-flirt-red rounded-full" style={{width: '75%'}}></div>
                    </div>
                    <div className="ml-2 text-muted-foreground font-medium">Good</div>
                  </div>
                  <div className="flex items-center text-xs">
                    <div className="w-24 text-muted-foreground">Interest:</div>
                    <div className="flex-1 h-2 bg-muted/50 rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-flirt-orange to-flirt-red rounded-full" style={{width: '80%'}}></div>
                    </div>
                    <div className="ml-2 text-muted-foreground font-medium">Very High</div>
                  </div>
                </div>
              </div>
            </GlassCard>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ChatDemo;
