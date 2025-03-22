
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Eye, EyeOff, ArrowRight } from 'lucide-react';

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import GlassCard from "@/components/ui/GlassCard";
import AnimatedButton from "@/components/ui/AnimatedButton";

const formSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters" }),
});

const Login = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [showPassword, setShowPassword] = useState(false);
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    // For now just simulate login and show success message
    console.log(values);
    
    // Show success toast
    toast({
      title: "Login successful!",
      description: "Welcome back to FlirtSync",
    });
    
    // Navigate to dashboard after successful login
    setTimeout(() => {
      navigate('/');
    }, 1500);
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
              <h1 className="text-2xl font-bold">Welcome Back</h1>
              <p className="text-muted-foreground text-sm">Log in to access your conversations</p>
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
                        <Input placeholder="your.email@example.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Input 
                            type={showPassword ? "text" : "password"} 
                            placeholder="••••••••" 
                            {...field} 
                          />
                          <button 
                            type="button"
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                            onClick={() => setShowPassword(!showPassword)}
                          >
                            {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                          </button>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <div className="flex justify-end">
                  <Link to="/forgot-password" className="text-sm text-flirt-blue hover:underline">
                    Forgot password?
                  </Link>
                </div>
                
                <AnimatedButton 
                  type="submit" 
                  variant="primary" 
                  glowEffect 
                  className="w-full mt-6"
                  icon={<ArrowRight size={16} />}
                  iconPosition="right"
                >
                  Log In
                </AnimatedButton>
              </form>
            </Form>
            
            <div className="mt-6 text-center">
              <p className="text-sm text-muted-foreground">
                Don't have an account?{" "}
                <Link to="/signup" className="text-flirt-blue hover:underline">
                  Sign up
                </Link>
              </p>
            </div>
          </div>
        </GlassCard>
        
        <div className="mt-8 text-center">
          <p className="text-xs text-muted-foreground">
            By logging in, you agree to our{" "}
            <Link to="/terms" className="hover:underline">Terms of Service</Link>
            {" "}and{" "}
            <Link to="/privacy" className="hover:underline">Privacy Policy</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
