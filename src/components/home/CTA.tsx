
import React from 'react';
import { ArrowRight, Target, Shield, Zap } from 'lucide-react';
import AnimatedButton from '../ui/AnimatedButton';
import { Link } from 'react-router-dom';
import GlassCard from '../ui/GlassCard';

const CTA = () => {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          <div className="lg:w-1/2">
            <h2 className="text-3xl md:text-4xl font-heading font-bold mb-6">
              Ready to Elevate Your <span className="gradient-text">Conversation Game</span>?
            </h2>
            <p className="text-muted-foreground text-lg mb-8">
              FlirtSync gives you the strategy and confidence to express yourself authentically and build meaningful connections. Take control of your conversations today.
            </p>
            
            <div className="space-y-4 mb-8">
              <div className="flex items-start">
                <div className="mt-1 mr-4 h-6 w-6 rounded-md bg-flirt-navy/20 flex items-center justify-center">
                  <Target size={14} className="text-flirt-navy" />
                </div>
                <div>
                  <h3 className="font-medium mb-1">Strategic Approach</h3>
                  <p className="text-muted-foreground text-sm">Get responses tailored to your conversation goals and personal style.</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="mt-1 mr-4 h-6 w-6 rounded-md bg-flirt-blue/20 flex items-center justify-center">
                  <Zap size={14} className="text-flirt-blue" />
                </div>
                <div>
                  <h3 className="font-medium mb-1">Confidence Builder</h3>
                  <p className="text-muted-foreground text-sm">Develop lasting communication skills that transfer to real-world situations.</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="mt-1 mr-4 h-6 w-6 rounded-md bg-flirt-gold/20 flex items-center justify-center">
                  <Shield size={14} className="text-flirt-navy" />
                </div>
                <div>
                  <h3 className="font-medium mb-1">100% Private</h3>
                  <p className="text-muted-foreground text-sm">Military-grade encryption keeps your conversations completely secure.</p>
                </div>
              </div>
            </div>
            
            <Link to="/signup">
              <AnimatedButton 
                variant="primary" 
                size="lg" 
                glowEffect
                icon={<ArrowRight size={18} />}
                iconPosition="right"
              >
                Start Free Trial
              </AnimatedButton>
            </Link>
          </div>
          
          <div className="lg:w-1/2">
            <GlassCard className="p-8 md:p-10" glowEffect variant="masculine">
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-heading font-semibold text-xl mb-1">Free Trial</h3>
                    <p className="text-muted-foreground text-sm">7 days of premium features</p>
                  </div>
                  <div className="font-heading">
                    <span className="text-2xl font-bold">$0</span>
                  </div>
                </div>
                
                <ul className="space-y-3">
                  {[
                    "AI conversation suggestions",
                    "Basic conversation analysis",
                    "Limited template access",
                    "24/7 support",
                  ].map((feature, i) => (
                    <li key={i} className="flex items-center">
                      <div className="h-5 w-5 rounded-md bg-flirt-navy/20 flex items-center justify-center mr-3 flex-shrink-0">
                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M10 3L4.5 8.5L2 6" stroke="#1A2C5B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </div>
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <div className="pt-6 border-t border-border">
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <h3 className="font-heading font-semibold text-xl mb-1">Pro Plan</h3>
                      <p className="text-muted-foreground text-sm">Full access to all features</p>
                    </div>
                    <div className="font-heading">
                      <span className="text-2xl font-bold">$9.99</span>
                      <span className="text-muted-foreground text-sm">/month</span>
                    </div>
                  </div>
                  
                  <ul className="space-y-3">
                    {[
                      "Advanced AI conversation coach",
                      "Unlimited suggestions and templates",
                      "Detailed success metrics",
                      "Priority support",
                      "Confidence building tools",
                    ].map((feature, i) => (
                      <li key={i} className="flex items-center">
                        <div className="h-5 w-5 rounded-md bg-flirt-navy/20 flex items-center justify-center mr-3 flex-shrink-0">
                          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M10 3L4.5 8.5L2 6" stroke="#1A2C5B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        </div>
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </GlassCard>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA;
