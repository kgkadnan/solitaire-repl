import { Checkbox } from '@components/v2/ui/checkbox';
import React from 'react';
import { InputField } from '../input-field';

interface ICheckboxComponentProps {
  isChecked: boolean;
  onClick?: (_evt: any) => void;
  styles?: any;
  showInput?: boolean;
  onInputChange?: any;
  inputValue?: any;
  inputError?: any;
  checkboxLabel?: string;
  inputPlaceHolder?: string;
  inputName?: string;
}

const CheckboxComponent = ({
  onClick,
  isChecked,
  styles,
  showInput,
  onInputChange,
  inputValue,
  inputError,
  checkboxLabel,
  inputPlaceHolder,
  inputName
}: ICheckboxComponentProps) => {
  return (
    <div className="flex flex-col gap-[5px]">
      <div className="flex gap-[5px]">
        <Checkbox
          className={`rounded-[4px] border-neutral200 bg-neutral0 h-[20px] w-[20px] data-[state=checked]:border-primaryMain data-[state=checked]:bg-primaryMain data-[state=checked]:text-neutral25 hover:border-primaryMain focus:border-[2px] focus:border-primaryFocus ${styles}`}
          onClick={onClick}
          checked={isChecked}
        />
        {checkboxLabel && (
          <button onClick={onClick} className=" text-neutral-900 font-mRegular">
            {checkboxLabel}
          </button>
        )}
      </div>
      {showInput && isChecked && (
        <InputField
          onChange={onInputChange}
          type="text"
          name={inputName ?? ''}
          value={inputValue}
          errorText={inputError}
          placeholder={inputPlaceHolder}
          styles={{
            inputMain: 'h-64px',
            input: `${inputError ? 'border-dangerMain' : 'border-neutral200'}`
          }}
        />
      )}
    </div>
  );
};

export default CheckboxComponent;
