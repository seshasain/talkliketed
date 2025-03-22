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

          {/* App Preview - Enhanced with actual visual content and improved contrast */}
          <div className="mt-16 w-full max-w-5xl mx-auto animate-slide-up" style={{ animationDelay: '500ms' }}>
            <GlassCard 
              className="p-4 shadow-insta" 
              variant="masculine"
              hoverEffect
            >
              {/* Mockup of the chat interface - Instagram-inspired styling */}
              <div className="aspect-video w-full bg-gradient-to-r from-flirt-purple/40 to-flirt-pink/40 rounded-md flex items-center justify-center">
                <div className="w-full max-w-3xl h-[90%] bg-white rounded-md shadow-xl flex overflow-hidden border border-flirt-purple/30">
                  {/* Sidebar */}
                  <div className="hidden md:block w-1/4 bg-gradient-to-b from-flirt-purple/30 to-flirt-pink/30 p-4">
                    <div className="w-full h-8 bg-white/60 rounded-md mb-4 flex items-center justify-center">
                      <div className="w-6 h-6 rounded-full bg-gradient-to-r from-flirt-purple to-flirt-pink"></div>
                      <div className="ml-2 h-3 w-16 bg-white/80 rounded-md"></div>
                    </div>
                    <div className="space-y-3">
                      {[1, 2, 3, 4].map((i) => (
                        <div key={i} className="flex items-center p-2 rounded-md hover:bg-white/40 transition-colors cursor-pointer">
                          <div className="w-8 h-8 rounded-full bg-gradient-to-r from-flirt-purple/90 to-flirt-pink/90 flex-shrink-0"></div>
                          <div className="ml-2 space-y-1.5 flex-grow">
                            <div className="h-2.5 w-full bg-white/80 rounded-md"></div>
                            <div className="h-2 w-3/4 bg-white/60 rounded-md"></div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  {/* Chat area */}
                  <div className="flex-1 flex flex-col p-4 bg-white">
                    {/* Chat header */}
                    <div className="flex items-center justify-between mb-4 pb-2 border-b border-flirt-purple/20">
                      <div className="flex items-center">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-r from-flirt-purple to-flirt-pink flex items-center justify-center">
                          <span className="text-white text-xs font-bold">S</span>
                        </div>
                        <div className="ml-3 space-y-1">
                          <div className="h-3 w-20 bg-flirt-purple/40 rounded-full"></div>
                          <div className="h-2 w-16 bg-flirt-purple/30 rounded-full"></div>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <div className="w-8 h-8 rounded-full bg-flirt-purple/10 flex items-center justify-center">
                          <div className="w-4 h-4 rounded-full bg-flirt-purple/40"></div>
                        </div>
                        <div className="w-8 h-8 rounded-full bg-flirt-pink/10 flex items-center justify-center">
                          <div className="w-4 h-4 rounded-full bg-flirt-pink/40"></div>
                        </div>
                      </div>
                    </div>

                    <div className="flex-1 space-y-4 overflow-y-auto">
                      {/* Receiver messages */}
                      <div className="flex items-start">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-r from-flirt-purple to-flirt-pink flex-shrink-0"></div>
                        <div className="ml-3 bg-flirt-purple/20 rounded-r-xl rounded-bl-xl p-3 max-w-[70%]">
                          <div className="space-y-1">
                            <div className="h-2 w-full bg-flirt-purple/30 rounded-full"></div>
                            <div className="h-2 w-5/6 bg-flirt-purple/30 rounded-full"></div>
                            <div className="h-2 w-3/4 bg-flirt-purple/30 rounded-full"></div>
                          </div>
                        </div>
                      </div>

                      {/* Sender messages */}
                      <div className="flex items-start justify-end">
                        <div className="mr-3 bg-gradient-to-r from-flirt-purple/60 to-flirt-pink/60 rounded-l-xl rounded-br-xl p-3 max-w-[70%]">
                          <div className="space-y-1">
                            <div className="h-2 w-full bg-white rounded-full"></div>
                            <div className="h-2 w-5/6 bg-white rounded-full"></div>
                            <div className="h-2 w-2/3 bg-white rounded-full"></div>
                          </div>
                        </div>
                        <div className="w-8 h-8 rounded-full bg-gradient-to-r from-flirt-orange to-flirt-red flex-shrink-0"></div>
                      </div>

                      {/* Receiver messages */}
                      <div className="flex items-start">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-r from-flirt-purple to-flirt-pink flex-shrink-0"></div>
                        <div className="ml-3 bg-flirt-purple/20 rounded-r-xl rounded-bl-xl p-3 max-w-[70%]">
                          <div className="space-y-1">
                            <div className="h-2 w-full bg-flirt-purple/30 rounded-full"></div>
                            <div className="h-2 w-4/5 bg-flirt-purple/30 rounded-full"></div>
                          </div>
                        </div>
                      </div>

                      {/* Typing indicator */}
                      <div className="flex items-start justify-end">
                        <div className="mr-3 bg-gradient-to-r from-flirt-purple/60 to-flirt-pink/60 rounded-l-xl rounded-br-xl p-3 max-w-[70%]">
                          <div className="flex space-x-1">
                            <div className="w-2 h-2 rounded-full bg-white animate-bounce"></div>
                            <div className="w-2 h-2 rounded-full bg-white animate-bounce" style={{animationDelay: '0.2s'}}></div>
                            <div className="w-2 h-2 rounded-full bg-white animate-bounce" style={{animationDelay: '0.4s'}}></div>
                          </div>
                        </div>
                        <div className="w-8 h-8 rounded-full bg-gradient-to-r from-flirt-orange to-flirt-red flex-shrink-0"></div>
                      </div>
                    </div>

                    <div className="mt-4 flex items-center">
                      <div className="flex-1 h-12 bg-flirt-purple/10 rounded-full flex items-center px-4">
                        <div className="h-2 w-3/4 bg-flirt-purple/30 rounded-full"></div>
                      </div>
                      <div className="w-12 h-12 bg-gradient-to-r from-flirt-purple to-flirt-pink rounded-full ml-2 flex items-center justify-center shadow-md">
                        <div className="w-4 h-4 border-t-2 border-r-2 border-white -rotate-45 translate-x-[-2px]"></div>
                      </div>
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
