

"use client";
import React from "react";
import { Button } from "../../../ui/button";
import style from "./selection-button.module.scss";

interface SelectionButtonStyle {
  selectionButtonStyle: string;
  selectionButtonLabelStyle?: string;
}

interface SelectionButtonProps {
  selectionButtonLabel: string;
  handleClick?: (data:string) => void;
  selectionButtonAllStyles?: SelectionButtonStyle;
  data?:string
}

export const SelectionButton: React.FC<SelectionButtonProps> = ({
  selectionButtonLabel,
  handleClick=()=>{},
  selectionButtonAllStyles,
  data=""
}) => {
  return (
    <>
      <Button
        className={`${style?.btnDefaultStyle} ${selectionButtonAllStyles?.selectionButtonStyle}`}
        onClick={()=>{handleClick(data)}}
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
