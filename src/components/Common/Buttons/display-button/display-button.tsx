"use client";
import React from "react";
import { Button } from "../../../ui/button";
import style from "./display-button.module.scss";

export interface DisplayButtonStyle {
  displayButtonStyle?: string;
  displayLabelStyle?: string;
}

export interface DisplayBtnProps {
  id?: number;
  displayButtonLabel: string;
  displayButtonAllStyle?: DisplayButtonStyle;
  handleClick?: () => void;
}

export const CustomDisplayButton: React.FC<DisplayBtnProps> = ({
  displayButtonLabel,
  displayButtonAllStyle,
  handleClick,
}) => {
  return (
    <>
      <Button
        className={`${style?.defaultStyle} ${displayButtonAllStyle?.displayButtonStyle}`}
        onClick={handleClick}
      >
        <div className={displayButtonAllStyle?.displayLabelStyle}>
          {displayButtonLabel}
        </div>
      </Button>
    </>
  );
};
