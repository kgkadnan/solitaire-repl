"use client";
import React from "react";
import { Button } from "../../../ui/button";
import style from "./selection-button.module.scss";

// Interface for styling of selection button and label
export interface SelectionButtonStyle {
  selectionButtonStyle: string;
  selectionButtonLabelStyle?: string;
}

// Interface for props of the SelectionButton component
interface SelectionButtonProps {
  selectionButtonLabel: string;
  handleClick?: (data: string) => void;
  selectionButtonAllStyles?: SelectionButtonStyle;
  data?: string;
}

// CustomSelectionButton component definition
export const CustomSelectionButton: React.FC<SelectionButtonProps> = ({
  selectionButtonLabel,
  handleClick = () => {},
  selectionButtonAllStyles,
  data = "",
}) => {
  return (
    <>
      {/* Button component with styles and click event */}
      <Button
        data-testid="selection-button"
        className={`${style?.buttonDefaultStyle} ${selectionButtonAllStyles?.selectionButtonStyle}`}
        onClick={() => {
          handleClick(data);
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
