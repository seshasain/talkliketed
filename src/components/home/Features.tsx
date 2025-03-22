
import React from 'react';
import { MessageSquare, Sparkles, Zap, ShieldCheck, Heart, MessagesSquare, Lightbulb, LineChart } from 'lucide-react';
import GlassCard from '../ui/GlassCard';

const Features = () => {
  const features = [
    {
      icon: <MessageSquare className="text-flirt-purple" size={26} />,
      title: "AI-Powered Suggestions",
      description: "Get real-time, tailored flirting responses based on conversation context and your personal style."
    },
    {
      icon: <Sparkles className="text-flirt-blue" size={26} />,
      title: "Icebreakers & Comebacks",
      description: "Never be stuck for words with our collection of smart conversation starters and witty replies."
    },
    {
      icon: <Zap className="text-flirt-pink" size={26} />,
      title: "Real-Time Feedback",
      description: "Receive instant analysis on your messages before sending to optimize your communication approach."
    },
    {
      icon: <MessagesSquare className="text-flirt-purple" size={26} />,
      title: "Chat Logging Dashboard",
      description: "Organize and analyze your conversations to track progress and identify successful strategies."
    },
    {
      icon: <Lightbulb className="text-flirt-blue" size={26} />,
      title: "Conversation Analysis",
      description: "Gain insights into communication patterns and discover what resonates with your conversation partner."
    },
    {
      icon: <ShieldCheck className="text-flirt-purple" size={26} />,
      title: "Privacy Protection",
      description: "End-to-end encryption and strict privacy controls keep your conversations completely confidential."
    },
    {
      icon: <Heart className="text-flirt-pink" size={26} />,
      title: "Personalized Profiles",
      description: "Create detailed profiles of your conversation partners to receive highly customized suggestions."
    },
    {
      icon: <LineChart className="text-flirt-blue" size={26} />,
      title: "Progress Tracking",
      description: "Monitor your confidence growth and conversation skills improvement over time."
    }
  ];

  return (
    <section id="features" className="py-20 relative">
      <div className="absolute top-1/4 right-0 w-64 h-64 bg-flirt-blue/10 rounded-full blur-3xl opacity-50"></div>
      <div className="absolute bottom-1/4 left-0 w-64 h-64 bg-flirt-purple/10 rounded-full blur-3xl opacity-50"></div>
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="text-center mb-16">
          <h2 className="gradient-text inline-block mb-4">Powerful Features</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            FlirtSync combines cutting-edge AI with human communication expertise to help you connect more effectively.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, i) => (
            <GlassCard 
              key={i} 
              className="h-full"
              hoverEffect={true}
              glowEffect={i % 4 === 0}
            >
              <div className="h-12 w-12 rounded-xl bg-background flex items-center justify-center mb-4">
                {feature.icon}
              </div>
              <h3 className="text-lg font-heading font-semibold mb-2">{feature.title}</h3>
              <p className="text-muted-foreground text-sm">{feature.description}</p>
            </GlassCard>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
