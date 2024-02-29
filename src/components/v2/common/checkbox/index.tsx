import { Checkbox } from '@components/v2/ui/checkbox';
import React from 'react';
import { InputField } from '../input-field';

interface ICheckboxComponentProps {
  isChecked: boolean;
  onClick?: (evt: any) => void;
  styles?: any;
  showInput?: boolean;
  onInputChange?: any;
  inputValue?: any;
  inputError?: any;
  checkboxLabel?: string;
}

const CheckboxComponent = ({
  onClick,
  isChecked,
  styles,
  showInput,
  onInputChange,
  inputValue,
  inputError,
  checkboxLabel
}: ICheckboxComponentProps) => {
  return (
    <div>
      <div className="flex gap-[5px]">
        <Checkbox
          className={`rounded-[4px] border-neutral200 bg-neutral0 h-[20px] w-[20px] data-[state=checked]:border-primaryMain data-[state=checked]:bg-primaryMain data-[state=checked]:text-neutral25 ${styles}`}
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
          label={'Subsidiary/Affiliated Company'}
          onChange={onInputChange}
          type="text"
          name={'Subsidiary/Affiliated Company'}
          value={inputValue}
          errorText={inputError}
          placeholder={'Enter name'}
          styles={{
            input: `${inputError ? 'border-dangerMain' : 'border-neutral200'}`
          }}
        />
      )}
    </div>
  );
};

export default CheckboxComponent;
