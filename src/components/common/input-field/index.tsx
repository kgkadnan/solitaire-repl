"use client";
import React, { ChangeEvent } from "react";
import styles from "./input-field.module.scss";
import { Input } from "@/components/ui/input";

interface IInputStyle {
  input: string;
}

interface InputFieldProps {
  style?: IInputStyle;
  type: string;
  value: string;
  name: string;
  placeholder?: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

export const CustomInputField: React.FC<InputFieldProps> = ({
  style,
  type,
  value,
  name,
  onChange,
  placeholder,
}) => {
  return (
    <>
      <Input
        data-testid="custom-input"
        className={`${styles.defaultInputStyle} ${style?.input}`}
        type={type}
        value={value}
        name={name}
        onChange={onChange}
        placeholder={placeholder}
      />
    </>
  );
};
