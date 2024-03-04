import React, { useState } from 'react';
import { Checkbox } from '@components/v2/ui/checkbox';
import { InputField } from '../input-field';

const CheckboxWithInput = ({
  label,
  showInput,
  onDataUpdate,
  inputName,
  inputError,
  inputPlaceHolder,
  styles
}: any) => {
  const [isChecked, setIsChecked] = useState(false);
  const [inputValue, setInputValue] = useState('');

  const handleCheckboxChange = () => {
    const updatedChecked = !isChecked;
    setIsChecked(updatedChecked);

    // Update the parent component with the new data
    onDataUpdate(label, updatedChecked, inputValue);
  };

  const handleInputChange = (event: any) => {
    const updatedInputValue = event.target.value;
    setInputValue(updatedInputValue);

    // Update the parent component with the new data if the checkbox is checked
    if (isChecked) {
      onDataUpdate(label, isChecked, updatedInputValue);
    }
  };

  return (
    <div className="flex flex-col gap-[5px]">
      <div className="flex gap-[5px]">
        <Checkbox
          className={`rounded-[4px] border-neutral200 bg-neutral0 h-[20px] w-[20px] data-[state=checked]:border-primaryMain data-[state=checked]:bg-primaryMain data-[state=checked]:text-neutral25 ${styles}`}
          onClick={handleCheckboxChange}
          checked={isChecked}
        />
        {label && (
          <button
            onClick={handleCheckboxChange}
            className=" text-neutral-900 font-mRegular"
          >
            {label}
          </button>
        )}
      </div>

      {showInput && isChecked && (
        <InputField
          onChange={handleInputChange}
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

export default CheckboxWithInput;
