
import React, { useState, useEffect } from 'react';
import GlassCard from '../ui/GlassCard';
import AnimatedButton from '../ui/AnimatedButton';
import { Send, RefreshCw, ThumbsUp, MessageCircle, Target, Zap } from 'lucide-react';

const ChatDemo = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [isTyping, setIsTyping] = useState(false);
  const [currentTypingText, setCurrentTypingText] = useState('');
  
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
          <h2 className="gradient-text inline-block mb-4">FlirtSync in Action</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            See how FlirtSync helps you navigate conversations with confidence and strategy.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-start">
          {/* Left side - Chat interface */}
          <div className="lg:col-span-3">
            <GlassCard className="h-full" variant="masculine">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-flirt-blue to-flirt-navy"></div>
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
              
              <div className="bg-muted/30 rounded-md p-4 h-[400px] overflow-y-auto flex flex-col mb-4">
                {/* Message from the other person */}
                <div className="flex items-start mb-4">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-r from-flirt-blue to-flirt-navy flex-shrink-0"></div>
                  <div className="ml-3 bg-background rounded-r-md rounded-bl-md p-3 max-w-[80%]">
                    <p className="text-sm">{conversation[activeStep].user}</p>
                    <p className="text-xs text-muted-foreground mt-1">11:42 AM</p>
                  </div>
                </div>
                
                {/* Typing indicator or message from user */}
                {isTyping ? (
                  <div className="flex items-start ml-auto">
                    <div className="mr-3 bg-flirt-navy text-white rounded-l-md rounded-br-md p-3 max-w-[80%]">
                      <p className="text-sm">{currentTypingText}</p>
                    </div>
                    <div className="w-8 h-8 rounded-full bg-gradient-to-r from-flirt-gold to-flirt-blue flex-shrink-0"></div>
                  </div>
                ) : currentTypingText && (
                  <div className="flex items-start ml-auto">
                    <div className="mr-3 bg-flirt-navy text-white rounded-l-md rounded-br-md p-3 max-w-[80%]">
                      <p className="text-sm">{currentTypingText}</p>
                      <p className="text-xs text-white/70 mt-1">11:43 AM</p>
                    </div>
                    <div className="w-8 h-8 rounded-full bg-gradient-to-r from-flirt-gold to-flirt-blue flex-shrink-0"></div>
                  </div>
                )}
              </div>
              
              <div className="relative">
                <input
                  type="text"
                  placeholder="Type your message..."
                  className="w-full h-12 px-4 pr-12 bg-muted/30 rounded-md focus:outline-none focus:ring-2 focus:ring-flirt-navy/50"
                />
                <button className="absolute right-2 top-1/2 transform -translate-y-1/2 h-8 w-8 rounded-full bg-flirt-navy text-white flex items-center justify-center">
                  <Send size={16} />
                </button>
              </div>
            </GlassCard>
          </div>
          
          {/* Right side - AI suggestions */}
          <div className="lg:col-span-2">
            <GlassCard className="h-full" variant="masculine">
              <div className="flex items-center mb-6">
                <Target size={22} className="text-flirt-navy mr-2" />
                <h3 className="font-heading font-semibold">Strategic Responses</h3>
              </div>
              
              <div className="space-y-4">
                {conversation[activeStep].responses.map((response, i) => (
                  <div 
                    key={i} 
                    className={`p-3 rounded-md border transition-all duration-300 cursor-pointer hover:shadow-md ${
                      i === 0 && currentTypingText ? 'border-flirt-navy bg-flirt-navy/5' : 'border-border bg-muted/20'
                    }`}
                  >
                    <p className="text-sm">{response}</p>
                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center space-x-1">
                        <span className={`text-xs ${i === 0 ? 'text-flirt-navy' : 'text-muted-foreground'}`}>
                          {i === 0 ? 'Confident' : i === 1 ? 'Engaging' : 'Direct'}
                        </span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <button className="text-muted-foreground hover:text-flirt-navy transition-colors">
                          <RefreshCw size={14} />
                        </button>
                        <button className={`${i === 0 && currentTypingText ? 'text-flirt-navy' : 'text-muted-foreground'} hover:text-flirt-navy transition-colors`}>
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
                    <div className="w-24 text-muted-foreground">Confidence:</div>
                    <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                      <div className="h-full bg-flirt-navy rounded-full" style={{width: '85%'}}></div>
                    </div>
                    <div className="ml-2 text-muted-foreground">High</div>
                  </div>
                  <div className="flex items-center text-xs">
                    <div className="w-24 text-muted-foreground">Engagement:</div>
                    <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                      <div className="h-full bg-flirt-blue rounded-full" style={{width: '75%'}}></div>
                    </div>
                    <div className="ml-2 text-muted-foreground">Good</div>
                  </div>
                  <div className="flex items-center text-xs">
                    <div className="w-24 text-muted-foreground">Interest:</div>
                    <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                      <div className="h-full bg-flirt-gold rounded-full" style={{width: '80%'}}></div>
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
