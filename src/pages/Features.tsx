
import React from 'react';
import { Link } from 'react-router-dom';
import { 
  MessageSquare, 
  Zap, 
  Shield, 
  Target, 
  Award, 
  LineChart, 
  Brain, 
  Anchor,
  ArrowRight 
} from 'lucide-react';
import GlassCard from '@/components/ui/GlassCard';
import AnimatedButton from '@/components/ui/AnimatedButton';
import Navbar from '@/components/layout/Navbar';

const Features = () => {
  const features = [
    {
      icon: <Target className="text-flirt-navy" size={32} />,
      title: "Strategic Approach",
      description: "Get tailored conversation strategies based on your personality and goals."
    },
    {
      icon: <Brain className="text-flirt-blue" size={32} />,
      title: "Smart Icebreakers",
      description: "Never be stuck for words with our arsenal of effective opening lines and witty comebacks."
    },
    {
      icon: <Zap className="text-flirt-gold" size={32} />,
      title: "Real-Time Coaching",
      description: "Receive instant feedback on your messages to improve your communication approach."
    },
    {
      icon: <MessageSquare className="text-flirt-navy" size={32} />,
      title: "Conversation Dashboard",
      description: "Track your conversations and identify successful patterns to replicate."
    },
    {
      icon: <LineChart className="text-flirt-blue" size={32} />,
      title: "Performance Analytics",
      description: "Gain insights into what works best for you with detailed communication metrics."
    },
    {
      icon: <Shield className="text-flirt-navy" size={32} />,
      title: "Privacy Guaranteed",
      description: "Military-grade encryption and strict privacy controls keep your conversations completely confidential."
    },
    {
      icon: <Award className="text-flirt-gold" size={32} />,
      title: "Skills Development",
      description: "Build lasting confidence with personalized communication development plans."
    },
    {
      icon: <Anchor className="text-flirt-blue" size={32} />,
      title: "Relationship Building",
      description: "Learn how to create deeper connections through meaningful conversation."
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 relative">
        <div className="absolute top-0 right-0 w-96 h-96 bg-flirt-navy/10 rounded-full blur-3xl opacity-40"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-flirt-blue/10 rounded-full blur-3xl opacity-40"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 gradient-text">
              Powerful Features to Enhance Your Conversations
            </h1>
            <p className="text-xl text-muted-foreground mb-10">
              FlirtSync combines AI technology with social psychology to help you connect with others more effectively.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/signup">
                <AnimatedButton size="lg" variant="primary" glowEffect>
                  Get Started Free
                </AnimatedButton>
              </Link>
              <Link to="#all-features">
                <AnimatedButton size="lg" variant="outline">
                  Explore All Features
                </AnimatedButton>
              </Link>
            </div>
          </div>
        </div>
      </section>
      
      {/* All Features */}
      <section id="all-features" className="py-20 relative">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Everything You Need</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              FlirtSync is packed with all the tools you need to improve your communication skills.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <GlassCard 
                key={index} 
                variant="masculine" 
                className="p-6 h-full"
                hoverEffect
                glowEffect={index % 4 === 0}
              >
                <div className="flex flex-col h-full">
                  <div className="mb-4 p-3 bg-background rounded-lg inline-block">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground flex-grow">{feature.description}</p>
                </div>
              </GlassCard>
            ))}
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-20 bg-flirt-navy/5">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">Ready to Transform Your Conversations?</h2>
            <p className="text-muted-foreground text-lg mb-10">
              Join thousands of users who have already improved their communication skills with FlirtSync.
            </p>
            <Link to="/signup">
              <AnimatedButton 
                size="lg" 
                variant="primary" 
                glowEffect
                icon={<ArrowRight size={20} />}
                iconPosition="right"
              >
                Start Your Free Trial
              </AnimatedButton>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Features;
