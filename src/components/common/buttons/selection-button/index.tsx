'use client';
import React from 'react';
import style from './selection-button.module.scss';
import { Button } from '@/components/ui/button';

// Interface for styling of selection button and label
export interface ISelectionButtonStyle {
  selectionButtonStyle: string;
  selectionButtonLabelStyle?: string;
}

// Interface for props of the SelectionButton component
interface ISelectionButtonProps {
  selectionButtonLabel: string;
  handleClick?: (data: string) => void;
  selectionButtonAllStyles?: ISelectionButtonStyle;
  data?: string;
}

// CustomSelectionButton component definition
export const CustomSelectionButton: React.FC<ISelectionButtonProps> = ({
  selectionButtonLabel,
  handleClick,
  selectionButtonAllStyles,
  data
}) => {
  return (
    <>
      {/* Button component with styles and click event */}
      <Button
        data-testid="selection-button"
        className={`${style?.buttonDefaultStyle} ${selectionButtonAllStyles?.selectionButtonStyle}`}
        onClick={() => {
          handleClick!(data!);
        }}
      >
        {/* Selection button label with optional styling */}
        <div
          className={`${style?.labelDefaultStyle} ${selectionButtonAllStyles?.selectionButtonLabelStyle}`}
        >
          {selectionButtonLabel}
        </div>
      </Button>
    </>
  );
};
