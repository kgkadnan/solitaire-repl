import { Switch } from '@/components/v2/ui/switch';
import React from 'react';

interface IToggleProps {
  className: string;
  onClick: (checked: any) => void;
  checked: boolean;
  id: string;
}

export const Toggle: React.FC<IToggleProps> = ({
  className,
  onClick,
  checked,
  id
}) => {
  return (
    <Switch id={id} className={className} onClick={onClick} checked={checked} />
  );
};
