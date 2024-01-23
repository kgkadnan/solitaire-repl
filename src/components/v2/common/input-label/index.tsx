import React from 'react';
import { Label } from '@components/ui/label';

interface IInputLabelProps {
  htmlFor: string;
  label: string;
  styles?: string;
}

export const InputLabel: React.FC<IInputLabelProps> = ({
  htmlFor,
  label,
  styles
}) => {
  return (
    <Label htmlFor={htmlFor} className={styles}>
      {label}
    </Label>
  );
};
