'use client';
import React, { useEffect, useState } from 'react';
import { CustomCheckBox } from '@/components/common/checkbox';
import { RadioButton } from '@/components/common/custom-input-radio';
import { FloatingLabelInput } from '@/components/common/floating-input';
import { fieldType } from '@/constants/enums/kyc';
import countryCode from '../../../../constants/country-code.json';
import Select from 'react-select';
import { handleInputChange } from '../helper/handle-change';
import { useCheckboxStateManagement } from '@/components/common/checkbox/hooks/checkbox-state-management';
import { useAppDispatch } from '@/hooks/hook';
import { countryCodeSelectStyles } from '../styles/country-code-select-style';
import { useGetCountryCodeQuery } from '@/features/api/current-ip';
import { updateFormState } from '@/features/kyc/kyc';
import { computeCountryDropdownField } from '../helper/compute-country-dropdown';

// Define an interface for the parameters of renderField

interface ICheckboxData {
  name: string;
  data: string;
  isChecked: string[];
  row: any;
  isInput?: boolean;
  inputName?: string;
  inputValue?: string;
  handleInputChange?: (value: string) => void;
  placeholder?: string;
}

interface IRadioData {
  id: number;
  label: string;
  value: string;
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  name: string;
}
interface IRenderFieldProps {
  data: {
    name: string;
    label: string;
    type: any;
    checkboxData: ICheckboxData[];
    inputType?: any;
    radioData: IRadioData[];
    subTitle: string;
    dynamicField: any;
    dynamicCondition: string;
    formKey: string;
  };
  formState: any;
  formErrorState: any;
  screenName: string;
}

export const RenderField: React.FC<IRenderFieldProps> = ({
  data,
  formState,
  formErrorState,
  screenName
}) => {
  const {
    name,
    label,
    type,
    inputType,
    checkboxData,
    radioData,
    subTitle,
    dynamicField,
    dynamicCondition,
    formKey
  } = data;

  const { checkboxState, checkboxSetState } = useCheckboxStateManagement();
  const { isCheck } = checkboxState;
  const { setIsCheck } = checkboxSetState;
  const dispatch = useAppDispatch();
  const [skip, setSkip] = useState(true);
  const { data: getCountryCode } = useGetCountryCodeQuery({}, { skip });

  useEffect(() => {
    if (fieldType.PHONE_NUMBER === type) {
      setSkip(false);
    }
  }, [fieldType]);

  useEffect(() => {
    if (getCountryCode) {
      dispatch(
        updateFormState({
          name: `formState.online.sections[${screenName}][${formKey[0]}]`,
          value: getCountryCode.country_calling_code
        })
      );
    }
  }, [skip, getCountryCode]);

  switch (type) {
    case fieldType.FLOATING_INPUT:
      return (
        <div className="sm:w-[200px] md:w-[300px] lg:w-[400px] xl:w-[500px]">
          {label && <p className="mb-[8px] text-solitaireTertiary">{label}</p>}
          <FloatingLabelInput
            label={name}
            onChange={e =>
              handleInputChange(
                `formState.online.sections[${screenName}][${formKey}]`,
                e.target.value,
                dispatch,
                screenName,
                formKey
              )
            }
            type={inputType}
            name={name}
            value={formState?.online?.sections?.[screenName]?.[formKey] ?? ''}
            errorText={
              formErrorState?.online?.sections?.[screenName]?.[formKey] ?? ''
            }
            key={formKey}
          />
        </div>
      );
    case fieldType.PHONE_NUMBER:
      return (
        <div className="flex text-center justify-between sm:w-[200px] md:w-[300px] lg:w-[400px] xl:w-[500px]">
          <div className="w-[18%]">
            <Select
              options={computeCountryDropdownField(countryCode)}
              onChange={({ value }: any) => {
                handleInputChange(
                  `formState.online.sections[${screenName}][${formKey[0]}]`,
                  value,
                  dispatch,
                  screenName,
                  formKey[0]
                );
              }}
              styles={countryCodeSelectStyles}
              value={{
                label:
                  formState?.online?.sections?.[screenName]?.[formKey[0]] ?? '',
                value:
                  formState?.online?.sections?.[screenName]?.[formKey[0]] ?? ''
              }}
            />
          </div>
          <div className="w-[78%]">
            <FloatingLabelInput
              label={name}
              onChange={e =>
                handleInputChange(
                  `formState.online.sections[${screenName}][${formKey[1]}]`,
                  e.target.value,
                  dispatch,
                  screenName,
                  formKey[1]
                )
              }
              type={inputType}
              name={name}
              value={
                formState?.online?.sections?.[screenName]?.[formKey[1]] ?? ''
              }
              errorText={
                formErrorState?.online?.sections?.[screenName]?.[formKey[1]] ??
                ''
              }
            />
          </div>
        </div>
      );
    case fieldType.CHECKBOX:
      return (
        <div className="text-[14px] text-solitaireTertiary w-[70%]">
          <p className="mb-[10px]">{name}</p>
          <p className="text-[#C51A2D] mb-4">
            {formErrorState?.online?.sections?.[screenName]?.[formKey] ?? ''}
          </p>
          <div className="grid grid-cols-2 gap-[16px]">
            {checkboxData.map((item: any) => {
              return (
                <div key={item.name}>
                  <CustomCheckBox
                    checkboxHandleFunction={(isChecked: string[]) =>
                      !isChecked.includes(name) &&
                      handleInputChange(
                        `formState.online.sections[${screenName}][${formKey}]`,
                        isChecked,
                        dispatch,
                        screenName,
                        formKey
                      )
                    }
                    data={item.data}
                    isChecked={isCheck}
                    setIsCheck={setIsCheck}
                    row={item.row}
                    isInput={item.isInput}
                    inputName={item.inputName}
                    inputValue={
                      formState?.online?.sections?.[screenName]?.[
                        formKey
                      ]?.filter(
                        (element: any) =>
                          !checkboxData
                            ?.map(element => {
                              return element.name;
                            })
                            ?.includes(element)
                      )[0]
                    }
                    handleChange={(e: any) =>
                      handleInputChange(
                        `formState.online.sections[${screenName}][${formKey}]`,
                        [
                          ...(formState?.online?.sections?.[screenName]?.[
                            formKey
                          ]?.filter(
                            (element: any) =>
                              checkboxData
                                ?.map(element => {
                                  return element.name;
                                })
                                ?.includes(element)
                          ) ?? []),
                          formState?.online?.sections?.[screenName]?.[
                            formKey
                          ]?.filter(
                            (element: any) =>
                              !checkboxData
                                ?.map(element => {
                                  return element.name;
                                })
                                ?.includes(element)
                          )[0] ?? '' + e
                        ],
                        dispatch,
                        item.handleInputChange,
                        screenName
                      )
                    }
                    placeholder={item.placeholder}
                    checkboxLabel={item.name}
                    inputStyle="w-[150px]"
                    setIsError={false}
                  />
                </div>
              );
            })}
          </div>
        </div>
      );
    case fieldType.RADIO:
      return (
        <div className="text-[14px] text-solitaireTertiary">
          <p className="mb-[10px]">{name}</p>
          <p className="text-[#C51A2D] mb-4">
            {formErrorState?.online?.sections?.[screenName]?.[formKey] ?? ''}
          </p>
          <div className="grid grid-cols-2 gap-[16px]">
            {radioData.map((items: IRadioData) => {
              const handleRadioChange = (value: string) => {
                handleInputChange(
                  `formState.online.sections[${screenName}][${formKey}]`,
                  value,
                  dispatch,
                  screenName,
                  formKey
                );
              };
              return (
                <div key={items.id}>
                  <RadioButton
                    radioMetaData={items}
                    onChange={handleRadioChange}
                    handleInputChange={(e: any) =>
                      handleInputChange(
                        `formState.online.sections[${screenName}][${formKey}]`,
                        e.target.value,
                        dispatch,
                        screenName,
                        formKey
                      )
                    }
                    inputValue={
                      formState?.online?.sections?.[screenName]?.[formKey] ?? ''
                    }
                    key={items?.id}
                  />
                </div>
              );
            })}
          </div>
        </div>
      );
    case fieldType.RADIO_WITH_INPUT:
      return (
        <div className="text-[14px] text-solitaireTertiary" key={formKey}>
          <p className="mb-[0px]">{name}</p>
          <p className="mb-[8px] text-[12px] text-solitaireSenary">
            {subTitle}
          </p>
          <div className="flex flex-col gap-[16px]">
            {radioData.map((items: IRadioData) => {
              const handleRadioChange = (value: string) => {
                handleInputChange(
                  `formState.online.sections[${screenName}][${formKey}]`,
                  value,
                  dispatch,
                  screenName,
                  formKey
                );
              };
              return (
                <div key={items.id}>
                  <RadioButton
                    radioMetaData={items}
                    onChange={handleRadioChange}
                    key={items?.id}
                  />
                </div>
              );
            })}
            {formState.online.sections[screenName]?.[formKey] ===
              dynamicCondition &&
              dynamicField?.map((field: any) => (
                <div key={field.name} className={`mb-[20px] w-[40%] `}>
                  <RenderField
                    data={field}
                    formState={formState}
                    formErrorState={formErrorState}
                    screenName={screenName}
                  />
                </div>
              ))}
          </div>
        </div>
      );

    default:
      return null;
  }
};
