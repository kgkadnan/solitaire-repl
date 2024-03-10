import React from 'react';
import { Label } from '../../ui/label';

interface IInputLabelProps {
  label: string;
  htmlFor?: string;
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
