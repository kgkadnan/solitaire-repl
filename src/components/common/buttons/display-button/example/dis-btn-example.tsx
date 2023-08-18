"use client";

import React from "react";
import style from "./example.module.scss";
import { CustomDisplayButton } from "..";

export const DisplayButtonExample = () => {
  const handleClick = () => {
    console.log("It'sworing");
  };
  const classes = {
    displayButtonStyle: style?.button,
    displayLabelStyle: style?.label,
  };
  return (
    <>
      <CustomDisplayButton
        displayButtonLabel="25 Stones"
        displayButtonAllStyle={classes}
        handleClick={handleClick}
      />
    </>
  );
};
