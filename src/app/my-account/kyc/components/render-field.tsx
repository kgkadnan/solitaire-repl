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
import { countryCodeSelectStyle } from '../styles/country-code-select-style';
import { useGetCountryCodeQuery } from '@/features/api/current-ip';
import { updateFormState } from '@/features/kyc/kyc';
import { computeCountryDropdownField } from '../helper/compute-country-dropdown';
import { RANGE_VALIDATION } from '@/constants/error-messages/kyc';

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
  checked?: boolean;
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
    isEditable?: boolean;
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
    formKey,
    isEditable = true
  } = data;

  const { checkboxSetState } = useCheckboxStateManagement();
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
        <div className="sm:w-[200px] md:w-[300px] lg:w-[400px] xl:w-[500px] mb-[10px]">
          {label && <p className="mb-[8px] text-solitaireTertiary">{label}</p>}
          <FloatingLabelInput
            label={name}
            onChange={e =>
              handleInputChange(
                `formState.online.sections[${screenName}][${formKey}]`,
                e.target.value,
                dispatch,
                screenName,
                formKey,
                formState
              )
            }
            type={inputType}
            name={name}
            value={formState?.online?.sections?.[screenName]?.[formKey] ?? ''}
            errorText={
              formErrorState?.online?.sections?.[screenName]?.[formKey] ?? ''
            }
            key={formKey}
            isEditable={isEditable}
          />
        </div>
      );
    case fieldType.PHONE_NUMBER:
      return (
        <div className="flex text-center justify-between sm:w-[200px] md:w-[300px] lg:w-[400px] xl:w-[500px] gap-6">
          <div className="w-[100px]">
            <Select
              options={computeCountryDropdownField(countryCode)}
              onChange={({ value }: any) => {
                handleInputChange(
                  `formState.online.sections[${screenName}][${formKey[0]}]`,
                  value,
                  dispatch,
                  screenName,
                  formKey[0],
                  formState
                );
              }}
              styles={countryCodeSelectStyle(
                formErrorState?.online?.sections?.[screenName]?.[formKey[0]] ??
                  '',
                !isEditable
              )}
              value={{
                label:
                  formState?.online?.sections?.[screenName]?.[formKey[0]] ?? '',
                value:
                  formState?.online?.sections?.[screenName]?.[formKey[0]] ?? ''
              }}
              isDisabled={!isEditable}
            />
          </div>
          <div className="w-[78%]">
            <FloatingLabelInput
              label={name}
              onChange={e =>
                e.target.value.trim().length <= 15
                  ? handleInputChange(
                      `formState.online.sections[${screenName}][${formKey[1]}]`,
                      e.target.value,
                      dispatch,
                      screenName,
                      formKey[1],
                      formState
                    )
                  : dispatch(
                      updateFormState({
                        name: `formErrorState.online.sections.${[
                          screenName
                        ]}.${[formKey[1]]}`,
                        value: RANGE_VALIDATION(name, 0, 15)
                      })
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
              isEditable={isEditable}
            />
          </div>
        </div>
      );
    case fieldType.CHECKBOX:
      return (
        <div className="text-[14px] text-solitaireTertiary sm:w-[200px] md:w-[300px] lg:w-[400px] xl:w-[500px]">
          <p className="mb-[10px]">{name}</p>
          <p className="text-[#C51A2D] mb-4">
            {formErrorState?.online?.sections?.[screenName]?.[formKey] ?? ''}
          </p>
          <div className="grid grid-cols-2 gap-[16px]">
            {checkboxData.map((item: any) => {
              return (
                <div key={item.name}>
                  <CustomCheckBox
                    checkboxHandleFunction={(isChecked: string[]) => {
                      !isChecked.includes(formKey) &&
                        handleInputChange(
                          `formState.online.sections[${screenName}][${formKey}]`,
                          [
                            ...isChecked,
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
                          ],
                          dispatch,
                          screenName,
                          formKey,
                          formState
                        );
                    }}
                    data={item.data}
                    isChecked={formState.online.sections[screenName]?.[formKey]}
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
                    handleChange={(e: any) => {
                      e.trim().length <= 20
                        ? handleInputChange(
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
                              (formState?.online?.sections?.[screenName]?.[
                                formKey
                              ]?.find((element: any) => {
                                !checkboxData
                                  ?.map(checkboxElement => checkboxElement.name)
                                  .includes(element);
                              }) ?? '') + e
                            ],
                            dispatch,
                            screenName,
                            formKey,
                            formState
                          )
                        : dispatch(
                            updateFormState({
                              name: `formErrorState.online.sections.${[
                                screenName
                              ]}.${[formKey]}`,
                              value: RANGE_VALIDATION(name, 0, 20)
                            })
                          );
                    }}
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
        <div
          className="text-[14px] text-solitaireTertiary sm:w-[200px] md:w-[300px] lg:w-[400px] xl:w-[500px]"
          key={formKey}
        >
          <p className="mb-[0px]">{name}</p>
          <p className="mb-[8px] text-[12px] text-solitaireSenary">
            {subTitle && subTitle}
          </p>
          <p className="text-[#C51A2D] mb-4">
            {formErrorState?.online?.sections?.[screenName]?.[formKey] ?? ''}
          </p>
          <div
            className={`${
              formKey === 'organisation_type'
                ? 'grid grid-cols-2 gap-[16px]'
                : 'flex flex-row justify-between gap-[16px] w-[50%] mb-[20px]'
            }`}
          >
            {radioData.map((items: IRadioData) => {
              const handleRadioChange = (value: string) => {
                handleInputChange(
                  `formState.online.sections[${screenName}][${formKey}]`,
                  value,
                  dispatch,
                  screenName,
                  formKey,
                  formState
                );
              };
              return (
                <div key={items.id}>
                  <RadioButton
                    radioMetaData={items}
                    onChange={handleRadioChange}
                    handleInputChange={(e: any) => {
                      e.target.value.trim().length <= 20
                        ? handleInputChange(
                            `formState.online.sections[${screenName}][${formKey}]`,
                            e.target.value,
                            dispatch,
                            screenName,
                            formKey,
                            formState
                          )
                        : dispatch(
                            updateFormState({
                              name: `formErrorState.online.sections.${[
                                screenName
                              ]}.${[formKey]}`,
                              value: RANGE_VALIDATION(name, 0, 20)
                            })
                          );
                    }}
                    // isChecked={formState.online.sections[screenName]?.[formKey]}
                    inputValue={
                      !radioData
                        ?.map(element => {
                          return element.value;
                        })
                        ?.includes(
                          formState?.online?.sections?.[screenName]?.[formKey]
                        )
                        ? formState?.online?.sections?.[screenName]?.[formKey]
                        : ''
                    }
                    key={items?.id}
                  />
                </div>
              );
            })}
          </div>
          {dynamicCondition &&
            formState.online.sections[screenName]?.[formKey] ===
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
      );

    default:
      return null;
  }
};
