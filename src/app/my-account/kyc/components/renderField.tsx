'use client';
import { CustomCheckBox } from '@/components/common/checkbox';
import { RadioButton } from '@/components/common/custom-input-radio';
import { FloatingLabelInput } from '@/components/common/floating-input';
import { fieldType } from '@/constants/kyc';

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
  name: string;
  label: string;
  type: any;
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  state: string;
  checkboxData: ICheckboxData[];
  inputType?: any;
  errorMessage?: string;
  radioData: IRadioData[];
  subTitle: string;
}

export const renderField = ({
  name,
  label,
  type,
  handleChange,
  state,
  inputType,
  errorMessage,
  checkboxData,
  radioData,
  subTitle
}: IRenderFieldProps) => {
  switch (type) {
    case fieldType.FLOATING_INPUT:
      return (
        <FloatingLabelInput
          label={name}
          onChange={handleChange}
          type={inputType}
          name={name}
          // value={state}
          value={''}
        />
      );
    case fieldType.CHECKBOX:
      return (
        <div className="text-[14px] text-solitaireTertiary">
          <p className="mb-[16px]">{name}</p>
          <div className="flex flex-row gap-[16px]">
            {checkboxData.map((items: ICheckboxData) => {
              return (
                <div key={items.name}>
                  <CustomCheckBox
                    data={items.data}
                    isChecked={items.isChecked}
                    row={items.row}
                    isInput={items.isInput}
                    inputName={items.inputName}
                    inputValue={items.inputValue}
                    handleInputChange={items.handleInputChange}
                    placeholder={items.placeholder}
                    checkboxLabel={items.name}
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
          <p className="mb-[16px]">{name}</p>
          <div className="flex flex-col gap-[16px]">
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
