
import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Hero from '@/components/home/Hero';
import Features from '@/components/home/Features';
import ChatDemo from '@/components/home/ChatDemo';
import CTA from '@/components/home/CTA';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <Hero />
        <Features />
        <ChatDemo />
        <CTA />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
