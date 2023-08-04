"use client";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import React from "react";
import style from "./radio-button.module.scss";

interface RadioButtonOptionProps {
  radioButtonLabel: string;
  id: string;
  value: string;
}

interface RadioButtonStyles {
  radioButtonStyle: string;
  radioLabelStyle: string;
}

interface RadioGroupProps {
  radioData: RadioButtonOptionProps[];
  onChange: (radioValue: string) => void;
  radioButtonAllStyles: RadioButtonStyles;
}

export const RadioButton: React.FC<RadioGroupProps> = ({
  radioData,
  onChange,
  radioButtonAllStyles,
}) => {
  return (
    <>
      <RadioGroup onValueChange={onChange} className={style?.mainRadioButton}>
        {radioData?.map((items, index) => {
          return (
            <div key={index}>
              <RadioGroupItem
                className={radioButtonAllStyles?.radioButtonStyle}
                value={items?.value}
                id={items?.id}
              />

              <Label
                className={radioButtonAllStyles?.radioLabelStyle}
                htmlFor={items?.id}
              >
                {items?.radioButtonLabel}
              </Label>
            </div>
          );
        })}
      </RadioGroup>
    </>
  );
};
