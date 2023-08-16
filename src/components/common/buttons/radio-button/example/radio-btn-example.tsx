"use client";

import { useState } from "react";
import style from "./example.module.scss";
import { RadioButton } from "../radio-button";

export const RadioBtnExample = () => {
  const [selectedValue, setSelectedValue] = useState("");

  const handleRadioChange = (radioValue: string) => {
    setSelectedValue(radioValue);
  };

  const myStyles = {
    radioButtonStyle: style.radioStyle,
    radioLabelStyle: style.labelStyle,
  };

  return (
    <>
      <RadioButton
        radioData={[
          {
            id: "1",
            value: "1",
            radioButtonLabel: "contains",
          },
          {
            id: "2",
            value: "2",
            radioButtonLabel: "Does Not Contains",
          },
        ]}
        onChange={handleRadioChange}
        radioButtonAllStyles={myStyles}
      />
    </>
  );
};
