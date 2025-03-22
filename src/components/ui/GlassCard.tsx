
import React from 'react';
import { cn } from '@/lib/utils';

interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  hoverEffect?: boolean;
  clickable?: boolean;
  glowEffect?: boolean;
  variant?: 'glass' | 'masculine' | 'minimal';
}

const GlassCard = ({ 
  children, 
  className, 
  hoverEffect = true, 
  clickable = false,
  glowEffect = false,
  variant = 'glass',
  ...props 
}: GlassCardProps) => {
  const getCardClass = () => {
    switch (variant) {
      case 'masculine':
        return 'bg-white/90 dark:bg-flirt-slate/90 backdrop-blur-sm border border-flirt-navy/15 dark:border-white/10 rounded-md shadow-sm';
      case 'minimal':
        return 'bg-white/70 dark:bg-flirt-charcoal/70 backdrop-blur-sm border-0 rounded-md';
      case 'glass':
      default:
        return 'glass';
    }
  };

  return (
    <div 
      className={cn(
        getCardClass(),
        'p-6 flex flex-col transition-all duration-300 ease-in-out',
        hoverEffect && 'hover:translate-y-[-5px]',
        clickable && 'cursor-pointer active:scale-[0.98] active:shadow-glass-active',
        glowEffect && 'shadow-neon hover:shadow-neon-hover',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

export default GlassCard;
