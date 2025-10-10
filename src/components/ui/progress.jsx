import React from 'react';
import { cn } from '../../lib/utils';
import './progress.css';

const Progress = React.forwardRef(({ className, value, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("progress-component", className)}
    {...props}
  >
    <div
      className="progress-indicator"
      style={{ transform: `translateX(-${100 - (value || 0)}%)` }}
    />
  </div>
));
Progress.displayName = "Progress";

export { Progress };
