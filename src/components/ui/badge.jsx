import React from 'react';
import { cn } from '../../lib/utils';
import './badge.css';

function Badge({ className, variant = 'default', ...props }) {
  return (
    <div 
      className={cn("badge-component", `badge-${variant}`, className)} 
      {...props} 
    />
  );
}

export { Badge };
