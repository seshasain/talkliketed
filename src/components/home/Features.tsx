
import React from 'react';
import { MessageSquare, Zap, Shield, Target, Award, LineChart, Brain, Anchor } from 'lucide-react';
import GlassCard from '../ui/GlassCard';

const Features = () => {
  const features = [
    {
      icon: <Target className="text-flirt-navy" size={26} />,
      title: "Strategic Approach",
      description: "Get tailored conversation strategies based on your personality and goals."
    },
    {
      icon: <Brain className="text-flirt-blue" size={26} />,
      title: "Smart Icebreakers",
      description: "Never be stuck for words with our arsenal of effective opening lines and witty comebacks."
    },
    {
      icon: <Zap className="text-flirt-gold" size={26} />,
      title: "Real-Time Coaching",
      description: "Receive instant feedback on your messages to improve your communication approach."
    },
    {
      icon: <MessageSquare className="text-flirt-navy" size={26} />,
      title: "Conversation Dashboard",
      description: "Track your conversations and identify successful patterns to replicate."
    },
    {
      icon: <LineChart className="text-flirt-blue" size={26} />,
      title: "Performance Analytics",
      description: "Gain insights into what works best for you with detailed communication metrics."
    },
    {
      icon: <Shield className="text-flirt-navy" size={26} />,
      title: "Privacy Guaranteed",
      description: "Military-grade encryption and strict privacy controls keep your conversations completely confidential."
    },
    {
      icon: <Award className="text-flirt-gold" size={26} />,
      title: "Skills Development",
      description: "Build lasting confidence with personalized communication development plans."
    },
    {
      icon: <Anchor className="text-flirt-blue" size={26} />,
      title: "Relationship Building",
      description: "Learn how to create deeper connections through meaningful conversation."
    }
  ];

  return (
    <section id="features" className="py-20 relative">
      <div className="absolute top-1/4 right-0 w-64 h-64 bg-flirt-blue/10 rounded-full blur-3xl opacity-40"></div>
      <div className="absolute bottom-1/4 left-0 w-64 h-64 bg-flirt-navy/10 rounded-full blur-3xl opacity-40"></div>
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="text-center mb-16">
          <h2 className="gradient-text inline-block mb-4">Powerful Features</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            FlirtSync combines advanced AI with expert communication strategies to help you connect confidently and effectively.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, i) => (
            <GlassCard 
              key={i} 
              className="h-full"
              hoverEffect={true}
              glowEffect={i % 4 === 0}
              variant="masculine"
            >
              <div className="h-12 w-12 rounded-md bg-background flex items-center justify-center mb-4">
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
