import React from "react";
import styles from "./input-lable.module.scss";
import { Label } from "@/components/ui/label";

interface style {
  label: string;
}

interface InputLabelProps {
  htmlfor: string;
  label: string;
  overriddenStyles?: style;
}

export const CustomInputlabel: React.FC<InputLabelProps> = ({
  htmlfor,
  label,
  overriddenStyles,
}) => {
  return (
    <>
      <Label
        htmlFor={htmlfor}
        className={`${styles.defaultLableStyle} ${overriddenStyles?.label} `}
      >
        {label}
      </Label>
    </>
  );
};
