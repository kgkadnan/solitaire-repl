"use client";
import React from "react";
import style from "./display-button.module.scss";
import { Button } from "@/components/ui/button";

export interface DisplayButtonStyle {
  displayButtonStyle?: string;
  displayLabelStyle?: string;
}

export interface DisplayBtnProps {
  id?: number;
  displayButtonLabel: string;
  displayButtonAllStyle?: DisplayButtonStyle;
  handleClick?: (color: string) => void;
  color?: string;
}

export const CustomDisplayButton: React.FC<DisplayBtnProps> = ({
  displayButtonLabel,
  displayButtonAllStyle,
  handleClick = () => {},
  color = "",
}) => {
  return (
    <>
      <Button
        data-testid="display-button"
        className={`${style?.defaultStyle} ${displayButtonAllStyle?.displayButtonStyle}`}
        onClick={() => {
          handleClick(color);
        }}
      >
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
