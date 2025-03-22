
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, MessageSquare, Heart, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';
import AnimatedButton from '../ui/AnimatedButton';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const navLinks = [
    { name: 'Features', path: '#features', icon: <Sparkles size={18} /> },
    { name: 'How It Works', path: '#how-it-works', icon: <MessageSquare size={18} /> },
    { name: 'Testimonials', path: '#testimonials', icon: <Heart size={18} /> },
  ];

  return (
    <nav
      className={cn(
        'fixed top-0 left-0 right-0 w-full z-50 transition-all duration-300 py-4',
        isScrolled ? 'glass shadow-glass backdrop-blur-lg' : 'bg-transparent'
      )}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-flirt-purple to-flirt-blue flex items-center justify-center text-white font-bold text-lg">
              FS
            </div>
            <span className="text-xl font-heading font-semibold">
              Flirt<span className="text-flirt-purple">Sync</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.path}
                className="flex items-center text-foreground/80 hover:text-flirt-purple transition-colors duration-300 font-medium"
              >
                <span className="mr-1.5">{link.icon}</span>
                {link.name}
              </a>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <Link to="/login">
              <AnimatedButton variant="ghost" size="default">
                Log In
              </AnimatedButton>
            </Link>
            <Link to="/signup">
              <AnimatedButton variant="primary" size="default" glowEffect>
                Get Started
              </AnimatedButton>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-foreground hover:text-flirt-purple transition-colors"
            onClick={toggleMobileMenu}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden animate-fade-in">
            <div className="flex flex-col space-y-4 mt-6 p-4 glass rounded-lg">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.path}
                  className="flex items-center text-foreground/80 hover:text-flirt-purple transition-colors duration-300 font-medium py-2"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <span className="mr-2">{link.icon}</span>
                  {link.name}
                </a>
              ))}
              <div className="pt-4 flex flex-col space-y-3 border-t border-border">
                <Link to="/login" onClick={() => setIsMobileMenuOpen(false)}>
                  <AnimatedButton variant="ghost" size="default" className="w-full justify-center">
                    Log In
                  </AnimatedButton>
                </Link>
                <Link to="/signup" onClick={() => setIsMobileMenuOpen(false)}>
                  <AnimatedButton variant="primary" size="default" className="w-full justify-center" glowEffect>
                    Get Started
                  </AnimatedButton>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
