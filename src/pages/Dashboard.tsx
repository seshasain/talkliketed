
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  ArrowRight, 
  MessageSquare, 
  LineChart, 
  Users, 
  Settings, 
  LogOut 
} from 'lucide-react';
import GlassCard from '@/components/ui/GlassCard';
import AnimatedButton from '@/components/ui/AnimatedButton';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/hooks/use-toast';

const Dashboard = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  // Mock data
  const recentConversations = [
    { id: 1, name: "Sarah", lastMessage: "Hey, how's it going?", time: "2 hours ago" },
    { id: 2, name: "David", lastMessage: "That sounds great!", time: "Yesterday" },
    { id: 3, name: "Amy", lastMessage: "Let's meet up next week", time: "3 days ago" },
  ];

  const handleLogout = async () => {
    try {
      await signOut();
      toast({
        title: "Logged out",
        description: "You have been logged out successfully",
      });
      navigate('/login');
    } catch (error) {
      toast({
        title: "Error",
        description: "There was an error logging out",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Dashboard Header */}
      <header className="bg-flirt-navy/90 text-white">
        <div className="container mx-auto px-4 py-4 flex flex-wrap justify-between items-center">
          <div className="flex items-center space-x-4">
            <Link to="/">
              <h1 className="text-2xl font-bold">FlirtSync</h1>
            </Link>
            <nav className="hidden md:flex items-center space-x-6">
              <Link to="/dashboard" className="hover:text-flirt-gold transition-colors">Dashboard</Link>
              <Link to="/conversations" className="hover:text-flirt-gold transition-colors">Conversations</Link>
              <Link to="/analytics" className="hover:text-flirt-gold transition-colors">Analytics</Link>
              <Link to="/profile" className="hover:text-flirt-gold transition-colors">Profile</Link>
            </nav>
          </div>
          <div className="flex items-center space-x-4">
            <Link to="/settings">
              <Settings className="w-5 h-5 text-white/80 hover:text-white" />
            </Link>
            <button onClick={handleLogout}>
              <LogOut className="w-5 h-5 text-white/80 hover:text-white" />
            </button>
          </div>
        </div>
      </header>

      {/* Dashboard Content */}
      <main className="container mx-auto px-4 py-8">
        <h2 className="text-3xl font-bold mb-8">Welcome back, {user?.name || 'User'}!</h2>
        
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <GlassCard variant="masculine" className="p-6">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-bold">Active Conversations</h3>
              <div className="p-2 bg-flirt-navy/10 rounded-full">
                <MessageSquare className="w-6 h-6 text-flirt-navy" />
              </div>
            </div>
            <p className="text-3xl font-bold mt-2">5</p>
            <p className="text-sm text-muted-foreground mt-1">↑ 2 from last week</p>
          </GlassCard>
          
          <GlassCard variant="masculine" className="p-6">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-bold">Response Rate</h3>
              <div className="p-2 bg-flirt-blue/10 rounded-full">
                <LineChart className="w-6 h-6 text-flirt-blue" />
              </div>
            </div>
            <p className="text-3xl font-bold mt-2">87%</p>
            <p className="text-sm text-muted-foreground mt-1">↑ 12% from last week</p>
          </GlassCard>
          
          <GlassCard variant="masculine" className="p-6">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-bold">New Connections</h3>
              <div className="p-2 bg-flirt-gold/10 rounded-full">
                <Users className="w-6 h-6 text-flirt-gold" />
              </div>
            </div>
            <p className="text-3xl font-bold mt-2">3</p>
            <p className="text-sm text-muted-foreground mt-1">↑ 1 from last week</p>
          </GlassCard>
        </div>
        
        {/* Recent Conversations */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-bold">Recent Conversations</h3>
            <Link to="/conversations" className="text-flirt-blue hover:underline">View all</Link>
          </div>
          
          <div className="space-y-4">
            {recentConversations.map((convo) => (
              <GlassCard key={convo.id} variant="masculine" className="p-4">
                <div className="flex justify-between items-center">
                  <div>
                    <h4 className="font-semibold">{convo.name}</h4>
                    <p className="text-sm text-muted-foreground">{convo.lastMessage}</p>
                  </div>
                  <div className="flex items-center space-x-4">
                    <span className="text-xs text-muted-foreground">{convo.time}</span>
                    <AnimatedButton variant="ghost" size="sm" icon={<ArrowRight size={16} />}>
                      Continue
                    </AnimatedButton>
                  </div>
                </div>
              </GlassCard>
            ))}
          </div>
        </div>
        
        {/* Quick Actions */}
        <div className="mb-8">
          <h3 className="text-xl font-bold mb-4">Quick Actions</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <AnimatedButton 
              variant="default" 
              className="w-full justify-between py-6 px-4"
              icon={<MessageSquare size={20} />}
              iconPosition="right"
            >
              New Conversation
            </AnimatedButton>
            <AnimatedButton 
              variant="outline" 
              className="w-full justify-between py-6 px-4"
              icon={<LineChart size={20} />}
              iconPosition="right"
            >
              View Analytics
            </AnimatedButton>
            <AnimatedButton 
              variant="outline" 
              className="w-full justify-between py-6 px-4"
              icon={<Users size={20} />}
              iconPosition="right"
            >
              Manage Contacts
            </AnimatedButton>
            <AnimatedButton 
              variant="outline" 
              className="w-full justify-between py-6 px-4"
              icon={<Settings size={20} />}
              iconPosition="right"
            >
              Settings
            </AnimatedButton>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
