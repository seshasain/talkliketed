
import React from 'react';
import { ArrowRight, Shield, Target, Zap, Trophy } from 'lucide-react';
import AnimatedButton from '../ui/AnimatedButton';
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <div className="relative overflow-hidden pt-24 md:pt-32 pb-16">
      {/* Background glow effects */}
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-flirt-navy/20 rounded-full blur-3xl opacity-40 animate-pulse-subtle"></div>
      <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-flirt-blue/20 rounded-full blur-3xl opacity-40 animate-pulse-subtle"></div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
          <div className="inline-flex items-center px-3 py-1 rounded-md border border-flirt-navy/30 bg-flirt-navy/10 text-flirt-navy text-sm font-medium mb-6 animate-fade-in">
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
                className="w-full sm:w-auto"
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
              <Shield size={16} className="mr-2 text-flirt-navy" />
              <span>100% Private & Secure</span>
            </div>
            <div className="hidden sm:block h-4 w-px bg-border"></div>
            <div className="flex items-center">
              <Zap size={16} className="mr-2 text-flirt-blue" />
              <span>Confidence Boosting</span>
            </div>
            <div className="hidden sm:block h-4 w-px bg-border"></div>
            <div className="flex items-center">
              <Trophy size={16} className="mr-2 text-flirt-gold" />
              <span>Proven Results</span>
            </div>
          </div>

          {/* App Preview */}
          <div className="mt-16 w-full max-w-5xl mx-auto animate-slide-up" style={{ animationDelay: '500ms' }}>
            <div className="glass p-4 rounded-lg shadow-glass overflow-hidden">
              {/* Mockup of the chat interface - more masculine styling */}
              <div className="aspect-video w-full bg-gradient-to-br from-flirt-navy/10 to-flirt-blue/10 rounded-md flex items-center justify-center">
                <div className="w-full max-w-3xl h-[90%] bg-background rounded-md shadow-lg flex overflow-hidden">
                  {/* Sidebar */}
                  <div className="hidden md:block w-1/4 bg-flirt-navy/10 p-4">
                    <div className="w-full h-8 bg-flirt-navy/20 rounded-md mb-4"></div>
                    <div className="space-y-2">
                      {[1, 2, 3, 4].map((i) => (
                        <div key={i} className="h-12 bg-white/20 rounded-md"></div>
                      ))}
                    </div>
                  </div>
                  
                  {/* Chat area */}
                  <div className="flex-1 flex flex-col p-4">
                    <div className="flex-1 space-y-4 overflow-y-auto">
                      <div className="w-2/3 h-16 bg-muted rounded-md ml-auto"></div>
                      <div className="w-3/4 h-24 bg-flirt-navy/20 rounded-md"></div>
                      <div className="w-2/3 h-16 bg-muted rounded-md ml-auto"></div>
                      <div className="w-3/4 h-24 bg-flirt-navy/20 rounded-md"></div>
                    </div>
                    <div className="mt-4 flex items-center">
                      <div className="flex-1 h-12 bg-muted/50 rounded-full"></div>
                      <div className="w-12 h-12 bg-flirt-navy/50 rounded-full ml-2"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
