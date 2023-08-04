"use client";

import React from "react";
import { SelectionButton } from "../selection-button";
import style from "./example.module.scss";

const SelBtnExample = () => {
  const handleClick = () => {
    console.log("It'sworing");
  };

  const myStyle = {
    selectionButtonStyle: style.buttonStyle,
    selectionButtonLabelStyle: style.labelStyle,
  };

  return (
    <>
      <SelectionButton
        selectionButtonAllStyles={myStyle}
        selectionButtonLabel="Button"
        handleClick={handleClick}
      />
    </>
  );
};

export default SelBtnExample;
