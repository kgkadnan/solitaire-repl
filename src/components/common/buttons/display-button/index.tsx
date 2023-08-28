'use client';
import React from 'react';
import style from './display-button.module.scss';
import { Button } from '@components/ui/button';

// Define interfaces for styling and component props
export interface DisplayButtonStyle {
  displayButtonStyle?: string;
  displayLabelStyle?: string;
}

export interface DisplayButtonProps {
  id?: number;
  displayButtonLabel: string;
  displayButtonAllStyle?: DisplayButtonStyle;
  handleClick?: (color: string) => void;
  color?: string;
}

// CustomDisplayButton component definition
export const CustomDisplayButton: React.FC<DisplayButtonProps> = ({
  displayButtonLabel,
  displayButtonAllStyle,
  handleClick = () => {},
  color = '',
}) => {
  return (
    <>
      {/* Button component with styles and click event */}
      <Button
        data-testid="display-button"
        className={`${style?.defaultStyle} ${displayButtonAllStyle?.displayButtonStyle}`}
        onClick={() => {
          handleClick(color);
        }}
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
