"use client";
import React, { ChangeEvent } from "react";
import { useState } from "react";
import { CustomInputField } from ".";
import styles from "./example.module.scss";

export const Example = () => {
  const [name, setName] = useState("");

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const className = {
    input: styles.input,
  };
  return (
    <>
      <CustomInputField
        style={className}
        type="text"
        name={name}
        onChange={handleChange}
        value={name}
      />
    </>
  );
};
