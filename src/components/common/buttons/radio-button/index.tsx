'use client';
import { Label } from '@components/ui/label';
import { RadioGroup, RadioGroupItem } from '@components/ui/radio-group';
import React, { ReactNode } from 'react';
import style from './radio-button.module.scss';

// Interface for individual radio button options
interface IRadioButtonOptionProps {
  radioButtonLabel?: string | ReactNode;
  id: string;
  value: string;
  checked?: boolean;
}

interface IRadioButtonMetaProps {
  name: string;
  handleChange: (data: string) => void;
  radioData: IRadioButtonOptionProps[];
}

// Interface for styling of radio buttons and labels
interface IRadioButtonStyles {
  radioContainerStyle?: string;
  radioButtonStyle: string;
  radioLabelStyle: string;
  mainRadioButton?: string;
}

// Interface for the RadioGroup component's props
interface IRadioGroupProps {
  radioMetaData: IRadioButtonMetaProps;
  // onChange: (radioValue: string) => void;
  radioButtonAllStyles?: IRadioButtonStyles;
}

// CustomRadioButton component definition
export const CustomRadioButton: React.FC<IRadioGroupProps> = ({
  radioMetaData,
  radioButtonAllStyles,
}) => {
  return (
    <>
      {/* RadioGroup component for managing radio buttons */}
      <RadioGroup
        onValueChange={radioMetaData?.handleChange}
        className={`${style?.mainRadioButton} ${radioButtonAllStyles?.mainRadioButton}`}
        name={radioMetaData?.name}
      >
        {/* Map over radioData to render individual radio buttons */}
        {radioMetaData?.radioData?.map((items) => {
          return (
            <div key={items?.id} className={style?.radioContainerStyle}>
              {/* Radio button item */}
              <RadioGroupItem
                className={radioButtonAllStyles?.radioButtonStyle}
                value={items?.value}
                id={items?.id}
                checked={items?.checked}
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
