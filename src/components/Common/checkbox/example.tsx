"use client";
import React, { useState } from "react";
import { CustomCheckBox } from ".";
import styles from "./example.module.scss";

export const Example = () => {
  let data = [
    {
      id: 1,
      checked: false,
      // className: styles.checkbox,
    },
    {
      id: 2,
      checked: false,
      // className: styles.checkbox,
    },
    {
      id: 3,
      checked: false,
      // className: styles.checkbox,
    },
  ];
  const className = {
    checkbox: styles.checkbox,
  };

  return (
    <div>
      <CustomCheckBox data={data} style={className} />
    </div>
  );
};
