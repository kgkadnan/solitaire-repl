"use client";
import React from "react";
import { Button } from "../../../ui/button";
import style from "./display-button.module.scss";

interface DisplayButtonStyle {
  displayButtonStyle?: string;
  displayLabelStyle?: string;
}

interface DisplayBtnProps {
  displayButtonLabel: string;
  displayButtonAllStyle?: DisplayButtonStyle;
  handleClick?: (color:string) => void;
  color?:string
}

export const CustomDisplayButton: React.FC<DisplayBtnProps> = ({
  displayButtonLabel,
  displayButtonAllStyle,
  handleClick=()=>{},
  color=""
}) => {
  return (
    <>
      <Button
        className={`${style?.defaultStyle} ${displayButtonAllStyle?.displayButtonStyle}`}
        onClick={()=>{handleClick(color)}}
      >
        <div className={displayButtonAllStyle?.displayLabelStyle}>
          {displayButtonLabel}
        </div>
      </Button>
    </>
  );
};
