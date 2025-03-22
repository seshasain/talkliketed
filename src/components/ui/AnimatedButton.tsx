
import React from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface AnimatedButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: 'default' | 'primary' | 'secondary' | 'accent' | 'outline' | 'ghost';
  size?: 'default' | 'sm' | 'lg' | 'icon';
  className?: string;
  glowEffect?: boolean;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
}

const AnimatedButton = ({ 
  children, 
  variant = 'default', 
  size = 'default', 
  className,
  glowEffect = false,
  icon,
  iconPosition = 'left',
  ...props 
}: AnimatedButtonProps) => {
  
  const getVariantClass = () => {
    switch (variant) {
      case 'primary':
        return 'bg-flirt-navy hover:bg-flirt-navy/90 text-white';
      case 'secondary':
        return 'bg-flirt-blue hover:bg-flirt-blue/90 text-white';
      case 'accent':
        return 'bg-flirt-gold hover:bg-flirt-gold/90 text-flirt-charcoal';
      case 'outline':
        return 'bg-transparent border border-flirt-navy text-flirt-navy hover:bg-flirt-navy/10';
      case 'ghost':
        return 'bg-transparent hover:bg-flirt-navy/10 text-flirt-navy';
      default:
        return 'bg-primary hover:bg-primary/90 text-primary-foreground';
    }
  };

  const getSizeClass = () => {
    switch (size) {
      case 'sm': 
        return 'h-9 px-3 rounded-md text-sm';
      case 'lg':
        return 'h-12 px-8 rounded-md text-lg';
      case 'icon':
        return 'h-10 w-10 rounded-full p-0';
      default:
        return 'h-10 px-4 py-2 rounded-md';
    }
  };

  return (
    <button
      className={cn(
        'relative inline-flex items-center justify-center font-medium transition-all duration-300 ease-in-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none',
        getVariantClass(),
        getSizeClass(),
        glowEffect && 'button-glow',
        'active:scale-[0.98]',
        'disabled:opacity-50',
        className
      )}
      {...props}
    >
      {icon && iconPosition === 'left' && <span className="mr-2">{icon}</span>}
      {children}
      {icon && iconPosition === 'right' && <span className="ml-2">{icon}</span>}
    </button>
  );
};

export default AnimatedButton;
