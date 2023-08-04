"use client";

import React from "react";
import { DisplayButton } from "../display-button";
import style from "./example.module.scss";

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
      <DisplayButton
        displayButtonLabel="25 Stones"
        displayButtonAllStyle={xStyle}
        handleClick={handleClick}
      />
    </>
  );
};
