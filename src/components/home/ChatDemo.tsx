
import React, { useState, useEffect } from 'react';
import GlassCard from '../ui/GlassCard';
import AnimatedButton from '../ui/AnimatedButton';
import { Send, RefreshCw, ThumbsUp, MessageCircle } from 'lucide-react';

const ChatDemo = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [isTyping, setIsTyping] = useState(false);
  const [currentTypingText, setCurrentTypingText] = useState('');
  
  const conversation = [
    { 
      user: "Hey Sarah! I really enjoyed talking about hiking yesterday. Any favorite trails?", 
      responses: [
        "I'd love to hear more about your hiking adventures! I've been thinking about trying the Sunset Trail. Have you been there?",
        "Thanks for asking! I absolutely love the Mountain Ridge trail. What kind of hiking do you enjoy - scenic views or challenging climbs?",
        "Hiking is actually my favorite! The Waterfall Loop is incredible. We should check it out sometime if you're interested?"
      ] 
    },
    { 
      user: "I've been thinking about that new restaurant downtown. Would you want to grab dinner there sometime?", 
      responses: [
        "I've been eyeing that place too! I'm free this weekend if you want to check it out together?",
        "That sounds lovely! I've heard great things about their menu. When were you thinking of going?",
        "I'd definitely be up for that! Have you heard about their special tasting menu on Thursdays?"
      ] 
    },
    { 
      user: "Your profile picture from your trip to Italy looks amazing! What was your favorite part?", 
      responses: [
        "Thank you! Italy was incredible - the food in Florence completely stole my heart. Have you traveled there before?",
        "Thanks for noticing! I fell in love with the Amalfi Coast views. I'd go back in a heartbeat! Are you a fellow traveler?",
        "That's sweet of you to say! The ancient ruins in Rome were mind-blowing. I'd love to hear about your favorite travel experiences sometime."
      ] 
    }
  ];

  // Function to simulate typing effect
  useEffect(() => {
    if (activeStep < conversation.length && !isTyping) {
      const timeout = setTimeout(() => {
        setIsTyping(true);
        typeText(conversation[activeStep].responses[0], 0);
      }, 1000);
      
      return () => clearTimeout(timeout);
    }
  }, [activeStep, isTyping]);

  const typeText = (text: string, index: number) => {
    if (index < text.length) {
      setCurrentTypingText(prev => prev + text.charAt(index));
      setTimeout(() => typeText(text, index + 1), 25);
    } else {
      setIsTyping(false);
    }
  };

  const handleNextExample = () => {
    setActiveStep((prev) => (prev + 1) % conversation.length);
    setCurrentTypingText('');
    setIsTyping(false);
  };

  return (
    <section id="how-it-works" className="py-20">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <h2 className="gradient-text inline-block mb-4">See FlirtSync in Action</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Watch how FlirtSync transforms your conversation game with smart, personalized responses.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-start">
          {/* Left side - Chat interface */}
          <div className="lg:col-span-3">
            <GlassCard className="h-full">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-flirt-pink to-flirt-purple"></div>
                  <div className="ml-3">
                    <h3 className="font-medium">Sarah</h3>
                    <p className="text-xs text-muted-foreground">Online now</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <AnimatedButton 
                    variant="ghost" 
                    size="sm" 
                    onClick={handleNextExample}
                    icon={<RefreshCw size={14} />}
                  >
                    Next example
                  </AnimatedButton>
                </div>
              </div>
              
              <div className="bg-muted/30 rounded-lg p-4 h-[400px] overflow-y-auto flex flex-col mb-4">
                {/* Message from the other person */}
                <div className="flex items-start mb-4">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-r from-flirt-pink to-flirt-purple flex-shrink-0"></div>
                  <div className="ml-3 bg-background rounded-r-xl rounded-bl-xl p-3 max-w-[80%]">
                    <p className="text-sm">{conversation[activeStep].user}</p>
                    <p className="text-xs text-muted-foreground mt-1">11:42 AM</p>
                  </div>
                </div>
                
                {/* Typing indicator or message from user */}
                {isTyping ? (
                  <div className="flex items-start ml-auto">
                    <div className="mr-3 bg-flirt-purple text-white rounded-l-xl rounded-br-xl p-3 max-w-[80%]">
                      <p className="text-sm">{currentTypingText}</p>
                    </div>
                    <div className="w-8 h-8 rounded-full bg-gradient-to-r from-flirt-blue to-flirt-purple flex-shrink-0"></div>
                  </div>
                ) : currentTypingText && (
                  <div className="flex items-start ml-auto">
                    <div className="mr-3 bg-flirt-purple text-white rounded-l-xl rounded-br-xl p-3 max-w-[80%]">
                      <p className="text-sm">{currentTypingText}</p>
                      <p className="text-xs text-white/70 mt-1">11:43 AM</p>
                    </div>
                    <div className="w-8 h-8 rounded-full bg-gradient-to-r from-flirt-blue to-flirt-purple flex-shrink-0"></div>
                  </div>
                )}
              </div>
              
              <div className="relative">
                <input
                  type="text"
                  placeholder="Type your message..."
                  className="w-full h-12 px-4 pr-12 bg-muted/30 rounded-full focus:outline-none focus:ring-2 focus:ring-flirt-purple/50"
                />
                <button className="absolute right-2 top-1/2 transform -translate-y-1/2 h-8 w-8 rounded-full bg-flirt-purple text-white flex items-center justify-center">
                  <Send size={16} />
                </button>
              </div>
            </GlassCard>
          </div>
          
          {/* Right side - AI suggestions */}
          <div className="lg:col-span-2">
            <GlassCard className="h-full">
              <div className="flex items-center mb-6">
                <MessageCircle size={22} className="text-flirt-purple mr-2" />
                <h3 className="font-heading font-semibold">AI Response Suggestions</h3>
              </div>
              
              <div className="space-y-4">
                {conversation[activeStep].responses.map((response, i) => (
                  <div 
                    key={i} 
                    className={`p-3 rounded-lg border transition-all duration-300 cursor-pointer hover:shadow-md ${
                      i === 0 && currentTypingText ? 'border-flirt-purple bg-flirt-purple/5' : 'border-border bg-muted/20'
                    }`}
                  >
                    <p className="text-sm">{response}</p>
                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center space-x-1">
                        <span className={`text-xs ${i === 0 ? 'text-flirt-purple' : 'text-muted-foreground'}`}>
                          {i === 0 ? 'Playful' : i === 1 ? 'Friendly' : 'Flirty'}
                        </span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <button className="text-muted-foreground hover:text-flirt-purple transition-colors">
                          <RefreshCw size={14} />
                        </button>
                        <button className={`${i === 0 && currentTypingText ? 'text-flirt-purple' : 'text-muted-foreground'} hover:text-flirt-purple transition-colors`}>
                          <ThumbsUp size={14} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-6 pt-4 border-t border-border">
                <h4 className="text-sm font-medium mb-2">Conversation Analysis</h4>
                <div className="space-y-2">
                  <div className="flex items-center text-xs">
                    <div className="w-24 text-muted-foreground">Response time:</div>
                    <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                      <div className="h-full bg-flirt-blue rounded-full" style={{width: '70%'}}></div>
                    </div>
                    <div className="ml-2 text-muted-foreground">Quick</div>
                  </div>
                  <div className="flex items-center text-xs">
                    <div className="w-24 text-muted-foreground">Engagement:</div>
                    <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                      <div className="h-full bg-flirt-purple rounded-full" style={{width: '85%'}}></div>
                    </div>
                    <div className="ml-2 text-muted-foreground">High</div>
                  </div>
                  <div className="flex items-center text-xs">
                    <div className="w-24 text-muted-foreground">Interest:</div>
                    <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                      <div className="h-full bg-flirt-pink rounded-full" style={{width: '80%'}}></div>
                    </div>
                    <div className="ml-2 text-muted-foreground">Very High</div>
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
