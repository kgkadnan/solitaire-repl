import React from "react";
import { Label } from "../../ui/label";
import styles from "./input-lable.module.scss";

interface style {
  label: string;
}

interface InputLabelProps {
  htmlfor: string;
  label: string;
  style?: style;
}

export const CustomInputlabel: React.FC<InputLabelProps> = ({
  htmlfor,
  label,
  style,
}) => {
  return (
    <>
      <Label
        htmlFor={htmlfor}
        className={`${styles.defaultLableStyle} ${style?.label} `}
      >
        {label}
      </Label>
    </>
  );
};
