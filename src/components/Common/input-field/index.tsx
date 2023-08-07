"use client";
import React, { ChangeEvent } from "react";
import { Input } from "../../ui/input";
import styles from "./input-field.module.scss";

interface style {
  input: string;
}

interface InputFieldProps {
  style: style;
  type: string;
  value: string;
  name: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

export const CustomInputField: React.FC<InputFieldProps> = ({
  style,
  type,
  value,
  name,
  onChange,
}) => {
  return (
    <>
      <Input
        className={`${styles.defaultInputStyle} ${style.input}`}
        type={type}
        value={value}
        name={name}
        onChange={onChange}
      />
    </>
  );
};
