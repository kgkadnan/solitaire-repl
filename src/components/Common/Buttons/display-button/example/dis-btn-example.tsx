"use client";

import React from "react";
import style from "./example.module.scss";
import { CustomDisplayButton } from "../display-button";

export const DisBtnExample = () => {
  const handleClick = () => {
    console.log("It'sworing");
  };
  const xStyle = {
    displayButtonStyle: style?.button,
    displayLabelStyle: style?.label,
  };
  return (
    <>
      <CustomDisplayButton
        displayButtonLabel="25 Stones"
        displayButtonAllStyle={xStyle}
        handleClick={handleClick}
      />
    </>
  );
};
