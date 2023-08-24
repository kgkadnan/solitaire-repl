"use client";
import { Label } from "@components/ui/label";
import { RadioGroup, RadioGroupItem } from "@components/ui/radio-group";
import React from "react";
import style from "./radio-button.module.scss";

// Interface for individual radio button options
interface RadioButtonOptionProps {
  radioButtonLabel: string;
  id: string;
  value: string;
}

// Interface for styling of radio buttons and labels
interface RadioButtonStyles {
  radioContainerStyle?:string;
  radioButtonStyle: string;
  radioLabelStyle: string;
}

// Interface for the RadioGroup component's props
interface RadioGroupProps {
  radioData: RadioButtonOptionProps[];
  onChange: (radioValue: string) => void;
  radioButtonAllStyles?: RadioButtonStyles;
}

// CustomRadioButton component definition
export const CustomRadioButton: React.FC<RadioGroupProps> = ({
  radioData,
  onChange,
  radioButtonAllStyles,
}) => {
  return (
    <>
      {/* RadioGroup component for managing radio buttons */}
      <RadioGroup
        onValueChange={onChange}
        className={`${style?.mainRadioButton}`}
      >
        {/* Map over radioData to render individual radio buttons */}
        {radioData?.map((items) => {
          return (
            <div key={items?.id} className={style?.radioContainerStyle}>
              {/* Radio button item */}
              <RadioGroupItem
                className={radioButtonAllStyles?.radioButtonStyle}
                value={items?.value}
                id={items?.id}
              />
              {/* Radio button label */}
              <Label
                className={`${style.radioLabelStyle} ${radioButtonAllStyles?.radioLabelStyle}`}
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
