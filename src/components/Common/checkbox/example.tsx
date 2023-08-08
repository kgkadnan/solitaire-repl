"use client";
import React from "react";
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

  return (
    <div>
      <CustomCheckBox data={data} style={styles.checkbox} />
    </div>
  );
};
