'use client';
import { CustomCheckBox } from '@/components/common/checkbox';
import { RadioButton } from '@/components/common/custom-input-radio';
import { FloatingLabelInput } from '@/components/common/floating-input';
import { fieldType } from '@/constants/kyc';

import { handleInputChange } from '../helper/handle-change';
import { useAppDispatch } from '@/hooks/hook';

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
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  name: string;
}
interface IRenderFieldProps {
  data: {
    name: string;
    label: string;
    type: any;
    handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    state: string;
    checkboxData: ICheckboxData[];
    inputType?: any;
    radioData: IRadioData[];
    subTitle: string;
    dynamicField: any;
    dynamicCondition: string;
    key: string;
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
    handleChange,
    state,
    inputType,
    checkboxData,
    radioData,
    subTitle,
    dynamicField,
    dynamicCondition,
    key
  } = data;

  const dispatch = useAppDispatch();
  switch (type) {
    case fieldType.FLOATING_INPUT:
      return (
        <div className="">
          <FloatingLabelInput
            label={name}
            onChange={e =>
              handleInputChange(
                `formState.online.sections[${screenName}][${key}]`,
                e.target.value,
                dispatch,
                handleChange,
                screenName
              )
            }
            type={inputType}
            name={name}
            value={formState?.online?.sections?.[screenName]?.[key] ?? ''}
            errorText={
              formErrorState?.online?.sections?.[screenName]?.[key] ?? ''
            }
          />
        </div>
      );
    case fieldType.CHECKBOX:
      return (
        <div className="text-[14px] text-solitaireTertiary w-[70%]">
          <p className="mb-4">{name}</p>{' '}
          <div className="grid grid-cols-2 gap-[16px]">
            {checkboxData.map(item => {
              return (
                <div key={item.name}>
                  <CustomCheckBox
                    data={item.data}
                    isChecked={item.isChecked}
                    row={item.row}
                    isInput={item.isInput}
                    inputName={item.inputName}
                    inputValue={item.inputValue}
                    handleInputChange={item.handleInputChange}
                    placeholder={item.placeholder}
                    checkboxLabel={item.name}
                    inputStyle="w-[150px]"
                  />
                </div>
              );
            })}
          </div>
        </div>
      );
    case fieldType.RADIO:
      return (
        <div className="text-[14px] text-solitaireTertiary w-[70%]">
          <p className="mb-[16px]">{name}</p>
          <div className="grid grid-cols-2 gap-[16px]">
            {radioData.map((items: IRadioData) => {
              return (
                <div key={items.id}>
                  <RadioButton radioMetaData={items} key={items?.id} />
                </div>
              );
            })}
          </div>
        </div>
      );
    case fieldType.RADIOWITHINPUT:
      return (
        <div className="text-[14px] text-solitaireTertiary">
          <p className="mb-[0px]">{name}</p>
          <p className="mb-[8px] text-[12px] text-solitaireSenary">
            {subTitle}
          </p>
          <div className="flex flex-col gap-[16px]">
            {radioData.map((items: IRadioData) => {
              return (
                <div key={items.id}>
                  <RadioButton radioMetaData={items} key={items?.id} />
                </div>
              );
            })}
            {state === dynamicCondition && //state to be replaced with actual state
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
    case fieldType.FLOATING_INPUT_WITH_LABEL:
      return (
        <div className="">
          <p className="mb-[8px] text-solitaireTertiary">{label}</p>
          <FloatingLabelInput
            label={name}
            onChange={handleChange}
            type={inputType}
            name={name}
            // value={state}
            value={''}
          />
        </div>
      );
    default:
      return null;
  }
};
