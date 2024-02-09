import React from 'react';
import { InputField } from '..';
import { IInputFieldProps } from '../interface';
import Select, { SingleValue } from 'react-select';
import countryCode from '../../../../../constants/country-code.json';
import { handleSelectChange } from '@/app/v2/register/helpers/handle-select-change';
import { countryCodeSelectStyle } from './country-select';

interface IMobileInputField extends IInputFieldProps {
  state: string;
  setRegisterFormState: any;
  errorState: any;
}
export const MobileInput = ({
  name,
  value,
  label,
  errorText,
  onChange,
  placeholder,
  state,
  setRegisterFormState,
  errorState
}: IMobileInputField) => {
  const computeCountryDropdownField = (countryCode: any) => {
    return countryCode?.countries?.map(({ code }: any) => ({
      label: code,
      value: code
    }));
  };

  return (
    <>
      <div className={`flex text-left  flex-col`}>
        {label && <p className="text-mRegular text-neutral-900">{label}</p>}

        <div className="flex">
          <div className="">
            <div
              style={{ boxShadow: 'var(--input-shadow) inset' }}
              className={` rounded-l-[4px] border-t-[1px] border-b-[1px] border-l-[1px] p-2 ${
                errorText ? 'border-dangerMain' : 'border-neutral200'
              }`}
            >
              <Select
                name="countryCode"
                options={computeCountryDropdownField(countryCode)}
                onChange={(
                  selectValue: SingleValue<{ label: string; value: string }>
                ) => handleSelectChange({ selectValue, setRegisterFormState })}
                styles={countryCodeSelectStyle(errorState)}
                value={{
                  label: state,
                  value: state
                }}
              />
            </div>
          </div>
          <InputField
            onChange={onChange}
            type="number"
            name={name}
            value={value}
            placeholder={placeholder}
            styles={{
              input: 'rounded-l-[0px]'
            }}
          />
        </div>
        <p className="text-dangerMain h-1">{errorText && errorText}</p>
      </div>
    </>
  );
};
