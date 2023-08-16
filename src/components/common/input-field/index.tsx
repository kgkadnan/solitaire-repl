"use client";
import React, { ChangeEvent } from "react";
import styles from "./input-field.module.scss";
import { Input } from "@/components/ui/input";

interface style {
  input: string;
}

interface InputFieldProps {
  style?: style;
  type: string;
  value: string;
  name: string;
  placeholder?:string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

export const CustomInputField: React.FC<InputFieldProps> = ({
  style,
  type,
  value,
  name,
  onChange,
  placeholder
}) => {
  return (
    <>
      <Input
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
