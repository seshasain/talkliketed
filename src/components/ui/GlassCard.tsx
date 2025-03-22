
import React from 'react';
import { cn } from '@/lib/utils';

interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  hoverEffect?: boolean;
  clickable?: boolean;
  glowEffect?: boolean;
}

const GlassCard = ({ 
  children, 
  className, 
  hoverEffect = true, 
  clickable = false,
  glowEffect = false,
  ...props 
}: GlassCardProps) => {
  return (
    <div 
      className={cn(
        'glass p-6 flex flex-col transition-all duration-300 ease-in-out',
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
