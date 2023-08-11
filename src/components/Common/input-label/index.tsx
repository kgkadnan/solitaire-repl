import React from "react";
import styles from "./input-lable.module.scss";
import { Label } from "../../ui/label";

interface LabelStyle {
  label: string;
}

interface InputLabelProps {
  htmlfor: string;
  label: string;
  style?: LabelStyle;
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
