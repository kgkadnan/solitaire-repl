"use client";
import React from "react";
import { Button } from "../../../ui/button";
import style from "./selection-button.module.scss";

interface SelectionButtonStyle {
  selectionButtonStyle: string;
  selectionButtonLabelStyle: string;
}

interface SelectionButtonProps {
  selectionButtonLabel: string;
  handleClick?: () => void;
  selectionButtonAllStyles?: SelectionButtonStyle;
}

export const SelectionButton: React.FC<SelectionButtonProps> = ({
  selectionButtonLabel,
  handleClick,
  selectionButtonAllStyles,
}) => {
  return (
    <>
      <Button
        className={`${style?.btnDefaultStyle} ${selectionButtonAllStyles?.selectionButtonStyle}`}
        onClick={handleClick}
      >
        <div
          className={`${style?.labelDefaultStyle} ${selectionButtonAllStyles?.selectionButtonLabelStyle}`}
        >
          {selectionButtonLabel}
        </div>
      </Button>
    </>
  );
};
