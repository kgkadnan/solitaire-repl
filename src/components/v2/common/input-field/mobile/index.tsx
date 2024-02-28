import React from 'react';
import { InputField } from '..';
import { IInputFieldProps } from '../interface';
import Select from 'react-select';
import countryCode from '../../../../../constants/country-code.json';
import { colourStyles } from './country-select';

interface IMobileInputField extends IInputFieldProps {
  registerFormState: any;
  setRegisterFormState: any;
}

export const MobileInput = ({
  name,
  value,
  label,
  errorText,
  onChange,
  placeholder,
  registerFormState,
  setRegisterFormState
}: IMobileInputField) => {
  const computeCountryDropdownField = (countryCode: any) => {
    return countryCode?.countries?.map(({ code }: any) => ({
      label: code,
      value: code
    }));
  };
  const handleSelectChange = (selectValue: any) => {
    setRegisterFormState(() => ({
      ...registerFormState,
      countryCode: selectValue?.value
    }));
  };

  return (
    <>
      <div className={`flex text-left  flex-col`}>
        {label && <p className="text-mRegular text-neutral900">{label}</p>}

        <div className={`flex`}>
          <div>
            <Select
              name="countryCode"
              options={computeCountryDropdownField(countryCode)}
              onChange={handleSelectChange}
              styles={colourStyles(errorText)}
              value={{
                label: `+${registerFormState.countryCode}`,
                value: registerFormState.countryCode
              }}
              // closeMenuOnSelect={false}
              autoFocus={false}
            />
          </div>
          <InputField
            label={''}
            onChange={onChange}
            type="number"
            name={name}
            value={value}
            placeholder={placeholder}
            styles={{
              input: `rounded-l-[0px]  focus:border-[1px] ${
                errorText
                  ? 'border-dangerMain focus:border-dangerMain hover:border-dangerMain focus-visible:border-dangerMain'
                  : 'border-neutral200'
              }`
            }}
          />
        </div>
        <p className="text-dangerMain h-1">{errorText && errorText}</p>
      </div>
    </>
  );
};
