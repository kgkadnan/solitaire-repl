'use client';
import React from 'react';
import style from './display-button.module.scss';
import { Button } from '@components/ui/button';

// Define interfaces for styling and component props
export interface IDisplayButtonStyle {
  displayButtonStyle?: string;
  displayLabelStyle?: string;
}

export interface IDisplayButtonProps {
  id?: number;
  displayButtonLabel: string | React.ReactNode;
  displayButtonAllStyle?: IDisplayButtonStyle;
  handleClick?: (color: string) => void;
  color?: string;
  isDisable?: boolean;
  type?: 'button' | 'reset' | 'submit' | undefined;
}

// CustomDisplayButton component definition
export const CustomDisplayButton: React.FC<IDisplayButtonProps> = ({
  displayButtonLabel,
  displayButtonAllStyle,
  handleClick,
  color,
  isDisable,
  type
}) => {
  return (
    <>
      {/* Button component with styles and click event */}
      <Button
        data-testid="display-button"
        className={`${style?.defaultStyle} ${displayButtonAllStyle?.displayButtonStyle}`}
        onClick={() => {
          handleClick && handleClick(color!);
        }}
        disabled={isDisable}
        type={type!}
      >
        {/* Display button label with optional styling */}
        <div
          data-testid="display-button-label"
          className={displayButtonAllStyle?.displayLabelStyle}
        >
          {displayButtonLabel}
        </div>
      </Button>
    </>
  );
};
