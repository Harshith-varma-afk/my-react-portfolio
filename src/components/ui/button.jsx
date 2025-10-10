import React from 'react';
import { cn } from '../../lib/utils';
import './button.css';

const Button = React.forwardRef(({ 
  className, 
  variant = 'default', 
  size = 'default', 
  asChild = false, 
  children,
  ...props 
}, ref) => {
  const Comp = asChild ? 'span' : 'button';
  
  const baseClass = 'btn-component';
  const variantClass = `btn-${variant}`;
  const sizeClass = `btn-${size}`;
  
  return (
    <Comp
      className={cn(baseClass, variantClass, sizeClass, className)}
      ref={ref}
      {...props}
    >
      {children}
    </Comp>
  );
});
Button.displayName = "Button";

export { Button };
