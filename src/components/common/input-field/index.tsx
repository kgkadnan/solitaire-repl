"use client";
import React, { ChangeEvent } from "react";
import styles from "./input-field.module.scss";
import { Input } from "@components/ui/input";

interface IInputStyle {
  input: string;
}

interface InputFieldProps {
  style?: IInputStyle;
  type: string;
  value?: string;
  name: string;
  placeholder?: string;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  suggestions: any;
  handleSuggestionClick: any;
}

export const CustomInputField: React.FC<InputFieldProps> = ({
  style,
  type,
  value,
  name,
  onChange,
  placeholder,
  suggestions,
  handleSuggestionClick,
}) => {
  return (
    <>
      <Input
        data-testid="custom-input"
        className={`${styles.defaultInputStyle} ${style?.input}`}
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
      />
      {suggestions?.length > 0 && (
        <ul>
          {suggestions.map((suggestion: any, index: any) => (
            <li key={index} onClick={() => handleSuggestionClick(suggestion)}>
              {suggestion}
            </li>
          ))}
        </ul>
      )}
    </>
  );
};
