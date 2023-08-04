"use client";
import React from "react";
import { Button } from "../../../ui/button";
import style from "./display-button.module.scss";

interface displayButtonStyle {
  displayButtonStyle: string;
  displayLabelStyle: string;
}

interface DisplayBtnProps {
  displayButtonLabel: string;
  displayButtonAllStyle: displayButtonStyle;
  handleClick?: () => void;
}

export const DisplayButton: React.FC<DisplayBtnProps> = ({
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
