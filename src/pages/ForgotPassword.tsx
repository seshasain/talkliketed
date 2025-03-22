
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ArrowRight, Mail } from 'lucide-react';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import GlassCard from "@/components/ui/GlassCard";
import AnimatedButton from "@/components/ui/AnimatedButton";

const formSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
});

const ForgotPassword = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    
    toast({
      title: "Reset link sent!",
      description: "Check your email for instructions to reset your password",
    });
    
    // Redirect back to login after showing the toast
    setTimeout(() => {
      navigate('/login');
    }, 2500);
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      {/* Background glow effects */}
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-flirt-navy/20 rounded-full blur-3xl opacity-40 animate-pulse-subtle"></div>
      <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-flirt-blue/20 rounded-full blur-3xl opacity-40 animate-pulse-subtle"></div>
      
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link to="/" className="inline-block">
            <h2 className="text-3xl font-bold gradient-text">FlirtSync</h2>
          </Link>
          <p className="text-muted-foreground mt-2">Your conversation wingman for smooth interactions</p>
        </div>
        
        <GlassCard variant="masculine" className="w-full">
          <div className="p-6">
            <div className="text-center mb-6">
              <h1 className="text-2xl font-bold">Reset Your Password</h1>
              <p className="text-muted-foreground text-sm">We'll send you a link to reset your password</p>
            </div>
            
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Input placeholder="your.email@example.com" {...field} />
                          <div className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                            <Mail size={16} />
                          </div>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <AnimatedButton 
                  type="submit" 
                  variant="primary" 
                  glowEffect 
                  className="w-full mt-6"
                  icon={<ArrowRight size={16} />}
                  iconPosition="right"
                >
                  Send Reset Link
                </AnimatedButton>
              </form>
            </Form>
            
            <div className="mt-6 text-center">
              <p className="text-sm text-muted-foreground">
                Remember your password?{" "}
                <Link to="/login" className="text-flirt-blue hover:underline">
                  Log in
                </Link>
              </p>
            </div>
          </div>
        </GlassCard>
      </div>
    </div>
  );
};

export default ForgotPassword;
