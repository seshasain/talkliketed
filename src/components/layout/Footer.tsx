
import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, Shield, LockKeyhole, Github, Twitter, Instagram } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="w-full py-12 bg-background border-t border-border mt-24">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-full bg-gradient-to-r from-flirt-purple to-flirt-blue flex items-center justify-center text-white font-bold text-sm">
                FS
              </div>
              <span className="text-lg font-heading font-semibold">
                Flirt<span className="text-flirt-purple">Sync</span>
              </span>
            </div>
            <p className="text-muted-foreground text-sm">
              Your AI wingman for smooth conversations. Flirt confidently and connect meaningfully.
            </p>
            <div className="flex space-x-4 pt-2">
              <a href="#" className="text-muted-foreground hover:text-flirt-purple transition-colors">
                <Github size={20} />
              </a>
              <a href="#" className="text-muted-foreground hover:text-flirt-purple transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-muted-foreground hover:text-flirt-purple transition-colors">
                <Instagram size={20} />
              </a>
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-heading font-semibold text-base mb-4">Company</h4>
            <ul className="space-y-3">
              <li>
                <Link to="/about" className="text-muted-foreground hover:text-flirt-purple transition-colors text-sm">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/careers" className="text-muted-foreground hover:text-flirt-purple transition-colors text-sm">
                  Careers
                </Link>
              </li>
              <li>
                <Link to="/blog" className="text-muted-foreground hover:text-flirt-purple transition-colors text-sm">
                  Blog
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-muted-foreground hover:text-flirt-purple transition-colors text-sm">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-heading font-semibold text-base mb-4">Resources</h4>
            <ul className="space-y-3">
              <li>
                <Link to="/help" className="text-muted-foreground hover:text-flirt-purple transition-colors text-sm">
                  Help Center
                </Link>
              </li>
              <li>
                <Link to="/guidelines" className="text-muted-foreground hover:text-flirt-purple transition-colors text-sm">
                  Conversation Guidelines
                </Link>
              </li>
              <li>
                <Link to="/tips" className="text-muted-foreground hover:text-flirt-purple transition-colors text-sm">
                  Flirting Tips
                </Link>
              </li>
              <li>
                <Link to="/api" className="text-muted-foreground hover:text-flirt-purple transition-colors text-sm">
                  API Documentation
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-heading font-semibold text-base mb-4">Legal</h4>
            <ul className="space-y-3">
              <li>
                <Link to="/terms" className="text-muted-foreground hover:text-flirt-purple transition-colors text-sm">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-muted-foreground hover:text-flirt-purple transition-colors text-sm flex items-center">
                  <LockKeyhole size={14} className="mr-1.5" />
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/security" className="text-muted-foreground hover:text-flirt-purple transition-colors text-sm flex items-center">
                  <Shield size={14} className="mr-1.5" />
                  Security
                </Link>
              </li>
              <li>
                <Link to="/cookies" className="text-muted-foreground hover:text-flirt-purple transition-colors text-sm">
                  Cookie Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center">
          <p className="text-muted-foreground text-sm">
            © {new Date().getFullYear()} FlirtSync. All rights reserved.
          </p>
          <p className="text-muted-foreground text-sm mt-4 md:mt-0 flex items-center">
            Made with <Heart size={14} className="mx-1 text-flirt-pink" /> for better conversations
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
