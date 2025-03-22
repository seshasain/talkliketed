
import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, Heart, Users, MessageSquare, ArrowRight } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import GlassCard from '@/components/ui/GlassCard';
import AnimatedButton from '@/components/ui/AnimatedButton';

const About = () => {
  const team = [
    {
      name: "Alex Johnson",
      role: "Founder & CEO",
      bio: "Communication specialist with 15+ years of experience in relationship psychology."
    },
    {
      name: "Morgan Smith",
      role: "Chief Technology Officer",
      bio: "AI and machine learning expert with a passion for building technology that enhances human connection."
    },
    {
      name: "Jamie Williams",
      role: "Head of Research",
      bio: "PhD in Psychology focusing on interpersonal communication and relationship dynamics."
    },
    {
      name: "Taylor Reed",
      role: "Chief Product Officer",
      bio: "Former dating coach turned product developer with insights from thousands of real conversations."
    }
  ];

  const values = [
    {
      icon: <Shield className="w-8 h-8 text-flirt-navy" />,
      title: "Privacy & Security",
      description: "We protect your conversations with state-of-the-art encryption and strict data policies."
    },
    {
      icon: <Heart className="w-8 h-8 text-flirt-crimson" />,
      title: "Genuine Connections",
      description: "We help you build real relationships based on authentic communication."
    },
    {
      icon: <Users className="w-8 h-8 text-flirt-blue" />,
      title: "Inclusivity",
      description: "Our platform is designed for people of all backgrounds, orientations, and communication styles."
    },
    {
      icon: <MessageSquare className="w-8 h-8 text-flirt-gold" />,
      title: "Continuous Learning",
      description: "We believe good communication is a skill that can always be improved and refined."
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
              Our Mission
            </h1>
            <p className="text-xl text-muted-foreground mb-10">
              At FlirtSync, we're on a mission to help people build more meaningful connections through better conversations. We believe that communication is the foundation of all relationships.
            </p>
          </div>
        </div>
      </section>
      
      {/* Our Story */}
      <section className="py-20 relative">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">Our Story</h2>
              <div className="space-y-4">
                <p>
                  FlirtSync was born from a simple observation: many people struggle with starting and maintaining engaging conversations, especially in romantic contexts.
                </p>
                <p>
                  Our founder, Alex Johnson, saw how technology was changing the dating landscape but noticed that while apps were making it easier to match with people, they weren't helping users have better conversations.
                </p>
                <p>
                  In 2022, Alex assembled a team of communication experts, psychologists, and engineers to create an AI-powered conversation coach that could provide personalized advice and help users develop their communication skills.
                </p>
                <p>
                  Today, FlirtSync has helped thousands of users around the world build confidence in their conversation abilities and form deeper connections.
                </p>
              </div>
            </div>
            <div className="rounded-lg overflow-hidden">
              <div className="bg-gradient-to-r from-flirt-navy to-flirt-blue h-80 rounded-lg flex items-center justify-center">
                <span className="text-white text-3xl font-bold">FlirtSync</span>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Our Values */}
      <section className="py-20 bg-flirt-navy/5">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-10 text-center">Our Core Values</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <GlassCard 
                key={index} 
                variant="masculine" 
                className="p-6"
                hoverEffect
              >
                <div className="flex flex-col items-center text-center">
                  <div className="mb-4 p-3 bg-background rounded-full">
                    {value.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-3">{value.title}</h3>
                  <p className="text-muted-foreground">{value.description}</p>
                </div>
              </GlassCard>
            ))}
          </div>
        </div>
      </section>
      
      {/* Our Team */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-10 text-center">Meet Our Team</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <GlassCard 
                key={index} 
                variant="masculine" 
                className="p-6"
                hoverEffect
              >
                <div className="text-center">
                  <div className="w-24 h-24 bg-gradient-to-br from-flirt-navy to-flirt-blue rounded-full mx-auto mb-4 flex items-center justify-center">
                    <span className="text-white text-2xl font-bold">{member.name.charAt(0)}</span>
                  </div>
                  <h3 className="text-xl font-bold">{member.name}</h3>
                  <p className="text-flirt-blue font-medium mb-3">{member.role}</p>
                  <p className="text-muted-foreground">{member.bio}</p>
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
            <h2 className="text-3xl font-bold mb-6">Join Us in Our Mission</h2>
            <p className="text-muted-foreground text-lg mb-10">
              Become part of the FlirtSync community and start improving your conversation skills today.
            </p>
            <Link to="/signup">
              <AnimatedButton 
                size="lg" 
                variant="primary" 
                glowEffect
                icon={<ArrowRight size={20} />}
                iconPosition="right"
              >
                Create Free Account
              </AnimatedButton>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
