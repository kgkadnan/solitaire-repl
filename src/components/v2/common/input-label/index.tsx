import React from 'react';
import { Label } from '@components/ui/label';

interface IInputLabelProps {
  htmlFor: string;
  label: string | string[];
  styles?: string;
}

export const InputLabel: React.FC<IInputLabelProps> = ({
  htmlFor,
  label,
  styles
}) => {
  return (
    <Label htmlFor={htmlFor} className={`text-[#667085] ${styles}`}>
      {label}
    </Label>
  );
};
