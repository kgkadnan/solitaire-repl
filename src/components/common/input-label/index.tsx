import React from 'react';
import styles from './input-label.module.scss';
import { Label } from '@components/ui/label';

interface ILabelStyle {
  label: string;
}

interface InputLabelProps {
  htmlfor: string;
  label: string | string[];
  overriddenStyles?: ILabelStyle;
}

export const CustomInputlabel: React.FC<InputLabelProps> = ({
  htmlfor,
  label,
  overriddenStyles,
}) => {
  return (
    <>
      <Label
        data-testid="custom-label"
        htmlFor={htmlfor}
        className={`${styles.defaultLableStyle} ${overriddenStyles?.label} `}
      >
        {label}
      </Label>
    </>
  );
};
