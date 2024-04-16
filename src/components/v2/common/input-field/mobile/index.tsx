import React, { useEffect, useState } from 'react';
import { InputField } from '..';
import { IInputFieldProps } from '../interface';
import Select, { components } from 'react-select';
import countryCode from '../../../../../constants/country-code.json';
import { colourStyles } from './country-select';
import { useGetAllCountryCodeQuery } from '@/features/api/get-country-code';

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
    return countryCode?.map(({ code, iso }: any) => ({
      label: code,
      value: code,
      iso: iso
    }));
  };

  const Option = (props: any) => (
    console.log('props', props),
    (
      <components.Option {...props} className="country-option">
        <img
          src={`https://flagsapi.com/${props.data.iso}/flat/64.png`}
          style={{ width: 24 }}
          alt="logo"
        />
        +{props.data.label}
      </components.Option>
    )
  );

  const SingleValue = ({ children, ...props }: any) => (
    <components.SingleValue {...props}>
      <img
        src={`https://flagsapi.com/${registerFormState.iso}/flat/64.png`}
        style={{ width: 24 }}
        alt={registerFormState.iso}
      />
      {children}
    </components.SingleValue>
  );

  const handleSelectChange = (selectValue: any) => {
    setRegisterFormState(() => ({
      ...registerFormState,
      countryCode: selectValue?.value,
      iso: selectValue?.iso
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
              options={computeCountryDropdownField(countryOption)}
              onChange={handleSelectChange}
              styles={colourStyles(errorText)}
              value={{
                label: `+${registerFormState.countryCode}`,
                value: registerFormState.countryCode
              }}
              components={{
                Option,
                SingleValue
              }}
              // closeMenuOnSelect={false}
              autoFocus={false}
              defaultMenuIsOpen={true}
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
