import React from 'react';
import { InputField } from '..';
import { IDynamicInputFieldProps } from '../interface';
import Select from 'react-select';
import countryCode from '../../../../../constants/country-code.json';
import { colourStyles } from './country-select';

interface IDynamicMobileInputField extends IDynamicInputFieldProps {
  containerStyle?: string;
  isNotEditable?: boolean;
}

export const DynamicMobileInput = ({
  name,
  phoneValue,
  countryCodeValue,
  handleSelectChange,
  label,
  errorText,
  handleInputChange,
  containerStyle,
  placeholder,
  isNotEditable = false
}: IDynamicMobileInputField) => {
  const computeCountryDropdownField = (countryCode: any) => {
    return countryCode?.countries?.map(({ code }: any) => ({
      label: code,
      value: code
    }));
  };

  return (
    <div className={`flex text-left flex-col ${containerStyle}`}>
      {label && <p className="text-mRegular text-neutral-900">{label}</p>}

      <div className={`flex`}>
        <div>
          <Select
            name="countryCode"
            options={computeCountryDropdownField(countryCode)}
            onChange={handleSelectChange}
            styles={colourStyles(errorText, isNotEditable)}
            value={countryCodeValue}
            autoFocus={false}
            isDisabled={isNotEditable}
          />
        </div>
        <InputField
          label={''}
          onChange={handleInputChange}
          type="number"
          name={name}
          value={phoneValue}
          disabled={isNotEditable}
          placeholder={placeholder}
          styles={{
            input: `rounded-l-[0px] ${
              isNotEditable &&
              'border-primaryBorder bg-neutral100 text-neutral500'
            } ${errorText ? 'border-dangerMain' : 'border-neutral200'}`
          }}
        />
      </div>
      <p className="text-dangerMain h-1">{errorText && errorText}</p>
    </div>
  );
};
