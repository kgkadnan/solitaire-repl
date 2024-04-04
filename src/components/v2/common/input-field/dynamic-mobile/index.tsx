import React, { useEffect, useState } from 'react';
import { InputField } from '..';
import { IDynamicInputFieldProps } from '../interface';
import Select , {components}from 'react-select';
import countryCode from '../../../../../constants/country-code.json';
import { colourStyles } from './country-select';
import { useGetAllCountryCodeQuery } from '@/features/api/get-country-code';

interface IDynamicMobileInputField extends IDynamicInputFieldProps {
  containerStyle?: string;
  isNotEditable?: boolean;
  selectedCountryIso? :string
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
  isNotEditable = false,
  selectedCountryIso
}: IDynamicMobileInputField) => {
  const { data: getAllCountryCode } = useGetAllCountryCodeQuery({});
  const [countryOption, setCountryOption] = useState<any>([]);
  useEffect(() => {
    if (getAllCountryCode?.length > 0) {
      setCountryOption(getAllCountryCode);
    } else {
      setCountryOption(countryCode?.countries);
    }
  }, [getAllCountryCode]);
  const computeCountryDropdownField = (countryCode: any) => {
    return countryCode?.map(({ code,iso }: any) => ({
      label: code,
      value: code,
      iso:iso
    }));
  };


  const Option = (props:any) => (
    
    <components.Option {...props} className="country-option">
      <img src={`https://flagsapi.com/${props.data.iso}/flat/64.png`} style={{ width: 24 }}
      alt="logo" />
      +{props.data.label}
    </components.Option>
  );

  const SingleValue = ({ children, ...props }:any) => (
    <components.SingleValue {...props}>
      <img src={`https://flagsapi.com/${selectedCountryIso}/flat/64.png`}   style={{ width: 24 }}
      alt={''} />
      {children}
    </components.SingleValue>
  );

  return (
    <div className={`flex text-left flex-col ${containerStyle}`}>
      {label && <p className="text-mRegular text-neutral900">{label}</p>}

      <div className={`flex`}>
        <div>
          <Select
            name="countryCode"
            options={computeCountryDropdownField(countryOption)}
            onChange={handleSelectChange}
            styles={colourStyles(errorText, isNotEditable)}
            value={countryCodeValue}
            components={{
                Option,
                SingleValue
              }}
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
