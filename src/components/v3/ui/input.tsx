import * as React from 'react';

import { cn } from '@lib/utils';

export interface IInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, IInputProps>(
  ({ className, type, onChange, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn('', className)}
        ref={ref}
        onChange={onChange}
        {...props}
      />
    );
  }
);
Input.displayName = 'Input';

export { Input };
