import React from 'react';
import { ArrowRight, Shield, Target, Zap, Trophy } from 'lucide-react';
import AnimatedButton from '../ui/AnimatedButton';
import { Link } from 'react-router-dom';
import GlassCard from '../ui/GlassCard';

const Hero = () => {
  return (
    <div className="relative prevent-horizontal-scroll pt-24 md:pt-32 pb-16">
      {/* Background glow effects */}
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-flirt-purple/20 rounded-full blur-3xl opacity-50 animate-pulse-subtle"></div>
      <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-flirt-pink/20 rounded-full blur-3xl opacity-50 animate-pulse-subtle"></div>

      <div className="container mx-auto relative z-10">
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
          <div className="inline-flex items-center px-3 py-1 rounded-md border border-flirt-purple/30 bg-flirt-purple/10 text-flirt-purple text-sm font-medium mb-6 animate-fade-in">
            <Target size={14} className="mr-2" />
            <span>Master the Art of Conversation</span>
          </div>
          
          <h1 className="text-balance font-bold leading-tight mb-6 animate-slide-up" style={{ animationDelay: '100ms' }}>
            Your <span className="gradient-text">Conversation Wingman</span> for Smooth Interactions
          </h1>
          
          <p className="text-muted-foreground text-lg md:text-xl max-w-2xl mb-8 animate-slide-up" style={{ animationDelay: '200ms' }}>
            Build confidence, craft perfect responses, and make meaningful connections with our AI-powered conversation assistant tailored for men.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 mb-12 w-full sm:w-auto animate-slide-up" style={{ animationDelay: '300ms' }}>
            <Link to="/signup" className="w-full sm:w-auto">
              <AnimatedButton 
                variant="primary" 
                size="lg" 
                glowEffect
                className="w-full sm:w-auto button-instagram"
                icon={<ArrowRight size={18} />}
                iconPosition="right"
              >
                Start Building Confidence
              </AnimatedButton>
            </Link>
            <Link to="/features" className="w-full sm:w-auto">
              <AnimatedButton 
                variant="outline" 
                size="lg"
                className="w-full sm:w-auto"
              >
                Explore Features
              </AnimatedButton>
            </Link>
          </div>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 text-sm text-muted-foreground animate-fade-in" style={{ animationDelay: '400ms' }}>
            <div className="flex items-center">
              <Shield size={16} className="mr-2 text-flirt-purple" />
              <span>100% Private & Secure</span>
            </div>
            <div className="hidden sm:block h-4 w-px bg-border"></div>
            <div className="flex items-center">
              <Zap size={16} className="mr-2 text-flirt-pink" />
              <span>Confidence Boosting</span>
            </div>
            <div className="hidden sm:block h-4 w-px bg-border"></div>
            <div className="flex items-center">
              <Trophy size={16} className="mr-2 text-flirt-orange" />
              <span>Proven Results</span>
            </div>
          </div>

          {/* App Preview - Improved with visible content and clear data representation */}
          <div className="mt-16 w-full max-w-5xl mx-auto animate-slide-up" style={{ animationDelay: '500ms' }}>
            <GlassCard 
              className="p-4 shadow-insta border border-flirt-purple/30" 
              variant="masculine"
              hoverEffect
            >
              {/* Mockup of the chat interface - Instagram-inspired styling */}
              <div className="aspect-video w-full bg-gradient-to-r from-flirt-purple/40 to-flirt-pink/40 rounded-md flex items-center justify-center">
                <div className="w-full max-w-3xl h-[90%] bg-white dark:bg-flirt-slate/90 rounded-md shadow-xl flex overflow-hidden border border-flirt-purple/30">
                  {/* Sidebar */}
                  <div className="hidden md:block w-1/4 bg-gradient-to-b from-flirt-purple/30 to-flirt-pink/30 p-4">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-medium text-white text-sm">Messages</h3>
                      <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center">
                        <span className="text-white text-xs">+</span>
                      </div>
                    </div>
                    <div className="relative">
                      <input type="text" placeholder="Search" className="w-full h-8 bg-white/30 text-white text-sm rounded-md px-3 mb-4" />
                    </div>
                    <div className="space-y-3">
                      {[
                        { name: "Sarah", text: "Hey, how are you?" },
                        { name: "Jessica", text: "About that coffee..." },
                        { name: "Emily", text: "Did you see my message?" },
                        { name: "Amanda", text: "Thanks for yesterday!" }
                      ].map((contact, i) => (
                        <div key={i} className={`flex items-center p-2 rounded-md ${i === 0 ? 'bg-white/40' : 'hover:bg-white/20'} transition-colors cursor-pointer`}>
                          <div className="w-8 h-8 rounded-full bg-gradient-to-r from-flirt-purple/90 to-flirt-pink/90 flex-shrink-0 flex items-center justify-center">
                            <span className="text-white text-xs font-bold">{contact.name[0]}</span>
                          </div>
                          <div className="ml-2 space-y-1 flex-grow overflow-hidden">
                            <p className="text-white text-xs font-medium truncate">{contact.name}</p>
                            <p className="text-white/70 text-xs truncate">{contact.text}</p>
                          </div>
                          <div className="w-2 h-2 rounded-full bg-flirt-orange"></div>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  {/* Chat area */}
                  <div className="flex-1 flex flex-col p-4 bg-white dark:bg-flirt-slate/90">
                    {/* Chat header */}
                    <div className="flex items-center justify-between mb-4 pb-2 border-b border-flirt-purple/20">
                      <div className="flex items-center">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-r from-flirt-purple to-flirt-pink flex items-center justify-center">
                          <span className="text-white text-sm font-bold">S</span>
                        </div>
                        <div className="ml-3">
                          <p className="font-medium text-sm">Sarah</p>
                          <div className="flex items-center">
                            <span className="h-1.5 w-1.5 rounded-full bg-green-500 mr-1.5"></span>
                            <span className="text-xs text-muted-foreground">Online now</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <div className="w-8 h-8 rounded-full bg-flirt-purple/10 flex items-center justify-center">
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M21 11.5C21 16.75 16.75 21 11.5 21C6.25 21 2 16.75 2 11.5C2 6.25 6.25 2 11.5 2" stroke="#833AB4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M22 22L20 20" stroke="#833AB4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M20 2L18 4L20 6L22 4L20 2Z" stroke="#833AB4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        </div>
                        <div className="w-8 h-8 rounded-full bg-flirt-pink/10 flex items-center justify-center">
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12 12C14.7614 12 17 9.76142 17 7C17 4.23858 14.7614 2 12 2C9.23858 2 7 4.23858 7 7C7 9.76142 9.23858 12 12 12Z" stroke="#C6278E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M20.5899 22C20.5899 18.13 16.7399 15 11.9999 15C7.25991 15 3.40991 18.13 3.40991 22" stroke="#C6278E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        </div>
                      </div>
                    </div>

                    <div className="flex-1 space-y-4 overflow-y-auto">
                      {/* Receiver messages */}
                      <div className="flex items-start">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-r from-flirt-purple to-flirt-pink flex-shrink-0 flex items-center justify-center">
                          <span className="text-white text-xs font-bold">S</span>
                        </div>
                        <div className="ml-3 bg-flirt-purple/20 rounded-r-xl rounded-bl-xl p-3 max-w-[70%]">
                          <p className="text-xs">Hey! I really enjoyed our conversation about hiking yesterday. Any trails you'd recommend?</p>
                          <p className="text-[10px] text-muted-foreground mt-1">11:42 AM</p>
                        </div>
                      </div>

                      {/* Sender messages */}
                      <div className="flex items-start justify-end">
                        <div className="mr-3 bg-gradient-to-r from-flirt-purple/80 to-flirt-pink/80 rounded-l-xl rounded-br-xl p-3 max-w-[70%]">
                          <p className="text-xs text-white">I'd definitely check out Mountain Ridge - it has some challenging sections but the view is worth it. Have you done much hiking before?</p>
                          <p className="text-[10px] text-white/70 mt-1">11:45 AM</p>
                        </div>
                        <div className="w-8 h-8 rounded-full bg-gradient-to-r from-flirt-orange to-flirt-red flex-shrink-0 flex items-center justify-center">
                          <span className="text-white text-xs font-bold">Y</span>
                        </div>
                      </div>

                      {/* Receiver messages */}
                      <div className="flex items-start">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-r from-flirt-purple to-flirt-pink flex-shrink-0 flex items-center justify-center">
                          <span className="text-white text-xs font-bold">S</span>
                        </div>
                        <div className="ml-3 bg-flirt-purple/20 rounded-r-xl rounded-bl-xl p-3 max-w-[70%]">
                          <p className="text-xs">Not too much, but I'm excited to try more advanced trails! Would you want to show me sometime?</p>
                          <p className="text-[10px] text-muted-foreground mt-1">11:50 AM</p>
                        </div>
                      </div>

                      {/* Typing indicator */}
                      <div className="flex items-start justify-end">
                        <div className="mr-3 bg-gradient-to-r from-flirt-purple/80 to-flirt-pink/80 rounded-l-xl rounded-br-xl p-3 max-w-[70%]">
                          <div className="flex space-x-1.5">
                            <div className="w-1.5 h-1.5 rounded-full bg-white animate-bounce"></div>
                            <div className="w-1.5 h-1.5 rounded-full bg-white animate-bounce" style={{animationDelay: '0.2s'}}></div>
                            <div className="w-1.5 h-1.5 rounded-full bg-white animate-bounce" style={{animationDelay: '0.4s'}}></div>
                          </div>
                        </div>
                        <div className="w-8 h-8 rounded-full bg-gradient-to-r from-flirt-orange to-flirt-red flex-shrink-0 flex items-center justify-center">
                          <span className="text-white text-xs font-bold">Y</span>
                        </div>
                      </div>
                    </div>

                    <div className="mt-4 relative">
                      <input type="text" placeholder="Type your message..." className="w-full h-10 bg-flirt-purple/10 rounded-full px-4 pr-12 text-sm" />
                      <button className="absolute right-2 top-1/2 transform -translate-y-1/2 w-8 h-8 bg-gradient-to-r from-flirt-purple to-flirt-pink rounded-full flex items-center justify-center shadow-md">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M22 2L11 13" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          <path d="M22 2L15 22L11 13L2 9L22 2Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </GlassCard>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
